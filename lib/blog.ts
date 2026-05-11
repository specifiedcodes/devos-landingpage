import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const SEED_DIR = path.join(process.cwd(), 'content/blog-seed');

let seeded = false;

/**
 * Copy bundled MDX files from content/blog-seed/ into content/blog/ on first
 * access. Necessary because in production the BLOG_DIR is a Railway volume
 * mount that shadows any files baked into the image. Seeding is idempotent
 * (only copies files that don't already exist on the volume).
 */
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

export interface BlogPostMeta {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  published?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  readingTime: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

export function getAllPosts(): BlogPostMeta[] {
  seedFromBundleIfNeeded();
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const filePath = path.join(BLOG_DIR, filename);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
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
        slug,
        readingTime: stats.text,
      } as BlogPostMeta;
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  seedFromBundleIfNeeded();
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const meta: BlogPostMeta = {
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
    slug,
    readingTime: stats.text,
  };

  return { meta, content };
}

export function getAllSlugs(): string[] {
  seedFromBundleIfNeeded();
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  return [...new Set(posts.map((p) => p.category))];
}
