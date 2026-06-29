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
  return (
    <div
      className={`relative rounded-lg border-2 px-4 py-3 min-w-[180px] shadow-md transition-all ${
        data.hasError
          ? "border-red-500 bg-red-50"
          : selected
            ? "border-blue-500 bg-white shadow-lg ring-2 ring-blue-200"
            : "border-gray-300 bg-white hover:shadow-lg"
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
          <div className="text-sm font-semibold text-gray-800">
            {data.label}
          </div>
          <div className="text-xs text-gray-500">{data.nodeType}</div>
        </div>
      </div>

      {data.description && (
        <div className="mt-1 text-xs text-gray-400 truncate">
          {data.description}
        </div>
      )}

      {data.hasError && data.errorMessage && (
        <div className="mt-2 rounded bg-red-100 px-2 py-1 text-xs text-red-600">
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
