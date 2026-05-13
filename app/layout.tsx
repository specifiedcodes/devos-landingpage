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
    default: "DevOS - Build, Test & Deploy with Autonomous AI Agents",
    template: "%s | DevOS",
  },
  description:
    "Build software with autonomous AI agents. Four specialized agents — Planner, Developer, QA, and DevOps — work through complete development cycles. From architecture to production deployment.",
  authors: [{ name: "Velocity Digital Labs LLC", url: "https://velocitydigitallabs.com" }],
  creator: "Velocity Digital Labs LLC",
  publisher: "Velocity Digital Labs LLC",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    site: "@devos_team",
    creator: "@devos_team",
  },
  openGraph: {
    siteName: "DevOS",
    locale: "en_US",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
