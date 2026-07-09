"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Eye,
  X,
  Database,
  Server,
  Globe,
  Zap,
  Lock,
  FileCode,
  ChevronRight,
  ChevronLeft,
  Home,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Plus,
  Search,
  Bell,
  ShoppingCart,
  Truck,
  Utensils,
  Package,
  Users,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { useGraphStore } from "../../../store/graphStore";
import type { ProjectConfig } from "@sbc/shared";

const PAGE_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  "/": Home,
  "/login": LogIn,
  "/register": UserPlus,
  "/dashboard": LayoutDashboard,
};

function getPageIcon(page: string) {
  return PAGE_ICONS[page] ?? FileCode;
}

function getPageLabel(page: string, entities: { name: string }[]) {
  if (page === "/") return "Início";
  if (page === "/login") return "Entrar";
  if (page === "/register") return "Registrar";
  if (page === "/dashboard") return "Painel";
  if (page.endsWith("/new")) {
    const entity = page.replace("/new", "").replace("/", "");
    return `Novo ${entity}`;
  }
  const entity = entities.find(
    (e) => e.name.toLowerCase() === page.replace("/", "").toLowerCase(),
  );
  if (entity) return `${entity.name}s`;
  return page.replace("/", "").replace(/-/g, " ");
}

export function LivePreview() {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const nodes = useGraphStore((s) => s.nodes);
  const edges = useGraphStore((s) => s.edges);
  const toProjectConfig = useGraphStore((s) => s.toProjectConfig);
  const nodeCount = useGraphStore((s) => s.nodes.length);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("sbc-open-live-preview", handler);
    return () => window.removeEventListener("sbc-open-live-preview", handler);
  }, []);

  const config = useMemo<ProjectConfig | null>(
    () => (nodeCount > 0 ? toProjectConfig("preview") : null),
    [nodes, edges, nodeCount, toProjectConfig],
  );

  const entities = config?.entities ?? [];
  const services = config?.services ?? [];
  const frontend = config?.frontend;
  const infra = config?.infrastructure;
  const pages = frontend?.pages ?? ["/"];
  const hasAuth =
    (config?.providers ?? []).length > 0 ||
    entities.some((e) => e.features?.includes("AUTH"));
  const features = config?.frontend?.features ?? [];
  const description = config?.description ?? "";

  const activePage = selectedPage ?? pages[0] ?? "/";

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        disabled={nodeCount === 0}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          open
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
        title="Preview do projeto ao vivo"
      >
        <Eye size={16} />
        <span className="hidden sm:inline">Preview</span>
      </button>

      {open && (
        <div className="absolute right-0 top-0 z-30 flex h-full w-[480px] flex-col border-l border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-blue-600" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Preview
              </span>
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                ao vivo
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </div>

          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-3 py-1.5 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex gap-1">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <div className="ml-2 flex-1 truncate rounded bg-white px-2.5 py-0.5 text-[11px] text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              {config?.name ?? "app"}.vercel.app{activePage}
            </div>
          </div>

          {/* Page tabs */}
          <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-200 bg-gray-50 px-2 py-1.5 dark:border-gray-800 dark:bg-gray-900">
            {pages.map((page) => {
              const Icon = getPageIcon(page);
              const isActive = activePage === page;
              return (
                <button
                  key={page}
                  onClick={() => setSelectedPage(page)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon size={11} />
                  {getPageLabel(page, entities)}
                </button>
              );
            })}
          </div>

          {/* App content - scrollable */}
          <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-950">
            <PageRenderer
              page={activePage}
              config={config}
              entities={entities}
              services={services}
              hasAuth={hasAuth}
              features={features}
              description={description}
              pages={pages}
              onNavigate={(p) => setSelectedPage(p)}
            />
          </div>

          {/* Bottom data panel */}
          <div className="border-t border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-3 overflow-x-auto text-[10px]">
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Database size={10} className="text-blue-500" />
                {entities.length} entidade{entities.length !== 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Server size={10} className="text-green-500" />
                {services.length} API
              </span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Globe size={10} className="text-purple-500" />
                {pages.length} página{pages.length !== 1 ? "s" : ""}
              </span>
              {hasAuth && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Lock size={10} />
                  Auth
                </span>
              )}
              {infra?.cdn && (
                <span className="flex items-center gap-1 text-cyan-500">
                  <Zap size={10} />
                  CDN
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PageRenderer({
  page,
  config,
  entities,
  services,
  hasAuth,
  description,
  onNavigate,
}: {
  page: string;
  config: ProjectConfig | null;
  entities: NonNullable<ProjectConfig["entities"]>;
  services: NonNullable<ProjectConfig["services"]>;
  hasAuth: boolean;
  features: string[];
  description: string;
  pages: string[];
  onNavigate: (page: string) => void;
}) {
  // Landing / Home page
  if (page === "/" || page === "/home") {
    return (
      <LandingPage
        config={config}
        entities={entities}
        hasAuth={hasAuth}
        description={description}
        onNavigate={onNavigate}
      />
    );
  }

  // Login page
  if (page === "/login") {
    return <LoginPage onNavigate={onNavigate} />;
  }

  // Register page
  if (page === "/register") {
    return <RegisterPage onNavigate={onNavigate} />;
  }

  // Dashboard page
  if (page === "/dashboard") {
    return (
      <DashboardPage
        entities={entities}
        services={services}
        onNavigate={onNavigate}
      />
    );
  }

  // Entity "new" form
  if (page.endsWith("/new")) {
    const entitySlug = page.replace("/new", "").replace("/", "");
    const entity = entities.find((e) => e.name.toLowerCase() === entitySlug);
    if (entity)
      return <EntityFormPage entity={entity} onNavigate={onNavigate} />;
  }

  // Entity list page
  const matchingEntity = entities.find(
    (e) =>
      e.name.toLowerCase() === page.replace("/", "").toLowerCase() ||
      e.tableName?.toLowerCase() === page.replace("/", "").toLowerCase(),
  );
  if (matchingEntity) {
    return <EntityListPage entity={matchingEntity} onNavigate={onNavigate} />;
  }

  // Generic page
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <FileCode size={40} className="mb-3 text-gray-300 dark:text-gray-700" />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {getPageLabel(page, entities)}
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Página gerada automaticamente a partir do seu diagrama
      </p>
    </div>
  );
}

/* ============ LANDING PAGE ============ */
function LandingPage({
  config,
  entities,
  hasAuth,
  description,
  onNavigate,
}: {
  config: ProjectConfig | null;
  entities: NonNullable<ProjectConfig["entities"]>;
  hasAuth: boolean;
  description: string;
  onNavigate: (page: string) => void;
}) {
  const appName = config?.name ?? "App";
  const initials = appName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-full">
      {/* Nav bar */}
      <nav className="flex items-center justify-between border-b border-gray-100 px-6 py-3 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
            {initials}
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
            {appName}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("/dashboard")}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Painel
          </button>
          {hasAuth ? (
            <>
              <button
                onClick={() => onNavigate("/login")}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Entrar
              </button>
              <button
                onClick={() => onNavigate("/register")}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white"
              >
                Registrar
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate("/dashboard")}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white"
            >
              Começar
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-12 text-center text-white">
        <h1 className="text-2xl font-bold leading-tight">{appName}</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-blue-100">
          {description ||
            `Plataforma completa para gerenciar ${appName.toLowerCase()}`}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => onNavigate(hasAuth ? "/register" : "/dashboard")}
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-lg transition-transform hover:scale-105"
          >
            Começar grátis
          </button>
          <button
            onClick={() => onNavigate("/dashboard")}
            className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Ver painel
          </button>
        </div>
      </div>

      {/* Features grid */}
      <div className="px-6 py-8">
        <h2 className="mb-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
          O que você pode fazer
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {entities.slice(0, 4).map((entity) => {
            const slug = entity.name.toLowerCase();
            const Icon = getEntityIcon(entity.name);
            return (
              <button
                key={entity.name}
                onClick={() => onNavigate(`/${slug}`)}
                className="group rounded-xl border border-gray-200 p-4 text-left transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:hover:border-blue-600"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Icon size={18} className="text-blue-500" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {entity.name}s
                </h3>
                <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                  {entity.fields.length} campos · Gerenciar e visualizar
                </p>
                <span className="mt-2 flex items-center gap-1 text-[11px] font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Acessar <ArrowRight size={10} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      {entities.length > 0 && (
        <div className="border-t border-gray-100 px-6 py-6 dark:border-gray-800">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-blue-600">
                {entities.length}
              </div>
              <div className="text-[10px] text-gray-400">Módulos</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">
                {entities.reduce((s, e) => s + e.fields.length, 0)}
              </div>
              <div className="text-[10px] text-gray-400">Campos</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-600">
                {entities[0]?.fields.length ?? 0}
              </div>
              <div className="text-[10px] text-gray-400">Por módulo</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-100 px-6 py-4 text-center dark:border-gray-800">
        <p className="text-[10px] text-gray-400">
          Gerado por SBC ASP · {appName}.vercel.app
        </p>
      </div>
    </div>
  );
}

/* ============ LOGIN PAGE ============ */
function LoginPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="w-full max-w-xs">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
            🔐
          </div>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Entrar
          </h1>
          <p className="mt-1 text-xs text-gray-400">Acesse sua conta</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              E-mail
            </label>
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-300 dark:border-gray-700 dark:text-gray-600">
              voce@exemplo.com
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              Senha
            </label>
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-300 dark:border-gray-700 dark:text-gray-600">
              ••••••••
            </div>
          </div>
          <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Entrar
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-[10px] text-gray-400">ou</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <button className="mt-3 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          Continuar com Google
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Não tem conta?{" "}
          <button
            onClick={() => onNavigate("/register")}
            className="font-medium text-blue-600 hover:underline"
          >
            Registrar
          </button>
        </p>
      </div>
    </div>
  );
}

/* ============ REGISTER PAGE ============ */
function RegisterPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="w-full max-w-xs">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-lg font-bold text-white">
            ✨
          </div>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Criar conta
          </h1>
          <p className="mt-1 text-xs text-gray-400">Comece grátis hoje</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              Nome
            </label>
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-300 dark:border-gray-700 dark:text-gray-600">
              Seu nome
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              E-mail
            </label>
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-300 dark:border-gray-700 dark:text-gray-600">
              voce@exemplo.com
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              Senha
            </label>
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-300 dark:border-gray-700 dark:text-gray-600">
              ••••••••
            </div>
          </div>
          <button className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700">
            Criar conta
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Já tem conta?{" "}
          <button
            onClick={() => onNavigate("/login")}
            className="font-medium text-blue-600 hover:underline"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
}

/* ============ DASHBOARD PAGE ============ */
function DashboardPage({
  entities,
  services,
  onNavigate,
}: {
  entities: NonNullable<ProjectConfig["entities"]>;
  services: NonNullable<ProjectConfig["services"]>;
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <LayoutDashboard size={14} className="text-blue-600" />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Painel
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-gray-400" />
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
        </div>
      </div>

      <div className="p-4">
        {/* Stats cards */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          {entities.slice(0, 4).map((entity) => {
            const Icon = getEntityIcon(entity.name);
            const slug = entity.name.toLowerCase();
            return (
              <button
                key={entity.name}
                onClick={() => onNavigate(`/${slug}`)}
                className="rounded-xl border border-gray-200 bg-white p-3 text-left transition-all hover:border-blue-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Icon size={16} className="text-blue-500" />
                  </div>
                  <ArrowRight
                    size={12}
                    className="text-gray-300 dark:text-gray-600"
                  />
                </div>
                <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {entity.name}s
                </div>
                <div className="text-[10px] text-gray-400">
                  {entity.fields.length} campos
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent activity table */}
        {entities.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <div className="border-b border-gray-100 px-3 py-2 dark:border-gray-800">
              <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                {entities[0].name}s recentes
              </h3>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2">
                  <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-24 rounded bg-gray-100 dark:bg-gray-800" />
                    <div className="h-1.5 w-16 rounded bg-gray-50 dark:bg-gray-800/50" />
                  </div>
                  <span className="text-[10px] text-gray-300 dark:text-gray-600">
                    há {i + 1}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API endpoints */}
        {services.length > 0 && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <div className="border-b border-gray-100 px-3 py-2 dark:border-gray-800">
              <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                APIs disponíveis
              </h3>
            </div>
            <div className="space-y-1 p-2">
              {services.map((svc) => (
                <div
                  key={svc.name}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs"
                >
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                      svc.type === "ASYNC"
                        ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                        : svc.type === "EVENT_DRIVEN"
                          ? "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                          : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {svc.type === "ASYNC"
                      ? "ASYNC"
                      : svc.type === "EVENT_DRIVEN"
                        ? "EVENT"
                        : "SYNC"}
                  </span>
                  <code className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
                    /api/{svc.name}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ ENTITY LIST PAGE ============ */
function EntityListPage({
  entity,
  onNavigate,
}: {
  entity: NonNullable<ProjectConfig["entities"]>[number];
  onNavigate: (page: string) => void;
}) {
  const Icon = getEntityIcon(entity.name);
  const displayFields = entity.fields.slice(0, 5);

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-blue-500" />
          <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {entity.name}s
          </h1>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            {entity.fields.length} campos
          </span>
        </div>
        <button
          onClick={() => onNavigate(`/${entity.name.toLowerCase()}/new`)}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white"
        >
          <Plus size={12} />
          Novo
        </button>
      </div>

      {/* Search bar */}
      <div className="border-b border-gray-100 bg-white px-4 py-2 dark:border-gray-800 dark:bg-gray-900">
        <div className="relative">
          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <div className="rounded-md border border-gray-200 py-1.5 pl-7 pr-3 text-[11px] text-gray-300 dark:border-gray-700 dark:text-gray-600">
            Buscar {entity.name.toLowerCase()}s...
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {displayFields.map((f) => (
                  <th
                    key={f.name}
                    className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400"
                  >
                    {f.name}
                  </th>
                ))}
                <th className="w-8 px-3 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                >
                  {displayFields.map((f, i) => (
                    <td key={f.name} className="px-3 py-2.5">
                      {rowIdx === 0 && i === 0 ? (
                        <span className="text-gray-600 dark:text-gray-300">
                          {getSampleValue(f.name, f.type)}
                        </span>
                      ) : (
                        <div
                          className="h-2.5 rounded bg-gray-100 dark:bg-gray-800"
                          style={{ width: `${60 + Math.random() * 30}%` }}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-3 py-2.5">
                    <ChevronRight
                      size={12}
                      className="text-gray-300 dark:text-gray-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
          <span>
            5 de {Math.floor(Math.random() * 80) + 20}{" "}
            {entity.name.toLowerCase()}s
          </span>
          <div className="flex gap-1">
            <div className="rounded border border-gray-200 px-2 py-0.5 dark:border-gray-700">
              ‹
            </div>
            <div className="rounded bg-blue-100 px-2 py-0.5 font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              1
            </div>
            <div className="rounded border border-gray-200 px-2 py-0.5 dark:border-gray-700">
              2
            </div>
            <div className="rounded border border-gray-200 px-2 py-0.5 dark:border-gray-700">
              3
            </div>
            <div className="rounded border border-gray-200 px-2 py-0.5 dark:border-gray-700">
              ›
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ ENTITY FORM PAGE ============ */
function EntityFormPage({
  entity,
  onNavigate,
}: {
  entity: NonNullable<ProjectConfig["entities"]>[number];
  onNavigate: (page: string) => void;
}) {
  const Icon = getEntityIcon(entity.name);
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
        <button
          onClick={() => onNavigate(`/${entity.name.toLowerCase()}`)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <ChevronLeft size={14} />
        </button>
        <Icon size={16} className="text-blue-500" />
        <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Novo {entity.name}
        </h1>
      </div>

      <div className="p-4">
        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          {entity.fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1 flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                {field.name}
                {field.required && <span className="text-red-400">*</span>}
              </label>
              <div className="rounded-md border border-gray-200 px-3 py-2 text-[11px] text-gray-300 dark:border-gray-700 dark:text-gray-600">
                {getFieldPlaceholder(field.name, field.type)}
              </div>
              <p className="mt-0.5 text-[10px] text-gray-400">
                Tipo:{" "}
                <code className="font-mono">{field.type.toLowerCase()}</code>
                {field.unique && " · Único"}
                {field.nullable && " · Opcional"}
              </p>
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white">
              Salvar
            </button>
            <button
              onClick={() => onNavigate(`/${entity.name.toLowerCase()}`)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ HELPERS ============ */
function getEntityIcon(
  name: string,
): React.ComponentType<{ size?: number; className?: string }> {
  const lower = name.toLowerCase();
  if (
    lower.includes("user") ||
    lower.includes("usuario") ||
    lower.includes("cliente")
  )
    return Users;
  if (lower.includes("product") || lower.includes("produto")) return Package;
  if (lower.includes("order") || lower.includes("pedido")) return ShoppingCart;
  if (lower.includes("restaurant") || lower.includes("restaurante"))
    return Utensils;
  if (lower.includes("delivery") || lower.includes("entreg")) return Truck;
  if (lower.includes("message") || lower.includes("mensagem"))
    return MessageSquare;
  if (lower.includes("task") || lower.includes("tarefa")) return CheckCircle;
  if (lower.includes("course") || lower.includes("curso")) return Star;
  return Database;
}

function getSampleValue(name: string, type: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("name") || lower.includes("nome")) return "Exemplo";
  if (lower.includes("email")) return "usuario@exemplo.com";
  if (lower.includes("phone") || lower.includes("telefone"))
    return "+55 11 99999-9999";
  if (lower.includes("status")) return "ativo";
  if (lower.includes("price") || lower.includes("preco")) return "R$ 99,90";
  if (type === "BOOLEAN") return "true";
  if (type === "UUID") return "a1b2c3d4-...";
  if (type === "TIMESTAMP" || type === "DATETIME") return "2025-01-15";
  return "...";
}

function getFieldPlaceholder(name: string, type: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("email")) return "voce@exemplo.com";
  if (lower.includes("name") || lower.includes("nome"))
    return "Digite o nome...";
  if (lower.includes("description") || lower.includes("descricao"))
    return "Descrição...";
  if (type === "BOOLEAN") return "true / false";
  if (type === "JSON" || type === "JSONB") return "{ }";
  if (type === "UUID") return "Gerado automaticamente";
  return `Digite ${name}...`;
}
