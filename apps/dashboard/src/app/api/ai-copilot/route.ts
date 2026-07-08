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

const SYSTEM_PROMPT = `You are an expert software architect AI for SBC ASP, a visual architecture platform where non-technical users describe their app idea and get a full-stack architecture generated.

Your job: Take a natural language description and design a COMPLETE, PRODUCTION-READY architecture with real domain modeling.

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
        "label": "Users",
        "description": "User accounts and profiles",
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
        "label": "Users API",
        "description": "CRUD for user management",
        "method": "GET",
        "route": "/api/users"
      }
    },
    {
      "id": "frontend",
      "type": "FrontendComponent",
      "position": { "x": 750, "y": 300 },
      "data": {
        "label": "Web App",
        "description": "Main application UI",
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
  "explanation": "User-friendly explanation of what was built and why"
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
Write a clear, non-technical explanation of what the app does, what data it stores, and how the pieces work together. Speak to a non-technical person.

Generate between 5 and 20 nodes depending on app complexity. Real apps have multiple entities.`;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = (await request.json()) as { prompt: string };

    if (!prompt || prompt.trim().length < 3) {
      return NextResponse.json(
        { error: "Please provide a description of at least 3 characters" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Groq API key not configured. Set GROQ_API_KEY environment variable. Get one free at console.groq.com",
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
        { error: `AI service error: ${response.status} ${errText}` },
        { status: 502 },
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "AI returned empty response" },
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
        { error: "AI did not generate valid architecture nodes" },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate architecture",
      },
      { status: 500 },
    );
  }
}
