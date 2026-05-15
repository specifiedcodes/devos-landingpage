import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getAllPosts, getAllCategories } from '@/lib/blog';

// ISR over force-dynamic — gives cacheable headers for crawlers/scrapers.
// New posts appear within the revalidation window.
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Engineering insights, AI agent tutorials, and DevOps best practices from the DevOS team.',
  alternates: { canonical: 'https://devos.team/blog' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'DevOS Blog — AI Development Insights & Tutorials',
    description:
      'Engineering insights, AI agent tutorials, and DevOps best practices from the DevOS team.',
    url: 'https://devos.team/blog',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DevOS Blog', type: 'image/png' }],
  },
  twitter: {
    title: 'DevOS Blog — AI Development Insights & Tutorials',
    description: 'Engineering insights, AI agent tutorials, and DevOps best practices.',
    images: ['/og-image.png'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devos.team' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://devos.team/blog' },
  ],
};

const categoryColors: Record<string, string> = {
  Engineering: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  Product: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  Guides: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'AI Agents': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  DevOps: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Changelog: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-indigo-500/15 top-[-10%] right-[-5%]" />
        <div className="orb w-[400px] h-[400px] bg-purple-500/10 bottom-[10%] left-[-5%]" />
      </div>

      <Navbar />

      <section className="relative pt-40 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Engineering insights, AI agent tutorials, and DevOps best practices from the DevOS team.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="relative px-6 pb-8">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`text-xs font-code px-3 py-1.5 rounded-full border ${categoryColors[cat] || 'text-gray-400 bg-white/5 border-white/10'}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="relative pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {posts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl glass hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail — dynamic OG image generated per post */}
                  <div className="relative w-full overflow-hidden border-b border-white/[0.06]" style={{ aspectRatio: '1200 / 630' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/blog/${post.slug}/opengraph-image`}
                      alt={post.title}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex flex-col gap-3 p-6 md:p-8">
                    <div className="flex items-center gap-3 text-xs">
                      <span
                        className={`font-code px-2.5 py-1 rounded-full border ${categoryColors[post.category] || 'text-gray-400 bg-white/5 border-white/10'}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-gray-500 flex items-center gap-1"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-indigo-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
