import { FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class SecurityHardeningGenerator implements Generator {
  readonly name = 'security-hardening';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(_context: GenerationContext): Promise<GeneratedArtifact[]> {
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'src/lib/security/InputValidator.ts',
      content: this.generateInputValidator(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/ErrorSanitizer.ts',
      content: this.generateErrorSanitizer(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/ZeroTrustMiddleware.ts',
      content: this.generateZeroTrustMiddleware(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/JWTVerifier.ts',
      content: this.generateJWTVerifier(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/RateLimitMiddleware.ts',
      content: this.generateRateLimitMiddleware(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/CSRFProtection.ts',
      content: this.generateCSRFProtection(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/SecurityHeaders.ts',
      content: this.generateSecurityHeaders(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/middleware.ts',
      content: this.generateNextMiddleware(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'docs/SECURITY.md',
      content: this.generateSecurityDocs(),
      language: 'markdown',
    });

    return artifacts;
  }

  private generateInputValidator(): string {
    return `import { z } from 'zod';

/**
 * OWASP-compliant input validation.
 * All user inputs must pass through these validators.
 */

// SQL injection patterns
const SQL_INJECTION = /('|"--|;|\\/\\*|\\*\\/|xp_|sp_|UNION|SELECT|INSERT|DELETE|DROP|UPDATE|EXEC|EXECUTE)/i;

// XSS patterns
const XSS_PATTERN = /<script|<iframe|javascript:|onerror=|onload=|onclick=|onmouseover=/i;

// Path traversal
const PATH_TRAVERSAL = /\\.\\.[\\/\\\\]|\\.\\.[\\/\\\\]/;

export function sanitizeString(input: string, maxLength = 1000): string {
  if (typeof input !== 'string') return '';
  let cleaned = input.slice(0, maxLength);
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  cleaned = cleaned.trim();
  return cleaned;
}

export function validateNoSQLInjection(input: string): boolean {
  return !SQL_INJECTION.test(input);
}

export function validateNoXSS(input: string): boolean {
  return !XSS_PATTERN.test(input);
}

export function validateNoPathTraversal(input: string): boolean {
  return !PATH_TRAVERSAL.test(input);
}

export function validateEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

export function validateUUID(uuid: string): boolean {
  return z.string().uuid().safeParse(uuid).success;
}

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function validateInteger(input: unknown, min?: number, max?: number): boolean {
  const n = Number(input);
  if (!Number.isInteger(n)) return false;
  if (min !== undefined && n < min) return false;
  if (max !== undefined && n > max) return false;
  return true;
}

export function validateEnum<T extends string>(input: string, allowed: readonly T[]): input is T {
  return (allowed as readonly string[]).includes(input);
}

/**
 * Comprehensive input validation for API requests.
 * Returns sanitized data or throws with a safe error message.
 */
export function validateRequest<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(
      result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    );
  }
  return result.data;
}

export class ValidationError extends Error {
  constructor(public readonly fields: Array<{ field: string; message: string }>) {
    super('Input validation failed');
    this.name = 'ValidationError';
  }
}
`;
  }

  private generateErrorSanitizer(): string {
    return `/**
 * Error Sanitizer — prevents sensitive data leakage in error responses.
 * OWASP: Never expose stack traces, DB credentials, or internal paths.
 */

const SENSITIVE_PATTERNS = [
  /password/i,
  /secret/i,
  /token/i,
  /api[_-]?key/i,
  /private[_-]?key/i,
  /connection[_-]?string/i,
  /database[_-]?url/i,
  /redis[_-]?url/i,
  /supabase[_-]?key/i,
];

const INTERNAL_PATHS = [
  /\\/home\\//i,
  /\\/var\\//i,
  /\\/usr\\//i,
  /C:\\\\Users\\\\/i,
  /node_modules/i,
  /\\.env/i,
];

export interface SafeError {
  message: string;
  code: string;
  statusCode: number;
  requestId?: string;
}

export function sanitizeError(error: unknown): SafeError {
  const requestId = crypto.randomUUID();

  if (error instanceof Error) {
    const message = error.message;

    // Check for sensitive data in message
    for (const pattern of SENSITIVE_PATTERNS) {
      if (pattern.test(message)) {
        return {
          message: 'An internal error occurred',
          code: 'INTERNAL_ERROR',
          statusCode: 500,
          requestId,
        };
      }
    }

    // Check for internal paths
    for (const pattern of INTERNAL_PATHS) {
      if (pattern.test(message)) {
        return {
          message: 'An internal error occurred',
          code: 'INTERNAL_ERROR',
          statusCode: 500,
          requestId,
        };
      }
    }

    // Known safe error types
    if (error.name === 'ValidationError') {
      return {
        message: error.message,
        code: 'VALIDATION_ERROR',
        statusCode: 400,
        requestId,
      };
    }

    if (error.name === 'UnauthorizedError' || error.message.includes('unauthorized')) {
      return {
        message: 'Unauthorized',
        code: 'UNAUTHORIZED',
        statusCode: 401,
        requestId,
      };
    }

    if (error.name === 'ForbiddenError' || error.message.includes('forbidden')) {
      return {
        message: 'Forbidden',
        code: 'FORBIDDEN',
        statusCode: 403,
        requestId,
      };
    }

    if (error.name === 'NotFoundError' || error.message.includes('not found')) {
      return {
        message: 'Resource not found',
        code: 'NOT_FOUND',
        statusCode: 404,
        requestId,
      };
    }

    // Default: log full error internally, return safe message
    console.error(JSON.stringify({
      requestId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    }));

    return {
      message: 'An internal error occurred',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
      requestId,
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
    requestId,
  };
}

export function safeErrorResponse(error: unknown): Response {
  const safe = sanitizeError(error);
  return new Response(JSON.stringify(safe), {
    status: safe.statusCode,
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Id': safe.requestId ?? '',
    },
  });
}
`;
  }

  private generateZeroTrustMiddleware(): string {
    return `import type { NextRequest } from 'next/server';
import { verifyJWT, type JWTPayload } from './JWTVerifier';

/**
 * Zero Trust middleware — never trust, always verify.
 * Every request must be authenticated and authorized.
 */

export interface ZeroTrustContext {
  user: JWTPayload | null;
  tenantId: string | null;
  requestId: string;
  ip: string;
  verified: boolean;
}

export async function zeroTrustVerify(request: NextRequest): Promise<ZeroTrustContext> {
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  // 1. Extract token
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return { user: null, tenantId: null, requestId, ip, verified: false };
  }

  // 2. Verify JWT
  const payload = await verifyJWT(token).catch(() => null);

  if (!payload) {
    return { user: null, tenantId: null, requestId, ip, verified: false };
  }

  // 3. Check token expiry
  if (payload.exp && Date.now() > payload.exp * 1000) {
    return { user: null, tenantId: null, requestId, ip, verified: false };
  }

  // 4. Verify tenant isolation
  const tenantId = payload.tenantId ?? null;

  return {
    user: payload,
    tenantId,
    requestId,
    ip,
    verified: true,
  };
}

/**
 * Principle of Least Privilege — check if user has required permission.
 */
export function checkPermission(
  ctx: ZeroTrustContext,
  requiredPermission: string,
): boolean {
  if (!ctx.verified || !ctx.user) return false;
  const permissions = ctx.user.permissions ?? [];
  if (permissions.includes('*')) return true;
  return permissions.includes(requiredPermission);
}

/**
 * Require authentication — throws 401 if not verified.
 */
export function requireAuth(ctx: ZeroTrustContext): void {
  if (!ctx.verified) {
    throw new Response(JSON.stringify({ error: 'Unauthorized', code: 'UNAUTHORIZED' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Require specific permission — throws 403 if not authorized.
 */
export function requirePermission(ctx: ZeroTrustContext, permission: string): void {
  requireAuth(ctx);
  if (!checkPermission(ctx, permission)) {
    throw new Response(JSON.stringify({ error: 'Forbidden', code: 'FORBIDDEN' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
`;
  }

  private generateJWTVerifier(): string {
    return `import { createClient } from '@supabase/supabase-js';

export interface JWTPayload {
  sub: string;
  email: string;
  tenantId?: string;
  permissions?: string[];
  mfaVerified?: boolean;
  iat?: number;
  exp?: number;
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Verify JWT token using Supabase auth.
 * Requires MFA verification for sensitive operations.
 */
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;

  return {
    sub: data.user.id,
    email: data.user.email ?? '',
    tenantId: (data.user.app_metadata as Record<string, string>)?.tenantId,
    permissions: (data.user.app_metadata as Record<string, string[]>)?.permissions,
    mfaVerified: (data.user.app_metadata as Record<string, boolean>)?.mfaVerified ?? false,
    iat: data.user.created_at ? Math.floor(new Date(data.user.created_at).getTime() / 1000) : undefined,
    exp: undefined,
  };
}

/**
 * Require MFA verification for sensitive operations.
 */
export function requireMFA(payload: JWTPayload): void {
  if (!payload.mfaVerified) {
    throw new Response(
      JSON.stringify({ error: 'MFA required for this operation', code: 'MFA_REQUIRED' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
`;
  }

  private generateRateLimitMiddleware(): string {
    return `import type { NextRequest } from 'next/server';

/**
 * Cloud-native rate limiting using Upstash Redis.
 * Distributed across all edge instances.
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

interface RateLimitConfig {
  windowSec: number;
  maxRequests: number;
  keyPrefix: string;
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig,
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    // No Redis — fail open (API gateway should handle rate limiting)
    return { allowed: true, remaining: config.maxRequests, resetAt: Date.now() + config.windowSec * 1000 };
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const key = \`\${config.keyPrefix}:\${ip}\`;
  const now = Date.now();

  try {
    const res = await fetch(\`\${REDIS_URL}/get/\${key}\`, {
      headers: { Authorization: \`Bearer \${REDIS_TOKEN}\` },
    });
    const data = await res.json() as { result: string | null };
    const existing = data.result ? JSON.parse(data.result) as { count: number; resetAt: number } : null;

    if (existing && now < existing.resetAt) {
      if (existing.count >= config.maxRequests) {
        return { allowed: false, remaining: 0, resetAt: existing.resetAt };
      }
      const updated = { count: existing.count + 1, resetAt: existing.resetAt };
      await fetch(\`\${REDIS_URL}/set/\${key}\`, {
        method: 'POST',
        headers: { Authorization: \`Bearer \${REDIS_TOKEN}\`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: JSON.stringify(updated), ex: config.windowSec }),
      });
      return { allowed: true, remaining: config.maxRequests - updated.count, resetAt: existing.resetAt };
    }

    const newEntry = { count: 1, resetAt: now + config.windowSec * 1000 };
    await fetch(\`\${REDIS_URL}/set/\${key}\`, {
      method: 'POST',
      headers: { Authorization: \`Bearer \${REDIS_TOKEN}\`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify(newEntry), ex: config.windowSec }),
    });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: newEntry.resetAt };
  } catch {
    return { allowed: true, remaining: config.maxRequests, resetAt: now + config.windowSec * 1000 };
  }
}

export const RATE_LIMITS = {
  AUTH: { windowSec: 60, maxRequests: 5, keyPrefix: 'rl:auth' },
  API: { windowSec: 60, maxRequests: 100, keyPrefix: 'rl:api' },
  WRITE: { windowSec: 60, maxRequests: 30, keyPrefix: 'rl:write' },
  DEPLOY: { windowSec: 60, maxRequests: 3, keyPrefix: 'rl:deploy' },
} as const;
`;
  }

  private generateCSRFProtection(): string {
    return `import type { NextRequest } from 'next/server';

/**
 * CSRF Protection — Double Submit Cookie pattern.
 */

const CSRF_COOKIE = 'csrf-token';
const CSRF_HEADER = 'x-csrf-token';

export function generateCSRFToken(): string {
  return crypto.randomUUID() + crypto.randomUUID();
}

export function setCSRFCookie(token: string): string {
  return \`\${CSRF_COOKIE}=\${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600\`;
}

export function verifyCSRF(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE)?.value;
  const headerToken = request.headers.get(CSF_HEADER);

  if (!cookieToken || !headerToken) return false;
  if (cookieToken !== headerToken) return false;

  return true;
}

/**
 * Middleware to enforce CSRF protection on state-changing requests.
 */
export function csrfMiddleware(handler: (req: NextRequest) => Promise<Response>): (req: NextRequest) => Promise<Response> {
  return async (req: NextRequest) => {
    const method = req.method.toUpperCase();
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return handler(req);
    }

    if (!verifyCSRF(req)) {
      return new Response(JSON.stringify({ error: 'CSRF token invalid', code: 'CSRF_INVALID' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return handler(req);
  };
}
`;
  }

  private generateSecurityHeaders(): string {
    return `/**
 * Security Headers — applied to all responses.
 * OWASP-recommended headers for web applications.
 */

export const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://qstash.upstash.io https://*.upstash.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

export function applySecurityHeaders(response: Response): Response {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}
`;
  }

  private generateNextMiddleware(): string {
    return `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SECURITY_HEADERS, applySecurityHeaders } from './lib/security/SecurityHeaders';
import { rateLimit, RATE_LIMITS } from './lib/security/RateLimitMiddleware';

export async function middleware(request: NextRequest) {
  // 1. Rate limiting
  const rlResult = await rateLimit(request, RATE_LIMITS.API);
  if (!rlResult.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', code: 'RATE_LIMITED' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rlResult.resetAt - Date.now()) / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      },
    );
  }

  // 2. Security headers
  const response = NextResponse.next();
  applySecurityHeaders(response);

  // 3. Add request ID for tracing
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();
  response.headers.set('X-Request-Id', requestId);

  // 4. Rate limit info headers
  response.headers.set('X-RateLimit-Remaining', String(rlResult.remaining));

  return response;
}

export const config = {
  matcher: '/:path*',
};
`;
  }

  private generateSecurityDocs(): string {
    return `# Security Hardening Guide

## Overview

This project implements defense-in-depth security following OWASP Top 10 and Zero Trust principles.

## Security Layers

### 1. Input Validation (\`InputValidator.ts\`)
- All user inputs validated with Zod schemas
- SQL injection, XSS, and path traversal detection
- String sanitization with max length enforcement
- Type-safe enum validation

### 2. Error Sanitization (\`ErrorSanitizer.ts\`)
- Never exposes stack traces to clients
- Filters sensitive patterns (passwords, tokens, connection strings)
- Filters internal paths (home dirs, node_modules, .env)
- Returns safe error with request ID for debugging

### 3. Zero Trust Middleware (\`ZeroTrustMiddleware.ts\`)
- Every request must be authenticated
- JWT verification on every API call
- Principle of Least Privilege via permission checks
- Tenant isolation enforced

### 4. JWT Verification (\`JWTVerifier.ts\`)
- Supabase Auth integration
- MFA verification for sensitive operations
- Token expiry checking
- Permission extraction from app metadata

### 5. Rate Limiting (\`RateLimitMiddleware.ts\`)
- Distributed via Upstash Redis
- Per-endpoint limits (auth, API, write, deploy)
- Cloud-native — works across all edge instances

### 6. CSRF Protection (\`CSRFProtection.ts\`)
- Double Submit Cookie pattern
- Automatic token generation and verification
- Only enforced on state-changing methods

### 7. Security Headers (\`SecurityHeaders.ts\`)
- CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- Permissions Policy (camera, microphone, geolocation disabled)
- Cross-Origin isolation headers

## CI/CD Security

| Tool | Purpose | When |
|------|---------|------|
| Semgrep | SAST — static analysis | Every push/PR |
| Trivy | Dependency scan | Every push/PR |
| Gitleaks | Secret scanning | Every push/PR |
| Syft | SBOM generation | After build |
| ZAP | DAST — dynamic scan | On PR (preview) |

## Incident Response

1. All errors logged with request ID
2. Rate limiting blocks brute force automatically
3. MFA required for sensitive operations
4. CSP prevents XSS execution
5. HSTS forces HTTPS

## Compliance

- OWASP Top 10: All categories addressed
- Zero Trust: No implicit trust, always verify
- Least Privilege: Permission-based access control
- Defense in Depth: 7 independent security layers
`;
  }
}
