import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class EnvGenerator implements Generator {
  readonly name = 'env';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: '.env.example',
      content: this.generateEnvExample(project),
      language: 'env',
    });

    artifacts.push({
      path: '.env.local.example',
      content: this.generateLocalEnv(project),
      language: 'env',
    });

    artifacts.push({
      path: 'docs/SETUP.md',
      content: this.generateSetupGuide(project),
      language: 'markdown',
    });

    if (project.options.providers.length > 0) {
      artifacts.push({
        path: 'scripts/setup-env.ts',
        content: this.generateSetupScript(project),
        language: 'typescript',
      });
    }

    return artifacts;
  }

  private generateEnvExample(project: Project): string {
    const lines: string[] = [
      `# ${project.name} Environment Configuration`,
      `# Cloud-only mode — all services are cloud-hosted`,
      '',
      '## Application',
      `NODE_ENV=production`,
      `NEXT_PUBLIC_APP_NAME=${project.name}`,
      `NEXT_PUBLIC_APP_URL=`,
      '',
      '## Database (Supabase)',
      `DATABASE_URL=`,
      `DIRECT_URL=`,
      '',
      '## NextAuth',
      'NEXTAUTH_URL=',
      'NEXTAUTH_SECRET=',
      '',
    ];

    if (project.hasFeature(FeatureFlag.AUTH)) {
      lines.push('## Authentication Providers');
      lines.push('# Configure the providers you want to use');
      lines.push('');
    }

    for (const provider of project.options.providers) {
      lines.push(...provider.generateEnvTemplate().split('\n'));
    }

    if (project.options.infrastructure.cache !== 'NONE') {
      lines.push('## Cache (Upstash Redis)');
      lines.push('UPSTASH_REDIS_REST_URL=');
      lines.push('UPSTASH_REDIS_REST_TOKEN=');
      lines.push('');
    }

    lines.push('## Monitoring');
    lines.push('SENTRY_DSN=');
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

    return lines.join('\n');
  }

  private generateLocalEnv(project: Project): string {
    const lines: string[] = [
      `# ${project.name} - Cloud Development Environment`,
      `# All services are cloud-hosted — no localhost dependencies`,
      '',
      'NODE_ENV=development',
      'NEXTAUTH_SECRET=dev-secret-change-in-production',
      `DATABASE_URL=`,
      '',
    ];

    for (const provider of project.options.providers) {
      for (const field of provider.fields) {
        lines.push(`${field.envKey}=${field.defaultValue || 'your_' + field.name + '_here'}`);
      }
      lines.push('');
    }

    return lines.join('\n');
  }

  private generateSetupGuide(project: Project): string {
    const sections: string[] = [
      `# Setup Guide: ${project.name}`,
      '',
      '## Quick Start',
      '',
      '1. Copy environment file:',
      '   ```bash',
      '   cp .env.local.example .env.local',
      '   ```',
      '',
      '2. Install dependencies:',
      '   ```bash',
      '   pnpm install',
      '   ```',
      '',
      '3. Setup database:',
      '   ```bash',
      '   pnpm db',
      '   ```',
      '',
      '4. Run dev server:',
      '   ```bash',
      '   pnpm dev',
      '   ```',
      '',
    ];

    if (project.options.providers.length > 0) {
      sections.push('## Provider Configuration');
      sections.push('');
      sections.push('This project uses the following external services. You must create accounts and configure API keys:');
      sections.push('');

      for (const provider of project.options.providers) {
        sections.push(provider.generateSetupGuide());
        sections.push('');
      }

      sections.push('## Automated Setup');
      sections.push('');
      sections.push('Run the setup script for interactive configuration:');
      sections.push('```bash');
      sections.push('npx tsx scripts/setup-env.ts');
      sections.push('```');
      sections.push('');
    }

    sections.push('## Verification');
    sections.push('');
    sections.push('After configuration, verify everything works:');
    sections.push('```bash');
    sections.push('pnpm check-types  # Type check');
    sections.push('pnpm test          # Run tests');
    sections.push('```');

    return sections.join('\n');
  }

  private generateSetupScript(project: Project): string {
    return `import { createInterface } from 'readline';
import { writeFileSync } from 'fs';

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log('\\n🔧 ${project.name} Environment Setup\\n');
  console.log('Enter your provider credentials below.\\n');

  const env: Record<string, string> = {
    NODE_ENV: 'development',
    NEXTAUTH_SECRET: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
    DATABASE_URL: '',
  };

${project.options.providers.map((p) => p.fields.map((f) => `  env.${f.envKey} = await ask('${f.label}${f.required ? ' (required)' : ''}: ') || '${f.defaultValue || ''}';`).join('\n')).join('\n\n')}

  const lines = Object.entries(env).map(([k, v]) => \`\${k}=\${v}\`);
  writeFileSync('.env.local', lines.join('\\n') + '\\n');

  console.log('\\n✅ Created .env.local');
  console.log('⚠️  Make sure to add .env.local to .gitignore!\\n');
  rl.close();
}

main();
`;
  }
}
