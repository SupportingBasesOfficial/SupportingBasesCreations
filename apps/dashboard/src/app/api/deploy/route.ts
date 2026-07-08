import { NextRequest, NextResponse } from "next/server";
import {
  CloudDeployPipeline,
  GenerationEngine,
  GeneratorRegistry,
  Project,
  Entity,
  Field,
  Service,
  UpstashRedisKV,
  GraphToConfigMapper,
  ArchitectureType,
  FrontendFramework,
  StylingSystem,
  ComponentSystem,
  CloudProvider,
  Containerization,
  Orchestration,
  DatabaseType,
  CacheType,
  QueueType,
  ServiceType,
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
import type {
  CloudConfig,
  DeployProgress,
  ArchitectureGraph,
} from "@sbc/shared";
import { createServerSupabaseClient } from "../../../lib/supabase-server";

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
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

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
    const { projectName, config, graph, deployId } = body as {
      projectName: string;
      config: CloudConfig;
      graph: { nodes: unknown[]; edges: unknown[] };
      deployId?: string;
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

    const kv = getKV();
    const logKey = deployId ? `deploy-logs:${deployId}` : null;

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const sendProgress = async (p: DeployProgress) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(p)}\n\n`));
          if (logKey && kv) {
            try {
              await kv.rpush(
                logKey,
                JSON.stringify({ type: "progress", ...p }),
              );
              await kv.set(`${logKey}:ttl`, "1", 3600);
            } catch {
              /* best-effort logging */
            }
          }
        };

        try {
          sendProgress({
            step: "generating",
            message: "Generating project artifacts...",
            percentage: 5,
          });

          const mapper = new GraphToConfigMapper(
            graph as ArchitectureGraph,
            projectName,
          );
          const cfg = mapper.map();

          const entities = (cfg.entities ?? []).map((e) => {
            const fields = e.fields.map(
              (f) =>
                new Field(f.name, f.type as unknown as Field["type"], {
                  nullable: f.nullable,
                  unique: f.unique,
                }),
            );
            return new Entity(e.name, fields, {
              tableName: e.tableName,
              features: (e.features ?? []) as never,
            });
          });

          const services = (cfg.services ?? []).map(
            (s) =>
              new Service(
                s.name,
                (s.type === "ASYNC"
                  ? ServiceType.ASYNC
                  : ServiceType.SYNC) as ServiceType,
                { endpoints: s.entities },
              ),
          );

          const project = new Project(projectName, {
            description: cfg.description,
            architecture: cfg.architecture as ArchitectureType,
            regions: cfg.regions,
            entities,
            services,
            frontend: {
              framework: (cfg.frontend?.framework ??
                "NEXTJS") as FrontendFramework,
              styling: (cfg.frontend?.styling ?? "TAILWIND") as StylingSystem,
              components: ComponentSystem.SHADCN,
              features: cfg.frontend?.features ?? [],
              pages: cfg.frontend?.pages,
            },
            infrastructure: {
              cloud: (cfg.infrastructure?.cloud ?? "VERCEL") as CloudProvider,
              containerization: Containerization.NONE,
              orchestration: Orchestration.NONE,
              database: (cfg.infrastructure?.database ??
                "POSTGRESQL") as DatabaseType,
              cache: (cfg.infrastructure?.cache ?? "NONE") as CacheType,
              queue: (cfg.infrastructure?.queue ?? "NONE") as QueueType,
              cdn: cfg.infrastructure?.cdn,
              regions: cfg.infrastructure?.regions,
            },
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

          if (logKey && kv) {
            try {
              await kv.rpush(
                logKey,
                JSON.stringify({ type: "result", ...deployResult }),
              );
              await kv.rpush(
                logKey,
                JSON.stringify({
                  type: "done",
                  status: deployResult.success ? "complete" : "failed",
                }),
              );
              await kv.set(
                `deploy-status:${deployId}`,
                deployResult.success ? "complete" : "failed",
              );
            } catch {
              /* best-effort */
            }
          }

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
          if (logKey && kv) {
            try {
              await kv.rpush(
                logKey,
                JSON.stringify({ type: "result", ...errorResult }),
              );
              await kv.rpush(
                logKey,
                JSON.stringify({ type: "done", status: "failed" }),
              );
              await kv.set(`deploy-status:${deployId}`, "failed");
            } catch {
              /* best-effort */
            }
          }
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
