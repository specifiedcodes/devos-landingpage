/**
 * Filesystem-backed blog reader. Pre-Postgres-migration default.
 * Reads MDX from content/blog (Railway volume in prod) with seed-copy
 * from content/blog-seed on first access.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogPostMeta } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const SEED_DIR = path.join(process.cwd(), 'content/blog-seed');

let seeded = false;

function seedFromBundleIfNeeded(): void {
  if (seeded) return;
  seeded = true;
  try {
    if (!fs.existsSync(SEED_DIR)) return;
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    for (const filename of fs.readdirSync(SEED_DIR)) {
      if (!filename.endsWith('.mdx')) continue;
      const target = path.join(BLOG_DIR, filename);
      if (fs.existsSync(target)) continue;
      fs.copyFileSync(path.join(SEED_DIR, filename), target);
    }
  } catch (err) {
    console.warn('[blog] Seed copy failed:', err);
  }
}

function parseFile(slug: string, filePath: string): BlogPostMeta {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    author: data.author,
    category: data.category,
    tags: data.tags || [],
    coverImage: data.coverImage,
    published: data.published !== false,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    readingTime: stats.text,
  };
}

export async function getAllPostsFromFs(): Promise<BlogPostMeta[]> {
  seedFromBundleIfNeeded();
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  return files
    .map((filename) => parseFile(filename.replace(/\.mdx$/, ''), path.join(BLOG_DIR, filename)))
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlugFromFs(slug: string): Promise<BlogPost | null> {
  seedFromBundleIfNeeded();
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const meta: BlogPostMeta = {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    author: data.author,
    category: data.category,
    tags: data.tags || [],
    coverImage: data.coverImage,
    published: data.published !== false,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    readingTime: stats.text,
  };

  return { meta, content };
}

export async function getAllSlugsFromFs(): Promise<string[]> {
  seedFromBundleIfNeeded();
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export async function getAllCategoriesFromFs(): Promise<string[]> {
  const posts = await getAllPostsFromFs();
  return [...new Set(posts.map((p) => p.category))];
}
