"use client";

import { useCallback, useState } from "react";
import { useGraphStore } from "../store/graphStore";
import { useDeployStore } from "../store/deployStore";
import type { DeployResult, DeployProgress } from "@sbc/shared";

export function useCloudDeploy() {
  const isDeploying = useDeployStore((s) => s.isDeploying);
  const progress = useDeployStore((s) => s.progress);
  const result = useDeployStore((s) => s.result);
  const cloudConfig = useDeployStore((s) => s.cloudConfig);
  const startDeploy = useDeployStore((s) => s.startDeploy);
  const updateProgress = useDeployStore((s) => s.updateProgress);
  const setResult = useDeployStore((s) => s.setResult);
  const reset = useDeployStore((s) => s.reset);
  const getGraph = useGraphStore((s) => s.getGraph);
  const [deployId, setDeployId] = useState<string | null>(null);

  const deploy = useCallback(
    async (projectName: string): Promise<DeployResult> => {
      if (!cloudConfig) {
        const err: DeployResult = {
          success: false,
          error:
            "Configuração de nuvem não definida. Configure os tokens do GitHub, Vercel e Supabase primeiro.",
        };
        return err;
      }

      startDeploy();

      const id = `deploy-${Date.now()}`;
      setDeployId(id);
      const graph = getGraph();
      try {
        const res = await fetch("/api/deploy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectName,
            config: cloudConfig,
            graph,
            deployId: id,
          }),
        });

        if (!res.ok || !res.body) {
          const errData = await res.json().catch(() => ({}));
          const errorResult: DeployResult = {
            success: false,
            error: errData.error ?? `Deploy failed with status ${res.status}`,
          };
          setResult(errorResult);
          return errorResult;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let deployResult: DeployResult = {
          success: false,
          error: "Deploy stream ended unexpectedly",
        };

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data) as DeployProgress | DeployResult;

              if ("step" in parsed && "percentage" in parsed) {
                updateProgress(parsed as DeployProgress);
              } else if ("success" in parsed) {
                deployResult = parsed as DeployResult;
              }
            } catch {
              // ignore parse errors
            }
          }
        }

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
    [cloudConfig, startDeploy, updateProgress, setResult, getGraph],
  );

  return {
    deploy,
    isDeploying,
    progress,
    result,
    reset,
    cloudConfig,
    deployId,
  };
}
