import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devos.team';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    // Homepage lastmod must be dynamic — Google reads stale dates as
    // "page hasn't changed" and downgrades crawl priority.
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date('2026-03-31'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/waitlist`, lastModified: new Date('2026-03-31'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-03-31'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts];
}
