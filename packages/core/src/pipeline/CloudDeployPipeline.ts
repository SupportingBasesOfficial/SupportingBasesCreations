import type {
  GeneratedArtifact,
  DeployResult,
  DeployProgress,
  CloudConfig,
} from "@sbc/shared";
import { CloudGitWriter } from "../io/CloudGitWriter.js";

export type ProgressHandler = (progress: DeployProgress) => void;

export interface CloudDeployOptions {
  projectName: string;
  config: CloudConfig;
  artifacts: GeneratedArtifact[];
  description?: string;
  authorName?: string;
  authorEmail?: string;
  onProgress?: ProgressHandler;
}

export class CloudDeployPipeline {
  private options: CloudDeployOptions;
  private gitWriter: CloudGitWriter | null = null;

  constructor(options: CloudDeployOptions) {
    this.options = options;
  }

  async execute(): Promise<DeployResult> {
    const { config, projectName, artifacts, onProgress } = this.options;

    try {
      // Step 1: Push to GitHub
      onProgress?.({
        step: "creating-repo",
        message: "Creating GitHub repository...",
        percentage: 10,
      });
      this.gitWriter = new CloudGitWriter({
        token: config.github.token,
        owner: config.github.owner,
        repoName: projectName,
        description: this.options.description,
        commitMessage: "Initial commit from SBC ASP",
        authorName: this.options.authorName,
        authorEmail: this.options.authorEmail,
      });

      onProgress?.({
        step: "pushing-files",
        message: `Pushing ${artifacts.length} files to GitHub...`,
        percentage: 25,
      });
      const gitResult = await this.gitWriter.write(artifacts);

      // Step 2: Create Vercel project + deploy
      onProgress?.({
        step: "linking-vercel",
        message: "Linking repository to Vercel...",
        percentage: 40,
      });
      const vercelResult = await this.deployToVercel(
        config,
        projectName,
        gitResult.repoUrl,
      );

      // Step 3: Provision Supabase database
      onProgress?.({
        step: "provisioning-supabase",
        message: "Provisioning Supabase database...",
        percentage: 60,
      });
      const supabaseResult = await this.provisionSupabase(config, projectName);

      // Step 4: Configure environment variables
      onProgress?.({
        step: "configuring-env",
        message: "Configuring environment variables...",
        percentage: 80,
      });
      await this.configureEnvVars(
        config,
        projectName,
        vercelResult.projectId,
        supabaseResult,
      );

      onProgress?.({
        step: "complete",
        message: "Deployment complete!",
        percentage: 100,
      });

      return {
        success: true,
        githubUrl: gitResult.repoUrl,
        vercelUrl: vercelResult.url,
        supabaseUrl: supabaseResult.url,
        supabaseProjectRef: supabaseResult.projectRef,
        supabaseAnonKey: supabaseResult.anonKey,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      onProgress?.({ step: "failed", message, percentage: 0 });

      if (this.gitWriter) {
        await this.gitWriter.rollback();
      }

      return {
        success: false,
        error: message,
      };
    }
  }

  async rollback(): Promise<void> {
    if (this.gitWriter) {
      await this.gitWriter.rollback();
    }
  }

  private async deployToVercel(
    config: CloudConfig,
    projectName: string,
    repoUrl: string,
  ): Promise<{ url: string; projectId: string }> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${config.vercel.token}`,
      "Content-Type": "application/json",
    };

    const teamParam = config.vercel.teamId
      ? `?teamId=${config.vercel.teamId}`
      : "";

    // Create project
    const projectRes = await fetch(
      `https://api.vercel.com/v9/projects${teamParam}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: projectName,
          gitRepository: {
            type: "github",
            repo: `${config.github.owner}/${projectName}`,
          },
          framework: "nextjs",
        }),
      },
    );

    if (!projectRes.ok && projectRes.status !== 409) {
      throw new Error(
        `Vercel project creation failed: ${await projectRes.text()}`,
      );
    }

    const projectData = (await projectRes.json().catch(() => ({ id: "" }))) as {
      id?: string;
    };
    const projectId = projectData.id ?? "";

    // Trigger deployment
    const deployRes = await fetch(
      `https://api.vercel.com/v13/deployments${teamParam}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: projectName,
          gitSource: {
            type: "github",
            ref: "main",
            repo: `${config.github.owner}/${projectName}`,
          },
          target: "production",
        }),
      },
    );

    if (!deployRes.ok) {
      throw new Error(
        `Vercel deployment trigger failed: ${await deployRes.text()}`,
      );
    }

    const deployData = (await deployRes.json()) as { url?: string };
    const url = deployData.url ? `https://${deployData.url}` : repoUrl;

    return { url, projectId };
  }

  private async provisionSupabase(
    config: CloudConfig,
    projectName: string,
  ): Promise<{ url: string; projectRef: string; anonKey: string }> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${config.supabase.token}`,
      "Content-Type": "application/json",
    };

    const dbPassword = this.generatePassword();

    const projectRes = await fetch("https://api.supabase.com/v1/projects", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: projectName,
        organization_id: config.supabase.organizationId,
        region: "us-east-1",
        password: dbPassword,
      }),
    });

    if (!projectRes.ok) {
      throw new Error(
        `Supabase project creation failed: ${await projectRes.text()}`,
      );
    }

    const projectData = (await projectRes.json()) as { id: string };
    const projectRef = projectData.id;

    // Poll for ready
    let ready = false;
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      const healthRes = await fetch(
        `https://api.supabase.com/v1/projects/${projectRef}/health`,
        { headers },
      );
      if (healthRes.ok) {
        const healthData = (await healthRes.json().catch(() => ({}))) as {
          status?: string;
          database?: boolean;
        };
        if (healthData.status === "healthy" || healthData.database === true) {
          ready = true;
          break;
        }
      }
    }

    if (!ready) {
      // Continue anyway — project may still be initializing
    }

    // Get API keys
    const keysRes = await fetch(
      `https://api.supabase.com/v1/projects/${projectRef}/api-keys`,
      { headers },
    );
    let anonKey = "";
    if (keysRes.ok) {
      const keysData = await keysRes.json();
      const anon = Array.isArray(keysData)
        ? keysData.find((k: { name: string }) => k.name === "anon")
        : null;
      anonKey = anon?.api_key ?? "";
    }

    return {
      url: `https://${projectRef}.supabase.co`,
      projectRef,
      anonKey,
    };
  }

  private async configureEnvVars(
    config: CloudConfig,
    _projectName: string,
    vercelProjectId: string,
    supabase: { projectRef: string; anonKey: string },
  ): Promise<void> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${config.vercel.token}`,
      "Content-Type": "application/json",
    };

    const teamParam = config.vercel.teamId
      ? `?teamId=${config.vercel.teamId}`
      : "";

    const envVars = [
      {
        key: "NEXT_PUBLIC_SUPABASE_URL",
        value: `https://${supabase.projectRef}.supabase.co`,
        target: ["production"],
      },
      {
        key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        value: supabase.anonKey,
        target: ["production"],
      },
    ];

    if (vercelProjectId) {
      try {
        await fetch(
          `https://api.vercel.com/v9/projects/${vercelProjectId}/env${teamParam}`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(envVars[0]),
          },
        );
        await fetch(
          `https://api.vercel.com/v9/projects/${vercelProjectId}/env${teamParam}`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(envVars[1]),
          },
        );
      } catch {
        // best effort — env vars can be set manually later
      }
    }
  }

  private generatePassword(): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    const array = new Uint8Array(24);
    crypto.getRandomValues(array);
    for (let i = 0; i < array.length; i++) {
      password += chars[array[i] % chars.length];
    }
    return password;
  }
}
