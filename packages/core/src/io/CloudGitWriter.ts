import type { GeneratedArtifact } from "@sbc/shared";

export interface CloudGitWriterOptions {
  token: string;
  owner: string;
  repoName: string;
  description?: string;
  private?: boolean;
  commitMessage?: string;
  authorName?: string;
  authorEmail?: string;
}

export interface CloudGitWriteResult {
  repoUrl: string;
  commitSha: string;
  filesPushed: number;
}

export interface ArtifactWriter {
  write(artifacts: GeneratedArtifact[]): Promise<CloudGitWriteResult>;
  rollback(): Promise<void>;
}

interface GitHubBlob {
  path: string;
  sha: string;
}

export class CloudGitWriter implements ArtifactWriter {
  private options: CloudGitWriterOptions;
  private committed = false;
  private createdRepo = false;
  private pushedBlobs: GitHubBlob[] = [];

  constructor(options: CloudGitWriterOptions) {
    this.options = options;
  }

  async write(artifacts: GeneratedArtifact[]): Promise<CloudGitWriteResult> {
    const apiBase = "https://api.github.com";
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.options.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    };

    const owner = this.options.owner;
    const repo = this.options.repoName;

    // Step 1: Create repository
    const repoRes = await fetch(`${apiBase}/user/repos`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: repo,
        description: this.options.description ?? "",
        private: this.options.private ?? false,
        auto_init: true,
      }),
    });

    if (!repoRes.ok && repoRes.status !== 422) {
      const err = await repoRes.json().catch(() => ({}));
      throw new Error(`Failed to create repo: ${JSON.stringify(err)}`);
    }
    this.createdRepo = repoRes.ok;
    const repoData = await repoRes.json().catch(() => ({}));

    // Step 2: Get the default branch ref (main)
    let parentCommitSha: string | undefined;
    let baseTreeSha: string | undefined;

    try {
      const refRes = await fetch(
        `${apiBase}/repos/${owner}/${repo}/git/refs/heads/main`,
        { headers },
      );
      if (refRes.ok) {
        const refData = await refRes.json();
        parentCommitSha = refData.object.sha;
      }
    } catch {
      // repo might be freshly created
    }

    if (parentCommitSha) {
      const commitRes = await fetch(
        `${apiBase}/repos/${owner}/${repo}/git/commits/${parentCommitSha}`,
        { headers },
      );
      if (commitRes.ok) {
        const commitData = await commitRes.json();
        baseTreeSha = commitData.tree.sha;
      }
    }

    // Step 3: Create blobs for all artifacts (parallel)
    const blobPromises = artifacts.map(async (artifact) => {
      const blobRes = await fetch(
        `${apiBase}/repos/${owner}/${repo}/git/blobs`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            content: artifact.content,
            encoding: "utf-8",
          }),
        },
      );
      if (!blobRes.ok) {
        throw new Error(
          `Failed to create blob for ${artifact.path}: ${await blobRes.text()}`,
        );
      }
      const blobData = await blobRes.json();
      return { path: artifact.path, sha: blobData.sha } as GitHubBlob;
    });

    this.pushedBlobs = await Promise.all(blobPromises);

    // Step 4: Create tree
    const treeBody: Record<string, unknown> = {
      tree: this.pushedBlobs.map((b) => ({
        path: b.path,
        mode: "100644",
        type: "blob",
        sha: b.sha,
      })),
    };

    if (baseTreeSha) {
      treeBody.base_tree = baseTreeSha;
    }

    const treeRes = await fetch(`${apiBase}/repos/${owner}/${repo}/git/trees`, {
      method: "POST",
      headers,
      body: JSON.stringify(treeBody),
    });
    if (!treeRes.ok) {
      throw new Error(`Failed to create tree: ${await treeRes.text()}`);
    }
    const treeData = await treeRes.json();

    // Step 5: Create commit
    const commitBody: Record<string, unknown> = {
      message: this.options.commitMessage ?? "Initial commit from SBC ASP",
      tree: treeData.sha,
    };

    if (parentCommitSha) {
      commitBody.parents = [parentCommitSha];
    }

    if (this.options.authorName && this.options.authorEmail) {
      commitBody.author = {
        name: this.options.authorName,
        email: this.options.authorEmail,
      };
    }

    const commitRes = await fetch(
      `${apiBase}/repos/${owner}/${repo}/git/commits`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(commitBody),
      },
    );
    if (!commitRes.ok) {
      throw new Error(`Failed to create commit: ${await commitRes.text()}`);
    }
    const commitData = await commitRes.json();

    // Step 6: Update ref to point to new commit
    const refRes = await fetch(
      `${apiBase}/repos/${owner}/${repo}/git/refs/heads/main`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ sha: commitData.sha }),
      },
    );
    if (!refRes.ok) {
      throw new Error(`Failed to update ref: ${await refRes.text()}`);
    }

    this.committed = true;

    return {
      repoUrl: repoData.html_url ?? `https://github.com/${owner}/${repo}`,
      commitSha: commitData.sha,
      filesPushed: this.pushedBlobs.length,
    };
  }

  async rollback(): Promise<void> {
    if (this.committed) return;

    if (this.createdRepo && this.options.owner && this.options.repoName) {
      try {
        await fetch(
          `https://api.github.com/repos/${this.options.owner}/${this.options.repoName}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${this.options.token}`,
              Accept: "application/vnd.github+json",
            },
          },
        );
      } catch {
        // best effort cleanup
      }
    }

    this.pushedBlobs = [];
  }
}
