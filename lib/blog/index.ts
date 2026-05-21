/**
 * Blog reader facade. Switches between Postgres and filesystem backends
 * based on BLOG_SOURCE env var. Default is 'filesystem' so the deploy
 * ships safely; flip to 'postgres' in Railway env once the schema +
 * seed migration are done.
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

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  return usePostgres() ? getAllPostsFromDb() : getAllPostsFromFs();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return usePostgres() ? getPostBySlugFromDb(slug) : getPostBySlugFromFs(slug);
}

export async function getAllSlugs(): Promise<string[]> {
  return usePostgres() ? getAllSlugsFromDb() : getAllSlugsFromFs();
}

export async function getAllCategories(): Promise<string[]> {
  return usePostgres() ? getAllCategoriesFromDb() : getAllCategoriesFromFs();
}

export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
