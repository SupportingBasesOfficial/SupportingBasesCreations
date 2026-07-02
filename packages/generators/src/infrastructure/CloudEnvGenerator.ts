import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class CloudEnvGenerator implements Generator {
  readonly name = 'cloud-env';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: '.env.example',
      content: this.generateCloudEnvExample(project),
      language: 'env',
    });

    artifacts.push({
      path: 'docs/CLOUD-SETUP.md',
      content: this.generateCloudSetupDocs(project),
      language: 'markdown',
    });

    artifacts.push({
      path: 'scripts/verify-cloud.ts',
      content: this.generateVerifyScript(project),
      language: 'typescript',
    });

    return artifacts;
  }

  private generateCloudEnvExample(project: Project): string {
    const lines: string[] = [
      `# ${project.name} — Cloud-Only Environment`,
      `# All services are cloud-hosted. No localhost dependencies.`,
      '',
      '## Application',
      'NODE_ENV=production',
      `NEXT_PUBLIC_APP_NAME=${project.name}`,
      'NEXT_PUBLIC_APP_URL=',
      '',
      '## Database (Supabase)',
      'DATABASE_URL=',
      'DIRECT_URL=',
      'SUPABASE_URL=',
      'SUPABASE_ANON_KEY=',
      'SUPABASE_SERVICE_ROLE_KEY=',
      '',
      '## Auth',
      'NEXTAUTH_URL=',
      'NEXTAUTH_SECRET=',
      '',
    ];

    if (project.hasFeature(FeatureFlag.AUTH)) {
      lines.push('## Auth Providers');
      for (const provider of project.options.providers) {
        for (const field of provider.fields) {
          lines.push(`${field.envKey}=`);
        }
      }
      lines.push('');
    }

    lines.push('## Cache & KV (Upstash Redis)');
    lines.push('UPSTASH_REDIS_REST_URL=');
    lines.push('UPSTASH_REDIS_REST_TOKEN=');
    lines.push('');

    lines.push('## Cloud Storage (Vercel Blob)');
    lines.push('BLOB_READ_WRITE_TOKEN=');
    lines.push('');

    lines.push('## Feature Flags (Vercel Edge Config)');
    lines.push('EDGE_CONFIG=');
    lines.push('');

    lines.push('## Queue (Upstash QStash)');
    lines.push('QSTASH_TOKEN=');
    lines.push('QSTASH_CURRENT_URL=');
    lines.push('');

    lines.push('## Monitoring (Sentry)');
    lines.push('SENTRY_DSN=');
    lines.push('NEXT_PUBLIC_SENTRY_DSN=');
    lines.push('');

    lines.push('## Deploy (Vercel)');
    lines.push('VERCEL_ORG_ID=');
    lines.push('VERCEL_PROJECT_ID=');
    lines.push('VERCEL_TOKEN=');
    lines.push('');

    return lines.join('\n');
  }

  private generateCloudSetupDocs(project: Project): string {
    return `# Cloud Setup Guide — ${project.name}

## Overview

This project is **100% cloud-only**. No localhost, no local filesystem, no in-memory state.

## Required Cloud Services

| Service | Purpose | Env Vars |
|---------|---------|----------|
| **Vercel** | Hosting & deployment | \`VERCEL_TOKEN\`, \`VERCEL_ORG_ID\`, \`VERCEL_PROJECT_ID\` |
| **Supabase** | PostgreSQL database | \`DATABASE_URL\`, \`DIRECT_URL\`, \`SUPABASE_URL\` |
| **Upstash Redis** | Cache, KV, rate limiting | \`UPSTASH_REDIS_REST_URL\`, \`UPSTASH_REDIS_REST_TOKEN\` |
| **Vercel Blob** | File storage | \`BLOB_READ_WRITE_TOKEN\` |
| **Upstash QStash** | Serverless queue | \`QSTASH_TOKEN\`, \`QSTASH_CURRENT_URL\` |
| **Vercel Edge Config** | Feature flags | \`EDGE_CONFIG\` |
| **Sentry** | Error monitoring | \`SENTRY_DSN\` |

## Setup Steps

### 1. Vercel
\`\`\`bash
npm i -g vercel
vercel login
vercel link
# Copy ORG_ID and PROJECT_ID from .vercel/project.json
\`\`\`

### 2. Supabase
\`\`\`bash
# Create project at supabase.com
# Get DATABASE_URL and DIRECT_URL from Project Settings > Database
# Get SUPABASE_URL and keys from Project Settings > API
\`\`\`

### 3. Upstash Redis
\`\`\`bash
# Create database at upstash.com
# Copy REST_URL and REST_TOKEN
\`\`\`

### 4. Vercel Blob
\`\`\`bash
# Enable in Vercel dashboard > Storage > Blob
# Copy BLOB_READ_WRITE_TOKEN
\`\`\`

### 5. Set Environment Variables
\`\`\`bash
vercel env add DATABASE_URL
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
vercel env add BLOB_READ_WRITE_TOKEN
# ... repeat for all env vars
\`\`\`

### 6. Verify
\`\`\`bash
npx tsx scripts/verify-cloud.ts
\`\`\`

## No Local Dependencies

- ❌ No \`localhost\` URLs
- ❌ No local filesystem reads/writes
- ❌ No in-memory state
- ❌ No local Docker containers
- ✅ All state in cloud KV (Upstash Redis)
- ✅ All files in cloud storage (Vercel Blob)
- ✅ All queues in cloud queue (QStash)
- ✅ All deploys via Vercel
`;
  }

  private generateVerifyScript(project: Project): string {
    return `#!/usr/bin/env tsx
/**
 * ${project.name} — Cloud Environment Verification
 * Verifies all cloud services are accessible
 */

const checks: Array<{ name: string; envVars: string[]; check: () => Promise<boolean> }> = [
  {
    name: 'Supabase',
    envVars: ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'],
    check: async () => {
      const url = process.env.SUPABASE_URL;
      if (!url) return false;
      const res = await fetch(\`\${url}/rest/v1/\`, {
        headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '' },
      });
      return res.ok;
    },
  },
  {
    name: 'Upstash Redis',
    envVars: ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    check: async () => {
      const url = process.env.UPSTASH_REDIS_REST_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN;
      if (!url || !token) return false;
      const res = await fetch(\`\${url}/ping\`, {
        headers: { Authorization: \`Bearer \${token}\` },
      });
      return res.ok;
    },
  },
  {
    name: 'Vercel Blob',
    envVars: ['BLOB_READ_WRITE_TOKEN'],
    check: async () => {
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      if (!token) return false;
      const res = await fetch('https://blob.vercel.com/', {
        headers: { Authorization: \`Bearer \${token}\` },
      });
      return res.ok;
    },
  },
];

async function main() {
  console.log('\\n☁️  Cloud Environment Verification for ${project.name}\\n');

  let allOk = true;

  for (const check of checks) {
    const missing = check.envVars.filter(v => !process.env[v]);
    if (missing.length > 0) {
      console.log(\`❌ \${check.name}: Missing env vars: \${missing.join(', ')}\`);
      allOk = false;
      continue;
    }

    try {
      const ok = await check.check();
      if (ok) {
        console.log(\`✅ \${check.name}: Connected\`);
      } else {
        console.log(\`❌ \${check.name}: Connection failed\`);
        allOk = false;
      }
    } catch (err) {
      console.log(\`❌ \${check.name}: \${err}\`);
      allOk = false;
    }
  }

  if (allOk) {
    console.log('\\n✅ All cloud services verified!\\n');
    process.exit(0);
  } else {
    console.log('\\n❌ Some cloud services are not configured.\\n');
    process.exit(1);
  }
}

main().catch(console.error);
`;
  }
}
