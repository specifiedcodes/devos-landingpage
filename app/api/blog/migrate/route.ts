/**
 * One-shot blog content migration endpoint.
 *
 * Reads MDX from content/blog (volume) + content/blog-seed (bundled),
 * UPSERTs into Postgres blog_posts table. Idempotent — safe to retry.
 *
 * REMOVE THIS FILE after the cross-product migration soak window
 * (~1 week from 2026-05-21).
 *
 *   curl -X POST https://devos.team/api/blog/migrate \
 *     -H "Authorization: Bearer $BLOG_PUBLISH_SECRET"
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getBlogPool } from '@/lib/blog/pool';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CANONICAL = new Set([
  'title', 'excerpt', 'date', 'author', 'category', 'tags',
  'coverImage', 'published', 'seoTitle', 'seoDescription',
]);

function collectMdxFiles(): { slug: string; filePath: string }[] {
  const dirs = [
    path.join(process.cwd(), 'content/blog'),
    path.join(process.cwd(), 'content/blog-seed'),
  ];
  const seen = new Set<string>();
  const out: { slug: string; filePath: string }[] = [];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith('.mdx')) continue;
      if (seen.has(name)) continue; // volume wins over seed
      seen.add(name);
      out.push({ slug: name.replace(/\.mdx$/, ''), filePath: path.join(dir, name) });
    }
  }
  return out;
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.BLOG_PUBLISH_SECRET;
  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const pool = getBlogPool();
  const results = {
    schemaApplied: false,
    files: 0,
    inserted: 0,
    updated: 0,
    skipped: 0,
    errors: [] as string[],
    posts: [] as { slug: string; action: 'inserted' | 'updated' }[],
  };

  try {
    // 1. Apply schema (idempotent)
    const schemaSql = fs.readFileSync(
      path.join(process.cwd(), 'scripts/blog-schema.sql'),
      'utf-8',
    );
    await pool.query(schemaSql);
    results.schemaApplied = true;

    // 2. Seed rows
    const files = collectMdxFiles();
    results.files = files.length;

    for (const { slug, filePath } of files) {
      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const stat = fs.statSync(filePath);
        const { data, content } = matter(raw);

        if (!data.title) {
          results.skipped++;
          results.errors.push(`${slug}: missing title`);
          continue;
        }

        const extra: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(data)) {
          if (!CANONICAL.has(k)) extra[k] = v;
        }

        const publishedAt = data.date ? new Date(String(data.date)) : stat.mtime;

        const row = await pool.query<{ inserted: boolean }>(
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
            slug,
            data.title,
            data.excerpt ?? null,
            content,
            data.category ?? null,
            data.author ?? null,
            data.coverImage ?? null,
            data.seoTitle ?? null,
            data.seoDescription ?? null,
            JSON.stringify(Array.isArray(data.tags) ? data.tags : []),
            JSON.stringify(extra),
            data.published !== false,
            publishedAt,
            stat.mtime,
          ],
        );

        const inserted = row.rows[0]?.inserted ?? false;
        if (inserted) {
          results.inserted++;
        } else {
          results.updated++;
        }
        results.posts.push({ slug, action: inserted ? 'inserted' : 'updated' });
      } catch (err) {
        results.skipped++;
        results.errors.push(`${slug}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // 3. Sanity-check sample
    const { rows: sample } = await pool.query<{ slug: string; title: string; published_at: Date }>(
      `SELECT slug, title, published_at FROM blog_posts ORDER BY published_at DESC LIMIT 20`,
    );

    return NextResponse.json({
      success: true,
      results,
      sample: sample.map((r) => ({
        slug: r.slug,
        title: r.title,
        published_at: r.published_at.toISOString(),
      })),
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        partialResults: results,
      },
      { status: 500 },
    );
  }
}
