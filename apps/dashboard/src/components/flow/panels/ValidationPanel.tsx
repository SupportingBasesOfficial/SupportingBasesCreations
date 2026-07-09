"use client";

import { useState } from "react";
import { useGraphStore } from "../../../store/graphStore";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";

export function ValidationPanel() {
  const errors = useGraphStore((s) => s.validationErrors);
  const isValid = useGraphStore((s) => s.isValid);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);
  const [expanded, setExpanded] = useState(false);

  const errorCount = errors.length;

  return (
    <div className="absolute bottom-4 left-4 z-10 w-80 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-2.5"
      >
        <div className="flex items-center gap-2">
          {isValid ? (
            <CheckCircle2 size={16} className="text-green-500" />
          ) : (
            <AlertCircle size={16} className="text-red-500" />
          )}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {isValid
              ? "Arquitetura válida"
              : `${errorCount} ${errorCount > 1 ? "erros" : "erro"}`}
          </span>
        </div>
        {errorCount > 0 &&
          (expanded ? (
            <ChevronDown size={16} className="text-gray-400" />
          ) : (
            <ChevronUp size={16} className="text-gray-400" />
          ))}
      </button>

      {expanded && errorCount > 0 && (
        <div className="max-h-60 overflow-y-auto border-t border-gray-200 px-4 py-2 dark:border-gray-700">
          <ul className="space-y-2">
            {errors.map((error, idx) => {
              const friendlyTitles: Record<string, string> = {
                ORPHAN_NODE: "Bloco solto",
                CYCLE_DETECTED: "Ciclo infinito",
                BLOCKED_CONNECTION: "Conexão proibida",
                INVALID_CONNECTION: "Conexão inválida",
                MISSING_SOURCE_NODE: "Conexão quebrada",
                MISSING_TARGET_NODE: "Conexão quebrada",
                DUPLICATE_NODE_ID: "Bloco duplicado",
              };
              const friendlyFixes: Record<string, string> = {
                ORPHAN_NODE:
                  "Arraste uma linha deste bloco até outro para conectá-los",
                CYCLE_DETECTED: "Remova uma das conexões que forma o ciclo",
                BLOCKED_CONNECTION: "Adicione um bloco de API entre eles",
                INVALID_CONNECTION:
                  "Verifique se esses blocos podem se conectar",
                MISSING_SOURCE_NODE: "Delete esta conexão e crie uma nova",
                MISSING_TARGET_NODE: "Delete esta conexão e crie uma nova",
                DUPLICATE_NODE_ID: "Remova um dos blocos duplicados",
              };
              return (
                <li
                  key={`${error.code}-${idx}`}
                  onClick={() => error.nodeId && setSelectedNode(error.nodeId)}
                  className="cursor-pointer rounded-md bg-red-50 px-3 py-2 text-xs text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  <div className="font-medium">
                    {friendlyTitles[error.code] ?? error.code}
                  </div>
                  <div className="mt-0.5 text-red-500 dark:text-red-400">
                    {error.message}
                  </div>
                  {friendlyFixes[error.code] && (
                    <div className="mt-1 flex items-center gap-1 text-red-400 dark:text-red-500">
                      <span>💡</span>
                      <span>{friendlyFixes[error.code]}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
