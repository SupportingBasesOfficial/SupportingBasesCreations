"use client";

import { useGraphStore } from "../../../store/graphStore";
import { getNodeConfig } from "../nodes/NodePalette";
import { NodeType } from "@sbc/shared";
import { Trash2, X, Plus, Info } from "lucide-react";

interface FieldDef {
  name: string;
  type: string;
  required: boolean;
  unique: boolean;
  nullable: boolean;
}

const FIELD_TYPES: { value: string; label: string; hint: string }[] = [
  { value: "string", label: "Texto curto", hint: "Nomes, títulos, emails" },
  { value: "text", label: "Texto longo", hint: "Descrições, conteúdo" },
  { value: "uuid", label: "ID único", hint: "Identificador automático" },
  {
    value: "integer",
    label: "Número inteiro",
    hint: "Quantidades, contadores",
  },
  { value: "bigint", label: "Número grande", hint: "IDs numéricos grandes" },
  { value: "float", label: "Decimal", hint: "Preços, notas, medidas" },
  { value: "boolean", label: "Sim/Não", hint: "Verdadeiro ou falso" },
  { value: "timestamp", label: "Data e hora", hint: "Quando algo aconteceu" },
  { value: "date", label: "Data", hint: "Apenas a data" },
  { value: "jsonb", label: "Dados flexíveis", hint: "JSON estruturado" },
];

export function NodeInspector() {
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const nodes = useGraphStore((s) => s.nodes);
  const updateNode = useGraphStore((s) => s.updateNode);
  const removeNode = useGraphStore((s) => s.removeNode);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);

  const node = nodes.find((n) => n.id === selectedNodeId);

  if (!node) {
    return (
      <div className="flex h-full w-72 flex-col border-l border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Propriedades
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="text-center">
            <Info
              size={32}
              className="mx-auto mb-2 text-gray-300 dark:text-gray-700"
            />
            <p className="text-center text-sm text-gray-400 dark:text-gray-500">
              Clique em um bloco do diagrama para configurá-lo
            </p>
          </div>
        </div>
      </div>
    );
  }

  const config = getNodeConfig(node.type);
  const isDatabase = node.type === NodeType.CLOUD_DATABASE;
  const isApiRoute = node.type === NodeType.API_ROUTE;
  const isFrontend = node.type === NodeType.FRONTEND_COMPONENT;

  return (
    <div className="flex h-full w-72 flex-col border-l border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-lg">{config.icon}</span>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {config.label}
          </h3>
        </div>
        <button
          onClick={() => setSelectedNode(null)}
          className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Nome
            </label>
            <input
              type="text"
              value={node.data.label}
              onChange={(e) => updateNode(node.id, { label: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              O que faz?
            </label>
            <textarea
              value={node.data.description ?? ""}
              onChange={(e) =>
                updateNode(node.id, { description: e.target.value })
              }
              rows={2}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
            />
          </div>

          {isDatabase && (
            <>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Nome da tabela
                </label>
                <input
                  type="text"
                  value={node.data.tableName ?? ""}
                  onChange={(e) =>
                    updateNode(node.id, { tableName: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                    Que informações serão armazenadas?
                  </label>
                  <button
                    onClick={() => {
                      const currentFields = (node.data.fields ??
                        []) as FieldDef[];
                      const newField: FieldDef = {
                        name: "newField",
                        type: "string",
                        required: false,
                        unique: false,
                        nullable: true,
                      };
                      updateNode(node.id, {
                        fields: [...currentFields, newField],
                      });
                    }}
                    className="flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Plus size={12} />
                    Adicionar
                  </button>
                </div>
                <div className="space-y-2">
                  {((node.data.fields ?? []) as FieldDef[]).map(
                    (field, idx) => (
                      <div
                        key={idx}
                        className="rounded-md border border-gray-200 p-2 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={field.name}
                            onChange={(e) => {
                              const fields = [
                                ...((node.data.fields ?? []) as FieldDef[]),
                              ];
                              fields[idx] = { ...field, name: e.target.value };
                              updateNode(node.id, { fields });
                            }}
                            placeholder="Nome do campo"
                            className="flex-1 rounded border border-gray-300 px-2 py-1 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                          />
                          <select
                            value={field.type}
                            onChange={(e) => {
                              const fields = [
                                ...((node.data.fields ?? []) as FieldDef[]),
                              ];
                              fields[idx] = { ...field, type: e.target.value };
                              updateNode(node.id, { fields });
                            }}
                            className="rounded border border-gray-300 px-1 py-1 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                          >
                            {FIELD_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => {
                              const fields = (
                                (node.data.fields ?? []) as FieldDef[]
                              ).filter((_, i) => i !== idx);
                              updateNode(node.id, { fields });
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <div className="mt-1 flex gap-3">
                          <label className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => {
                                const fields = [
                                  ...((node.data.fields ?? []) as FieldDef[]),
                                ];
                                fields[idx] = {
                                  ...field,
                                  required: e.target.checked,
                                };
                                updateNode(node.id, { fields });
                              }}
                              className="h-3 w-3"
                            />
                            Obrigatório
                          </label>
                          <label className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <input
                              type="checkbox"
                              checked={field.unique}
                              onChange={(e) => {
                                const fields = [
                                  ...((node.data.fields ?? []) as FieldDef[]),
                                ];
                                fields[idx] = {
                                  ...field,
                                  unique: e.target.checked,
                                };
                                updateNode(node.id, { fields });
                              }}
                              className="h-3 w-3"
                            />
                            Único
                          </label>
                          <label className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <input
                              type="checkbox"
                              checked={field.nullable}
                              onChange={(e) => {
                                const fields = [
                                  ...((node.data.fields ?? []) as FieldDef[]),
                                ];
                                fields[idx] = {
                                  ...field,
                                  nullable: e.target.checked,
                                };
                                updateNode(node.id, { fields });
                              }}
                              className="h-3 w-3"
                            />
                            Opcional
                          </label>
                        </div>
                      </div>
                    ),
                  )}
                  {((node.data.fields ?? []) as FieldDef[]).length === 0 && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Nenhum campo ainda. Clique em "Adicionar" para começar.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {isApiRoute && (
            <>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Endereço da API
                </label>
                <input
                  type="text"
                  value={node.data.route ?? ""}
                  onChange={(e) =>
                    updateNode(node.id, { route: e.target.value })
                  }
                  placeholder="/api/users"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Operação principal
                </label>
                <select
                  value={node.data.method ?? "GET"}
                  onChange={(e) =>
                    updateNode(node.id, {
                      method: e.target.value as
                        "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
                    })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="GET">Buscar dados (GET)</option>
                  <option value="POST">Criar novo (POST)</option>
                  <option value="PUT">Atualizar (PUT)</option>
                  <option value="PATCH">Atualizar parcial (PATCH)</option>
                  <option value="DELETE">Remover (DELETE)</option>
                </select>
              </div>
            </>
          )}

          {isFrontend && (
            <>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Tecnologia
                </label>
                <select
                  value={node.data.framework ?? "NEXTJS"}
                  onChange={(e) =>
                    updateNode(node.id, { framework: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="NEXTJS">Next.js (Recomendado)</option>
                  <option value="REACT">React</option>
                  <option value="ASTRO">Astro</option>
                  <option value="SVELTE">SvelteKit</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Estilo visual
                </label>
                <select
                  value={node.data.styling ?? "TAILWIND"}
                  onChange={(e) =>
                    updateNode(node.id, { styling: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="TAILWIND">Tailwind CSS (Recomendado)</option>
                  <option value="STYLED">Styled Components</option>
                  <option value="CSS">CSS Puro</option>
                </select>
              </div>
            </>
          )}

          {(node.type === NodeType.CDN_EDGE ||
            node.type === NodeType.CACHE_LAYER ||
            node.type === NodeType.QUEUE_SERVICE) && (
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Região
              </label>
              <input
                type="text"
                value={node.data.region ?? "us-east-1"}
                onChange={(e) =>
                  updateNode(node.id, { region: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <button
          onClick={() => removeNode(node.id)}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
        >
          <Trash2 size={14} />
          Excluir bloco
        </button>
      </div>
    </div>
  );
}
