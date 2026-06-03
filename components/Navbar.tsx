'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#agents', label: 'AI Agents' },
  { href: '/#deploy', label: 'Deploy' },
  { href: '/#security', label: 'Security' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <nav
        className={`flex items-center justify-between px-5 md:px-6 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-white/10 shadow-lg shadow-black/30'
            : 'bg-white/[0.03] backdrop-blur-md border-white/[0.06]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </div>
          <span className="text-lg font-bold font-code">
            <span className="text-indigo-400">Dev</span>
            <span className="text-white">OS</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/waitlist"
            className="text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2 rounded-full transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl p-5 shadow-2xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-400 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-3 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-400 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5"
              >
                Sign In
              </Link>
              <Link
                href="/waitlist"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2.5 rounded-full transition-all text-center"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
