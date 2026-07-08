"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { memo } from "react";

export interface CustomNodeData {
  label: string;
  description?: string;
  nodeType: string;
  color: string;
  icon: string;
  hasError?: boolean;
  errorMessage?: string;
  [key: string]: unknown;
}

const CustomNodeComponent = ({
  data,
  selected,
}: NodeProps & { data: CustomNodeData }) => {
  const fieldCount = Array.isArray(data.fields) ? data.fields.length : 0;
  const route = data.route as string | undefined;
  const method = data.method as string | undefined;
  const framework = data.framework as string | undefined;

  return (
    <div
      className={`relative rounded-lg border-2 px-4 py-3 min-w-[180px] shadow-md transition-all ${
        data.hasError
          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
          : selected
            ? "border-blue-500 bg-white shadow-lg ring-2 ring-blue-200 dark:bg-gray-800 dark:ring-blue-500/30"
            : "border-gray-300 bg-white hover:shadow-lg dark:border-gray-600 dark:bg-gray-800"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !bg-gray-400 !border-2 !border-white"
      />

      <div className="flex items-center gap-2">
        <span className="text-lg" style={{ color: data.color }}>
          {data.icon}
        </span>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {data.label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {data.nodeType}
          </div>
        </div>
      </div>

      {data.description && (
        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500 truncate">
          {data.description}
        </div>
      )}

      {fieldCount > 0 && (
        <div className="mt-2 flex items-center gap-1">
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {fieldCount} {fieldCount === 1 ? "campo" : "campos"}
          </span>
        </div>
      )}

      {route && (
        <div className="mt-2 flex items-center gap-1">
          {method && (
            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-300">
              {method}
            </span>
          )}
          <span className="font-mono text-xs text-gray-500 dark:text-gray-400 truncate">
            {route}
          </span>
        </div>
      )}

      {framework && !route && !fieldCount && (
        <div className="mt-2">
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
            {framework === "NEXTJS" ? "Next.js" : framework}
          </span>
        </div>
      )}

      {data.hasError && data.errorMessage && (
        <div className="mt-2 rounded bg-red-100 px-2 py-1 text-xs text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {data.errorMessage}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !bg-gray-400 !border-2 !border-white"
      />
    </div>
  );
};

export const CustomNode = memo(CustomNodeComponent);
