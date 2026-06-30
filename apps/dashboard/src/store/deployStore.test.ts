import { describe, it, expect, beforeEach } from "vitest";
import { useDeployStore } from "../store/deployStore";
import type { CloudConfig, DeployResult } from "@sbc/shared";

const mockConfig: CloudConfig = {
  github: { token: "gh-token", owner: "test-user" },
  vercel: { token: "vc-token", teamId: "team-1" },
  supabase: { token: "sb-token", organizationId: "org-1" },
};

describe("deployStore", () => {
  beforeEach(() => {
    useDeployStore.setState({
      isDeploying: false,
      progress: null,
      result: null,
      cloudConfig: null,
    });
  });

  it("should set cloud config", () => {
    useDeployStore.getState().setCloudConfig(mockConfig);
    expect(useDeployStore.getState().cloudConfig).toEqual(mockConfig);
  });

  it("should start deploy", () => {
    useDeployStore.getState().startDeploy();
    expect(useDeployStore.getState().isDeploying).toBe(true);
    expect(useDeployStore.getState().result).toBeNull();
  });

  it("should update progress", () => {
    useDeployStore.getState().startDeploy();
    useDeployStore.getState().updateProgress({
      step: "generating",
      message: "Generating...",
      percentage: 10,
    });
    expect(useDeployStore.getState().progress?.step).toBe("generating");
    expect(useDeployStore.getState().progress?.percentage).toBe(10);
  });

  it("should set result and stop deploying", () => {
    const result: DeployResult = {
      success: true,
      githubUrl: "https://github.com/test/repo",
    };
    useDeployStore.getState().startDeploy();
    useDeployStore.getState().setResult(result);
    expect(useDeployStore.getState().isDeploying).toBe(false);
    expect(useDeployStore.getState().result?.success).toBe(true);
  });

  it("should reset", () => {
    useDeployStore.getState().startDeploy();
    useDeployStore.getState().reset();
    expect(useDeployStore.getState().isDeploying).toBe(false);
    expect(useDeployStore.getState().progress).toBeNull();
    expect(useDeployStore.getState().result).toBeNull();
  });
});
