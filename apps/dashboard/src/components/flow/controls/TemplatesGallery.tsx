"use client";

import { useState, useEffect } from "react";
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
  category: "iniciante" | "intermediario" | "avancado";
  nodes: TemplateNode[];
  edges: TemplateEdge[];
}

const TEMPLATES: Template[] = [
  {
    id: "saas-starter",
    name: "SaaS Starter",
    description: "Postgres + API de Auth + frontend Next.js",
    icon: "🚀",
    category: "iniciante",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-1",
        position: { x: 100, y: 100 },
        data: {
          label: "Postgres DB",
          description: "Primary database",
          tableName: "users",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "email",
              type: "string",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "name",
              type: "string",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-1",
        position: { x: 350, y: 100 },
        data: {
          label: "Auth API",
          description: "Authentication service",
          method: "POST",
          route: "/api/auth",
        },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-1",
        position: { x: 600, y: 100 },
        data: {
          label: "Next.js App",
          description: "Web frontend",
          framework: "NEXTJS",
          styling: "TAILWIND",
          features: [],
        },
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
    description: "Supabase + API de Conteúdo + frontend estático",
    icon: "📝",
    category: "iniciante",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-2",
        position: { x: 100, y: 150 },
        data: {
          label: "Supabase",
          description: "Postgres + Storage",
          tableName: "posts",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "title",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "content",
              type: "text",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "published",
              type: "boolean",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-2",
        position: { x: 350, y: 150 },
        data: {
          label: "Content API",
          description: "REST/GraphQL",
          method: "GET",
          route: "/api/posts",
        },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-2",
        position: { x: 600, y: 150 },
        data: {
          label: "Astro Blog",
          description: "Static site",
          framework: "NEXTJS",
          styling: "TAILWIND",
          features: [],
        },
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
    description: "Banco + API de Produtos + API de Pedidos + Loja",
    icon: "🛒",
    category: "intermediario",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-3",
        position: { x: 100, y: 200 },
        data: {
          label: "Postgres",
          description: "Products + Orders",
          tableName: "products",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "name",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "price",
              type: "float",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "stock",
              type: "integer",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-3a",
        position: { x: 350, y: 100 },
        data: {
          label: "Products API",
          description: "Catalog service",
          method: "GET",
          route: "/api/products",
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-3b",
        position: { x: 350, y: 300 },
        data: {
          label: "Orders API",
          description: "Checkout service",
          method: "POST",
          route: "/api/orders",
        },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-3",
        position: { x: 650, y: 200 },
        data: {
          label: "Storefront",
          description: "Next.js shop",
          framework: "NEXTJS",
          styling: "TAILWIND",
          features: [],
        },
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
    description: "Supabase Realtime + Auth + Interface de Chat",
    icon: "💬",
    category: "intermediario",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-4",
        position: { x: 100, y: 150 },
        data: {
          label: "Supabase",
          description: "Realtime + DB",
          tableName: "messages",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "user_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "content",
              type: "text",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-4",
        position: { x: 350, y: 150 },
        data: {
          label: "Auth API",
          description: "JWT auth",
          method: "POST",
          route: "/api/auth",
        },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-4",
        position: { x: 600, y: 150 },
        data: {
          label: "Chat UI",
          description: "React app",
          framework: "NEXTJS",
          styling: "TAILWIND",
          features: [],
        },
      },
    ],
    edges: [
      { source: "db-4", target: "api-4" },
      { source: "api-4", target: "fe-4" },
    ],
  },
  {
    id: "delivery-app",
    name: "App de Delivery",
    description: "Restaurantes, pedidos, entregadores — completo",
    icon: "🛵",
    category: "avancado",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-restaurants",
        position: { x: 50, y: 50 },
        data: {
          label: "Restaurantes",
          description: "Cadastro de restaurantes parceiros",
          tableName: "restaurants",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "name",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "description",
              type: "text",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "address",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "phone",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "rating",
              type: "float",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "is_open",
              type: "boolean",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "updated_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-menu-items",
        position: { x: 50, y: 250 },
        data: {
          label: "Itens do Cardápio",
          description: "Pratos e produtos de cada restaurante",
          tableName: "menu_items",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "restaurant_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "name",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "description",
              type: "text",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "price",
              type: "float",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "category",
              type: "string",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "is_available",
              type: "boolean",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-orders",
        position: { x: 50, y: 450 },
        data: {
          label: "Pedidos",
          description: "Pedidos dos clientes com status de entrega",
          tableName: "orders",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "customer_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "restaurant_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "driver_id",
              type: "uuid",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "total",
              type: "float",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "status",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "delivery_address",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "updated_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-drivers",
        position: { x: 50, y: 650 },
        data: {
          label: "Entregadores",
          description: "Cadastro de entregadores",
          tableName: "drivers",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "name",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "phone",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "vehicle_type",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "is_available",
              type: "boolean",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "rating",
              type: "float",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-restaurants",
        position: { x: 400, y: 50 },
        data: {
          label: "Restaurantes API",
          description: "Lista e gerencia restaurantes",
          method: "GET",
          route: "/api/restaurants",
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-orders",
        position: { x: 400, y: 350 },
        data: {
          label: "Pedidos API",
          description: "Cria e acompanha pedidos",
          method: "POST",
          route: "/api/orders",
        },
      },
      {
        type: NodeType.AUTH_SERVICE,
        tempId: "auth-delivery",
        position: { x: 400, y: 600 },
        data: {
          label: "Login",
          description: "Autenticação de clientes e entregadores",
        },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-delivery",
        position: { x: 750, y: 300 },
        data: {
          label: "App de Delivery",
          description: "Cliente pede, restaurante recebe, entregador entrega",
          framework: "NEXTJS",
          styling: "TAILWIND",
          features: [],
        },
      },
    ],
    edges: [
      { source: "db-restaurants", target: "api-restaurants" },
      { source: "db-menu-items", target: "api-restaurants" },
      { source: "db-orders", target: "api-orders" },
      { source: "db-drivers", target: "api-orders" },
      { source: "api-restaurants", target: "fe-delivery" },
      { source: "api-orders", target: "fe-delivery" },
      { source: "auth-delivery", target: "fe-delivery" },
      { source: "auth-delivery", target: "db-orders" },
    ],
  },
  {
    id: "social-network",
    name: "Rede Social",
    description: "Posts, comentários, curtidas, seguidores",
    icon: "📱",
    category: "avancado",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-users-soc",
        position: { x: 50, y: 50 },
        data: {
          label: "Usuários",
          description: "Perfis dos usuários da rede",
          tableName: "users",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "username",
              type: "string",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "email",
              type: "string",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "bio",
              type: "text",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "avatar_url",
              type: "string",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "followers_count",
              type: "integer",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-posts",
        position: { x: 50, y: 250 },
        data: {
          label: "Posts",
          description: "Publicações dos usuários",
          tableName: "posts",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "user_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "content",
              type: "text",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "image_url",
              type: "string",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "likes_count",
              type: "integer",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "comments_count",
              type: "integer",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-comments",
        position: { x: 50, y: 450 },
        data: {
          label: "Comentários",
          description: "Comentários nos posts",
          tableName: "comments",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "post_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "user_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "content",
              type: "text",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-posts",
        position: { x: 400, y: 150 },
        data: {
          label: "Posts API",
          description: "Criar, listar, curtir posts",
          method: "GET",
          route: "/api/posts",
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-social",
        position: { x: 400, y: 400 },
        data: {
          label: "Social API",
          description: "Seguir, comentar, curtir",
          method: "POST",
          route: "/api/social",
        },
      },
      {
        type: NodeType.AUTH_SERVICE,
        tempId: "auth-social",
        position: { x: 400, y: 600 },
        data: {
          label: "Login",
          description: "Cadastro e login de usuários",
        },
      },
      {
        type: NodeType.CDN_EDGE,
        tempId: "cdn-social",
        position: { x: 750, y: 50 },
        data: {
          label: "CDN de Imagens",
          description: "Serve fotos de perfil e posts rapidamente",
        },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-social",
        position: { x: 750, y: 350 },
        data: {
          label: "Rede Social",
          description: "Feed, perfis, notificações",
          framework: "NEXTJS",
          styling: "TAILWIND",
          features: [],
        },
      },
    ],
    edges: [
      { source: "db-users-soc", target: "api-posts" },
      { source: "db-posts", target: "api-posts" },
      { source: "db-comments", target: "api-social" },
      { source: "api-posts", target: "fe-social" },
      { source: "api-social", target: "fe-social" },
      { source: "auth-social", target: "fe-social" },
      { source: "auth-social", target: "db-users-soc" },
      { source: "cdn-social", target: "fe-social" },
    ],
  },
  {
    id: "task-manager",
    name: "Gestor de Tarefas",
    description: "Projetos, tarefas, equipes e prazos",
    icon: "✅",
    category: "intermediario",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-projects",
        position: { x: 50, y: 50 },
        data: {
          label: "Projetos",
          description: "Projetos da equipe",
          tableName: "projects",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "name",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "description",
              type: "text",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "owner_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "status",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-tasks",
        position: { x: 50, y: 250 },
        data: {
          label: "Tarefas",
          description: "Tarefas dentro de cada projeto",
          tableName: "tasks",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "project_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "assignee_id",
              type: "uuid",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "title",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "description",
              type: "text",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "status",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "priority",
              type: "string",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "due_date",
              type: "date",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-team-members",
        position: { x: 50, y: 450 },
        data: {
          label: "Membros",
          description: "Equipe e atribuições",
          tableName: "team_members",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "project_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "user_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "role",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "joined_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-projects",
        position: { x: 400, y: 100 },
        data: {
          label: "Projetos API",
          description: "CRUD de projetos",
          method: "GET",
          route: "/api/projects",
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-tasks",
        position: { x: 400, y: 300 },
        data: {
          label: "Tarefas API",
          description: "CRUD de tarefas, atribuir responsável",
          method: "POST",
          route: "/api/tasks",
        },
      },
      {
        type: NodeType.AUTH_SERVICE,
        tempId: "auth-tasks",
        position: { x: 400, y: 550 },
        data: {
          label: "Login",
          description: "Login de membros da equipe",
        },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-tasks",
        position: { x: 750, y: 300 },
        data: {
          label: "Gestor de Tarefas",
          description: "Kanban board, calendário, notificações",
          framework: "NEXTJS",
          styling: "TAILWIND",
          features: [],
        },
      },
    ],
    edges: [
      { source: "db-projects", target: "api-projects" },
      { source: "db-tasks", target: "api-tasks" },
      { source: "db-team-members", target: "api-projects" },
      { source: "api-projects", target: "fe-tasks" },
      { source: "api-tasks", target: "fe-tasks" },
      { source: "auth-tasks", target: "fe-tasks" },
    ],
  },
  {
    id: "course-platform",
    name: "Plataforma de Cursos",
    description: "Cursos, aulas, matrículas e progresso",
    icon: "🎓",
    category: "avancado",
    nodes: [
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-courses",
        position: { x: 50, y: 50 },
        data: {
          label: "Cursos",
          description: "Catálogo de cursos disponíveis",
          tableName: "courses",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "title",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "description",
              type: "text",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "instructor_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "price",
              type: "float",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "is_published",
              type: "boolean",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-lessons",
        position: { x: 50, y: 250 },
        data: {
          label: "Aulas",
          description: "Vídeo-aulas de cada curso",
          tableName: "lessons",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "course_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "title",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "video_url",
              type: "string",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "duration",
              type: "integer",
              required: false,
              unique: false,
              nullable: true,
            },
            {
              name: "order",
              type: "integer",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.CLOUD_DATABASE,
        tempId: "db-enrollments",
        position: { x: 50, y: 450 },
        data: {
          label: "Matrículas",
          description: "Alunos matriculados e seu progresso",
          tableName: "enrollments",
          fields: [
            {
              name: "id",
              type: "uuid",
              required: true,
              unique: true,
              nullable: false,
            },
            {
              name: "course_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "user_id",
              type: "uuid",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "progress",
              type: "float",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "completed",
              type: "boolean",
              required: true,
              unique: false,
              nullable: false,
            },
            {
              name: "enrolled_at",
              type: "timestamp",
              required: true,
              unique: false,
              nullable: false,
            },
          ],
          features: [],
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-courses",
        position: { x: 400, y: 100 },
        data: {
          label: "Cursos API",
          description: "Lista cursos, matricula alunos",
          method: "GET",
          route: "/api/courses",
        },
      },
      {
        type: NodeType.API_ROUTE,
        tempId: "api-progress",
        position: { x: 400, y: 350 },
        data: {
          label: "Progresso API",
          description: "Marca aulas como concluídas",
          method: "POST",
          route: "/api/progress",
        },
      },
      {
        type: NodeType.AUTH_SERVICE,
        tempId: "auth-course",
        position: { x: 400, y: 550 },
        data: {
          label: "Login",
          description: "Login de alunos e instrutores",
        },
      },
      {
        type: NodeType.CDN_EDGE,
        tempId: "cdn-course",
        position: { x: 750, y: 50 },
        data: {
          label: "CDN de Vídeos",
          description: "Entrega vídeo-aulas sem buffering",
        },
      },
      {
        type: NodeType.FRONTEND_COMPONENT,
        tempId: "fe-course",
        position: { x: 750, y: 350 },
        data: {
          label: "Plataforma de Cursos",
          description: "Catálogo, player de vídeo, dashboard de progresso",
          framework: "NEXTJS",
          styling: "TAILWIND",
          features: [],
        },
      },
    ],
    edges: [
      { source: "db-courses", target: "api-courses" },
      { source: "db-lessons", target: "api-courses" },
      { source: "db-enrollments", target: "api-progress" },
      { source: "api-courses", target: "fe-course" },
      { source: "api-progress", target: "fe-course" },
      { source: "auth-course", target: "fe-course" },
      { source: "cdn-course", target: "fe-course" },
    ],
  },
];

const NODE_TYPE_COLORS: Record<string, string> = {
  CLOUD_DATABASE: "bg-blue-500",
  API_ROUTE: "bg-green-500",
  FRONTEND_COMPONENT: "bg-purple-500",
  AUTH_SERVICE: "bg-amber-500",
  CACHE_LAYER: "bg-red-400",
  QUEUE_SERVICE: "bg-orange-500",
  CDN_EDGE: "bg-cyan-400",
  WEBHOOK_HANDLER: "bg-pink-400",
};

const CATEGORY_LABELS: Record<Template["category"], string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const CATEGORY_ORDER: Template["category"][] = [
  "iniciante",
  "intermediario",
  "avancado",
];

export function TemplatesGallery() {
  const [open, setOpen] = useState(false);
  const loadGraph = useGraphStore((s) => s.loadGraph);
  const toast = useToast();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("sbc-open-templates", handler);
    return () => window.removeEventListener("sbc-open-templates", handler);
  }, []);

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
    toast.success(`Modelo "${tpl.name}" carregado`);
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
                Modelos de Arquitetura
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[60vh] space-y-6 overflow-y-auto pr-1">
              {CATEGORY_ORDER.map((cat) => {
                const catTemplates = TEMPLATES.filter(
                  (t) => t.category === cat,
                );
                if (catTemplates.length === 0) return null;
                return (
                  <div key={cat}>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {catTemplates.map((tpl) => (
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
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {tpl.nodes.length} blocos
                            </span>
                            <div className="flex gap-1">
                              {tpl.nodes.slice(0, 8).map((n, i) => (
                                <span
                                  key={i}
                                  className={`h-2 w-2 rounded-full ${NODE_TYPE_COLORS[n.type] ?? "bg-gray-400"}`}
                                  title={n.type}
                                />
                              ))}
                              {tpl.nodes.length > 8 && (
                                <span className="text-[10px] text-gray-400">
                                  +{tpl.nodes.length - 8}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
