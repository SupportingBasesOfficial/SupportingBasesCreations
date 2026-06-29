import { Entity, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class TestGenerator implements Generator {
  readonly name = 'testing';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'vitest.config.ts',
      content: this.generateVitestConfig(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'playwright.config.ts',
      content: this.generatePlaywrightConfig(),
      language: 'typescript',
    });

    for (const entity of project.options.entities) {
      artifacts.push({
        path: `tests/unit/${entity.name.toLowerCase()}.test.ts`,
        content: this.generateUnitTests(entity),
        language: 'typescript',
      });
    }

    artifacts.push({
      path: 'tests/e2e/auth.spec.ts',
      content: this.generateE2ETests(),
      language: 'typescript',
    });

    return artifacts;
  }

  private generateVitestConfig(): string {
    return `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
  },
});
`;
  }

  private generatePlaywrightConfig(): string {
    return `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
`;
  }

  private generateUnitTests(entity: Entity): string {
    return `import { describe, it, expect } from 'vitest';
import { ${entity.name} } from '@/server/entities/${entity.name.toLowerCase()}';

describe('${entity.name}', () => {
  it('should create a valid ${entity.name.toLowerCase()}', () => {
    const item = new ${entity.name}({
      id: 'test-id',
      name: 'Test',
    });
    expect(item).toBeDefined();
    expect(item.name).toBe('Test');
  });

  it('should validate required fields', () => {
    expect(() => new ${entity.name}({})).toThrow();
  });
});
`;
  }

  private generateE2ETests(): string {
    return `import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
  });

  test('unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/organizations');
    await expect(page).toHaveURL('/login');
  });
});
`;
  }
}
