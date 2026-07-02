import { NextRequest, NextResponse } from "next/server";
import {
  CloudDeployPipeline,
  GenerationEngine,
  GeneratorRegistry,
  Project,
  Entity,
  Field,
  UpstashRedisKV,
} from "@sbc/core";
import {
  BaseTemplateGenerator,
  PrismaGenerator,
  TRPCGenerator,
  NextJSGenerator,
  AuthGenerator,
  BillingGenerator,
  DockerGenerator,
  EnvGenerator,
  GitHubActionsGenerator,
  DocsGenerator,
} from "@sbc/generators";
import type { CloudConfig, DeployProgress } from "@sbc/shared";

export const maxDuration = 300;
export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_TTL = 60;

function getKV(): UpstashRedisKV | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new UpstashRedisKV({ url, token });
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const kv = getKV();
  if (!kv) return true;
  const key = `ratelimit:deploy:${ip}`;
  const count = await kv.incr(key, RATE_LIMIT_TTL);
  return count <= RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await checkRateLimit(ip))) {
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
          registry.register(new BaseTemplateGenerator());
          registry.register(new PrismaGenerator());
          registry.register(new TRPCGenerator());
          registry.register(new NextJSGenerator());
          registry.register(new AuthGenerator());
          registry.register(new BillingGenerator());
          registry.register(new DockerGenerator());
          registry.register(new EnvGenerator());
          registry.register(new GitHubActionsGenerator());
          registry.register(new DocsGenerator());
          const engine = new GenerationEngine(registry);
          const generationResult = await engine.generate({
            project,
            outputDir: "./generated",
          });

          if (!generationResult.success && generationResult.errors.length > 0) {
            throw new Error(
              `Generation failed: ${generationResult.errors.map((e: { message: string }) => e.message).join(", ")}`,
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
