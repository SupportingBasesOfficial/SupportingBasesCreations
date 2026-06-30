import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WebVitals } from "../components/WebVitals";

export const metadata: Metadata = {
  title: "SBC Dashboard",
  description: "SupportingBasesCreations - Mega-Tech Project Generator",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('sbc-theme');
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
