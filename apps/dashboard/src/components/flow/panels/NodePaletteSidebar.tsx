"use client";

import { useState, useMemo } from "react";
import { NODE_PALETTE } from "../nodes/NodePalette";
import { NodeType } from "@sbc/shared";
import type { DragEvent } from "react";
import { Search } from "lucide-react";

export function NodePaletteSidebar() {
  const [query, setQuery] = useState("");

  const onDragStart = (event: DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData("application/nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return NODE_PALETTE;
    const q = query.toLowerCase();
    return NODE_PALETTE.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q),
    );
  }, [query]);

  const basicItems = filtered.filter((i) => i.category === "basic");
  const advancedItems = filtered.filter((i) => i.category === "advanced");

  return (
    <div className="flex h-full w-56 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Blocos
        </h3>
        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
          Arraste para o canvas
        </p>
      </div>
      <div className="border-b border-gray-200 p-3 dark:border-gray-800">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar blocos..."
            className="w-full rounded-md border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {filtered.length === 0 ? (
          <p className="py-4 text-center text-xs text-gray-400 dark:text-gray-500">
            Nenhum bloco encontrado
          </p>
        ) : (
          <div className="space-y-4">
            {basicItems.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Essenciais
                </h4>
                <div className="space-y-2">
                  {basicItems.map((item) => (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={(e) => onDragStart(e, item.type)}
                      className="flex cursor-grab items-start gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition-all hover:border-gray-300 hover:shadow-sm active:cursor-grabbing dark:border-gray-700 dark:hover:border-gray-600 dark:hover:shadow-md"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {item.label}
                        </div>
                        <div className="line-clamp-2 text-xs text-gray-400 dark:text-gray-500">
                          {item.description}
                        </div>
                      </div>
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {advancedItems.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Avançado
                </h4>
                <div className="space-y-2">
                  {advancedItems.map((item) => (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={(e) => onDragStart(e, item.type)}
                      className="flex cursor-grab items-start gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition-all hover:border-gray-300 hover:shadow-sm active:cursor-grabbing dark:border-gray-700 dark:hover:border-gray-600 dark:hover:shadow-md"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {item.label}
                        </div>
                        <div className="line-clamp-2 text-xs text-gray-400 dark:text-gray-500">
                          {item.description}
                        </div>
                      </div>
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
