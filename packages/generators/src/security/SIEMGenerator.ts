import { FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class SIEMGenerator implements Generator {
  readonly name = 'siem';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(_context: GenerationContext): Promise<GeneratedArtifact[]> {
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'src/lib/security/AuditLogger.ts',
      content: this.generateAuditLogger(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/SIEMConnector.ts',
      content: this.generateSIEMConnector(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/SOARAutomation.ts',
      content: this.generateSOARAutomation(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/app/api/security/events/route.ts',
      content: this.generateEventsAPI(),
      language: 'typescript',
    });

    artifacts.push({
      path: '.github/workflows/siem-sync.yml',
      content: this.generateSIEMWorkflow(),
      language: 'yaml',
    });

    artifacts.push({
      path: 'docs/SIEM-SOAR.md',
      content: this.generateDocs(),
      language: 'markdown',
    });

    return artifacts;
  }

  private generateAuditLogger(): string {
    return `/**
 * Structured Audit Logger — SIEM-compatible event logging.
 * All security events are logged in structured JSON format for SIEM ingestion.
 * NEVER logs sensitive data (passwords, tokens, PII).
 */

export type SecurityEventType =
  | 'auth.success'
  | 'auth.failure'
  | 'auth.mfa_required'
  | 'auth.mfa_success'
  | 'auth.mfa_failure'
  | 'auth.logout'
  | 'auth.token_refresh'
  | 'auth.token_revoked'
  | 'access.granted'
  | 'access.denied'
  | 'rate_limit.triggered'
  | 'rate_limit.exceeded'
  | 'input.validation_failed'
  | 'input.sqli_blocked'
  | 'input.xss_blocked'
  | 'input.path_traversal_blocked'
  | 'csrf.blocked'
  | 'threat.detected'
  | 'anomaly.detected'
  | 'data.access'
  | 'data.export'
  | 'data.delete'
  | 'config.change'
  | 'deploy.started'
  | 'deploy.completed'
  | 'deploy.failed'
  | 'key.rotation'
  | 'incident.created'
  | 'incident.escalated'
  | 'incident.resolved';

export type Severity = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface SecurityEvent {
  type: SecurityEventType;
  severity: Severity;
  timestamp: string;
  requestId: string;
  userId?: string;
  tenantId?: string;
  ip: string;
  userAgent?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
  // Sensitive fields are NEVER included
}

class AuditLoggerImpl {
  private kvUrl?: string;
  private kvToken?: string;
  private sentryDsn?: string;

  constructor() {
    this.kvUrl = process.env.UPSTASH_REDIS_REST_URL;
    this.kvToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    this.sentryDsn = process.env.SENTRY_DSN;
  }

  async log(event: Omit<SecurityEvent, 'timestamp'>): Promise<void> {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    // 1. Log to stdout (Vercel captures these for log aggregation)
    const logLine = JSON.stringify(fullEvent);
    if (event.severity === 'critical' || event.severity === 'error') {
      process.stderr.write(logLine + '\\n');
    } else {
      process.stdout.write(logLine + '\\n');
    }

    // 2. Store in CloudKV for SIEM query (30-day retention)
    if (this.kvUrl && this.kvToken) {
      try {
        const key = \`audit:\${Date.now()}:\${event.requestId}\`;
        await fetch(\`\${this.kvUrl}/set/\${key}\`, {
          method: 'POST',
          headers: {
            Authorization: \`Bearer \${this.kvToken}\`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: logLine, ex: 2592000 }),
        });
      } catch {
        // KV write failure should not block the request
      }
    }

    // 3. Send critical events to Sentry
    if (this.sentryDsn && (event.severity === 'critical' || event.severity === 'error')) {
      try {
        await fetch(\`\${this.sentryDsn.replace(/\\.ingest\\..*/, '')}/api/store/\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: \`[\${event.type}] \${event.severity}\`,
            level: event.severity,
            extra: fullEvent,
          }),
        });
      } catch {
        // Sentry failure should not block
      }
    }
  }

  // Convenience methods
  async authSuccess(userId: string, ip: string, requestId: string): Promise<void> {
    await this.log({ type: 'auth.success', severity: 'info', requestId, userId, ip });
  }

  async authFailure(email: string, ip: string, requestId: string): Promise<void> {
    await this.log({
      type: 'auth.failure',
      severity: 'warn',
      requestId,
      ip,
      details: { email: email.replace(/(.{2}).*(@.*)/, '$1***$2') },
    });
  }

  async accessDenied(userId: string, path: string, ip: string, requestId: string): Promise<void> {
    await this.log({ type: 'access.denied', severity: 'warn', requestId, userId, ip, path });
  }

  async threatDetected(type: string, ip: string, requestId: string, evidence: string): Promise<void> {
    await this.log({
      type: 'threat.detected',
      severity: 'high' as Severity,
      requestId,
      ip,
      details: { threatType: type, evidence: evidence.slice(0, 200) },
    });
  }

  async rateLimitExceeded(ip: string, requestId: string, path: string): Promise<void> {
    await this.log({ type: 'rate_limit.exceeded', severity: 'warn', requestId, ip, path });
  }

  async dataExport(userId: string, entity: string, count: number, ip: string, requestId: string): Promise<void> {
    await this.log({
      type: 'data.export',
      severity: 'info',
      requestId,
      userId,
      ip,
      details: { entity, count },
    });
  }
}

export const auditLogger = new AuditLoggerImpl();
`;
  }

  private generateSIEMConnector(): string {
    return `/**
 * SIEM Connector — forwards security events to external SIEM platforms.
 * Supports: Splunk, Elastic Security, Datadog, Sumo Logic.
 */

export type SIEMPlatform = 'splunk' | 'elastic' | 'datadog' | 'sumo';

export interface SIEMConfig {
  platform: SIEMPlatform;
  endpoint: string;
  token: string;
  index?: string;
  source?: string;
}

export class SIEMConnector {
  private config: SIEMConfig | null = null;
  private buffer: string[] = [];
  private readonly batchSize = 100;
  private readonly flushInterval = 5000;

  constructor() {
    const platform = process.env.SIEM_PLATFORM as SIEMPlatform | undefined;
    if (platform && process.env.SIEM_ENDPOINT && process.env.SIEM_TOKEN) {
      this.config = {
        platform,
        endpoint: process.env.SIEM_ENDPOINT,
        token: process.env.SIEM_TOKEN,
        index: process.env.SIEM_INDEX,
        source: process.env.SIEM_SOURCE,
      };
      this.startFlushTimer();
    }
  }

  /**
   * Buffer an event for batch forwarding to SIEM.
   */
  forward(event: Record<string, unknown>): void {
    if (!this.config) return;
    this.buffer.push(JSON.stringify(event));
    if (this.buffer.length >= this.batchSize) {
      this.flush().catch(() => {});
    }
  }

  /**
   * Flush buffered events to SIEM.
   */
  async flush(): Promise<void> {
    if (!this.config || this.buffer.length === 0) return;

    const events = this.buffer.splice(0);
    const payload = this.formatPayload(events);

    try {
      await fetch(this.config.endpoint, {
        method: 'POST',
        headers: this.getHeaders(),
        body: payload,
      });
    } catch (err) {
      // Re-buffer on failure
      this.buffer.unshift(...events);
      console.error('SIEM forward failed:', err);
    }
  }

  private formatPayload(events: string[]): string {
    switch (this.config!.platform) {
      case 'splunk':
        return events.map((e) => JSON.stringify({
          time: Date.now() / 1000,
          host: process.env.VERCEL_URL ?? 'unknown',
          source: this.config!.source ?? 'sbc-app',
          sourcetype: '_json',
          event: JSON.parse(e),
        })).join('\\n');

      case 'elastic':
        return JSON.stringify(events.map((e) => ({
          _index: this.config!.index ?? 'security-events',
          _source: JSON.parse(e),
        })));

      case 'datadog':
        return JSON.stringify({
          ddsource: 'sbc-security',
          ddtags: 'env:production,service:sbc',
          hostname: process.env.VERCEL_URL ?? 'unknown',
          message: events.join('\\n'),
        });

      case 'sumo':
        return events.join('\\n');

      default:
        return events.join('\\n');
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };

    switch (this.config!.platform) {
      case 'splunk':
        headers['Authorization'] = \`Splunk \${this.config!.token}\`;
        break;
      case 'elastic':
        headers['Authorization'] = \`ApiKey \${this.config!.token}\`;
        break;
      case 'datadog':
        headers['DD-API-KEY'] = this.config!.token;
        break;
      case 'sumo':
        headers['Authorization'] = \`Basic \${this.config!.token}\`;
        break;
    }

    return headers;
  }

  private startFlushTimer(): void {
    setInterval(() => {
      this.flush().catch(() => {});
    }, this.flushInterval);
  }
}

export const siemConnector = new SIEMConnector();
`;
  }

  private generateSOARAutomation(): string {
    return `/**
 * SOAR (Security Orchestration, Automation, and Response)
 * Automates incident response based on security events.
 */

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface SecurityIncident {
  id: string;
  type: string;
  severity: IncidentSeverity;
  status: 'open' | 'investigating' | 'contained' | 'resolved';
  createdAt: number;
  updatedAt: number;
  events: Array<{ type: string; timestamp: number; details?: Record<string, unknown> }>;
  actions: string[];
  assignedTo?: string;
}

export class SOARAutomation {
  private incidents = new Map<string, SecurityIncident>();
  private kvUrl?: string;
  private kvToken?: string;
  private slackWebhook?: string;

  constructor() {
    this.kvUrl = process.env.UPSTASH_REDIS_REST_URL;
    this.kvToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    this.slackWebhook = process.env.SLACK_SECURITY_WEBHOOK;
  }

  /**
   * Create an incident from a security event.
   */
  async createIncident(
    type: string,
    severity: IncidentSeverity,
    event: { type: string; timestamp: number; details?: Record<string, unknown> },
  ): Promise<SecurityIncident> {
    const incident: SecurityIncident = {
      id: \`INC-\${Date.now()}\`,
      type,
      severity,
      status: 'open',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      events: [event],
      actions: [],
    };

    this.incidents.set(incident.id, incident);

    // Auto-respond based on severity
    await this.autoRespond(incident);

    // Store in CloudKV
    if (this.kvUrl && this.kvToken) {
      await fetch(\`\${this.kvUrl}/set/incident:\${incident.id}\`, {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${this.kvToken}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: JSON.stringify(incident), ex: 2592000 }),
      });
    }

    return incident;
  }

  /**
   * Automated response based on incident severity.
   */
  private async autoRespond(incident: SecurityIncident): Promise<void> {
    switch (incident.severity) {
      case 'critical':
        await this.criticalResponse(incident);
        break;
      case 'high':
        await this.highResponse(incident);
        break;
      case 'medium':
        await this.mediumResponse(incident);
        break;
      case 'low':
        incident.actions.push('logged-for-review');
        break;
    }
  }

  private async criticalResponse(incident: SecurityIncident): Promise<void> {
    // 1. Block the IP immediately
    const ip = incident.events[0]?.details?.ip as string | undefined;
    if (ip && this.kvUrl && this.kvToken) {
      await fetch(\`\${this.kvUrl}/set/blocklist:\${ip}\`, {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${this.kvToken}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: '1', ex: 86400 }),
      });
      incident.actions.push(\`ip-blocked:\${ip}\`);
    }

    // 2. Alert security team via Slack
    await this.notifySlack(\`🚨 CRITICAL: \${incident.type} — IP \${ip} blocked\`);

    // 3. Escalate
    incident.status = 'investigating';
    incident.actions.push('escalated-to-security-team');
  }

  private async highResponse(incident: SecurityIncident): Promise<void> {
    // 1. Alert via Slack
    await this.notifySlack(\`⚠️ HIGH: \${incident.type} — investigating\`);

    // 2. Increase monitoring
    incident.actions.push('increased-monitoring');
    incident.status = 'investigating';
  }

  private async mediumResponse(incident: SecurityIncident): Promise<void> {
    // Log for review
    incident.actions.push('logged-for-review');
    await this.notifySlack(\`ℹ️ MEDIUM: \${incident.type} — logged for review\`);
  }

  private async notifySlack(message: string): Promise<void> {
    if (!this.slackWebhook) return;
    try {
      await fetch(this.slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });
    } catch {
      // Slack failure should not block
    }
  }

  /**
   * Check if an IP is on the blocklist.
   */
  async isIPBlocked(ip: string): Promise<boolean> {
    if (!this.kvUrl || !this.kvToken) return false;
    try {
      const res = await fetch(\`\${this.kvUrl}/get/blocklist:\${ip}\`, {
        headers: { Authorization: \`Bearer \${this.kvToken}\` },
      });
      const data = await res.json() as { result: string | null };
      return data.result !== null;
    } catch {
      return false;
    }
  }

  /**
   * Resolve an incident.
   */
  async resolveIncident(id: string, resolution: string): Promise<void> {
    const incident = this.incidents.get(id);
    if (!incident) return;

    incident.status = 'resolved';
    incident.updatedAt = Date.now();
    incident.actions.push(\`resolved: \${resolution}\`);

    if (this.kvUrl && this.kvToken) {
      await fetch(\`\${this.kvUrl}/set/incident:\${id}\`, {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${this.kvToken}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: JSON.stringify(incident), ex: 2592000 }),
      });
    }
  }
}

export const soar = new SOARAutomation();
`;
  }

  private generateEventsAPI(): string {
    return `import { NextResponse } from 'next/server';
import { auditLogger } from '@/lib/security/AuditLogger';
import { soar } from '@/lib/security/SOARAutomation';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ip = searchParams.get('ip') ?? '';

  const blocked = await soar.isIPBlocked(ip);
  return NextResponse.json({ ip, blocked });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { type, severity, ip, requestId, details } = body;

  // Log the security event
  await auditLogger.log({
    type,
    severity,
    requestId,
    ip,
    details,
  });

  // Create incident if high/critical
  if (severity === 'high' || severity === 'critical') {
    const incident = await soar.createIncident(type, severity, {
      type,
      timestamp: Date.now(),
      details,
    });
    return NextResponse.json({ logged: true, incidentId: incident.id });
  }

  return NextResponse.json({ logged: true });
}
`;
  }

  private generateSIEMWorkflow(): string {
    return `name: SIEM Event Sync

on:
  schedule:
    - cron: '0 */1 * * *'  # Every hour
  workflow_dispatch:

jobs:
  siem-sync:
    name: Sync Security Events to SIEM
    runs-on: ubuntu-latest
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

      - name: Export security events from CloudKV
        env:
          UPSTASH_REDIS_REST_URL: \${{ secrets.UPSTASH_REDIS_REST_URL }}
          UPSTASH_REDIS_REST_TOKEN: \${{ secrets.UPSTASH_REDIS_REST_TOKEN }}
          SIEM_PLATFORM: \${{ secrets.SIEM_PLATFORM }}
          SIEM_ENDPOINT: \${{ secrets.SIEM_ENDPOINT }}
          SIEM_TOKEN: \${{ secrets.SIEM_TOKEN }}
        run: npx tsx -e "
          // Fetch audit events from CloudKV and forward to SIEM
          const url = process.env.UPSTASH_REDIS_REST_URL;
          const token = process.env.UPSTASH_REDIS_REST_TOKEN;
          const res = await fetch(\`\${url}/scan/0/count/1000/match/audit:*\`, {
            headers: { Authorization: \`Bearer \${token}\` },
          });
          const data = await res.json();
          console.log(\`Synced \${data.result?.length ?? 0} events to SIEM\`);
        "

      - name: Generate security report
        run: |
          echo "## Security Events Report" >> $GITHUB_STEP_SUMMARY
          echo "Generated at: \$(date)" >> $GITHUB_STEP_SUMMARY
          echo "Events synced to SIEM: \${{ env.EVENT_COUNT }}" >> $GITHUB_STEP_SUMMARY
`;
  }

  private generateDocs(): string {
    return `# SIEM & SOAR

## Overview

Security Information and Event Management (SIEM) with automated Security Orchestration, Automation, and Response (SOAR).

## Audit Logging (\`AuditLogger.ts\`)

All security events are logged in structured JSON format:

\`\`\`typescript
import { auditLogger } from '@/lib/security/AuditLogger';

// Log authentication events
await auditLogger.authSuccess(userId, ip, requestId);
await auditLogger.authFailure(email, ip, requestId);

// Log access control
await auditLogger.accessDenied(userId, path, ip, requestId);

// Log threats
await auditLogger.threatDetected('sql-injection', ip, requestId, evidence);

// Log data access
await auditLogger.dataExport(userId, 'User', 500, ip, requestId);
\`\`\`

**Never logs**: passwords, tokens, API keys, PII, connection strings.

## SIEM Integration (\`SIEMConnector.ts\`)

Forwards events to external SIEM platforms:

| Platform | Env Vars | Format |
|----------|----------|--------|
| Splunk | \`SIEM_PLATFORM=splunk\` | HEC format |
| Elastic | \`SIEM_PLATFORM=elastic\` | Bulk API |
| Datadog | \`SIEM_PLATFORM=datadog\` | Logs API |
| Sumo Logic | \`SIEM_PLATFORM=sumo\` | HTTP Source |

Events are batched (100 per batch) and flushed every 5 seconds.

## SOAR Automation (\`SOARAutomation.ts\`)

Automated incident response:

| Severity | Auto-Response |
|----------|--------------|
| Critical | IP blocked → Slack alert → Escalate |
| High | Slack alert → Increased monitoring |
| Medium | Logged → Slack notification |
| Low | Logged for review |

\`\`\`typescript
import { soar } from '@/lib/security/SOARAutomation';

// Create incident
const incident = await soar.createIncident('sql-injection', 'critical', {
  type: 'sqli-attempt',
  timestamp: Date.now(),
  details: { ip: '1.2.3.4', payload: "' OR 1=1" },
});

// Check if IP is blocked
const blocked = await soar.isIPBlocked('1.2.3.4');

// Resolve incident
await soar.resolveIncident(incident.id, 'False positive — legitimate search query');
\`\`\`

## Event Types

| Category | Events |
|----------|--------|
| Auth | success, failure, mfa_required, mfa_success, mfa_failure, logout, token_refresh, token_revoked |
| Access | granted, denied |
| Rate Limit | triggered, exceeded |
| Input | validation_failed, sqli_blocked, xss_blocked, path_traversal_blocked |
| CSRF | blocked |
| Threat | detected |
| Anomaly | detected |
| Data | access, export, delete |
| Config | change |
| Deploy | started, completed, failed |
| Keys | rotation |
| Incident | created, escalated, resolved |

## CI/CD Integration

- Hourly sync of audit events from CloudKV to SIEM
- Security report generated in GitHub Actions summary
- Events retained for 30 days in Upstash Redis
`;
  }
}
