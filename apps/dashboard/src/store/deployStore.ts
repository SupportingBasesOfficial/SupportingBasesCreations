"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DeployResult, DeployProgress, CloudConfig } from "@sbc/shared";

interface DeployState {
  isDeploying: boolean;
  progress: DeployProgress | null;
  result: DeployResult | null;
  cloudConfig: CloudConfig | null;

  setCloudConfig: (config: CloudConfig) => void;
  startDeploy: () => void;
  updateProgress: (progress: DeployProgress) => void;
  setResult: (result: DeployResult) => void;
  reset: () => void;
}

export const useDeployStore = create<DeployState>()(
  persist(
    (set) => ({
      isDeploying: false,
      progress: null,
      result: null,
      cloudConfig: null,

      setCloudConfig: (config) => set({ cloudConfig: config }),

      startDeploy: () =>
        set({ isDeploying: true, progress: null, result: null }),

      updateProgress: (progress) => set({ progress }),

      setResult: (result) => set({ isDeploying: false, result }),

      reset: () => set({ isDeploying: false, progress: null, result: null }),
    }),
    {
      name: "sbc-deploy-store",
      partialize: (state) => ({ cloudConfig: state.cloudConfig }),
    },
  ),
);
