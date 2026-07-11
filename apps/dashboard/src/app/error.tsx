"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-8 dark:bg-gray-950">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle size={32} className="text-red-600" />
      </div>
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        Application Error
      </h1>
      <p className="max-w-md text-center text-sm text-gray-500 dark:text-gray-400">
        {error.message || "An unexpected server error occurred."}
        {error.digest && (
          <span className="mt-1 block font-mono text-xs text-gray-400">
            Error ID: {error.digest}
          </span>
        )}
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        <RefreshCw size={16} />
        Try Again
      </button>
    </div>
  );
}
