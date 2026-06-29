export interface VercelProjectResult {
  id: string;
  name: string;
  url: string;
}

export interface VercelDeployResult {
  id: string;
  url: string;
  state: string;
}

export class VercelApi {
  private token: string;
  private teamId?: string;
  private apiBase = "https://api.vercel.com";

  constructor(token: string, teamId?: string) {
    this.token = token;
    this.teamId = teamId;
  }

  private get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  private get teamParam(): string {
    return this.teamId ? `?teamId=${this.teamId}` : "";
  }

  async createProject(
    name: string,
    githubRepo: string,
    framework = "nextjs",
  ): Promise<VercelProjectResult> {
    const res = await fetch(`${this.apiBase}/v9/projects${this.teamParam}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        gitRepository: { type: "github", repo: githubRepo },
        framework,
      }),
    });

    if (!res.ok && res.status !== 409) {
      throw new Error(`Vercel createProject failed: ${await res.text()}`);
    }

    const data = (await res.json()) as { id: string; name: string };
    return { id: data.id, name: data.name, url: `https://${name}.vercel.app` };
  }

  async triggerDeployment(
    name: string,
    githubRepo: string,
  ): Promise<VercelDeployResult> {
    const res = await fetch(
      `${this.apiBase}/v13/deployments${this.teamParam}`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name,
          gitSource: { type: "github", ref: "main", repo: githubRepo },
          target: "production",
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`Vercel triggerDeployment failed: ${await res.text()}`);
    }

    const data = (await res.json()) as {
      id: string;
      url: string;
      state: string;
    };
    return { id: data.id, url: `https://${data.url}`, state: data.state };
  }

  async getDeployment(deploymentId: string): Promise<VercelDeployResult> {
    const res = await fetch(
      `${this.apiBase}/v13/deployments/${deploymentId}${this.teamParam}`,
      { headers: this.headers },
    );
    if (!res.ok)
      throw new Error(`Vercel getDeployment failed: ${await res.text()}`);
    const data = (await res.json()) as {
      id: string;
      url: string;
      state: string;
    };
    return { id: data.id, url: `https://${data.url}`, state: data.state };
  }

  async waitForDeployment(
    deploymentId: string,
    timeoutMs = 180000,
  ): Promise<VercelDeployResult> {
    const start = Date.now();
    let result = await this.getDeployment(deploymentId);

    while (
      result.state !== "READY" &&
      result.state !== "ERROR" &&
      Date.now() - start < timeoutMs
    ) {
      await new Promise((r) => setTimeout(r, 5000));
      result = await this.getDeployment(deploymentId);
    }

    if (result.state === "ERROR") {
      throw new Error(`Vercel deployment failed with state ERROR`);
    }

    return result;
  }

  async setEnvVar(
    projectId: string,
    key: string,
    value: string,
    target: string[] = ["production"],
  ): Promise<void> {
    await fetch(
      `${this.apiBase}/v9/projects/${projectId}/env${this.teamParam}`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ key, value, target, type: "plain" }),
      },
    );
  }
}
