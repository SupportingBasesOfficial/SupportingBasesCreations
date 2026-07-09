"use client";

import { NodeType } from "@sbc/shared";

export interface NodePaletteItem {
  type: NodeType;
  label: string;
  icon: string;
  color: string;
  description: string;
  category: "basic" | "advanced";
}

export const NODE_PALETTE: NodePaletteItem[] = [
  {
    type: NodeType.FRONTEND_COMPONENT,
    label: "Tela do App",
    icon: "🌐",
    color: "#3b82f6",
    description: "A interface que o usuário vê e clica",
    category: "basic",
  },
  {
    type: NodeType.API_ROUTE,
    label: "API",
    icon: "⚡",
    color: "#22c55e",
    description: "Recebe pedidos e devolve dados",
    category: "basic",
  },
  {
    type: NodeType.CLOUD_DATABASE,
    label: "Banco de Dados",
    icon: "🗄️",
    color: "#8b5cf6",
    description: "Onde os dados ficam salvos",
    category: "basic",
  },
  {
    type: NodeType.AUTH_SERVICE,
    label: "Login e Segurança",
    icon: "🛡️",
    color: "#f97316",
    description: "Controla quem pode entrar no app",
    category: "basic",
  },
  {
    type: NodeType.CACHE_LAYER,
    label: "Memória Rápida",
    icon: "⚡",
    color: "#eab308",
    description: "Deixa o app mais rápido guardando dados em memória",
    category: "advanced",
  },
  {
    type: NodeType.QUEUE_SERVICE,
    label: "Fila de Tarefas",
    icon: "📬",
    color: "#ec4899",
    description: "Processa tarefas em segundo plano (emails, notificações)",
    category: "advanced",
  },
  {
    type: NodeType.CDN_EDGE,
    label: "CDN",
    icon: "🌍",
    color: "#06b6d4",
    description: "Deixa o site rápido em qualquer lugar do mundo",
    category: "advanced",
  },
  {
    type: NodeType.WEBHOOK_HANDLER,
    label: "Webhook",
    icon: "🔗",
    color: "#ef4444",
    description: "Recebe avisos de outros sistemas (pagamentos, etc)",
    category: "advanced",
  },
];

export function getNodeConfig(type: NodeType): NodePaletteItem {
  return NODE_PALETTE.find((n) => n.type === type) ?? NODE_PALETTE[0];
}
