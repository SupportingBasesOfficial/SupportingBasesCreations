"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Cloud,
  ArrowRight,
  Boxes,
  Zap,
  GitBranch,
  Layout,
  Code2,
  Rocket,
  Shield,
  CheckCircle2,
  Loader2,
  Server,
  Database,
} from "lucide-react";
import { useSession } from "../hooks/useSession";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (mounted && !loading && user) router.replace("/dashboard");
  }, [user, loading, router, mounted]);

  const features = [
    { icon: Layout, title: "Visual Architecture Designer", desc: "Drag-and-drop canvas to design your full-stack architecture. Connect databases, APIs, auth, cache, queues, and CDNs visually." },
    { icon: Code2, title: "AI-Powered Code Generation", desc: "Generate production-ready Next.js, tRPC, Prisma, and Docker code from your architecture graph. No boilerplate, just ship." },
    { icon: Rocket, title: "One-Click Cloud Deploy", desc: "Deploy directly to Vercel with a single click. Connect your cloud providers and let SBC handle the pipeline." },
    { icon: GitBranch, title: "Git-Ready Projects", desc: "Every generated project includes CI/CD with GitHub Actions, environment templates, and documentation out of the box." },
    { icon: Boxes, title: "Template Gallery", desc: "Start from proven architecture templates — SaaS, e-commerce, real-time apps, and more. Customize on the canvas." },
    { icon: Shield, title: "Built-in Best Practices", desc: "TypeScript, Zod validation, RLS policies, security headers, and testing setup configured automatically." },
  ];

  const steps = [
    { icon: Layout, title: "Design", desc: "Build your architecture on the visual canvas" },
    { icon: Zap, title: "Generate", desc: "AI generates all code from your design" },
    { icon: Rocket, title: "Deploy", desc: "Ship to production with one click" },
  ];

  const techStack = [
    { name: "Next.js 14", icon: Code2 },
    { name: "tRPC", icon: Server },
    { name: "Prisma", icon: Database },
    { name: "Supabase", icon: Shield },
    { name: "Vercel", icon: Cloud },
    { name: "Docker", icon: Boxes },
    { name: "GitHub Actions", icon: GitBranch },
    { name: "Tailwind CSS", icon: Layout },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-900 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Cloud className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              SBC <span className="text-blue-600">ASP</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 sm:block">Features</a>
            <a href="#how-it-works" className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 sm:block">How it works</a>
            {mounted && loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            ) : user ? (
              <Link href="/dashboard" className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Sign in</Link>
                <Link href="/login" className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div className="h-[600px] w-[900px] rounded-full bg-gradient-to-br from-blue-100 via-purple-50 to-cyan-100 opacity-60 blur-3xl dark:from-blue-950/40 dark:via-purple-950/30 dark:to-cyan-950/30" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400">
            <Zap className="h-4 w-4" /> From idea to production in minutes
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl lg:text-7xl">
            Design. Generate.{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Deploy.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
            The visual platform for designing full-stack architectures and generating production-ready code. Stop writing boilerplate — start shipping products.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login" className="group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:shadow-xl">
              Start Building Free <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#how-it-works" className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
              See How It Works
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> No credit card required</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Open source</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-gray-100 py-20 dark:border-gray-900 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Three steps to production</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">From blank canvas to deployed app — no boilerplate required.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-blue-300 to-transparent dark:from-blue-800 md:block" />}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                  <s.icon className="h-10 w-10 text-white" />
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white dark:bg-white dark:text-gray-900">{i + 1}</div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-gray-50">{s.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Everything you need to ship</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Powerful features that eliminate boilerplate and accelerate your workflow.</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-blue-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-400">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-gray-50">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">Built with the best stack</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your generated projects use industry-leading technologies.</p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {techStack.map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                <t.icon className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to build your next project?</h2>
          <p className="mt-4 text-lg text-blue-100">Join developers who ship faster with SBC ASP. Start designing your architecture today.</p>
          <Link href="/login" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-lg hover:bg-blue-50">
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 dark:border-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Cloud className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-gray-900 dark:text-gray-100">SBC ASP</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">SupportingBasesCreations — Architecture Design Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
