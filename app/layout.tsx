import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devos.team"),
  title: {
    default: "DevOS - AI-Powered Development Platform | Autonomous AI Agents",
    template: "%s | DevOS",
  },
  description:
    "Build software with autonomous AI agents. Four specialized agents — Planner, Developer, QA, and DevOps — work through complete development cycles. From architecture to production deployment.",
  keywords: [
    "AI development platform",
    "autonomous AI agents",
    "AI code generation",
    "AI software development",
    "automated deployment",
    "Railway deployment",
    "GitHub integration",
    "AI project management",
    "Kanban board",
    "code review automation",
    "AI QA testing",
    "DevOps automation",
    "BYOK encryption",
    "enterprise SSO",
    "white-label development platform",
    "CI/CD automation",
    "Slack integration",
    "Discord integration",
    "Linear integration",
    "Jira integration",
    "real-time code streaming",
    "agent orchestration",
    "multi-model AI routing",
    "Prometheus monitoring",
    "Grafana dashboards",
  ],
  authors: [{ name: "Velocity Digital Labs LLC", url: "https://velocitydigitallabs.com" }],
  creator: "Velocity Digital Labs LLC",
  publisher: "Velocity Digital Labs LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devos.team",
    siteName: "DevOS",
    title: "DevOS - Build Software with Autonomous AI Agents",
    description:
      "Four specialized AI agents autonomously plan, code, test, and deploy your software. From idea to production in minutes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevOS - AI-Powered Development Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOS - Build Software with Autonomous AI Agents",
    description:
      "Four specialized AI agents autonomously plan, code, test, and deploy your software.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://devos.team",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
