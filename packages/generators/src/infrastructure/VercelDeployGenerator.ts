import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class VercelDeployGenerator implements Generator {
  readonly name = 'vercel-deploy';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'vercel.json',
      content: this.generateVercelJson(project),
      language: 'json',
    });

    artifacts.push({
      path: '.github/workflows/deploy.yml',
      content: this.generateDeployWorkflow(project),
      language: 'yaml',
    });

    artifacts.push({
      path: 'scripts/deploy.ts',
      content: this.generateDeployScript(project),
      language: 'typescript',
    });

    return artifacts;
  }

  private generateVercelJson(project: Project): string {
    const config: Record<string, unknown> = {
      version: 2,
      buildCommand: 'pnpm build',
      installCommand: 'pnpm install --frozen-lockfile',
      framework: 'nextjs',
      regions: ['iad1'],
      functions: {
        'api/**/*.ts': { memory: 1024, maxDuration: 30 },
      },
      headers: [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
          ],
        },
      ],
    };

    if (project.options.infrastructure.cache !== 'NONE') {
      config.crons = [];
    }

    return JSON.stringify(config, null, 2) + '\n';
  }

  private generateDeployWorkflow(project: Project): string {
    return `name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy-preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    outputs:
      preview-url: \${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Install Vercel CLI
        run: npm i -g vercel@latest
      - name: Deploy Preview
        id: deploy
        run: |
          url=$(vercel --token \${{ secrets.VERCEL_TOKEN }} --yes 2>&1 | tail -1)
          echo "url=$url" >> $GITHUB_OUTPUT
      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              ...context.repo,
              issue_number: context.issue.number,
              body: '🚀 Preview deployment: \${{ steps.deploy.outputs.url }}'
            });

  deploy-production:
    name: Deploy Production
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Install Vercel CLI
        run: npm i -g vercel@latest
      - name: Deploy Production
        run: vercel --prod --token \${{ secrets.VERCEL_TOKEN }} --yes
      - name: Smoke Test
        run: |
          sleep 10
          curl -f https://${project.name}.vercel.app/api/health || exit 1
`;
  }

  private generateDeployScript(project: Project): string {
    return `#!/usr/bin/env tsx
/**
 * ${project.name} — Cloud Deploy Script
 * Deploys to Vercel using the Vercel CLI
 */
import { execSync } from 'child_process';

const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error('VERCEL_TOKEN is required');
  process.exit(1);
}

const isProd = process.argv.includes('--prod');

console.log(\`Deploying ${project.name} to Vercel (\${isProd ? 'production' : 'preview'})...\`);

const cmd = isProd
  ? \`vercel --prod --token \${token} --yes\`
  : \`vercel --token \${token} --yes\`;

try {
  const output = execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
  const url = output.trim().split('\\n').pop();
  console.log(\`\\n✅ Deployed to: \${url}\`);
} catch (err) {
  console.error('Deploy failed:', err);
  process.exit(1);
}
`;
  }
}
