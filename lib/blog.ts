import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

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
