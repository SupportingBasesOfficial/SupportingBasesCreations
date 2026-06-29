import { createInterface } from 'readline';
import { writeFileSync } from 'fs';

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log('\n🔧 mega-tech-platform Environment Setup\n');
  console.log('Enter your provider credentials below.\n');

  const env: Record<string, string> = {
    NODE_ENV: 'development',
    NEXTAUTH_SECRET: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
    DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/mega-tech-platform_dev',
  };

  env.GOOGLE_CLIENT_ID = await ask('Client ID (required): ') || '';
  env.GOOGLE_CLIENT_SECRET = await ask('Client Secret (required): ') || '';
  env.GOOGLE_REDIRECT_URI = await ask('Redirect URI: ') || 'http://localhost:3000/api/auth/callback/google';

  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = await ask('Publishable Key (required): ') || '';
  env.STRIPE_SECRET_KEY = await ask('Secret Key (required): ') || '';
  env.STRIPE_WEBHOOK_SECRET = await ask('Webhook Secret (required): ') || '';

  env.SENTRY_DSN = await ask('DSN (required): ') || '';
  env.SENTRY_AUTH_TOKEN = await ask('Auth Token: ') || '';

  const lines = Object.entries(env).map(([k, v]) => `${k}=${v}`);
  writeFileSync('.env.local', lines.join('\n') + '\n');

  console.log('\n✅ Created .env.local');
  console.log('⚠️  Make sure to add .env.local to .gitignore!\n');
  rl.close();
}

main();
