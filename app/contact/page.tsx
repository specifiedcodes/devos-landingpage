import type { Metadata } from 'next';
import { Mail, Building2, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Sales',
  description:
    'Get in touch with DevOS for enterprise solutions, self-hosted deployments, white-label branding, and reseller licensing.',
  keywords: ['DevOS enterprise', 'contact DevOS', 'enterprise AI development', 'self-hosted deployment'],
  alternates: { canonical: 'https://devos.team/contact' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Contact DevOS Sales - Enterprise & Self-Hosted Solutions',
    description:
      'Get in touch for enterprise solutions, self-hosted deployments, white-label branding, and reseller licensing.',
    url: 'https://devos.team/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact DevOS Sales', type: 'image/png' }],
  },
  twitter: {
    title: 'Contact DevOS Sales - Enterprise & Self-Hosted Solutions',
    description: 'Enterprise solutions, self-hosted deployments, and white-label branding.',
    images: ['/og-image.png'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devos.team' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://devos.team/contact' },
  ],
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact DevOS Sales',
  url: 'https://devos.team/contact',
  mainEntity: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'admin@devos.team',
    url: 'https://devos.team/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[400px] h-[400px] bg-indigo-500/10 top-[20%] right-[10%]" />
      </div>

      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Sales</h1>
            <p className="text-gray-400 text-lg">
              Enterprise, self-hosted, white-label, and reseller solutions — tailored to your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            <div className="rounded-2xl glass p-6">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="font-semibold text-white mb-2">General Inquiries</h2>
              <p className="text-sm text-gray-400 mb-3">For questions about DevOS, pricing, or features.</p>
              <a
                href="mailto:admin@devos.team"
                className="text-sm text-indigo-400 hover:text-indigo-300 font-code transition-colors"
              >
                admin@devos.team
              </a>
            </div>

            <div className="rounded-2xl glass p-6">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="font-semibold text-white mb-2">Enterprise & Support</h2>
              <p className="text-sm text-gray-400 mb-3">For self-hosted, white-label, and technical support.</p>
              <a
                href="mailto:support@devos.team"
                className="text-sm text-indigo-400 hover:text-indigo-300 font-code transition-colors"
              >
                support@devos.team
              </a>
            </div>
          </div>

          <div className="rounded-2xl glass-strong p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-3">Enterprise Solutions</h2>
            <ul className="text-sm text-gray-400 space-y-2 mb-6">
              <li>Self-hosted on your own infrastructure</li>
              <li>Full white-label branding (logo, colors, domain, emails)</li>
              <li>Reseller licensing for agencies and consultants</li>
              <li>Custom SLA, dedicated support, and onboarding</li>
              <li>SOC 2 / HIPAA compliance assistance</li>
            </ul>
            <a
              href="mailto:admin@devos.team?subject=Enterprise%20Inquiry%20-%20DevOS"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-full transition-all shadow-lg shadow-indigo-500/25"
            >
              Email Us
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
