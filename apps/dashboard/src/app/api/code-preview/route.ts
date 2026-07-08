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
  DockerGenerator,
  EnvGenerator,
  GitHubActionsGenerator,
  DocsGenerator,
  BillingGenerator,
} from "@sbc/generators";
import type { ProjectConfig } from "@sbc/shared";
import { createServerSupabaseClient } from "../../../lib/supabase-server";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { config, projectName } = (await request.json()) as {
      config: ProjectConfig;
      projectName: string;
    };

    if (!config || !projectName) {
      return NextResponse.json(
        { error: "Missing required fields: config, projectName" },
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
          s.type === "ASYNC" ? ServiceType.ASYNC : ServiceType.SYNC,
          { endpoints: s.entities },
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

    const files = result.artifacts.map((a) => ({
      path: a.path,
      content: a.content,
      language: a.language,
    }));

    const fileTree = buildFileTree(files);

    return NextResponse.json({
      files,
      fileTree,
      totalFiles: files.length,
      totalLines: files.reduce(
        (sum, f) => sum + f.content.split("\n").length,
        0,
      ),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Preview generation failed",
      },
      { status: 500 },
    );
  }
}

interface FileEntry {
  path: string;
  content: string;
  language: string;
}

interface TreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: TreeNode[];
  language?: string;
}

function buildFileTree(files: FileEntry[]): TreeNode[] {
  const root: TreeNode = {
    name: "root",
    path: "",
    type: "directory",
    children: [],
  };

  for (const file of files) {
    const parts = file.path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      const fullPath = parts.slice(0, i + 1).join("/");

      if (isLast) {
        current.children?.push({
          name: part,
          path: fullPath,
          type: "file",
          language: file.language,
        });
      } else {
        let dir = current.children?.find(
          (c) => c.type === "directory" && c.name === part,
        );
        if (!dir) {
          dir = { name: part, path: fullPath, type: "directory", children: [] };
          current.children?.push(dir);
        }
        current = dir;
      }
    }
  }

  sortTree(root);
  return root.children ?? [];
}

function sortTree(node: TreeNode) {
  if (!node.children) return;
  node.children.sort((a, b) => {
    if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  node.children.forEach(sortTree);
}
