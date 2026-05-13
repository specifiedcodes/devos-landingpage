import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Use ISR (revalidate every 60s) instead of force-dynamic so the HTML
// response gets cacheable headers — necessary for Facebook's scraper to
// reliably embed the og:image. New posts published via /api/blog/publish
// will appear within the revalidation window.
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Strip any brand suffix from publisher-provided titles. The layout-level
// title.template already appends " | DevOS"; if the title coming in also
// ends with the brand we'd render "X | DevOS | DevOS".
function stripBrandSuffix(input: string): string {
  return input.replace(/\s*[|–—\-]\s*DevOS\s*$/i, '').trim();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const { meta } = post;
  const title = stripBrandSuffix(meta.seoTitle || meta.title);
  const description = meta.seoDescription || meta.excerpt;
  const url = `https://devos.team/blog/${slug}`;

  // Note: openGraph.images and twitter.images are intentionally omitted here.
  // Next.js auto-detects the colocated opengraph-image.tsx and emits a
  // per-post 1200x630 og:image + twitter:image automatically.

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'DevOS',
      publishedTime: meta.date,
      // article:author intentionally omitted — Next.js emits it as a plain
      // string from authors[], but FB's scraper expects a profile URL and
      // rejects strings ("could not be parsed as type 'profile'"). The
      // author is still rendered in the page body and baked into the OG
      // image, so dropping the meta tag has no UX impact.
      section: meta.category,
      tags: meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const categoryColors: Record<string, string> = {
  Engineering: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  Product: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  Guides: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'AI Agents': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  DevOps: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Changelog: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devos.team' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://devos.team/blog' },
      { '@type': 'ListItem', position: 3, name: meta.title, item: `https://devos.team/blog/${slug}` },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    author: { '@type': 'Person', name: meta.author },
    publisher: {
      '@type': 'Organization',
      name: 'DevOS',
      url: 'https://devos.team',
      logo: { '@type': 'ImageObject', url: 'https://devos.team/icon.svg' },
    },
    mainEntityOfPage: `https://devos.team/blog/${slug}`,
    image: meta.coverImage || 'https://devos.team/og-image.png',
    keywords: meta.tags.join(', '),
  };

  // Related posts: same category, exclude current
  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === meta.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-indigo-500/10 top-[-10%] left-[-5%]" />
        <div className="orb w-[300px] h-[300px] bg-purple-500/8 bottom-[20%] right-[-5%]" />
      </div>

      <Navbar />

      <article className="relative pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>

          {/* Header */}
          <header className="mb-12">
            <span
              className={`inline-block text-xs font-code px-2.5 py-1 rounded-full border mb-4 ${categoryColors[meta.category] || 'text-gray-400 bg-white/5 border-white/10'}`}
            >
              {meta.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {meta.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {meta.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(meta.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {meta.readingTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-indigo-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-blockquote:border-indigo-500/50 prose-blockquote:text-gray-400 prose-li:text-gray-300 prose-hr:border-white/10 prose-img:rounded-xl prose-th:text-white prose-td:text-gray-300">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                },
              }}
            />
          </div>

          {/* Tags */}
          {meta.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1"
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-6">Related Posts</h2>
              <div className="grid gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group rounded-xl glass p-5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
                  >
                    <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-500">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
