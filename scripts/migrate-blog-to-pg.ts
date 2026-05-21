/**
 * One-off migration: reads MDX from filesystem (bundled + volume) and
 * UPSERTs each post into blog_posts. Idempotent.
 *
 * Usage:
 *   DATABASE_URL=postgres://... npx tsx scripts/migrate-blog-to-pg.ts
 *
 * Or via Railway:
 *   railway run -s devos-landingpage -- npx tsx scripts/migrate-blog-to-pg.ts
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Pool } from 'pg';

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

interface ParsedPost {
  slug: string;
  title: string;
  excerpt: string | null;
  content_mdx: string;
  category: string | null;
  author: string | null;
  cover_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[];
  frontmatter_extra: Record<string, unknown>;
  published: boolean;
  published_at: Date;
  updated_at: Date;
}

function parseMdxFile(filePath: string): ParsedPost | null {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const stat = fs.statSync(filePath);
  const { data, content } = matter(raw);

  const slug = path.basename(filePath).replace(/\.mdx$/, '');
  if (!data.title) {
    console.warn(`[skip] ${filePath}: missing title in frontmatter`);
    return null;
  }

  const extra: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (!CANONICAL_FRONTMATTER_KEYS.has(k)) extra[k] = v;
  }

  return {
    slug,
    title: String(data.title),
    excerpt: data.excerpt ? String(data.excerpt) : null,
    content_mdx: content,
    category: data.category ? String(data.category) : null,
    author: data.author ? String(data.author) : null,
    cover_image: data.coverImage ? String(data.coverImage) : null,
    seo_title: data.seoTitle ? String(data.seoTitle) : null,
    seo_description: data.seoDescription ? String(data.seoDescription) : null,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    frontmatter_extra: extra,
    published: data.published !== false,
    published_at: data.date ? new Date(String(data.date)) : stat.mtime,
    updated_at: stat.mtime,
  };
}

function collectMdxFiles(): string[] {
  const dirs = [
    path.join(process.cwd(), 'content/blog'), // volume mount in prod
    path.join(process.cwd(), 'content/blog-seed'), // bundled
  ];
  const files: string[] = [];
  const seen = new Set<string>();

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith('.mdx')) continue;
      if (seen.has(name)) continue; // first wins (volume > seed)
      seen.add(name);
      files.push(path.join(dir, name));
    }
  }
  return files;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required.');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  });

  try {
    // 1. Apply schema (idempotent)
    const schemaSql = fs.readFileSync(
      path.join(process.cwd(), 'scripts', 'blog-schema.sql'),
      'utf-8',
    );
    await pool.query(schemaSql);
    console.log('Schema applied (blog_posts + indexes).');

    // 2. Seed MDX content
    const files = collectMdxFiles();
    console.log(`Found ${files.length} MDX files to migrate.`);

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const filePath of files) {
      const post = parseMdxFile(filePath);
      if (!post) {
        skipped++;
        continue;
      }

      const result = await pool.query(
        `INSERT INTO blog_posts (
           slug, title, excerpt, content_mdx, category, author, cover_image,
           seo_title, seo_description, tags, frontmatter_extra,
           published, published_at, updated_at
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11::jsonb,$12,$13,$14)
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
           published_at=EXCLUDED.published_at,
           updated_at=EXCLUDED.updated_at
         RETURNING (xmax = 0) AS inserted`,
        [
          post.slug,
          post.title,
          post.excerpt,
          post.content_mdx,
          post.category,
          post.author,
          post.cover_image,
          post.seo_title,
          post.seo_description,
          JSON.stringify(post.tags),
          JSON.stringify(post.frontmatter_extra),
          post.published,
          post.published_at,
          post.updated_at,
        ],
      );

      if (result.rows[0]?.inserted) {
        inserted++;
        console.log(`+ ${post.slug}`);
      } else {
        updated++;
        console.log(`~ ${post.slug}`);
      }
    }

    console.log(
      `\nMigration complete. inserted=${inserted} updated=${updated} skipped=${skipped}`,
    );

    const { rows } = await pool.query(
      "SELECT slug, title, published_at FROM blog_posts ORDER BY published_at DESC LIMIT 20",
    );
    console.log('\nMost-recent rows (sanity check):');
    for (const r of rows) {
      console.log(`  ${r.published_at.toISOString().split('T')[0]}  ${r.slug}`);
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
