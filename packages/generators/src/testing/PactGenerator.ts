import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class PactGenerator implements Generator {
  readonly name = 'pact';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [
    ArchitectureType.MICROSERVICES,
    ArchitectureType.MODULAR_MONOLITH,
  ];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'pacts/provider.pact.spec.ts',
      content: this.generateProviderTests(project),
      language: 'typescript',
    });

    artifacts.push({
      path: 'pacts/consumer.pact.spec.ts',
      content: this.generateConsumerTests(),
      language: 'typescript',
    });

    artifacts.push({
      path: '.github/workflows/pact-verification.yml',
      content: this.generatePactCI(),
      language: 'yaml',
    });

    return artifacts;
  }

  private generateProviderTests(project: Project): string {
    return `import { Verifier } from '@pact-foundation/pact';
import { execSync } from 'child_process';
import path from 'path';

describe('Pact Provider Verification', () => {
  it('validates the expectations of our consumer', async () => {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

    await new Verifier({
      providerBaseUrl: process.env.PROVIDER_BASE_URL || 'http://localhost:3000',
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL || 'https://your-org.pactflow.io',
      pactBrokerToken: process.env.PACT_BROKER_TOKEN!,
      provider: '${project.name}-api',
      providerAppVersion: process.env.GIT_SHA || 'dev',
      branch,
      publishVerificationResult: process.env.CI === 'true',
      stateHandlers: {
        'user exists': async () => {
          // Seed test data
        },
        'organization exists': async () => {
          // Seed test data
        },
      },
    }).verifyProvider();
  });
});
`;
  }

  private generateConsumerTests(): string {
    return `import { Pact } from '@pact-foundation/pact';
import path from 'path';

const provider = new Pact({
  consumer: 'frontend-web',
  provider: 'api-service',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'warn',
});

describe('Pact Consumer Tests', () => {
  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('User API', () => {
    it('returns a user by id', async () => {
      await provider.addInteraction({
        state: 'user exists',
        uponReceiving: 'a request for a user by id',
        withRequest: {
          method: 'GET',
          path: '/api/users/123',
          headers: { Authorization: 'Bearer token' },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: {
            id: '123',
            email: 'test@example.com',
            name: 'Test User',
            role: 'USER',
          },
        },
      });

      const res = await fetch('http://localhost:1234/api/users/123', {
        headers: { Authorization: 'Bearer token' },
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.id).toBe('123');
    });
  });
});
`;
  }

  private generatePactCI(): string {
    return `name: Pact Verification

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm db:push
      - run: pnpm dev &
      - run: sleep 5
      - run: pnpm test:pact
        env:
          PACT_BROKER_BASE_URL: \${{ secrets.PACT_BROKER_BASE_URL }}
          PACT_BROKER_TOKEN: \${{ secrets.PACT_BROKER_TOKEN }}
          GIT_SHA: \${{ github.sha }}
          CI: 'true'
`;
  }
}
