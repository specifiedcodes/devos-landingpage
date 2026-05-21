import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { getBlogPool } from '@/lib/blog/pool';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

const CANONICAL_FRONTMATTER_KEYS = new Set([
  'title',
  'excerpt',
  'date',
  'author',
  'category',
  'tags',
  'coverImage',
  'published',
  'seoTitle',
  'seoDescription',
]);

function usePostgres(): boolean {
  return process.env.BLOG_SOURCE === 'postgres';
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.BLOG_PUBLISH_SECRET;

  if (!expectedToken) {
    return NextResponse.json(
      { success: false, error: 'BLOG_PUBLISH_SECRET not configured' },
      { status: 500 },
    );
  }

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const {
    title,
    slug,
    excerpt,
    content,
    date,
    author,
    category,
    tags,
    seoTitle,
    seoDescription,
    coverImage,
    published = true,
    overwrite = false,
    ...extras
  } = body as {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    date?: string;
    author?: string;
    category?: string;
    tags?: string[];
    seoTitle?: string;
    seoDescription?: string;
    coverImage?: string;
    published?: boolean;
    overwrite?: boolean;
    [k: string]: unknown;
  };

  if (!title || !slug || !content || !date || !author || !category) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields: title, slug, content, date, author, category' },
      { status: 400 },
    );
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { success: false, error: 'Invalid slug format — use lowercase letters, numbers, and hyphens only' },
      { status: 400 },
    );
  }

  // Pull non-canonical extras into frontmatter_extra (DB) or simply ignore
  // them (FS — current behavior). overwrite flag is consumed locally.
  const frontmatterExtra: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(extras)) {
    if (k === 'overwrite' || k === 'published_at' || k === 'updated_at') continue;
    if (!CANONICAL_FRONTMATTER_KEYS.has(k)) frontmatterExtra[k] = v;
  }

  let existed = false;

  try {
    if (usePostgres()) {
      const pool = getBlogPool();
      const existsResult = await pool.query<{ exists: boolean }>(
        'SELECT EXISTS(SELECT 1 FROM blog_posts WHERE slug = $1) AS exists',
        [slug],
      );
      existed = existsResult.rows[0]?.exists === true;

      if (existed && !overwrite) {
        return NextResponse.json(
          { success: false, error: `Post with slug "${slug}" already exists. Pass overwrite: true to update.` },
          { status: 409 },
        );
      }

      await pool.query(
        `INSERT INTO blog_posts (
           slug, title, excerpt, content_mdx, category, author, cover_image,
           seo_title, seo_description, tags, frontmatter_extra,
           published, published_at
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11::jsonb,$12,$13)
         ON CONFLICT (slug) DO UPDATE SET
           title=EXCLUDED.title,
           excerpt=EXCLUDED.excerpt,
           content_mdx=EXCLUDED.content_mdx,
           category=EXCLUDED.category,
           author=EXCLUDED.author,
           cover_image=EXCLUDED.cover_image,
           seo_title=EXCLUDED.seo_title,
           seo_description=EXCLUDED.seo_description,
           tags=EXCLUDED.tags,
           frontmatter_extra=EXCLUDED.frontmatter_extra,
           published=EXCLUDED.published,
           updated_at=NOW()`,
        [
          slug,
          title,
          excerpt ?? null,
          content,
          category,
          author,
          coverImage ?? null,
          seoTitle ?? null,
          seoDescription ?? null,
          JSON.stringify(tags ?? []),
          JSON.stringify(frontmatterExtra),
          published,
          new Date(date),
        ],
      );
    } else {
      // Legacy filesystem write — keep working until BLOG_SOURCE=postgres flips.
      const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
      existed = fs.existsSync(filePath);
      if (existed && !overwrite) {
        return NextResponse.json(
          { success: false, error: `Post with slug "${slug}" already exists. Pass overwrite: true to update.` },
          { status: 409 },
        );
      }

      const frontmatterLines = [
        '---',
        `title: "${title.replace(/"/g, '\\"')}"`,
        excerpt ? `excerpt: "${excerpt.replace(/"/g, '\\"')}"` : null,
        `date: "${date}"`,
        `author: "${author}"`,
        `category: "${category}"`,
        tags ? `tags: ${JSON.stringify(tags)}` : null,
        coverImage ? `coverImage: "${coverImage}"` : null,
        `published: ${published}`,
        seoTitle ? `seoTitle: "${seoTitle.replace(/"/g, '\\"')}"` : null,
        seoDescription ? `seoDescription: "${seoDescription.replace(/"/g, '\\"')}"` : null,
        '---',
      ].filter(Boolean).join('\n');

      fs.mkdirSync(CONTENT_DIR, { recursive: true });
      fs.writeFileSync(filePath, `${frontmatterLines}\n\n${content}\n`, 'utf-8');
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Failed to write post: ${message}` },
      { status: 500 },
    );
  }

  // Invalidate cached HTML so the new/updated post appears immediately.
  try {
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/sitemap.xml');
    revalidatePath('/feed.xml');
  } catch (err) {
    console.warn('[publish] revalidatePath failed:', err);
  }

  return NextResponse.json({
    success: true,
    url: `/blog/${slug}`,
    file: `${slug}.mdx`, // kept for backwards-compat with manager.py
    overwritten: existed,
  });
}
