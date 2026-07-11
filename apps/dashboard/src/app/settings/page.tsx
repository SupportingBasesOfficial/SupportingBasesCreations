"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Cloud, Moon, Sun, User, Loader2 } from "lucide-react";
import { UserMenu } from "../../components/UserMenu";
import { useSession } from "../../hooks/useSession";
import { ToastContainer, useToast } from "../../components/Toast";

export default function SettingsPage() {
  const { user } = useSession();
  const toast = useToast();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )sbc-theme=([^;]*)/);
    const stored = match ? decodeURIComponent(match[1]) : null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial = (stored ?? (prefersDark ? "dark" : "light")) as
      "light" | "dark";
    setTheme(initial);
    setLoading(false);
  }, []);

  const handleThemeChange = (next: "light" | "dark") => {
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    const isProd = process.env.NODE_ENV === "production";
    document.cookie = `sbc-theme=${next};expires=${new Date(Date.now() + 365 * 864e5).toUTCString()};path=/;SameSite=Lax${isProd ? ";Secure" : ""}`;
    fetch("/api/theme", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: next }),
    }).catch(() => {});
    toast.success(`Tema alterado para ${next === "dark" ? "escuro" : "claro"}`);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 size={24} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft size={16} />
            Voltar ao Painel
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-bold tracking-tight text-gray-800 dark:text-gray-100">
            Configurações
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <UserMenu />
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl flex-1 overflow-auto p-6">
        {/* Account section */}
        <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-gray-100">
            <User size={18} className="text-blue-600" />
            Conta
          </h2>
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ID do Usuário
                </span>
                <span className="text-xs font-mono text-gray-600 dark:text-gray-300">
                  {user.id.slice(0, 8)}...
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Não autenticado</p>
          )}
        </section>

        {/* Theme section */}
        <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-base font-semibold text-gray-800 dark:text-gray-100">
            Aparência
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => handleThemeChange("light")}
              className={`flex flex-1 items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors ${
                theme === "light"
                  ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <Sun size={16} />
              Claro
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex flex-1 items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors ${
                theme === "dark"
                  ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <Moon size={16} />
              Escuro
            </button>
          </div>
        </section>

        {/* Cloud section */}
        <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-gray-100">
            <Cloud size={18} className="text-blue-600" />
            Provedores de Nuvem
          </h2>
          <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            Configure tokens do GitHub, Vercel e Supabase para deploy.
          </p>
          <Link
            href="/dashboard?cloud=1"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Cloud size={14} />
            Abrir Configuração de Nuvem
          </Link>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}
