import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/register', '/api/', '/cdn-cgi/', '/_next/'],
    },
    sitemap: 'https://devos.team/sitemap.xml',
  };
}
