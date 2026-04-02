import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devos.team';

  return [
    { url: baseUrl, lastModified: new Date('2026-03-31'), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date('2026-03-31'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/waitlist`, lastModified: new Date('2026-03-31'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-03-31'), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
