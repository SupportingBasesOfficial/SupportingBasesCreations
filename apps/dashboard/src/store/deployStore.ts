"use client";

import { create } from "zustand";
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

export const useDeployStore = create<DeployState>((set) => ({
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
}));
