import type { GeneratedArtifact } from "@sbc/shared";

export interface GitHubCreateRepoOptions {
  name: string;
  description?: string;
  private?: boolean;
}

export interface GitHubRepoInfo {
  url: string;
  fullName: string;
  defaultBranch: string;
}

export interface GitHubPushResult {
  commitSha: string;
  filesPushed: number;
}

export class GitHubApi {
  private token: string;
  private apiBase = "https://api.github.com";

  constructor(token: string) {
    this.token = token;
  }

  private get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    };
  }

  async getUser(): Promise<{ login: string; name: string; email: string }> {
    const res = await fetch(`${this.apiBase}/user`, { headers: this.headers });
    if (!res.ok) throw new Error(`GitHub getUser failed: ${await res.text()}`);
    return res.json();
  }

  async createRepo(options: GitHubCreateRepoOptions): Promise<GitHubRepoInfo> {
    const res = await fetch(`${this.apiBase}/user/repos`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: options.name,
        description: options.description ?? "",
        private: options.private ?? false,
        auto_init: true,
      }),
    });

    if (!res.ok && res.status !== 422) {
      throw new Error(`GitHub createRepo failed: ${await res.text()}`);
    }

    const data = (await res.json()) as {
      html_url: string;
      full_name: string;
      default_branch: string;
    };

    return {
      url: data.html_url,
      fullName: data.full_name,
      defaultBranch: data.default_branch ?? "main",
    };
  }

  async pushArtifacts(
    owner: string,
    repo: string,
    artifacts: GeneratedArtifact[],
    commitMessage = "Initial commit from SBC ASP",
  ): Promise<GitHubPushResult> {
    // Get parent commit + base tree
    let parentCommitSha: string | undefined;
    let baseTreeSha: string | undefined;

    try {
      const refRes = await fetch(
        `${this.apiBase}/repos/${owner}/${repo}/git/refs/heads/main`,
        { headers: this.headers },
      );
      if (refRes.ok) {
        const refData = (await refRes.json()) as { object: { sha: string } };
        parentCommitSha = refData.object.sha;
      }
    } catch {
      /* repo might be empty */
    }

    if (parentCommitSha) {
      const commitRes = await fetch(
        `${this.apiBase}/repos/${owner}/${repo}/git/commits/${parentCommitSha}`,
        { headers: this.headers },
      );
      if (commitRes.ok) {
        const commitData = (await commitRes.json()) as {
          tree: { sha: string };
        };
        baseTreeSha = commitData.tree.sha;
      }
    }

    // Create blobs in parallel
    const blobResults = await Promise.all(
      artifacts.map(async (artifact) => {
        const blobRes = await fetch(
          `${this.apiBase}/repos/${owner}/${repo}/git/blobs`,
          {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
              content: artifact.content,
              encoding: "utf-8",
            }),
          },
        );
        if (!blobRes.ok)
          throw new Error(
            `Blob creation failed for ${artifact.path}: ${await blobRes.text()}`,
          );
        const blobData = (await blobRes.json()) as { sha: string };
        return { path: artifact.path, sha: blobData.sha };
      }),
    );

    // Create tree
    const treeBody: Record<string, unknown> = {
      tree: blobResults.map((b) => ({
        path: b.path,
        mode: "100644",
        type: "blob",
        sha: b.sha,
      })),
    };
    if (baseTreeSha) treeBody.base_tree = baseTreeSha;

    const treeRes = await fetch(
      `${this.apiBase}/repos/${owner}/${repo}/git/trees`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(treeBody),
      },
    );
    if (!treeRes.ok)
      throw new Error(`Tree creation failed: ${await treeRes.text()}`);
    const treeData = (await treeRes.json()) as { sha: string };

    // Create commit
    const commitBody: Record<string, unknown> = {
      message: commitMessage,
      tree: treeData.sha,
    };
    if (parentCommitSha) commitBody.parents = [parentCommitSha];

    const commitRes = await fetch(
      `${this.apiBase}/repos/${owner}/${repo}/git/commits`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(commitBody),
      },
    );
    if (!commitRes.ok)
      throw new Error(`Commit creation failed: ${await commitRes.text()}`);
    const commitData = (await commitRes.json()) as { sha: string };

    // Update ref
    const refRes = await fetch(
      `${this.apiBase}/repos/${owner}/${repo}/git/refs/heads/main`,
      {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({ sha: commitData.sha }),
      },
    );
    if (!refRes.ok)
      throw new Error(`Ref update failed: ${await refRes.text()}`);

    return { commitSha: commitData.sha, filesPushed: blobResults.length };
  }

  async deleteRepo(owner: string, repo: string): Promise<void> {
    await fetch(`${this.apiBase}/repos/${owner}/${repo}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}
