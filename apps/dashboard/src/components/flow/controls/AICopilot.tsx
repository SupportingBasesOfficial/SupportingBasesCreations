"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, X, Send, Wand2 } from "lucide-react";
import { useGraphStore } from "../../../store/graphStore";
import type { GraphNode, GraphEdge } from "@sbc/shared";
import { useToast } from "../../Toast";

const EXAMPLES = [
  "Um app de SaaS com login de usuários, banco de dados e cobrança via Stripe",
  "Um chat em tempo real com WebSocket e cache Redis",
  "Uma loja online com catálogo de produtos, CDN e fila de pedidos",
  "Um app de tarefas com projetos, equipes e login",
];

export function AICopilot() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<
    { role: "user" | "assistant"; content: string; timestamp: number }[]
  >([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const loadGraph = useGraphStore((s) => s.loadGraph);
  const nodes = useGraphStore((s) => s.nodes);
  const toast = useToast();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("sbc-open-ai-copilot", handler);
    return () => window.removeEventListener("sbc-open-ai-copilot", handler);
  }, []);

  const [streamingProgress, setStreamingProgress] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setStreamingProgress("");

    const userMessage = prompt.trim();
    const history = conversations.map((c) => ({
      role: c.role,
      content: c.content,
    }));

    try {
      const res = await fetch("/api/ai-copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage, history, stream: true }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? "Falha na geração pela IA");
        return;
      }

      const contentType = res.headers.get("content-type") ?? "";

      let fullContent = "";

      if (contentType.includes("text/event-stream")) {
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        let reading = true;
        while (reading) {
          const { done, value } = await reader.read();
          if (done) {
            reading = false;
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                fullContent += data.chunk;
                setStreamingProgress(
                  fullContent.length > 60
                    ? fullContent.slice(0, 60) + "..."
                    : fullContent,
                );
              }
            } catch {
              // skip
            }
          }
        }
      } else {
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error ?? "Falha na geração pela IA");
          return;
        }
        fullContent = JSON.stringify(data);
      }

      let parsed: {
        nodes: GraphNode[];
        edges: GraphEdge[];
        explanation?: string;
      };
      try {
        parsed = JSON.parse(fullContent);
      } catch {
        toast.error("Resposta inválida da IA");
        return;
      }

      const { nodes: aiNodes, edges: aiEdges, explanation } = parsed;

      setConversations((prev) => [
        ...prev,
        { role: "user", content: userMessage, timestamp: Date.now() },
        {
          role: "assistant",
          content: explanation ?? "Arquitetura gerada",
          timestamp: Date.now(),
        },
      ]);

      if (!Array.isArray(aiNodes) || !Array.isArray(aiEdges)) {
        toast.error("Resposta inválida da IA");
        return;
      }

      if (aiNodes.length === 0) {
        toast.info("A IA não gerou nenhum bloco para esse prompt");
        return;
      }

      if (nodes.length > 0) {
        const idMap = new Map<string, string>();
        const newNodes = aiNodes.map((node) => {
          const newId = `ai-${Date.now()}-${node.id}`;
          idMap.set(node.id, newId);
          return {
            ...node,
            id: newId,
            position: {
              x: node.position.x + nodes.length * 50,
              y: node.position.y + nodes.length * 30,
            },
          };
        });
        const newEdges = aiEdges
          .map((edge) => {
            const mappedSource = idMap.get(edge.source);
            const mappedTarget = idMap.get(edge.target);
            if (!mappedSource || !mappedTarget) return null;
            return {
              ...edge,
              id: `ai-edge-${Date.now()}-${edge.id}`,
              source: mappedSource,
              target: mappedTarget,
            };
          })
          .filter((e): e is GraphEdge => e !== null);

        const mergedGraph = {
          nodes: [...nodes, ...newNodes],
          edges: [...useGraphStore.getState().edges, ...newEdges],
        };
        loadGraph(mergedGraph);
        toast.success(
          `✨ ${newNodes.length} blocos e ${newEdges.length} conexões adicionados pela IA`,
        );
      } else {
        loadGraph({ nodes: aiNodes, edges: aiEdges });
        toast.success(
          `✨ Arquitetura gerada pela IA com ${aiNodes.length} blocos`,
        );
      }

      setOpen(false);
      setPrompt("");
    } catch {
      toast.error("Não foi possível conectar à IA");
    } finally {
      setLoading(false);
      setStreamingProgress("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 text-sm font-medium text-white shadow-md transition-all hover:from-purple-700 hover:to-pink-700"
        title="Copiloto de IA para Arquitetura"
      >
        <Wand2 size={16} />
        <span className="hidden sm:inline">IA Copiloto</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  IA Copiloto de Arquitetura
                </h2>
              </div>
              <button
                onClick={() => !loading && setOpen(false)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              Descreva seu projeto em linguagem natural e a IA vai montar a
              arquitetura completa para você.
            </p>

            {conversations.length > 0 && (
              <div className="mb-3 max-h-32 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-gray-700">
                <p className="mb-1.5 text-xs font-medium text-gray-400 dark:text-gray-500">
                  Histórico de conversas
                </p>
                {conversations.slice(-6).map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-1 flex gap-2 text-xs ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <button
                      onClick={() =>
                        msg.role === "user" && setPrompt(msg.content)
                      }
                      disabled={loading || msg.role !== "user"}
                      className={`max-w-[80%] rounded-lg px-2 py-1 text-left ${
                        msg.role === "user"
                          ? "cursor-pointer bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      <span className="font-medium">
                        {msg.role === "user" ? "Você: " : "IA: "}
                      </span>
                      {msg.content.length > 80
                        ? msg.content.slice(0, 80) + "..."
                        : msg.content}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-3 flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  disabled={loading}
                  className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-600 transition-colors hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50"
                >
                  {ex.length > 40 ? ex.slice(0, 40) + "..." : ex}
                </button>
              ))}
            </div>

            <textarea
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: Um app de delivery com restaurantes, pedidos e entregadores..."
              rows={3}
              disabled={loading}
              className="mb-3 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
            />

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {streamingProgress ? (
                    <span className="truncate">
                      Gerando: {streamingProgress}
                    </span>
                  ) : (
                    "Gerando arquitetura..."
                  )}
                </>
              ) : (
                <>
                  <Send size={16} />
                  Gerar Arquitetura
                </>
              )}
            </button>

            {loading && (
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-purple-500">
                  <Loader2 size={12} className="animate-spin" />
                  Analisando sua ideia...
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <div
                    className="h-full w-1/3 animate-pulse rounded-full bg-purple-500"
                    style={{
                      animation: "sbc-progress 2s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            )}

            <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
              Pressione Ctrl + Enter para gerar
            </p>
          </div>
        </div>
      )}
    </>
  );
}
