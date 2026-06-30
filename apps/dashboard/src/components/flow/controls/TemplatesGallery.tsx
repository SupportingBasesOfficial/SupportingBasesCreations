"use client";

import { useState } from "react";
import { useGraphStore } from "../../../store/graphStore";
import { useToast } from "../../Toast";
import { LayoutTemplate, X } from "lucide-react";
import type { GraphNode, GraphEdge } from "@sbc/shared";
import { NodeType } from "@sbc/shared";
import { nanoid } from "nanoid";

interface TemplateNode extends Omit<GraphNode, "id"> {
  tempId: string;
}

interface TemplateEdge {
  source: string;
  target: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  nodes: TemplateNode[];
  edges: TemplateEdge[];
}

const TEMPLATES: Template[] = [
  {
    id: "saas-starter",
    name: "SaaS Starter",
    description: "Postgres + Auth API + Next.js frontend",
    icon: "🚀",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-1",
        position: { x: 100, y: 100 },
        data: { label: "Postgres DB", description: "Primary database" },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-1",
        position: { x: 350, y: 100 },
        data: { label: "Auth API", description: "Authentication service" },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-1",
        position: { x: 600, y: 100 },
        data: { label: "Next.js App", description: "Web frontend" },
      },
    ],
    edges: [
      { source: "db-1", target: "api-1" },
      { source: "api-1", target: "fe-1" },
    ],
  },
  {
    id: "blog-cms",
    name: "Blog / CMS",
    description: "Supabase + Content API + Static frontend",
    icon: "📝",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-2",
        position: { x: 100, y: 150 },
        data: { label: "Supabase", description: "Postgres + Storage" },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-2",
        position: { x: 350, y: 150 },
        data: { label: "Content API", description: "REST/GraphQL" },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-2",
        position: { x: 600, y: 150 },
        data: { label: "Astro Blog", description: "Static site" },
      },
    ],
    edges: [
      { source: "db-2", target: "api-2" },
      { source: "api-2", target: "fe-2" },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "DB + Products API + Orders API + Storefront",
    icon: "🛒",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-3",
        position: { x: 100, y: 200 },
        data: { label: "Postgres", description: "Products + Orders" },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-3a",
        position: { x: 350, y: 100 },
        data: { label: "Products API", description: "Catalog service" },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-3b",
        position: { x: 350, y: 300 },
        data: { label: "Orders API", description: "Checkout service" },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-3",
        position: { x: 650, y: 200 },
        data: { label: "Storefront", description: "Next.js shop" },
      },
    ],
    edges: [
      { source: "db-3", target: "api-3a" },
      { source: "db-3", target: "api-3b" },
      { source: "api-3a", target: "fe-3" },
      { source: "api-3b", target: "fe-3" },
    ],
  },
  {
    id: "realtime-chat",
    name: "Realtime Chat",
    description: "Supabase Realtime + Auth + Chat UI",
    icon: "💬",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-4",
        position: { x: 100, y: 150 },
        data: { label: "Supabase", description: "Realtime + DB" },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-4",
        position: { x: 350, y: 150 },
        data: { label: "Auth API", description: "JWT auth" },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-4",
        position: { x: 600, y: 150 },
        data: { label: "Chat UI", description: "React app" },
      },
    ],
    edges: [
      { source: "db-4", target: "api-4" },
      { source: "api-4", target: "fe-4" },
    ],
  },
];

export function TemplatesGallery() {
  const [open, setOpen] = useState(false);
  const loadGraph = useGraphStore((s) => s.loadGraph);
  const toast = useToast();

  const applyTemplate = (tpl: Template) => {
    const idMap = new Map<string, string>();
    const nodes: GraphNode[] = tpl.nodes.map((n) => {
      const id = nanoid();
      idMap.set(n.tempId, id);
      return { type: n.type, position: n.position, data: n.data, id };
    });

    const edges: GraphEdge[] = tpl.edges.map((e) => {
      const sourceId = idMap.get(e.source) ?? e.source;
      const targetId = idMap.get(e.target) ?? e.target;
      return {
        id: `edge-${nanoid()}`,
        source: sourceId,
        target: targetId,
      };
    });

    loadGraph({ nodes, edges });
    toast.success(`Template "${tpl.name}" loaded`);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <LayoutTemplate size={16} />
        Templates
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Architecture Templates
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => applyTemplate(tpl)}
                  className="flex flex-col items-start gap-2 rounded-lg border border-gray-200 p-4 text-left transition-all hover:border-blue-400 hover:shadow-md dark:border-gray-700 dark:hover:border-blue-500"
                >
                  <span className="text-3xl">{tpl.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {tpl.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tpl.description}
                    </div>
                  </div>
                  <div className="mt-1 flex gap-1">
                    {tpl.nodes.map((_, i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-blue-400"
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
