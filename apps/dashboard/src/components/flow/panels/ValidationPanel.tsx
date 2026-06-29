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
    <div className="absolute bottom-4 left-4 z-10 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
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
          <span className="text-sm font-medium text-gray-700">
            {isValid
              ? "Architecture Valid"
              : `${errorCount} Error${errorCount > 1 ? "s" : ""}`}
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
        <div className="max-h-60 overflow-y-auto border-t border-gray-200 px-4 py-2">
          <ul className="space-y-2">
            {errors.map((error, idx) => (
              <li
                key={`${error.code}-${idx}`}
                onClick={() => error.nodeId && setSelectedNode(error.nodeId)}
                className="cursor-pointer rounded-md bg-red-50 px-3 py-2 text-xs text-red-600 hover:bg-red-100"
              >
                <div className="font-medium">{error.code}</div>
                <div className="mt-0.5 text-red-500">{error.message}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
