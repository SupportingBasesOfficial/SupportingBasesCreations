export interface SupabaseProjectResult {
  id: string;
  name: string;
  url: string;
}

export interface SupabaseApiKeys {
  anonKey: string;
  serviceRoleKey: string;
}

export class SupabaseApi {
  private token: string;
  private apiBase = "https://api.supabase.com";

  constructor(token: string) {
    this.token = token;
  }

  private get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  async listOrganizations(): Promise<
    Array<{ id: string; name: string; slug: string }>
  > {
    const res = await fetch(`${this.apiBase}/v1/organizations`, {
      headers: this.headers,
    });
    if (!res.ok)
      throw new Error(`Supabase listOrganizations failed: ${await res.text()}`);
    return res.json();
  }

  async createProject(
    name: string,
    organizationId: string,
    dbPassword: string,
    region = "us-east-1",
  ): Promise<SupabaseProjectResult> {
    const res = await fetch(`${this.apiBase}/v1/projects`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        organization_id: organizationId,
        region,
        password: dbPassword,
      }),
    });

    if (!res.ok) {
      throw new Error(`Supabase createProject failed: ${await res.text()}`);
    }

    const data = (await res.json()) as { id: string; name: string };
    return {
      id: data.id,
      name: data.name,
      url: `https://${data.id}.supabase.co`,
    };
  }

  async checkHealth(projectRef: string): Promise<boolean> {
    const res = await fetch(
      `${this.apiBase}/v1/projects/${projectRef}/health`,
      { headers: this.headers },
    );
    if (!res.ok) return false;
    const data = (await res.json().catch(() => ({}))) as {
      status?: string;
      database?: boolean;
    };
    return data.status === "healthy" || data.database === true;
  }

  async waitForReady(projectRef: string, timeoutMs = 300000): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (await this.checkHealth(projectRef)) return true;
      await new Promise((r) => setTimeout(r, 5000));
    }
    return false;
  }

  async getApiKeys(projectRef: string): Promise<SupabaseApiKeys> {
    const res = await fetch(
      `${this.apiBase}/v1/projects/${projectRef}/api-keys`,
      { headers: this.headers },
    );
    if (!res.ok)
      throw new Error(`Supabase getApiKeys failed: ${await res.text()}`);

    const data = (await res.json()) as Array<{ name: string; api_key: string }>;
    const anon = data.find((k) => k.name === "anon");
    const serviceRole = data.find((k) => k.name === "service_role");

    return {
      anonKey: anon?.api_key ?? "",
      serviceRoleKey: serviceRole?.api_key ?? "",
    };
  }

  async setSecret(
    projectRef: string,
    name: string,
    value: string,
  ): Promise<void> {
    await fetch(`${this.apiBase}/v1/projects/${projectRef}/secrets`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify([{ name, value }]),
    });
  }

  async runQuery(projectRef: string, query: string): Promise<unknown> {
    const res = await fetch(
      `${this.apiBase}/v1/projects/${projectRef}/database/query`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ query }),
      },
    );
    if (!res.ok)
      throw new Error(`Supabase runQuery failed: ${await res.text()}`);
    return res.json();
  }

  static generatePassword(): string {
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
