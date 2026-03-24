import React from 'react';
import Link from 'next/link';
import {
  Bot,
  Code2,
  Rocket,
  Shield,
  Users,
  BarChart3,
  Smartphone,
  Building2,
  GitBranch,
  MessageSquare,
  Eye,
  Brain,
  Zap,
  Database,
  Globe,
  Lock,
  Key,
  Layers,
  Terminal,
  Activity,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlassCard } from '@/components/GlassCard';
import { AnimatedTerminal } from '@/components/AnimatedTerminal';
import { AnimatedKanban } from '@/components/AnimatedKanban';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-indigo-500/15 top-[-15%] left-[-5%]" />
        <div className="orb w-[500px] h-[500px] bg-purple-500/10 top-[25%] right-[-8%]" />
        <div className="orb w-[400px] h-[400px] bg-cyan-500/8 bottom-[-5%] left-[25%]" />
      </div>

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-code mb-8 animate-fade-in-up">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Development Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            Build Software with{' '}
            <span className="gradient-text">
              Autonomous AI Agents
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
            Create, customize, and orchestrate autonomous AI agents that work in coordination —
            from planning to deployment. Build your own agents, share them on the marketplace,
            and watch entire development cycles run themselves.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <Link
              href="/waitlist"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-full transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-gray-200 font-medium rounded-full border border-white/10 transition-all"
            >
              View Pricing
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 md:gap-8 mt-14 text-xs text-gray-500 font-code animate-fade-in-up animate-delay-400">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" /> SOC 2 Ready
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> AES-256 Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" /> WCAG 2.1 AA
            </span>
          </div>
        </div>

        {/* Hero Showcases: Terminal + Kanban */}
        <div className="max-w-6xl mx-auto mt-20 grid lg:grid-cols-2 gap-6 animate-fade-in-up animate-delay-400">
          <AnimatedTerminal />
          <AnimatedKanban />
        </div>
      </section>

      {/* ── Core Features ── */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Everything You Need to Ship"
            subtitle="A complete AI-native development platform — from first commit to production deployment."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <GlassCard
              icon={<Bot className="h-5 w-5" />}
              title="Super Orchestrator"
              description="Coordinate unlimited AI agents through autonomous development cycles. Agents plan, code, test, and deploy — handing off work to each other without manual intervention."
            />
            <GlassCard
              icon={<Eye className="h-5 w-5" />}
              title="Live Code Streaming"
              description="Watch AI agents write code in real-time with syntax highlighting and sub-second latency streaming via Claude Code CLI sessions."
            />
            <GlassCard
              icon={<MessageSquare className="h-5 w-5" />}
              title="Agent Chat"
              description="Chat with your AI agents using natural language. Ask for status updates, give instructions, use @mentions, and browse conversation history."
            />
            <GlassCard
              icon={<Brain className="h-5 w-5" />}
              title="Three-Tier Memory"
              description="Agents maintain context across weeks using Graphiti knowledge graphs, embedded memories, and automatic state recovery."
            />
            <GlassCard
              icon={<Layers className="h-5 w-5" />}
              title="Custom Agents & Marketplace"
              description="Create specialized AI agents with tailored prompts and tools. Test in sandbox environments and share through the community marketplace."
            />
            <GlassCard
              icon={<Zap className="h-5 w-5" />}
              title="Multi-Model Routing"
              description="Automatically select the cheapest capable AI model per task across Anthropic, Google, DeepSeek, and OpenAI with real-time cost tracking."
            />
          </div>
        </div>
      </section>

      {/* ── AI Agents ── */}
      <section id="agents" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Autonomous Agent Orchestration"
            subtitle="Build custom AI agents or use built-in ones — they coordinate with each other autonomously through every phase of development."
          />

          {/* Built-in agents */}
          <p className="text-xs font-code text-gray-500 uppercase tracking-widest text-center mb-6">Built-in Agents</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <AgentCard name="Planner" role="Architecture & Planning" description="Designs system architecture, creates PRDs, breaks epics into stories, and plans sprint execution." color="indigo" icon={<Brain className="h-6 w-6" />} />
            <AgentCard name="Developer" role="Code Implementation" description="Writes production-ready code following TDD, manages branches, creates PRs, and handles git workflows." color="emerald" icon={<Code2 className="h-6 w-6" />} />
            <AgentCard name="QA" role="Testing & Quality" description="Runs automated tests, performs code review, ensures 80%+ coverage, and validates acceptance criteria." color="amber" icon={<Shield className="h-6 w-6" />} />
            <AgentCard name="DevOps" role="Deploy & Infrastructure" description="Provisions databases, deploys to Railway, manages domains, handles env vars, and monitors health." color="rose" icon={<Rocket className="h-6 w-6" />} />
          </div>

          {/* Custom agent platform */}
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Build Your Own Agents</h3>
            </div>
            <p className="text-sm text-gray-400 max-w-xl mx-auto mb-6">
              Create specialized agents with custom prompts, tools, and behaviors. Test them in isolated sandbox environments,
              then publish to the marketplace for others to use. Agents coordinate autonomously —
              assign tasks, hand off work, review each other&apos;s output, and escalate when needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-code text-gray-500">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">Custom Prompts & Tools</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">Sandbox Testing</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">Agent Marketplace</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">Multi-Agent Coordination</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">Knowledge Graphs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Development Tools ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Full-Stack Development Tools"
            subtitle="From rapid project scaffolding to real-time collaboration — every tool to go from idea to production."
          />
          <div className="grid md:grid-cols-2 gap-4">
            <GlassCard icon={<Terminal className="h-5 w-5" />} title="60-Second Project Setup" description="Create your first project in under a minute with guided onboarding, template selection from the marketplace, and automatic resource provisioning." large />
            <GlassCard icon={<GitBranch className="h-5 w-5" />} title="GitHub Integration" description="OAuth-connected GitHub with automatic repo creation, branch management, PR workflows, commit handling, and full git automation." large />
            <GlassCard icon={<Code2 className="h-5 w-5" />} title="Real-Time Kanban Board" description="Drag-and-drop Kanban with Backlog, In Progress, Review, and Done columns. Real-time WebSocket updates under 500ms." large />
            <GlassCard icon={<Users className="h-5 w-5" />} title="Team Integrations" description="Slack, Discord, Linear, and Jira integrations with bi-directional sync, interactive components, and custom webhooks." large />
          </div>
        </div>
      </section>

      {/* ── Deployment ── */}
      <section id="deploy" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Deploy Anywhere, Instantly"
            subtitle="First-class Railway integration with database provisioning, real-time logs, and automatic rollback."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <GlassCard icon={<Rocket className="h-5 w-5" />} title="Railway Deployment" description="CLI-based service deployment with build logs, status tracking, and deployment history." />
            <GlassCard icon={<Database className="h-5 w-5" />} title="Instant Databases" description="Auto-provision Postgres, Redis, and more via Railway with managed connection strings." />
            <GlassCard icon={<Globe className="h-5 w-5" />} title="Domain Management" description="Custom domain configuration with SSL, DNS verification, and automatic HTTPS setup." />
            <GlassCard icon={<Activity className="h-5 w-5" />} title="Live Deployment Logs" description="Stream build progress, deployment status, and application logs in real-time via WebSocket." />
            <GlassCard icon={<Layers className="h-5 w-5" />} title="Environment Manager" description="Centralized env variable management across stages with auto-redeploy on changes." />
            <GlassCard icon={<GitBranch className="h-5 w-5" />} title="Rollback & History" description="Full deployment history with one-click rollback to any previous stable version." />
          </div>
        </div>
      </section>

      {/* ── Security ── */}
      <section id="security" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Enterprise-Grade Security"
            subtitle="Built for teams that take security seriously — from BYOK encryption to granular RBAC and SSO."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard icon={<Key className="h-5 w-5" />} title="BYOK Encryption" description="Bring your own API keys with AES-256 encryption, spending limits, and per-model cost tracking." compact />
            <GlassCard icon={<Shield className="h-5 w-5" />} title="SSO & SAML 2.0" description="Enterprise SSO via Okta, Azure AD, OneLogin with domain verification and JIT provisioning." compact />
            <GlassCard icon={<Lock className="h-5 w-5" />} title="Custom Roles & RBAC" description="Granular per-resource permissions, IP allowlisting, and geo-restriction policies." compact />
            <GlassCard icon={<Users className="h-5 w-5" />} title="Workspace Isolation" description="Complete multi-tenant isolation with Owner, Admin, Developer, and Viewer roles." compact />
          </div>
        </div>
      </section>

      {/* ── Observability ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Full Observability Stack"
            subtitle="Prometheus metrics, Grafana dashboards, Loki logs, and Jaeger tracing out of the box."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard icon={<BarChart3 className="h-5 w-5" />} title="Prometheus Metrics" description="API latency, agent throughput, error rates, and custom business metrics." compact />
            <GlassCard icon={<Activity className="h-5 w-5" />} title="Grafana Dashboards" description="Pre-built dashboards for API health, WebSocket, agent tasks, and infra status." compact />
            <GlassCard icon={<Terminal className="h-5 w-5" />} title="Loki Log Aggregation" description="Structured logs from all services, searchable and correlated with traces." compact />
            <GlassCard icon={<Zap className="h-5 w-5" />} title="Jaeger Tracing" description="Distributed request tracing across API, WebSocket, and Orchestrator services." compact />
          </div>
        </div>
      </section>

      {/* ── Mobile & More ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Works Everywhere</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Fully responsive mobile dashboard, push notifications, offline support,
                and WCAG 2.1 Level AA accessibility compliance.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <Smartphone className="h-4 w-4" />, text: 'Touch-optimized mobile UI from 375px+' },
                  { icon: <Zap className="h-4 w-4" />, text: 'Push notifications for deployments & alerts' },
                  { icon: <Globe className="h-4 w-4" />, text: 'PWA with offline support & deep linking' },
                  { icon: <Eye className="h-4 w-4" />, text: 'Screen reader support & keyboard navigation' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard icon={<Building2 className="h-5 w-5" />} title="White-Label" description="Custom logo, colors, domain, fonts, and email branding for agencies." compact />
              <GlassCard icon={<Layers className="h-5 w-5" />} title="Template Marketplace" description="Pre-built templates for SaaS, E-commerce, Mobile Apps, and APIs." compact />
              <GlassCard icon={<BarChart3 className="h-5 w-5" />} title="Sprint Analytics" description="Burndown charts, velocity metrics, and exportable CSV/PDF reports." compact />
              <GlassCard icon={<Rocket className="h-5 w-5" />} title="CI/CD Automation" description="GitHub Actions for lint, test, build with automated staging deploys." compact />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl glass-strong p-12 md:p-16 glow-indigo">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build with AI?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Be the first to experience autonomous AI development.
              Build your own agents, orchestrate entire workflows, and ship faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/waitlist"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-full transition-all shadow-lg shadow-indigo-500/25"
              >
                Join the Waitlist
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-gray-200 font-medium rounded-full border border-white/10 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400 max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}

function AgentCard({
  icon,
  name,
  role,
  description,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  role: string;
  description: string;
  color: string;
}) {
  const cardColors: Record<string, string> = {
    indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/15 hover:border-indigo-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/15 hover:border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/15 hover:border-amber-500/30',
    rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/15 hover:border-rose-500/30',
  };

  const iconColors: Record<string, string> = {
    indigo: 'bg-indigo-500/15 text-indigo-400',
    emerald: 'bg-emerald-500/15 text-emerald-400',
    amber: 'bg-amber-500/15 text-amber-400',
    rose: 'bg-rose-500/15 text-rose-400',
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-b backdrop-blur-sm p-6 transition-all duration-300 hover:scale-[1.02] ${cardColors[color]}`}>
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${iconColors[color]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
      <p className="text-xs text-gray-500 font-code mb-3">{role}</p>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
