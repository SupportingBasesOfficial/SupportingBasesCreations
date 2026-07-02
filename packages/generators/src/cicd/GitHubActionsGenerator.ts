import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class GitHubActionsGenerator implements Generator {
  readonly name = 'github-actions';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: '.github/workflows/ci.yml',
      content: this.generateCIWorkflow(project),
      language: 'yaml',
    });

    artifacts.push({
      path: '.github/workflows/deploy.yml',
      content: this.generateDeployWorkflow(project),
      language: 'yaml',
    });

    return artifacts;
  }

  private generateCIWorkflow(_project: Project): string {
    return `name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm check-types

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
        env:
          DATABASE_URL: \${{ secrets.SUPABASE_DB_URL }}

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          ignore-unfixed: true
          severity: 'CRITICAL,HIGH'

  deploy-preview:
    needs: [lint, typecheck, test]
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - name: Setup Vercel CLI
        run: pnpm add -g vercel@latest
      - name: Deploy to Vercel Preview
        id: vercel-preview
        run: |
          PREVIEW_URL=$(vercel --token \${{ secrets.VERCEL_TOKEN }} --yes 2>&1 | tail -1)
          echo "preview_url=$PREVIEW_URL" >> $GITHUB_OUTPUT
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
      - name: Run E2E against preview
        run: pnpm exec playwright test --reporter=github
        env:
          BASE_URL: \${{ steps.vercel-preview.outputs.preview_url }}
`;
  }

  private generateDeployWorkflow(project: Project): string {
    return `name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Deploy to Vercel Production
        run: vercel --prod --token \${{ secrets.VERCEL_TOKEN }} --yes
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

      - name: Push database schema to Supabase
        run: npx prisma db push --skip-generate
        env:
          DATABASE_URL: \${{ secrets.SUPABASE_DB_URL }}
          DIRECT_URL: \${{ secrets.SUPABASE_DIRECT_URL }}

      - name: Configure environment variables on Vercel
        run: |
          vercel env add DATABASE_URL production --token \${{ secrets.VERCEL_TOKEN }} <<< "\${{ secrets.SUPABASE_DB_URL }}"
          vercel env add NEXT_PUBLIC_SUPABASE_URL production --token \${{ secrets.VERCEL_TOKEN }} <<< "\${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}"
          vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --token \${{ secrets.VERCEL_TOKEN }} <<< "\${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}"
          vercel env add UPSTASH_REDIS_REST_URL production --token \${{ secrets.VERCEL_TOKEN }} <<< "\${{ secrets.UPSTASH_REDIS_REST_URL }}"
          vercel env add UPSTASH_REDIS_REST_TOKEN production --token \${{ secrets.VERCEL_TOKEN }} <<< "\${{ secrets.UPSTASH_REDIS_REST_TOKEN }}"
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

      - name: Smoke test production
        run: |
          sleep 10
          curl -f https://${project.name}.vercel.app/api/health || exit 1
`;
  }
}
