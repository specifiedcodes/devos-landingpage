import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your DevOS account.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[400px] h-[400px] bg-indigo-500/10 top-[20%] right-[10%]" />
      </div>

      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-code mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Coming Soon
          </div>

          <h1 className="text-4xl font-bold mb-4">Sign In</h1>
          <p className="text-gray-400 mb-8">
            DevOS is currently in private development. Sign-in will be available when we launch.
          </p>

          <div className="rounded-2xl glass-strong p-8 mb-6">
            <p className="text-sm text-gray-400 mb-6">
              Want to be notified when we launch? Join our waitlist for early access.
            </p>
            <Link
              href="/waitlist"
              className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-full transition-all shadow-lg shadow-indigo-500/20"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <p className="text-xs text-gray-600">
            Already have early access?{' '}
            <a href="mailto:support@devos.team" className="text-gray-400 hover:text-white underline underline-offset-2">
              Contact support
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
