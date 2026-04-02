import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'AI Agents', href: '/#agents' },
      { label: 'Deployments', href: '/#deploy' },
      { label: 'Security', href: '/#security' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Agent Orchestration', href: '/#agents' },
      { label: 'Live Code Streaming', href: '/#features' },
      { label: 'Railway Deployment', href: '/#deploy' },
      { label: 'Template Marketplace', href: '/#features' },
      { label: 'Kanban Board', href: '/#features' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { label: 'GitHub', href: '/#features' },
      { label: 'Slack', href: '/#features' },
      { label: 'Discord', href: '/#features' },
      { label: 'Linear & Jira', href: '/#features' },
      { label: 'Webhooks', href: '/#features' },
    ],
  },
  {
    title: 'Enterprise',
    links: [
      { label: 'SSO & SAML', href: '/#security' },
      { label: 'RBAC & Permissions', href: '/#security' },
      { label: 'BYOK Encryption', href: '/#security' },
      { label: 'White-Label', href: '/pricing' },
      { label: 'Self-Hosted', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Sales', href: '/contact' },
      { label: 'Support', href: 'mailto:support@devos.team' },
      { label: 'Join Waitlist', href: '/waitlist' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-indigo-400" />
              </div>
              <span className="text-lg font-bold font-code">
                <span className="text-indigo-400">Dev</span>
                <span className="text-white">OS</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              AI-powered development platform with autonomous agents that build your software.
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <a href="mailto:admin@devos.team" className="hover:text-gray-400 transition-colors">
                  admin@devos.team
                </a>
              </p>
              <p>
                <a href="mailto:support@devos.team" className="hover:text-gray-400 transition-colors">
                  support@devos.team
                </a>
              </p>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('mailto:') ? (
                      <a
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Honorable Mentions */}
        <div className="border-t border-white/5 pt-6 pb-6">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            DevOS is inspired by{' '}
            <a
              href="https://github.com/AndyMik90/Auto-Claude"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors underline underline-offset-2"
            >
              Auto Claude
            </a>
            {' '}and the{' '}
            <a
              href="https://github.com/bmadcode/BMAD-METHOD"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors underline underline-offset-2"
            >
              BMAD Method
            </a>
            {' '}&mdash; pioneering autonomous AI development workflows.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} DevOS. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Powered by{' '}
            <a
              href="https://velocitydigitallabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors underline underline-offset-2"
            >
              Velocity Digital Labs LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
