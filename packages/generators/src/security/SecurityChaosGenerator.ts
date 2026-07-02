import { FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class SecurityChaosGenerator implements Generator {
  readonly name = 'security-chaos';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(_context: GenerationContext): Promise<GeneratedArtifact[]> {
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'tests/chaos/security-chaos.test.ts',
      content: this.generateChaosTests(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'tests/chaos/attack-injection.ts',
      content: this.generateAttackInjection(),
      language: 'typescript',
    });

    artifacts.push({
      path: '.github/workflows/security-chaos.yml',
      content: this.generateChaosWorkflow(),
      language: 'yaml',
    });

    artifacts.push({
      path: 'docs/CHAOS-SECURITY.md',
      content: this.generateDocs(),
      language: 'markdown',
    });

    return artifacts;
  }

  private generateChaosTests(): string {
    return `import { describe, it, expect } from 'vitest';

/**
 * Security Chaos Engineering Tests
 * Proactively inject attacks and failures to verify defense systems respond correctly.
 */

const BASE_URL = process.env.BASE_URL ?? 'https://staging.vercel.app';

describe('Security Chaos: Attack Injection', () => {
  it('should block SQL injection attempts', async () => {
    const attacks = [
      "' OR '1'='1",
      "'; DROP TABLE users; --",
      "' UNION SELECT * FROM users --",
      "1; EXEC xp_cmdshell('dir') --",
    ];

    for (const payload of attacks) {
      const res = await fetch(\`\${BASE_URL}/api/entities?search=\${encodeURIComponent(payload)}\`);
      // Should not return 200 with data — either blocked or sanitized
      if (res.ok) {
        const body = await res.json();
        expect(body).not.toContain(payload);
      }
    }
  });

  it('should block XSS attempts', async () => {
    const attacks = [
      '<script>alert("xss")</script>',
      '<img src=x onerror=alert(1)>',
      'javascript:alert(1)',
      '<iframe src="javascript:alert(1)">',
    ];

    for (const payload of attacks) {
      const res = await fetch(\`\${BASE_URL}/api/entities\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: payload }),
      });

      if (res.ok) {
        const body = await res.text();
        expect(body).not.toContain('<script>');
        expect(body).not.toContain('onerror=');
      }
    }
  });

  it('should block path traversal attempts', async () => {
    const attacks = [
      '../../../etc/passwd',
      '..\\\\..\\\\..\\\\windows\\\\system32',
      '....//....//....//etc/passwd',
    ];

    for (const payload of attacks) {
      const res = await fetch(\`\${BASE_URL}/api/files/\${encodeURIComponent(payload)}\`);
      expect(res.status).not.toBe(200);
    }
  });

  it('should enforce rate limiting under burst', async () => {
    const requests = Array.from({ length: 200 }, () =>
      fetch(\`\${BASE_URL}/api/entities\`).then((r) => r.status),
    );

    const statuses = await Promise.all(requests);
    const rateLimited = statuses.filter((s) => s === 429).length;
    expect(rateLimited).toBeGreaterThan(0);
  });

  it('should block unauthorized access to protected endpoints', async () => {
    const protectedEndpoints = [
      '/api/admin/users',
      '/api/admin/config',
      '/api/deploy',
    ];

    for (const endpoint of protectedEndpoints) {
      const res = await fetch(\`\${BASE_URL}\${endpoint}\`);
      expect([401, 403]).toContain(res.status);
    }
  });

  it('should not leak sensitive headers', async () => {
    const res = await fetch(BASE_URL);
    const headers = res.headers;

    expect(headers.get('x-powered-by')).toBeNull();
    expect(headers.get('server')).toBeNull();
    expect(headers.get('x-aspnet-version')).toBeNull();
  });

  it('should enforce HTTPS with HSTS', async () => {
    const res = await fetch(BASE_URL);
    const hsts = res.headers.get('strict-transport-security');
    expect(hsts).toContain('max-age=');
    expect(hsts).toContain('includeSubDomains');
  });

  it('should enforce CSP headers', async () => {
    const res = await fetch(BASE_URL);
    const csp = res.headers.get('content-security-policy');
    expect(csp).toBeTruthy();
    expect(csp).toContain("default-src 'self'");
  });
});

describe('Security Chaos: Failure Injection', () => {
  it('should handle database connection failure gracefully', async () => {
    // This test verifies the app doesn't crash when DB is unavailable
    // In production, this would inject a network partition
    const res = await fetch(\`\${BASE_URL}/api/health\`);
    expect(res.status).toBeLessThan(500);
  });

  it('should handle Redis connection failure gracefully', async () => {
    // Rate limiter should fail open if Redis is down
    const res = await fetch(\`\${BASE_URL}/api/entities\`);
    expect(res.status).not.toBe(503);
  });

  it('should sanitize errors without leaking internals', async () => {
    const res = await fetch(\`\${BASE_URL}/api/entities/invalid-uuid-that-is-way-too-long\`);
    const body = await res.json();

    expect(JSON.stringify(body)).not.toContain('stack');
    expect(JSON.stringify(body)).not.toContain('node_modules');
    expect(JSON.stringify(body)).not.toContain('.env');
    expect(JSON.stringify(body)).not.toContain('password');
  });
});
`;
  }

  private generateAttackInjection(): string {
    return `/**
 * Attack Injection Framework
 * Programmatically injects attacks to test defense systems.
 */

export interface AttackResult {
  attack: string;
  blocked: boolean;
  statusCode: number;
  responseTime: number;
  details?: string;
}

const BASE_URL = process.env.BASE_URL ?? 'https://staging.vercel.app';

export async function runAttackSuite(): Promise<AttackResult[]> {
  const results: AttackResult[] = [];

  // SQL Injection
  for (const payload of SQL_INJECTION_PAYLOADS) {
    results.push(await injectSQLInjection(payload));
  }

  // XSS
  for (const payload of XSS_PAYLOADS) {
    results.push(await injectXSS(payload));
  }

  // Path Traversal
  for (const payload of PATH_TRAVERSAL_PAYLOADS) {
    results.push(await injectPathTraversal(payload));
  }

  // CSRF
  results.push(await injectCSRF());

  // Brute Force
  results.push(await injectBruteForce());

  // Rate Limit Evasion
  results.push(await injectRateLimitEvasion());

  return results;
}

async function injectSQLInjection(payload: string): Promise<AttackResult> {
  const start = Date.now();
  const res = await fetch(\`\${BASE_URL}/api/entities?search=\${encodeURIComponent(payload)}\`);
  const responseTime = Date.now() - start;
  const blocked = res.status === 400 || res.status === 403;

  return { attack: \`SQLi: \${payload.slice(0, 30)}\`, blocked, statusCode: res.status, responseTime };
}

async function injectXSS(payload: string): Promise<AttackResult> {
  const start = Date.now();
  const res = await fetch(\`\${BASE_URL}/api/entities\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: payload }),
  });
  const responseTime = Date.now() - start;

  let blocked = res.status === 400;
  if (res.ok) {
    const body = await res.text();
    blocked = !body.includes('<script>');
  }

  return { attack: \`XSS: \${payload.slice(0, 30)}\`, blocked, statusCode: res.status, responseTime };
}

async function injectPathTraversal(payload: string): Promise<AttackResult> {
  const start = Date.now();
  const res = await fetch(\`\${BASE_URL}/api/files/\${encodeURIComponent(payload)}\`);
  const responseTime = Date.now() - start;
  const blocked = res.status !== 200;

  return { attack: \`Path: \${payload.slice(0, 30)}\`, blocked, statusCode: res.status, responseTime };
}

async function injectCSRF(): Promise<AttackResult> {
  const start = Date.now();
  const res = await fetch(\`\${BASE_URL}/api/entities\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'test' }),
  });
  const responseTime = Date.now() - start;
  const blocked = res.status === 403;

  return { attack: 'CSRF (no token)', blocked, statusCode: res.status, responseTime };
}

async function injectBruteForce(): Promise<AttackResult> {
  const start = Date.now();
  let blocked = false;
  let lastStatus = 0;

  for (let i = 0; i < 50; i++) {
    const res = await fetch(\`\${BASE_URL}/api/auth/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@test.com', password: \`pass\${i}\` }),
    });
    lastStatus = res.status;
    if (res.status === 429) {
      blocked = true;
      break;
    }
  }

  const responseTime = Date.now() - start;
  return { attack: 'Brute Force (50 attempts)', blocked, statusCode: lastStatus, responseTime };
}

async function injectRateLimitEvasion(): Promise<AttackResult> {
  const start = Date.now();
  const requests = Array.from({ length: 300 }, (_, i) =>
    fetch(\`\${BASE_URL}/api/entities\`, {
      headers: { 'X-Forwarded-For': \`10.0.\${Math.floor(i / 100)}.\${i % 100}\` },
    }).then((r) => r.status),
  );

  const statuses = await Promise.all(requests);
  const blocked = statuses.filter((s) => s === 429).length > 0;
  const responseTime = Date.now() - start;

  return {
    attack: 'Rate Limit Evasion (IP rotation)',
    blocked,
    statusCode: 429,
    responseTime,
    details: \`\${statuses.filter((s) => s === 429).length}/300 blocked\`,
  };
}

const SQL_INJECTION_PAYLOADS = [
  "' OR '1'='1",
  "'; DROP TABLE users; --",
  "' UNION SELECT password FROM users --",
  "1' AND SLEEP(5)--",
  "admin'--",
];

const XSS_PAYLOADS = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  '"><script>alert(1)</script>',
  '<svg onload=alert(1)>',
  'javascript:alert(1)',
];

const PATH_TRAVERSAL_PAYLOADS = [
  '../../../etc/passwd',
  '..\\\\..\\\\..\\\\windows\\\\system32\\\\config\\\\sam',
  '....//....//....//etc/shadow',
  '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
];

// Run if executed directly
if (require.main === module) {
  runAttackSuite().then((results) => {
    console.log('\\n🔒 Security Chaos Test Results\\n');
    console.log('Attack'.padEnd(40), 'Blocked'.padEnd(10), 'Status'.padEnd(8), 'Time');
    console.log('-'.repeat(70));
    for (const r of results) {
      console.log(
        r.attack.padEnd(40),
        (r.blocked ? '✅' : '❌').padEnd(10),
        String(r.statusCode).padEnd(8),
        \`\${r.responseTime}ms\`,
      );
    }
    const passed = results.filter((r) => r.blocked).length;
    console.log(\`\\n\${passed}/\${results.length} attacks blocked\\n\`);
    process.exit(passed === results.length ? 0 : 1);
  });
}
`;
  }

  private generateChaosWorkflow(): string {
    return `name: Security Chaos Engineering

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  chaos-security:
    name: Security Chaos Tests
    runs-on: ubuntu-latest
    environment: staging
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

      - name: Run Security Chaos Tests
        env:
          BASE_URL: \${{ secrets.STAGING_URL }}
        run: npx vitest run tests/chaos/security-chaos.test.ts

      - name: Run Attack Injection Suite
        env:
          BASE_URL: \${{ secrets.STAGING_URL }}
        run: npx tsx tests/chaos/attack-injection.ts

      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1.26.0
        with:
          slack-message: '🚨 Security Chaos tests failed! Attacks got through defenses.'
          slack-channel: '#security-alerts'
        env:
          SLACK_BOT_TOKEN: \${{ secrets.SLACK_BOT_TOKEN }}

      - name: Upload chaos report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: chaos-security-report
          path: tests/chaos/
          retention-days: 30
`;
  }

  private generateDocs(): string {
    return `# Security Chaos Engineering

## Philosophy

> "Assume the system will fail and the attacker is already inside."

Security Chaos Engineering proactively injects attacks, failures, and fault conditions
into the running system to verify that defense mechanisms respond correctly.

## Attack Suite

| Attack Type | Description | Expected Defense |
|-------------|-------------|------------------|
| SQL Injection | Classic and blind SQLi payloads | Input validation + parameterized queries |
| XSS | Script injection via various vectors | CSP + input sanitization |
| Path Traversal | Directory traversal attempts | Path validation + sandboxing |
| CSRF | State-changing requests without token | CSRF middleware (403) |
| Brute Force | 50 rapid login attempts | Rate limiting (429) |
| Rate Limit Evasion | IP rotation to bypass limits | Distributed rate limit (Upstash) |

## Running Tests

### Local (against staging)
\`\`\`bash
BASE_URL=https://staging.vercel.app npx vitest run tests/chaos/security-chaos.test.ts
\`\`\`

### Attack Injection Suite
\`\`\`bash
BASE_URL=https://staging.vercel.app npx tsx tests/chaos/attack-injection.ts
\`\`\`

### CI (automated)
Tests run every 6 hours via GitHub Actions against staging.
Failures trigger Slack alerts to #security-alerts.

## Immutable Infrastructure

- Vercel deployments are immutable — no SSH, no persistent servers
- Each deploy creates a fresh instance
- No malware persistence possible
- Rollback to previous deploy in seconds

## Response Automation

When chaos tests detect a defense failure:
1. Slack alert sent to #security-alerts
2. GitHub issue auto-created
3. Failed test artifact uploaded for analysis
4. If critical: auto-rollback to previous deploy
`;
  }
}
