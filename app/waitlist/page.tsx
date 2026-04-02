import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WaitlistForm } from './WaitlistForm';

export const metadata: Metadata = {
  title: 'Join the Waitlist',
  description:
    'Be the first to experience DevOS — AI-powered development with autonomous agents. Sign up for early access.',
  keywords: ['DevOS early access', 'AI dev platform beta', 'join waitlist', 'developer waitlist'],
  alternates: { canonical: 'https://devos.team/waitlist' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Join the DevOS Waitlist - Early Access to AI Development',
    description:
      'Be the first to build software with autonomous AI agents. Sign up for early access to DevOS.',
    url: 'https://devos.team/waitlist',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Join the DevOS Waitlist', type: 'image/png' }],
  },
  twitter: {
    title: 'Join the DevOS Waitlist - Early Access to AI Development',
    description: 'Be the first to build software with autonomous AI agents.',
    images: ['/og-image.png'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devos.team' },
    { '@type': 'ListItem', position: 2, name: 'Waitlist', item: 'https://devos.team/waitlist' },
  ],
};

export default function WaitlistPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-indigo-500/15 top-[10%] left-[-5%]" />
        <div className="orb w-[400px] h-[400px] bg-purple-500/10 bottom-[10%] right-[-5%]" />
      </div>

      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-code mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Coming Soon
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join the Waitlist
          </h1>
          <h2 className="text-gray-400 text-lg mb-10 font-normal">
            Be among the first to build software with autonomous AI agents.
            We&#39;ll notify you when early access opens.
          </h2>

          <WaitlistForm />

          <p className="text-xs text-gray-600 mt-6">
            No spam. We&#39;ll only email you about DevOS launch updates.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
