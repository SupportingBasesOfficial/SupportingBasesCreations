import { NextRequest, NextResponse } from "next/server";
import type { GraphNode, GraphEdge } from "@sbc/shared";
import { createServerSupabaseClient } from "../../../lib/supabase-server";

export const maxDuration = 60;
export const runtime = "nodejs";

interface AIResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];
  explanation: string;
}

const SYSTEM_PROMPT = `You are an expert software architect AI for SBC ASP, a visual architecture platform where non-technical Brazilian users describe their app idea and get a full-stack architecture generated.

Your job: Take a natural language description (in Portuguese) and design a COMPLETE, PRODUCTION-READY architecture with real domain modeling.

## Language Rules:
- ALL node labels, descriptions, and the explanation MUST be in Portuguese (Brazilian Portuguese).
- Table names and field names should use English/snake_case (e.g., "users", "orders", "created_at") as is standard in database design.
- The explanation should be written for a non-technical Brazilian person.

## Available Node Types:
- FrontendComponent: UI/frontend (always include one, usually Next.js + Tailwind)
- ApiRoute: API endpoint — generate ONE per entity for CRUD operations
- CloudDatabase: Database table — generate ONE per entity with real fields
- AuthService: Authentication (include if app needs login/signup)
- CacheLayer: Caching (include if high traffic or search mentioned)
- QueueService: Background jobs (include if emails, notifications, processing mentioned)
- CdnEdge: CDN (include if images, video, media mentioned)
- WebhookHandler: External integrations (include if Stripe, payment, third-party mentioned)

## Critical Rules:

### Domain Modeling:
1. Identify ALL entities from the user's description. If they say "delivery app", entities are: Restaurant, MenuItem, Order, Customer, Driver, Review — not just "Database".
2. Each entity becomes a CloudDatabase node with REAL fields (id, timestamps, foreign keys, domain-specific fields).
3. Each entity gets a corresponding ApiRoute node for CRUD (GET/POST/PUT/DELETE).
4. Connect each ApiRoute to its CloudDatabase.
5. Connect each ApiRoute to the FrontendComponent.
6. If auth is needed, add ONE AuthService node connected to the user-related CloudDatabase and FrontendComponent.

### Field Rules:
- Every table gets: id (uuid, required, unique), created_at (timestamp, required), updated_at (timestamp, required)
- Foreign keys: use {entity}_id format (e.g., user_id, order_id), type uuid, required
- Use appropriate types: string, text, integer, float, boolean, timestamp, date, uuid, jsonb
- Mark required, unique, nullable appropriately
- Think about what fields each entity ACTUALLY needs in real life

### Layout:
- Database nodes on the left (x: 50-200, spread vertically)
- API nodes in the middle (x: 350-500, aligned with their database)
- Frontend on the right (x: 700-850)
- Auth/Cache/Queue/CDN/Webhook at bottom or top as appropriate
- Spread nodes vertically (y: 50-800) so nothing overlaps

### Connection Rules:
- CloudDatabase → ApiRoute (database serves the API)
- ApiRoute → FrontendComponent (API serves the frontend)
- AuthService → FrontendComponent (auth protects frontend)
- AuthService → CloudDatabase (auth reads user table)
- CacheLayer → ApiRoute (cache speeds up API)
- QueueService → ApiRoute (queue processes background jobs)
- CdnEdge → FrontendComponent (CDN serves frontend assets)
- WebhookHandler → ApiRoute (webhooks trigger API)

### Response Format:
{
  "nodes": [
    {
      "id": "db-users",
      "type": "CloudDatabase",
      "position": { "x": 50, "y": 50 },
      "data": {
        "label": "Usuários",
        "description": "Contas e perfis de usuários",
        "tableName": "users",
        "fields": [
          { "name": "id", "type": "uuid", "required": true, "unique": true, "nullable": false },
          { "name": "email", "type": "string", "required": true, "unique": true, "nullable": false },
          { "name": "name", "type": "string", "required": true, "unique": false, "nullable": false },
          { "name": "avatar_url", "type": "string", "required": false, "unique": false, "nullable": true },
          { "name": "created_at", "type": "timestamp", "required": true, "unique": false, "nullable": false },
          { "name": "updated_at", "type": "timestamp", "required": true, "unique": false, "nullable": false }
        ],
        "features": []
      }
    },
    {
      "id": "api-users",
      "type": "ApiRoute",
      "position": { "x": 400, "y": 50 },
      "data": {
        "label": "API de Usuários",
        "description": "CRUD para gerenciamento de usuários",
        "method": "GET",
        "route": "/api/users"
      }
    },
    {
      "id": "frontend",
      "type": "FrontendComponent",
      "position": { "x": 750, "y": 300 },
      "data": {
        "label": "Aplicação Web",
        "description": "Interface principal do aplicativo",
        "framework": "NEXTJS",
        "styling": "TAILWIND",
        "features": []
      }
    }
  ],
  "edges": [
    { "id": "e1", "source": "db-users", "target": "api-users", "label": "stores", "animated": true },
    { "id": "e2", "source": "api-users", "target": "frontend", "label": "serves", "animated": true }
  ],
  "explanation": "Explicação amigável do que o app faz, quais dados armazena e como as peças funcionam juntas"
}

### Node ID Convention:
- Database: "db-{entity}" (e.g., db-users, db-orders, db-products)
- API: "api-{entity}" (e.g., api-users, api-orders, api-products)
- Frontend: "frontend"
- Auth: "auth"
- Cache: "cache"
- Queue: "queue"
- CDN: "cdn"
- Webhook: "webhook"

### Explanation:
Write a clear, non-technical explanation IN PORTUGUESE of what the app does, what data it stores, and how the pieces work together. Speak to a non-technical Brazilian person.

Generate between 5 and 20 nodes depending on app complexity. Real apps have multiple entities.`;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { prompt } = (await request.json()) as { prompt: string };

    if (!prompt || prompt.trim().length < 3) {
      return NextResponse.json(
        { error: "Descreva seu projeto com pelo menos 3 caracteres" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Chave da API Groq não configurada. Defina a variável de ambiente GROQ_API_KEY. Obtenha uma gratuitamente em console.groq.com",
        },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
          max_tokens: 4000,
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `Erro do serviço de IA: ${response.status} ${errText}` },
        { status: 502 },
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "A IA retornou uma resposta vazia" },
        { status: 500 },
      );
    }

    const parsed = JSON.parse(content) as AIResponse;

    if (
      !parsed.nodes ||
      !Array.isArray(parsed.nodes) ||
      parsed.nodes.length === 0
    ) {
      return NextResponse.json(
        { error: "A IA não gerou blocos de arquitetura válidos" },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Falha ao gerar arquitetura",
      },
      { status: 500 },
    );
  }
}
