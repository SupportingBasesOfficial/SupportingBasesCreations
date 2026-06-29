import { FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class SecurityAuditGenerator implements Generator {
  readonly name = 'security-audit';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(_context: GenerationContext): Promise<GeneratedArtifact[]> {
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: '.github/workflows/security.yml',
      content: this.generateSecurityCI(),
      language: 'yaml',
    });

    artifacts.push({
      path: 'semgrep.yml',
      content: this.generateSemgrepConfig(),
      language: 'yaml',
    });

    artifacts.push({
      path: '.snyk',
      content: this.generateSnykPolicy(),
      language: 'yaml',
    });

    artifacts.push({
      path: 'security-headers.ts',
      content: this.generateSecurityHeaders(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/rateLimit.ts',
      content: this.generateRateLimit(),
      language: 'typescript',
    });

    return artifacts;
  }

  private generateSecurityCI(): string {
    return `name: Security Audit

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 3 * * 1'

jobs:
  semgrep:
    runs-on: ubuntu-latest
    container:
      image: semgrep/semgrep
    steps:
      - uses: actions/checkout@v4
      - run: semgrep ci --config=auto
        env:
          SEMGREP_APP_TOKEN: \${{ secrets.SEMGREP_APP_TOKEN }}

  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: main
          head: HEAD
          extra_args: --debug --only-verified

  dependency-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm audit --json > audit-report.json || true
      - run: pnpm sbom --json > sbom.json
      - uses: actions/upload-artifact@v4
        with:
          name: security-reports
          path: |
            audit-report.json
            sbom.json

  zap-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t \${{ secrets.STAGING_URL || 'http://localhost:3000' }} || true
`;
  }

  private generateSemgrepConfig(): string {
    return `rules:
  - id: no-hardcoded-secrets
    pattern-regex: (?i)(password|secret|key|token)\s*=\s*['"]\S+['"]
    languages:
      - ts
      - js
    message: "Potential hardcoded secret detected"
    severity: ERROR

  - id: no-sql-injection
    pattern-either:
      - pattern: prisma.$F.raw($X)
      - pattern: prisma.$F.queryRaw($X)
    languages:
      - ts
    message: "Raw SQL queries can lead to SQL injection"
    severity: WARNING

  - id: no-eval
    pattern: eval(...)
    languages:
      - ts
      - js
    message: "eval() is dangerous and should not be used"
    severity: ERROR
`;
  }

  private generateSnykPolicy(): string {
    return `# Snyk security policy
version: v1.25.0
ignore: {}
patch: {}
`;
  }

  private generateSecurityHeaders(): string {
    return `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function securityHeadersMiddleware(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; connect-src 'self' ws: wss:;"
  );
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return res;
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
`;
  }

  private generateRateLimit(): string {
    return `import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

const cache = new LRUCache<string, number[]>({
  max: 10000,
  ttl: 60000,
});

export function rateLimit(key: string, options: RateLimitOptions = { windowMs: 60000, maxRequests: 100 }): boolean {
  const now = Date.now();
  const windowStart = now - options.windowMs;
  const timestamps = cache.get(key) ?? [];

  const validTimestamps = timestamps.filter((t) => t > windowStart);

  if (validTimestamps.length >= options.maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  cache.set(key, validTimestamps);
  return true;
}

export function rateLimitMiddleware(
  req: Request,
  options?: RateLimitOptions
): { allowed: boolean; remaining: number; resetAt: number } {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const key = \`rate-limit:\${ip}\`;
  const opts = { windowMs: 60000, maxRequests: 100, ...options };
  const allowed = rateLimit(key, opts);

  const timestamps = cache.get(key) ?? [];
  const now = Date.now();
  const windowStart = now - opts.windowMs;
  const validTimestamps = timestamps.filter((t) => t > windowStart);
  const remaining = Math.max(0, opts.maxRequests - validTimestamps.length);

  return {
    allowed,
    remaining,
    resetAt: validTimestamps.length > 0 ? validTimestamps[0] + opts.windowMs : now + opts.windowMs,
  };
}
`;
  }
}
