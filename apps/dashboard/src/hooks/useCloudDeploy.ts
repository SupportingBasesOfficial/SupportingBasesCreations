"use client";

import { useCallback } from "react";
import { useGraphStore } from "../store/graphStore";
import { useDeployStore } from "../store/deployStore";
import {
  CloudDeployPipeline,
  GenerationEngine,
  GeneratorRegistry,
  Project,
  Entity,
  Field,
} from "@sbc/core";
import type { DeployResult } from "@sbc/shared";

export function useCloudDeploy() {
  const isDeploying = useDeployStore((s) => s.isDeploying);
  const progress = useDeployStore((s) => s.progress);
  const result = useDeployStore((s) => s.result);
  const cloudConfig = useDeployStore((s) => s.cloudConfig);
  const startDeploy = useDeployStore((s) => s.startDeploy);
  const updateProgress = useDeployStore((s) => s.updateProgress);
  const setResult = useDeployStore((s) => s.setResult);
  const reset = useDeployStore((s) => s.reset);
  const toProjectConfig = useGraphStore((s) => s.toProjectConfig);

  const deploy = useCallback(
    async (projectName: string): Promise<DeployResult> => {
      if (!cloudConfig) {
        const err: DeployResult = {
          success: false,
          error:
            "Cloud config not set. Configure GitHub, Vercel, and Supabase tokens first.",
        };
        return err;
      }

      startDeploy();

      try {
        updateProgress({
          step: "generating",
          message: "Generating project artifacts...",
          percentage: 5,
        });

        const config = toProjectConfig(projectName);

        const registry = new GeneratorRegistry();
        const engine = new GenerationEngine(registry);

        const buildProjectFromConfig = (raw: unknown) => {
          const parsed = raw as Record<string, unknown>;
          const entities = (
            parsed.entities as Array<Record<string, unknown>>
          )?.map((e) => {
            const fields = (e.fields as Array<Record<string, unknown>>)?.map(
              (f) => new Field(f.name as string, f.type as never, {}),
            );
            return new Entity(e.name as string, fields ?? [], {
              features: (e.features ?? []) as never,
            });
          });
          return new Project(parsed.name as string, {
            entities: entities ?? [],
            architecture: parsed.architecture as never,
            frontend: parsed.frontend as never,
            infrastructure: parsed.infrastructure as never,
          });
        };

        const project = buildProjectFromConfig(config);
        const validationResult = project.validate();
        if (!validationResult.valid) {
          throw new Error(
            `Project validation failed: ${validationResult.errors.map((e: { message: string }) => e.message).join(", ")}`,
          );
        }

        const generationResult = await engine.generate({
          project,
        });

        if (!generationResult.success && generationResult.errors.length > 0) {
          throw new Error(
            `Generation failed: ${generationResult.errors.map((e) => e.message).join(", ")}`,
          );
        }

        const artifacts = generationResult.artifacts;

        const pipeline = new CloudDeployPipeline({
          projectName,
          config: cloudConfig,
          artifacts,
          description: config.description,
          onProgress: (p) => updateProgress(p),
        });

        const deployResult = await pipeline.execute();
        setResult(deployResult);
        return deployResult;
      } catch (err) {
        const errorResult: DeployResult = {
          success: false,
          error: err instanceof Error ? err.message : String(err),
        };
        setResult(errorResult);
        return errorResult;
      }
    },
    [cloudConfig, startDeploy, updateProgress, setResult, toProjectConfig],
  );

  return { deploy, isDeploying, progress, result, reset, cloudConfig };
}
