import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for DevOS. Free tier for individuals, Pro for startups, Team for growing companies, and Enterprise for custom deployments.',
  keywords: ['AI development pricing', 'DevOS plans', 'AI agent subscription', 'developer tools pricing'],
  alternates: { canonical: 'https://devos.team/pricing' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'DevOS Pricing - Free, Pro, Team & Enterprise Plans',
    description:
      'Simple, transparent pricing for DevOS. Free tier for individuals, Pro for startups, Team for growing companies.',
    url: 'https://devos.team/pricing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DevOS Pricing Plans', type: 'image/png' }],
  },
  twitter: {
    title: 'DevOS Pricing - Free, Pro, Team & Enterprise Plans',
    description: 'Simple, transparent pricing for DevOS.',
    images: ['/og-image.png'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devos.team' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://devos.team/pricing' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is DevOS free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, DevOS offers a free tier with up to 2 AI agents, 1 active project, and 50 development tasks per month.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the Pro plan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Pro plan at $25/user/month includes unlimited AI agents, unlimited projects, Railway deployment, Slack & Discord integrations, and live code streaming.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does DevOS offer self-hosted deployment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the Enterprise plan includes self-hosted deployment, white-label branding, BYOK encryption, and custom SLA with 99.99% uptime.',
      },
    },
  ],
};

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For individual developers exploring AI-powered development.',
    cta: 'Join Waitlist',
    ctaHref: '/waitlist',
    highlight: false,
    features: [
      'Up to 2 AI agents',
      '1 active project',
      '50 development tasks/month',
      'Basic code review',
      'Community Kanban board',
      'GitHub integration',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$25',
    period: '/user/month',
    description: 'For freelancers and startups shipping faster with AI.',
    cta: 'Join Waitlist',
    ctaHref: '/waitlist',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited AI agents',
      'Unlimited projects',
      'Unlimited development tasks',
      'Advanced code review & QA',
      'Railway deployment',
      'Slack & Discord integrations',
      'Template marketplace access',
      'Live code streaming',
      'Sprint analytics & reports',
      'Email support',
    ],
  },
  {
    name: 'Team',
    price: '$49',
    period: '/user/month',
    description: 'For growing teams that need collaboration and security.',
    cta: 'Join Waitlist',
    ctaHref: '/waitlist',
    highlight: false,
    features: [
      'Everything in Pro',
      'SSO & SAML 2.0',
      'Custom roles & RBAC',
      'Audit logs & compliance',
      'IP allowlisting',
      'Linear & Jira sync',
      'Custom webhooks',
      'Priority support',
      'Dedicated success manager',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Self-hosted, white-label, and reselling solutions.',
    cta: 'Contact Sales',
    ctaHref: '/contact',
    highlight: false,
    features: [
      'Everything in Team',
      'Self-hosted deployment',
      'White-label branding',
      'Reseller licensing',
      'Custom SLA (99.99%)',
      'BYOK encryption',
      'Dedicated infrastructure',
      'SOC 2 & HIPAA compliance',
      'Custom AI model deployment',
      '24/7 phone & Slack support',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-indigo-500/15 top-[-10%] right-[-5%]" />
        <div className="orb w-[400px] h-[400px] bg-purple-500/10 bottom-[10%] left-[-5%]" />
      </div>

      <Navbar />

      <section className="relative pt-40 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-code mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Start free. Scale as you grow. Enterprise solutions for teams with custom needs.
          </p>
        </div>
      </section>

      <section className="relative pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                tier.highlight
                  ? 'glass-strong border-indigo-500/30 glow-indigo relative'
                  : 'glass'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-medium">
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1 font-code">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  {tier.period && <span className="text-sm text-gray-500">{tier.period}</span>}
                </div>
                <p className="text-sm text-gray-400">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all w-full ${
                  tier.highlight
                    ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10'
                }`}
              >
                {tier.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise callout */}
      <section className="relative pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl glass-strong p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Need Self-Hosted or White-Label?
            </h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              We offer fully self-hosted deployments, white-label branding, and reseller licensing
              for agencies and enterprises. Custom pricing based on your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-full transition-all shadow-lg shadow-indigo-500/25"
              >
                Contact Sales
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="mailto:admin@devos.team"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                or email admin@devos.team
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
