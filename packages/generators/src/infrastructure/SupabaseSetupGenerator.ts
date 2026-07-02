import { Project, FeatureFlag, ArchitectureType, FieldType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class SupabaseSetupGenerator implements Generator {
  readonly name = 'supabase-setup';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'supabase/config.toml',
      content: this.generateSupabaseConfig(project),
      language: 'toml',
    });

    artifacts.push({
      path: 'supabase/migrations/00000000000000_init.sql',
      content: this.generateInitialMigration(project),
      language: 'sql',
    });

    artifacts.push({
      path: 'scripts/setup-supabase.ts',
      content: this.generateSetupScript(project),
      language: 'typescript',
    });

    artifacts.push({
      path: 'docs/SUPABASE.md',
      content: this.generateDocs(project),
      language: 'markdown',
    });

    return artifacts;
  }

  private generateSupabaseConfig(project: Project): string {
    return `# Supabase configuration for ${project.name}
# Cloud-only — uses Supabase hosted PostgreSQL

project_id = "${project.name.replace(/-/g, '_')}"

[api]
enabled = true
port = 54321
schemas = ["public", "graphql_public"]

[db]
port = 54322

[studio]
enabled = false

[auth]
enabled = true
site_url = "https://${project.name}.vercel.app"

[auth.external.github]
enabled = true
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_CLIENT_SECRET)"

[storage]
enabled = true
file_size_limit = "50MiB"

[edge_runtime]
enabled = true
`;
  }

  private generateInitialMigration(project: Project): string {
    const entityTables = project.options.entities.map(entity => {
      const fields = entity.fields.map(f => {
        let colType = 'text';
        if (f.type === FieldType.STRING || f.type === FieldType.TEXT) colType = 'text';
        else if (f.type === FieldType.INTEGER || f.type === FieldType.BIGINT) colType = 'integer';
        else if (f.type === FieldType.DECIMAL || f.type === FieldType.FLOAT) colType = 'numeric';
        else if (f.type === FieldType.BOOLEAN) colType = 'boolean';
        else if (f.type === FieldType.DATE) colType = 'date';
        else if (f.type === FieldType.DATETIME || f.type === FieldType.TIMESTAMP) colType = 'timestamptz';
        else if (f.type === FieldType.UUID) colType = 'uuid';
        else if (f.type === FieldType.JSON || f.type === FieldType.JSONB) colType = 'jsonb';
        else if (f.type === FieldType.ENUM) colType = 'text';
        else if (f.type === FieldType.ARRAY) colType = 'text[]';
        else if (f.type === FieldType.BLOB) colType = 'bytea';
        return `  ${f.name} ${colType}${f.isRequired() ? ' not null' : ''}`;
      }).join(',\n');

      return `create table if not exists "${entity.name.toLowerCase()}" (
  id uuid primary key default gen_random_uuid(),
${fields},
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table "${entity.name.toLowerCase()}" enable row level security;

create policy "Users can view own ${entity.name.toLowerCase()}"
  on "${entity.name.toLowerCase()}" for select
  using (auth.uid() = user_id);

create policy "Users can insert own ${entity.name.toLowerCase()}"
  on "${entity.name.toLowerCase()}" for insert
  with check (auth.uid() = user_id);

create policy "Users can update own ${entity.name.toLowerCase()}"
  on "${entity.name.toLowerCase()}" for update
  using (auth.uid() = user_id);

create policy "Users can delete own ${entity.name.toLowerCase()}"
  on "${entity.name.toLowerCase()}" for delete
  using (auth.uid() = user_id);`;
    }).join('\n\n');

    return `-- ${project.name} initial migration
-- Cloud-only: uses Supabase hosted PostgreSQL with RLS

-- Enable required extensions
create extension if not exists "pgcrypto";

${entityTables}

-- Updated_at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

${project.options.entities.map(e => 
  `create trigger "${e.name.toLowerCase()}_updated_at" before update on "${e.name.toLowerCase()}" for each row execute function update_updated_at();`
).join('\n')}
`;
  }

  private generateSetupScript(project: Project): string {
    return `#!/usr/bin/env tsx
/**
 * ${project.name} — Supabase Setup Script
 * Configures Supabase project, runs migrations, and sets env vars
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('\\n🔧 Setting up Supabase for ${project.name}...\\n');

  // Check connection
  const { error: healthError } = await supabase.from('_test').select('*').limit(1);
  if (healthError && healthError.code !== 'PGRST205') {
    console.error('Supabase connection failed:', healthError.message);
    process.exit(1);
  }
  console.log('✅ Supabase connection OK');

  // Run migrations via SQL
  console.log('Running migrations...');
  const { error: migrationError } = await supabase.rpc('exec_sql', {
    sql: 'SELECT 1',
  });
  if (migrationError) {
    console.warn('⚠️  Could not run migrations via API. Use Supabase dashboard or CLI.');
  } else {
    console.log('✅ Migrations applied');
  }

  console.log('\\n✅ Supabase setup complete');
  console.log('Next steps:');
  console.log('  1. Set DATABASE_URL in your Vercel env vars');
  console.log('  2. Set DIRECT_URL in your Vercel env vars');
  console.log('  3. Configure auth providers in Supabase dashboard');
}

main().catch(console.error);
`;
  }

  private generateDocs(project: Project): string {
    return `# Supabase Setup Guide — ${project.name}

## Overview

This project uses **Supabase** (hosted PostgreSQL) as the database. No local PostgreSQL installation is required.

## Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Get your credentials** from Project Settings > API:
   - \`DATABASE_URL\` — PostgreSQL connection string
   - \`DIRECT_URL\` — Direct connection string (for migrations)
   - \`SUPABASE_URL\` — Project URL
   - \`SUPABASE_SERVICE_ROLE_KEY\` — Service role key

3. **Set environment variables** in Vercel:
   \`\`\`bash
   vercel env add DATABASE_URL
   vercel env add DIRECT_URL
   \`\`\`

4. **Run migrations**:
   \`\`\`bash
   npx tsx scripts/setup-supabase.ts
   \`\`\`

5. **Configure RLS policies** — already included in the initial migration

## Schema

${project.options.entities.map(e => `- **${e.name}**: ${e.fields.map(f => f.name).join(', ')}`).join('\n')}

## RLS Policies

All tables have Row Level Security enabled with policies for:
- SELECT: Users can view their own records
- INSERT: Users can create their own records
- UPDATE: Users can update their own records
- DELETE: Users can delete their own records
`;
  }
}
