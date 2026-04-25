import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

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
    published = true,
    overwrite = false,
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
    published?: boolean;
    overwrite?: boolean;
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

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const exists = fs.existsSync(filePath);
  if (exists && !overwrite) {
    return NextResponse.json(
      { success: false, error: `Post with slug "${slug}" already exists. Pass overwrite: true to update.` },
      { status: 409 },
    );
  }

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    excerpt ? `excerpt: "${excerpt.replace(/"/g, '\\"')}"` : null,
    `date: "${date}"`,
    `author: "${author}"`,
    `category: "${category}"`,
    tags ? `tags: ${JSON.stringify(tags)}` : null,
    `published: ${published}`,
    seoTitle ? `seoTitle: "${seoTitle.replace(/"/g, '\\"')}"` : null,
    seoDescription ? `seoDescription: "${seoDescription.replace(/"/g, '\\"')}"` : null,
    '---',
  ]
    .filter(Boolean)
    .join('\n');

  const fileContent = `${frontmatter}\n\n${content}\n`;

  try {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    fs.writeFileSync(filePath, fileContent, 'utf-8');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Failed to write file: ${message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    url: `/blog/${slug}`,
    file: `${slug}.mdx`,
    overwritten: exists,
  });
}
