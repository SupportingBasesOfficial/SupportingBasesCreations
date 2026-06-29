"use client";

import { NodeType } from "@sbc/shared";

export interface NodePaletteItem {
  type: NodeType;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export const NODE_PALETTE: NodePaletteItem[] = [
  {
    type: NodeType.FRONTEND_COMPONENT,
    label: "Frontend",
    icon: "🌐",
    color: "#3b82f6",
    description: "React/Next.js frontend component",
  },
  {
    type: NodeType.API_ROUTE,
    label: "API Route",
    icon: "⚡",
    color: "#22c55e",
    description: "tRPC/REST API endpoint",
  },
  {
    type: NodeType.CLOUD_DATABASE,
    label: "Database",
    icon: "🗄️",
    color: "#8b5cf6",
    description: "PostgreSQL/Supabase table",
  },
  {
    type: NodeType.AUTH_SERVICE,
    label: "Auth Service",
    icon: "🛡️",
    color: "#f97316",
    description: "Authentication provider",
  },
  {
    type: NodeType.CACHE_LAYER,
    label: "Cache",
    icon: "⚡",
    color: "#eab308",
    description: "Redis cache layer",
  },
  {
    type: NodeType.QUEUE_SERVICE,
    label: "Queue",
    icon: "📬",
    color: "#ec4899",
    description: "Message queue (RabbitMQ/Kafka)",
  },
  {
    type: NodeType.CDN_EDGE,
    label: "CDN / Edge",
    icon: "🌍",
    color: "#06b6d4",
    description: "CDN edge network",
  },
  {
    type: NodeType.WEBHOOK_HANDLER,
    label: "Webhook",
    icon: "🔗",
    color: "#ef4444",
    description: "Webhook event handler",
  },
];

export function getNodeConfig(type: NodeType): NodePaletteItem {
  return NODE_PALETTE.find((n) => n.type === type) ?? NODE_PALETTE[0];
}
