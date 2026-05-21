/**
 * Postgres-backed blog reader. Same API shape as the filesystem reader
 * so call sites don't need to know which backend is in use.
 */

import readingTime from 'reading-time';
import { getBlogPool } from './pool';
import type { BlogPost, BlogPostMeta } from './types';

interface BlogRow {
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
  published: boolean;
  published_at: Date;
}

function rowToMeta(row: BlogRow): BlogPostMeta {
  const stats = readingTime(row.content_mdx);
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    date: row.published_at.toISOString().split('T')[0],
    author: row.author ?? '',
    category: row.category ?? '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    coverImage: row.cover_image ?? undefined,
    published: row.published,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    readingTime: stats.text,
  };
}

const FIELDS = `
  slug, title, excerpt, content_mdx, category, author, cover_image,
  seo_title, seo_description, tags, published, published_at
`;

export async function getAllPostsFromDb(): Promise<BlogPostMeta[]> {
  const pool = getBlogPool();
  const { rows } = await pool.query<BlogRow>(
    `SELECT ${FIELDS} FROM blog_posts WHERE published = true ORDER BY published_at DESC`,
  );
  return rows.map(rowToMeta);
}

export async function getPostBySlugFromDb(slug: string): Promise<BlogPost | null> {
  const pool = getBlogPool();
  const { rows } = await pool.query<BlogRow>(
    `SELECT ${FIELDS} FROM blog_posts WHERE slug = $1 LIMIT 1`,
    [slug],
  );
  if (rows.length === 0) return null;
  const row = rows[0];
  if (!row.published) return null;
  return { meta: rowToMeta(row), content: row.content_mdx };
}

export async function getAllSlugsFromDb(): Promise<string[]> {
  const pool = getBlogPool();
  const { rows } = await pool.query<{ slug: string }>(
    `SELECT slug FROM blog_posts WHERE published = true`,
  );
  return rows.map((r) => r.slug);
}

export async function getAllCategoriesFromDb(): Promise<string[]> {
  const pool = getBlogPool();
  const { rows } = await pool.query<{ category: string }>(
    `SELECT DISTINCT category FROM blog_posts WHERE published = true AND category IS NOT NULL ORDER BY category`,
  );
  return rows.map((r) => r.category);
}
