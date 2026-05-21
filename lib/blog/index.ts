/**
 * Blog reader facade. Switches between Postgres and filesystem backends
 * based on BLOG_SOURCE env var. Default is 'filesystem' so the deploy
 * ships safely; flip to 'postgres' in Railway env once the schema +
 * seed migration are done.
 *
 * Build-time safety: when BLOG_SOURCE=postgres, the DB lives on Railway's
 * private network (waitlist-db.railway.internal) which is unreachable
 * during the build phase. Every function below catches connection errors
 * and returns a safe empty/null fallback so Next.js can prerender — the
 * real data populates on the first runtime request via ISR revalidation.
 *
 * Migration: 2026-05-21 — moving every product blog from Railway Volume
 * to Postgres after the JustAnalytics volume incident vaporised 6 posts.
 */

import type { BlogPost, BlogPostMeta } from './types';
import {
  getAllPostsFromFs,
  getPostBySlugFromFs,
  getAllSlugsFromFs,
  getAllCategoriesFromFs,
} from './fs';
import {
  getAllPostsFromDb,
  getPostBySlugFromDb,
  getAllSlugsFromDb,
  getAllCategoriesFromDb,
} from './db';

export type { BlogPost, BlogPostMeta };

function usePostgres(): boolean {
  return process.env.BLOG_SOURCE === 'postgres';
}

function isDbUnreachable(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const code = (err as NodeJS.ErrnoException).code;
  return (
    code === 'ENOTFOUND' ||
    code === 'ECONNREFUSED' ||
    code === 'ETIMEDOUT' ||
    /getaddrinfo|ENOTFOUND|ECONNREFUSED/.test(err.message)
  );
}

async function safe<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (isDbUnreachable(err)) {
      console.warn(`[blog/${label}] DB unreachable, returning fallback:`, err instanceof Error ? err.message : err);
      return fallback;
    }
    throw err;
  }
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  if (!usePostgres()) return getAllPostsFromFs();
  return safe(getAllPostsFromDb, [], 'getAllPosts');
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!usePostgres()) return getPostBySlugFromFs(slug);
  return safe(() => getPostBySlugFromDb(slug), null, 'getPostBySlug');
}

export async function getAllSlugs(): Promise<string[]> {
  if (!usePostgres()) return getAllSlugsFromFs();
  return safe(getAllSlugsFromDb, [], 'getAllSlugs');
}

export async function getAllCategories(): Promise<string[]> {
  if (!usePostgres()) return getAllCategoriesFromFs();
  return safe(getAllCategoriesFromDb, [], 'getAllCategories');
}

export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
