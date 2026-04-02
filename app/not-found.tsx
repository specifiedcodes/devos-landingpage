import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-6xl font-bold text-indigo-500 mb-4">404</p>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-full transition-all shadow-lg shadow-indigo-500/25"
          >
            Back to Home
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
