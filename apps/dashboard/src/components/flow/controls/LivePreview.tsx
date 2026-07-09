"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Eye,
  X,
  Database,
  Server,
  Shield,
  Layers,
  Globe,
  Zap,
  HardDrive,
  Lock,
  FileCode,
  ChevronRight,
} from "lucide-react";
import { useGraphStore } from "../../../store/graphStore";
import { NodeType } from "@sbc/shared";
import type { ProjectConfig } from "@sbc/shared";

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

  const activePage = selectedPage ?? pages[0] ?? "/";

  const dbNodes = nodes.filter((n) => n.type === NodeType.CLOUD_DATABASE);
  const apiNodes = nodes.filter((n) => n.type === NodeType.API_ROUTE);
  const frontendNodes = nodes.filter(
    (n) => n.type === NodeType.FRONTEND_COMPONENT,
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={nodeCount === 0}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        title="Ver projeto ao vivo"
      >
        <Eye size={16} />
        <span className="hidden sm:inline">Preview</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Eye size={20} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Preview do Projeto
                </h2>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  ● ao vivo
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            {nodeCount === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-gray-400">
                  Adicione blocos ao diagrama para ver o preview
                </p>
              </div>
            ) : (
              <div className="flex flex-1 overflow-hidden">
                {/* Browser frame */}
                <div className="flex flex-1 flex-col overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-800 dark:bg-gray-800">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                      {config?.name ?? "preview"}.vercel.app{activePage}
                    </div>
                  </div>

                  {/* App content */}
                  <div className="flex flex-1 overflow-hidden bg-white dark:bg-gray-950">
                    {/* Sidebar nav */}
                    <div className="w-52 shrink-0 border-r border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                          {(config?.name ?? "A")[0].toUpperCase()}
                        </div>
                        <span className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {config?.name ?? "App"}
                        </span>
                      </div>

                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Páginas
                      </div>
                      <div className="space-y-1">
                        {pages.map((page) => (
                          <button
                            key={page}
                            onClick={() => setSelectedPage(page)}
                            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                              activePage === page
                                ? "bg-blue-100 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            }`}
                          >
                            <Globe size={12} className="shrink-0 opacity-50" />
                            <span className="truncate">
                              {page === "/" ? "Início" : page.replace("/", "")}
                            </span>
                          </button>
                        ))}
                      </div>

                      {hasAuth && (
                        <>
                          <div className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Conta
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-gray-500 dark:text-gray-400">
                              <Lock size={12} className="opacity-50" />
                              Entrar
                            </div>
                            <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-gray-500 dark:text-gray-400">
                              <Shield size={12} className="opacity-50" />
                              Registrar
                            </div>
                          </div>
                        </>
                      )}

                      {/* Infra badges */}
                      <div className="mt-6 space-y-1.5">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Infraestrutura
                        </div>
                        <InfraBadge
                          icon={Database}
                          label={infra?.database ?? "—"}
                          color="text-blue-500"
                        />
                        {infra?.cache && infra.cache !== "NONE" && (
                          <InfraBadge
                            icon={Zap}
                            label={infra.cache}
                            color="text-red-400"
                          />
                        )}
                        {infra?.queue && infra.queue !== "NONE" && (
                          <InfraBadge
                            icon={Layers}
                            label={infra.queue}
                            color="text-orange-500"
                          />
                        )}
                        {infra?.cdn && (
                          <InfraBadge
                            icon={Globe}
                            label="CDN"
                            color="text-cyan-500"
                          />
                        )}
                      </div>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <PagePreview
                        page={activePage}
                        entities={entities}
                        services={services}
                        hasAuth={hasAuth}
                        features={features}
                        dbNodes={dbNodes}
                        apiNodes={apiNodes}
                        frontendNodes={frontendNodes}
                      />
                    </div>
                  </div>
                </div>

                {/* Right panel: data model */}
                <div className="w-72 shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <Database size={16} className="text-blue-500" />
                    Modelo de Dados
                  </h3>

                  {entities.length === 0 ? (
                    <p className="text-xs text-gray-400">
                      Nenhum banco de dados no diagrama
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {entities.map((entity) => (
                        <div
                          key={entity.name}
                          className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <HardDrive size={14} className="text-blue-400" />
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                              {entity.name}
                            </span>
                            {entity.features?.includes("AUTH") && (
                              <Lock size={10} className="text-amber-500" />
                            )}
                          </div>
                          <div className="space-y-1">
                            {entity.fields.slice(0, 6).map((field) => (
                              <div
                                key={field.name}
                                className="flex items-center justify-between text-[10px]"
                              >
                                <span className="text-gray-600 dark:text-gray-300">
                                  {field.name}
                                  {field.required && (
                                    <span className="text-red-400"> *</span>
                                  )}
                                </span>
                                <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-400 dark:bg-gray-700 dark:text-gray-500">
                                  {field.type.toLowerCase()}
                                </span>
                              </div>
                            ))}
                            {entity.fields.length > 6 && (
                              <p className="text-[10px] text-gray-400">
                                +{entity.fields.length - 6} campos
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* API endpoints */}
                  {services.length > 0 && (
                    <>
                      <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        <Server size={16} className="text-green-500" />
                        API
                      </h3>
                      <div className="space-y-1.5">
                        {services.map((svc) => (
                          <div
                            key={svc.name}
                            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 dark:border-gray-700 dark:bg-gray-800"
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
                            <span className="truncate text-xs text-gray-600 dark:text-gray-300">
                              /api/{svc.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Features */}
                  {features.length > 0 && (
                    <>
                      <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        <Zap size={16} className="text-amber-500" />
                        Funcionalidades
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {features.map((f) => (
                          <span
                            key={f}
                            className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function InfraBadge({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
      <Icon size={10} className={color} />
      <span className="truncate">{label}</span>
    </div>
  );
}

function PagePreview({
  page,
  entities,
  hasAuth,
  frontendNodes,
}: {
  page: string;
  entities: ProjectConfig["entities"];
  services: ProjectConfig["services"];
  hasAuth: boolean;
  features: string[];
  dbNodes: import("@sbc/shared").GraphNode[];
  apiNodes: import("@sbc/shared").GraphNode[];
  frontendNodes: import("@sbc/shared").GraphNode[];
}) {
  const pageName =
    page === "/" ? "Início" : page.replace("/", "").replace(/-/g, " ");

  if (page === "/" || page === "/home") {
    return (
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
          <h1 className="text-2xl font-bold">{pageName}</h1>
          <p className="mt-1 text-sm text-blue-100">
            Página inicial do seu app
          </p>
          <div className="mt-4 flex gap-2">
            <div className="rounded-lg bg-white/20 px-4 py-2 text-xs font-medium backdrop-blur">
              Começar
            </div>
            {hasAuth && (
              <div className="rounded-lg border border-white/30 px-4 py-2 text-xs font-medium">
                Entrar
              </div>
            )}
          </div>
        </div>

        {entities && entities.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
              {entities[0].name}s recentes
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({
                length: Math.min(
                  6,
                  Math.max(3, entities[0]?.fields.length ?? 3),
                ),
              }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                >
                  <div className="mb-2 h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="space-y-1.5">
                    {(entities[0]?.fields ?? []).slice(0, 3).map((f) => (
                      <div
                        key={f.name}
                        className="flex items-center justify-between text-[10px]"
                      >
                        <span className="text-gray-400">{f.name}</span>
                        <div className="h-2 w-12 rounded bg-gray-100 dark:bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!entities || entities.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileCode
              size={40}
              className="mb-3 text-gray-300 dark:text-gray-700"
            />
            <p className="text-sm text-gray-400">
              Adicione um banco de dados para ver os dados aqui
            </p>
          </div>
        )}
      </div>
    );
  }

  // Entity list page
  const matchingEntity = (entities ?? []).find(
    (e) =>
      e.name.toLowerCase() === pageName.toLowerCase() ||
      e.tableName?.toLowerCase() === pageName.toLowerCase(),
  );

  if (matchingEntity) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold capitalize text-gray-800 dark:text-gray-100">
            {matchingEntity.name}s
          </h1>
          <div className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">
            + Novo
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {matchingEntity.fields.slice(0, 5).map((f) => (
                  <th
                    key={f.name}
                    className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400"
                  >
                    {f.name}
                  </th>
                ))}
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  {matchingEntity.fields.slice(0, 5).map((f) => (
                    <td
                      key={f.name}
                      className="px-3 py-2 text-gray-400 dark:text-gray-500"
                    >
                      <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-800" />
                    </td>
                  ))}
                  <td className="px-3 py-2">
                    <ChevronRight
                      size={14}
                      className="text-gray-300 dark:text-gray-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Generic page
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold capitalize text-gray-800 dark:text-gray-100">
        {pageName}
      </h1>
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
        <p className="text-sm text-gray-400">
          Esta página será gerada com os componentes conectados a ela
        </p>
        {frontendNodes.length > 0 && (
          <p className="mt-2 text-xs text-gray-400">
            {frontendNodes.length} componente
            {frontendNodes.length !== 1 ? "s" : ""} de frontend no diagrama
          </p>
        )}
      </div>
    </div>
  );
}
