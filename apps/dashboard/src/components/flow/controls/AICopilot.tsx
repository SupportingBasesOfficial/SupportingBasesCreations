"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, X, Send, Wand2 } from "lucide-react";
import { useGraphStore } from "../../../store/graphStore";
import type { GraphNode, GraphEdge } from "@sbc/shared";
import { useToast } from "../../Toast";

const EXAMPLES = [
  "Build a SaaS app with user authentication, a PostgreSQL database, and Stripe billing",
  "Create a real-time chat app with WebSocket support and Redis caching",
  "Design an e-commerce platform with CDN, product catalog, and order queue",
  "Build a multi-tenant SaaS with auth, audit logging, and background jobs",
];

export function AICopilot() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const loadGraph = useGraphStore((s) => s.loadGraph);
  const addNode = useGraphStore((s) => s.addNode);
  const nodes = useGraphStore((s) => s.nodes);
  const toast = useToast();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai-copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "AI generation failed");
        return;
      }

      const { nodes: aiNodes, edges: aiEdges } = data as {
        nodes: GraphNode[];
        edges: GraphEdge[];
        explanation: string;
      };

      if (nodes.length > 0) {
        const offset = nodes.length;
        aiNodes.forEach((node) => {
          addNode({
            ...node,
            id: `ai-${Date.now()}-${node.id}`,
            position: {
              x: node.position.x + offset * 50,
              y: node.position.y + offset * 30,
            },
          });
        });
        toast.success(`Added ${aiNodes.length} nodes from AI`);
      } else {
        loadGraph({ nodes: aiNodes, edges: aiEdges });
        toast.success("Architecture generated from AI");
      }

      setOpen(false);
      setPrompt("");
    } catch {
      toast.error("Failed to connect to AI service");
    } finally {
      setLoading(false);
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
        title="AI Architecture Copilot"
      >
        <Wand2 size={16} />
        <span className="hidden sm:inline">AI Copilot</span>
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
                  AI Architecture Copilot
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
              Describe your project in natural language and AI will build the architecture graph for you.
            </p>

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
              placeholder="e.g. Build a SaaS app with auth, database, and Stripe billing..."
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
                  Generating Architecture...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Generate Architecture
                </>
              )}
            </button>

            <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
              Press Cmd/Ctrl + Enter to generate
            </p>
          </div>
        </div>
      )}
    </>
  );
}
