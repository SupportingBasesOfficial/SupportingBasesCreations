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
  const [status, setStatus] = useState<"streaming" | "complete" | "failed">(
    "streaming",
  );
  const [connected, setConnected] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const addLog = useCallback(
    (message: string, level: DeployLogEntry["level"] = "info") => {
      setLogs((prev) => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString(), message, level },
      ]);
    },
    [],
  );

  useEffect(() => {
    if (!open || !deployId) return;

    let cancelled = false;

    const connect = () => {
      if (cancelled) return;

      setLogs([]);
      setStatus("streaming");
      setConnected(false);
      retryCountRef.current = 0;

      addLog(`Conectando ao deploy ${deployId}...`, "info");

      const connectSSE = () => {
        if (cancelled) return;

        const es = new EventSource(`/api/deploy-logs?deployId=${deployId}`);
        eventSourceRef.current = es;

        es.onopen = () => {
          setConnected(true);
          retryCountRef.current = 0;
          addLog("Conectado ao stream de logs", "success");
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
                addLog("Deploy concluído com sucesso!", "success");
              } else {
                addLog("Deploy falhou", "error");
              }
              es.close();
              return;
            }
            if (data.log) {
              const rawLog = data.log;
              let message = "";
              let level: DeployLogEntry["level"] = "info";

              try {
                const parsed =
                  typeof rawLog === "string" ? JSON.parse(rawLog) : rawLog;
                if (parsed.type === "progress") {
                  message =
                    parsed.message ?? `${parsed.step}: ${parsed.percentage}%`;
                  level = parsed.step === "failed" ? "error" : "info";
                } else if (parsed.type === "result") {
                  message = parsed.success
                    ? `Deploy succeeded — GitHub: ${parsed.githubUrl ?? "n/a"}, Vercel: ${parsed.vercelUrl ?? "n/a"}`
                    : `Deploy failed: ${parsed.error ?? "unknown"}`;
                  level = parsed.success ? "success" : "error";
                } else if (parsed.type === "done") {
                  message = `Deploy ${parsed.status}`;
                  level = parsed.status === "complete" ? "success" : "error";
                } else {
                  message =
                    typeof rawLog === "string"
                      ? rawLog
                      : JSON.stringify(parsed);
                }
              } catch {
                message = typeof rawLog === "string" ? rawLog : String(rawLog);
              }

              if (!message) message = String(rawLog);

              if (level === "info" && /error|fail/i.test(message))
                level = "error";
              else if (level === "info" && /warn/i.test(message))
                level = "warn";
              else if (level === "info" && /success|complete/i.test(message))
                level = "success";

              addLog(message, level);
            }
          } catch {
            // ignore parse errors
          }
        };

        es.onerror = () => {
          setConnected(false);
          es.close();

          if (cancelled) return;

          if (retryCountRef.current < maxRetries) {
            retryCountRef.current++;
            const delay = Math.min(1000 * 2 ** retryCountRef.current, 8000);
            addLog(
              `Reconectando (${retryCountRef.current}/${maxRetries}) em ${delay / 1000}s...`,
              "warn",
            );
            setTimeout(connectSSE, delay);
          } else {
            addLog("Conexão com o stream de logs perdida", "error");
          }
        };
      };

      connectSSE();
    };

    connect();

    return () => {
      cancelled = true;
      eventSourceRef.current?.close();
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
            <h2 className="text-lg font-semibold text-gray-100">
              Logs de Deploy
            </h2>
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
                    ? "Ao vivo"
                    : "Conectando..."
                  : status === "complete"
                    ? "Concluído"
                    : "Falhou"}
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
              Aguardando logs...
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={`${log.timestamp}-${i}`} className="flex gap-2 py-0.5">
                <span className="shrink-0 text-gray-600">{log.timestamp}</span>
                <span className={levelColors[log.level]}>{log.message}</span>
              </div>
            ))
          )}
          <div ref={logEndRef} />
        </div>

        <div className="border-t border-gray-800 px-4 py-2 text-xs text-gray-500">
          {logs.length} entradas de log
        </div>
      </div>
    </div>
  );
}
