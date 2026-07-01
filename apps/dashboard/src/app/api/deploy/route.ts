import { NextRequest, NextResponse } from "next/server";
import {
  CloudDeployPipeline,
  GenerationEngine,
  GeneratorRegistry,
  Project,
  Entity,
  Field,
} from "@sbc/core";
import type { CloudConfig, DeployProgress } from "@sbc/shared";

export const maxDuration = 300;

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: "Rate limit exceeded. Maximum 5 deploys per minute.",
      },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      },
    );
  }

  try {
    const body = await request.json();
    const { projectName, config, graph } = body as {
      projectName: string;
      config: CloudConfig;
      graph: { nodes: unknown[]; edges: unknown[] };
    };

    if (!projectName || !config || !graph) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: projectName, config, graph",
        },
        { status: 400 },
      );
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const sendProgress = (p: DeployProgress) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(p)}\n\n`));
        };

        try {
          sendProgress({
            step: "generating",
            message: "Generating project artifacts...",
            percentage: 5,
          });

          const raw = graph as Record<string, unknown>;
          const entities = (raw.nodes as Array<Record<string, unknown>>)
            ?.filter((n) => n.type === "entity" || n.type === "database")
            .map((e) => {
              const fields = (e.fields as Array<Record<string, unknown>>)?.map(
                (f) => new Field(f.name as string, f.type as never, {}),
              );
              return new Entity(e.name as string, fields ?? [], {
                features: (e.features ?? []) as never,
              });
            });

          const project = new Project(projectName, {
            entities: entities ?? [],
            architecture: {} as never,
            frontend: {} as never,
            infrastructure: {} as never,
          });

          const registry = new GeneratorRegistry();
          const engine = new GenerationEngine(registry);
          const generationResult = await engine.generate({
            project,
          });

          if (!generationResult.success && generationResult.errors.length > 0) {
            throw new Error(
              `Generation failed: ${generationResult.errors.map((e) => e.message).join(", ")}`,
            );
          }

          const pipeline = new CloudDeployPipeline({
            projectName,
            config,
            artifacts: generationResult.artifacts,
            onProgress: sendProgress,
          });

          const deployResult = await pipeline.execute();

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(deployResult)}\n\n`),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const errorResult = {
            success: false,
            error: err instanceof Error ? err.message : String(err),
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(errorResult)}\n\n`),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
