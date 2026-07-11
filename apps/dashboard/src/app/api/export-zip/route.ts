import { NextRequest, NextResponse } from "next/server";
import {
  GenerationEngine,
  GeneratorRegistry,
  Project,
  Entity,
  Field,
  Service,
  ServiceType,
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
import type { ProjectConfig } from "@sbc/shared";
import { createServerSupabaseClient } from "../../../lib/supabase-server";
import { checkRateLimit, rateLimitResponse } from "../../../lib/rateLimit";
import { ZipArchive } from "archiver";
import { PassThrough } from "node:stream";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = await checkRateLimit("export-zip", user.id, 10, 60);
    if (!rl.allowed) {
      return rateLimitResponse("export-zip", 10, 60);
    }

    const { config, projectName } = (await request.json()) as {
      config: ProjectConfig;
      projectName: string;
    };

    if (!config || !projectName) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: config, projectName" },
        { status: 400 },
      );
    }

    const entities = (config.entities ?? []).map(
      (e) =>
        new Entity(
          e.name,
          (e.fields ?? []).map(
            (f) =>
              new Field(f.name, f.type as Field["type"], {
                nullable: f.nullable,
                unique: f.unique,
              }),
          ),
          {
            tableName: e.tableName,
            features: (e.features ?? []) as Entity["options"]["features"],
          },
        ),
    );

    const services = (config.services ?? []).map(
      (s) =>
        new Service(
          s.name,
          (s.type === "ASYNC"
            ? ServiceType.ASYNC
            : s.type === "EVENT_DRIVEN"
              ? ServiceType.EVENT_DRIVEN
              : ServiceType.SYNC) as ServiceType,
          { endpoints: s.entities.map((e) => `/api/${e.toLowerCase()}`) },
        ),
    );

    const project = new Project(projectName, {
      description: config.description,
      architecture: (config.architecture ?? "SERVERLESS") as ArchitectureType,
      regions: config.regions,
      entities,
      services,
      frontend: {
        framework: (config.frontend?.framework ??
          "NEXTJS") as FrontendFramework,
        styling: (config.frontend?.styling ?? "TAILWIND") as StylingSystem,
        components: ComponentSystem.SHADCN,
        features: config.frontend?.features ?? [],
        pages: config.frontend?.pages,
      },
      infrastructure: {
        cloud: (config.infrastructure?.cloud ?? "VERCEL") as CloudProvider,
        containerization: Containerization.NONE,
        orchestration: Orchestration.NONE,
        database: (config.infrastructure?.database ??
          "POSTGRESQL") as DatabaseType,
        cache: (config.infrastructure?.cache ?? "NONE") as CacheType,
        queue: (config.infrastructure?.queue ?? "NONE") as QueueType,
        cdn: config.infrastructure?.cdn,
        regions: config.infrastructure?.regions,
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
    const result = await engine.generate({
      project,
      outputDir: "./generated",
    });

    if (!result.success && result.errors.length > 0) {
      return NextResponse.json(
        { error: result.errors.map((e) => e.message).join(", ") },
        { status: 500 },
      );
    }

    const archive = new ZipArchive({ zlib: { level: 9 } });
    const passthrough = new PassThrough();

    archive.pipe(passthrough);

    for (const artifact of result.artifacts) {
      archive.append(artifact.content, { name: artifact.path });
    }

    archive.finalize();

    const chunks: Buffer[] = [];
    for await (const chunk of passthrough) {
      chunks.push(chunk as Buffer);
    }
    const zipBuffer = Buffer.concat(chunks);

    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${projectName}.zip"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Falha ao exportar projeto",
      },
      { status: 500 },
    );
  }
}
