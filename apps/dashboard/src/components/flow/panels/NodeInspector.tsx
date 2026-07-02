"use client";

import { useGraphStore } from "../../../store/graphStore";
import { getNodeConfig } from "../nodes/NodePalette";
import { NodeType } from "@sbc/shared";
import { Trash2, X } from "lucide-react";

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
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Inspector</h3>
        </div>
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-center text-sm text-gray-400 dark:text-gray-500">
            Select a node to edit its properties
          </p>
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
              Label
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
              Description
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
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Table Name
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
          )}

          {isApiRoute && (
            <>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Route Path
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
                  Method
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
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
            </>
          )}

          {isFrontend && (
            <>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Framework
                </label>
                <input
                  type="text"
                  value={node.data.framework ?? "NEXTJS"}
                  onChange={(e) =>
                    updateNode(node.id, { framework: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Styling
                </label>
                <input
                  type="text"
                  value={node.data.styling ?? "TAILWIND"}
                  onChange={(e) =>
                    updateNode(node.id, { styling: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
                />
              </div>
            </>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Region
            </label>
            <input
              type="text"
              value={node.data.region ?? "us-east-1"}
              onChange={(e) => updateNode(node.id, { region: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <button
          onClick={() => removeNode(node.id)}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
        >
          <Trash2 size={14} />
          Delete Node
        </button>
      </div>
    </div>
  );
}
