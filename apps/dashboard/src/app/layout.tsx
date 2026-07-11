import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WebVitals } from "../components/WebVitals";

export const metadata: Metadata = {
  title: {
    default: "SBC ASP — Plataforma de Design de Arquitetura",
    template: "%s | SBC ASP",
  },
  description:
    "Crie arquiteturas de software completas visualmente. Gere projetos Next.js, tRPC, Prisma e deploy automático na nuvem com IA.",
  keywords: [
    "arquitetura de software",
    "gerador de código",
    "Next.js",
    "tRPC",
    "Prisma",
    "Supabase",
    "Vercel",
    "low-code",
    "SaaS",
    "deploy automático",
  ],
  authors: [{ name: "SupportingBasesCreations" }],
  creator: "SupportingBasesCreations",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "SBC ASP — Plataforma de Design de Arquitetura",
    description:
      "Crie arquiteturas de software completas visualmente. Gere projetos Next.js, tRPC, Prisma e deploy automático na nuvem com IA.",
    siteName: "SBC ASP",
  },
  twitter: {
    card: "summary_large_image",
    title: "SBC ASP — Plataforma de Design de Arquitetura",
    description:
      "Crie arquiteturas de software completas visualmente. Gere projetos Next.js, tRPC, Prisma e deploy automático na nuvem com IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

const themeScript = `
(function() {
  try {
    var match = document.cookie.match(/(?:^|; )sbc-theme=([^;]*)/);
    var theme = match ? decodeURIComponent(match[1]) : null;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

const swScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').catch(function(e) {
      console.warn('SW registration failed:', e);
    });
  });
}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
      </head>
      <body className="min-h-screen">
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
