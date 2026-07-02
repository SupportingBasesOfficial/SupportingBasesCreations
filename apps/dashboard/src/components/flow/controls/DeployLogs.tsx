"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface DeployLogEntry {
  timestamp: string;
  message: string;
  level: "info" | "warn" | "error" | "success";
}

interface DeployLogsProps {
  deployId: string | null;
  open: boolean;
  onClose: () => void;
}

export function DeployLogs({ deployId, open, onClose }: DeployLogsProps) {
  const [logs, setLogs] = useState<DeployLogEntry[]>([]);
  const [status, setStatus] = useState<"streaming" | "complete" | "failed">("streaming");
  const [connected, setConnected] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const addLog = useCallback((message: string, level: DeployLogEntry["level"] = "info") => {
    setLogs((prev) => [
      ...prev,
      { timestamp: new Date().toLocaleTimeString(), message, level },
    ]);
  }, []);

  useEffect(() => {
    if (!open || !deployId) return;

    setLogs([]);
    setStatus("streaming");
    setConnected(false);

    addLog(`Connecting to deploy ${deployId}...`, "info");

    const es = new EventSource(`/api/deploy-logs?deployId=${deployId}`);
    eventSourceRef.current = es;

    es.onopen = () => {
      setConnected(true);
      addLog("Connected to log stream", "success");
    };

    es.onmessage = (event) => {
      if (event.data === "[DONE]") {
        es.close();
        return;
      }

      try {
        const data = JSON.parse(event.data);
        if (data.done) {
          setStatus(data.status === "complete" ? "complete" : "failed");
          if (data.status === "complete") {
            addLog("Deployment completed successfully!", "success");
          } else {
            addLog("Deployment failed", "error");
          }
          es.close();
          return;
        }
        if (data.log) {
          const level: DeployLogEntry["level"] = data.log.includes("error")
            ? "error"
            : data.log.includes("warn")
              ? "warn"
              : data.log.includes("success") || data.log.includes("complete")
                ? "success"
                : "info";
          addLog(data.log, level);
        }
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      setConnected(false);
      addLog("Connection to log stream lost", "error");
      es.close();
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, [open, deployId, addLog]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  if (!open) return null;

  const levelColors: Record<DeployLogEntry["level"], string> = {
    info: "text-gray-300",
    warn: "text-yellow-400",
    error: "text-red-400",
    success: "text-green-400",
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-gray-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-green-500" />
            <h2 className="text-lg font-semibold text-gray-100">Deploy Logs</h2>
            <div className="flex items-center gap-1.5">
              {status === "streaming" && connected ? (
                <Loader2 size={12} className="animate-spin text-blue-400" />
              ) : status === "complete" ? (
                <CheckCircle2 size={14} className="text-green-400" />
              ) : status === "failed" ? (
                <AlertCircle size={14} className="text-red-400" />
              ) : null}
              <span className="text-xs text-gray-400">
                {status === "streaming"
                  ? connected
                    ? "Live"
                    : "Connecting..."
                  : status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
          {logs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              Waiting for logs...
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex gap-2 py-0.5">
                <span className="shrink-0 text-gray-600">{log.timestamp}</span>
                <span className={levelColors[log.level]}>{log.message}</span>
              </div>
            ))
          )}
          <div ref={logEndRef} />
        </div>

        <div className="border-t border-gray-800 px-4 py-2 text-xs text-gray-500">
          {logs.length} log entries
        </div>
      </div>
    </div>
  );
}
