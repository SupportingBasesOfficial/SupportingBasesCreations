import type { Named, Configurable } from '@sbc/shared';

export type ProviderType = 
  | 'oauth-google'
  | 'oauth-github'
  | 'oauth-microsoft'
  | 'stripe'
  | 'sendgrid'
  | 'aws-ses'
  | 'twilio'
  | 'firebase'
  | 'segment'
  | 'plausible'
  | 'sentry'
  | 'openai';

export interface ProviderField {
  name: string;
  label: string;
  type: 'string' | 'password' | 'url' | 'email';
  required: boolean;
  envKey: string;
  description?: string;
  defaultValue?: string;
}

export class ProviderConfig implements Named, Configurable {
  readonly name: string;
  readonly type: ProviderType;
  readonly fields: ProviderField[];
  readonly description: string;

  constructor(type: ProviderType, fields: ProviderField[], description = '') {
    this.type = type;
    this.name = type.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    this.fields = fields;
    this.description = description;
  }

  static oauthGoogle(): ProviderConfig {
    return new ProviderConfig('oauth-google', [
      { name: 'clientId', label: 'Client ID', type: 'string', required: true, envKey: 'GOOGLE_CLIENT_ID', description: 'From Google Cloud Console > Credentials' },
      { name: 'clientSecret', label: 'Client Secret', type: 'password', required: true, envKey: 'GOOGLE_CLIENT_SECRET', description: 'From Google Cloud Console > Credentials' },
      { name: 'redirectUri', label: 'Redirect URI', type: 'url', required: false, envKey: 'GOOGLE_REDIRECT_URI', defaultValue: 'http://localhost:3000/api/auth/callback/google' },
    ], 'Google OAuth 2.0 authentication');
  }

  static oauthGitHub(): ProviderConfig {
    return new ProviderConfig('oauth-github', [
      { name: 'clientId', label: 'Client ID', type: 'string', required: true, envKey: 'GITHUB_CLIENT_ID', description: 'From GitHub Settings > Developer settings > OAuth Apps' },
      { name: 'clientSecret', label: 'Client Secret', type: 'password', required: true, envKey: 'GITHUB_CLIENT_SECRET', description: 'From GitHub Settings > Developer settings > OAuth Apps' },
    ], 'GitHub OAuth 2.0 authentication');
  }

  static stripe(): ProviderConfig {
    return new ProviderConfig('stripe', [
      { name: 'publishableKey', label: 'Publishable Key', type: 'string', required: true, envKey: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', description: 'From Stripe Dashboard > Developers > API keys' },
      { name: 'secretKey', label: 'Secret Key', type: 'password', required: true, envKey: 'STRIPE_SECRET_KEY', description: 'From Stripe Dashboard > Developers > API keys' },
      { name: 'webhookSecret', label: 'Webhook Secret', type: 'password', required: true, envKey: 'STRIPE_WEBHOOK_SECRET', description: 'From Stripe Dashboard > Developers > Webhooks' },
    ], 'Stripe payment processing');
  }

  static sendgrid(): ProviderConfig {
    return new ProviderConfig('sendgrid', [
      { name: 'apiKey', label: 'API Key', type: 'password', required: true, envKey: 'SENDGRID_API_KEY', description: 'From SendGrid Dashboard > Settings > API Keys' },
      { name: 'fromEmail', label: 'From Email', type: 'email', required: true, envKey: 'SENDGRID_FROM_EMAIL', description: 'Verified sender email address' },
    ], 'SendGrid email delivery');
  }

  static sentry(): ProviderConfig {
    return new ProviderConfig('sentry', [
      { name: 'dsn', label: 'DSN', type: 'string', required: true, envKey: 'SENTRY_DSN', description: 'From Sentry Dashboard > Project Settings > Client Keys (DSN)' },
      { name: 'authToken', label: 'Auth Token', type: 'password', required: false, envKey: 'SENTRY_AUTH_TOKEN', description: 'For source maps upload (optional)' },
    ], 'Sentry error monitoring');
  }

  static openai(): ProviderConfig {
    return new ProviderConfig('openai', [
      { name: 'apiKey', label: 'API Key', type: 'password', required: true, envKey: 'OPENAI_API_KEY', description: 'From OpenAI Dashboard > API Keys' },
      { name: 'orgId', label: 'Organization ID', type: 'string', required: false, envKey: 'OPENAI_ORG_ID', description: 'Optional: OpenAI organization ID' },
    ], 'OpenAI API integration');
  }

  static twilio(): ProviderConfig {
    return new ProviderConfig('twilio', [
      { name: 'accountSid', label: 'Account SID', type: 'string', required: true, envKey: 'TWILIO_ACCOUNT_SID', description: 'From Twilio Console > Account Info' },
      { name: 'authToken', label: 'Auth Token', type: 'password', required: true, envKey: 'TWILIO_AUTH_TOKEN', description: 'From Twilio Console > Account Info' },
      { name: 'fromNumber', label: 'From Number', type: 'string', required: true, envKey: 'TWILIO_FROM_NUMBER', description: 'Your Twilio phone number (E.164 format)' },
    ], 'Twilio SMS/Voice');
  }

  toConfig(): Record<string, unknown> {
    return {
      type: this.type,
      name: this.name,
      fields: this.fields,
      description: this.description,
    };
  }

  generateEnvTemplate(): string {
    const lines: string[] = [`# ${this.name}`, `# ${this.description}`];
    for (const field of this.fields) {
      lines.push(`# ${field.description || ''}`);
      lines.push(`${field.envKey}=${field.defaultValue || ''}`);
    }
    lines.push('');
    return lines.join('\n');
  }

  generateSetupGuide(): string {
    const steps: string[] = [
      `## ${this.name} Setup`,
      '',
      `**Provider**: ${this.description}`,
      '',
      '### Required Steps',
    ];

    for (const field of this.fields) {
      steps.push(`1. **${field.label}** (\`${field.envKey}\`)`);
      steps.push(`   - ${field.description || 'Configure this value in your provider dashboard'}`);
      steps.push(`   - Set in \`.env\`: \`${field.envKey}=your_${field.name}_here\``);
      steps.push('');
    }

    return steps.join('\n');
  }
}
