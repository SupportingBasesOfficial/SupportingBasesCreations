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

const SYSTEM_PROMPT = `You are an AI architecture assistant for SBC ASP, a visual architecture design platform.
Given a natural language description of a software project, you must generate a JSON architecture graph.

Available node types:
- FrontendComponent: UI/frontend (Next.js, React, etc.)
- ApiRoute: API endpoint (REST, tRPC, GraphQL)
- CloudDatabase: Database (PostgreSQL, MongoDB, etc.)
- AuthService: Authentication (Supabase Auth, NextAuth, etc.)
- CacheLayer: Caching (Redis, Memcached)
- QueueService: Message queue (RabbitMQ, Kafka, SQS)
- CdnEdge: CDN/edge (Cloudflare, Vercel Edge)
- WebhookHandler: Webhook integration

Respond with JSON in this exact format:
{
  "nodes": [
    {
      "id": "node-1",
      "type": "FrontendComponent",
      "position": { "x": 100, "y": 100 },
      "data": { "label": "Next.js App", "description": "Main frontend", "framework": "NextJS", "styling": "Tailwind" }
    }
  ],
  "edges": [
    { "id": "edge-1", "source": "node-1", "target": "node-2", "label": "fetches from", "animated": true }
  ],
  "explanation": "Brief explanation of the architecture decisions"
}

Rules:
- Generate 3-8 nodes depending on complexity
- Connect nodes with logical edges
- Use realistic positions (spread nodes out, x: 50-800, y: 50-600)
- Include meaningful labels and descriptions
- Node IDs must be unique: "node-1", "node-2", etc.
- Edge IDs must be unique: "edge-1", "edge-2", etc.
- Always include at least one FrontendComponent and one ApiRoute
- Add AuthService if auth/login mentioned
- Add CloudDatabase if data/storage/database mentioned
- Add CacheLayer if performance/caching mentioned
- Add QueueService if async/background jobs mentioned
- Add CdnEdge if media/images/performance mentioned
- Add WebhookHandler if integrations/webhooks mentioned`;

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
          max_tokens: 2000,
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
