import { FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class ThreatIntelligenceGenerator implements Generator {
  readonly name = 'threat-intel';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(_context: GenerationContext): Promise<GeneratedArtifact[]> {
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'src/lib/security/ThreatDetector.ts',
      content: this.generateThreatDetector(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/AnomalyDetector.ts',
      content: this.generateAnomalyDetector(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/security/RedTeamToolkit.ts',
      content: this.generateRedTeamToolkit(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/app/api/security/threats/route.ts',
      content: this.generateThreatsAPI(),
      language: 'typescript',
    });

    artifacts.push({
      path: '.github/workflows/red-team.yml',
      content: this.generateRedTeamWorkflow(),
      language: 'yaml',
    });

    artifacts.push({
      path: 'docs/THREAT-INTELLIGENCE.md',
      content: this.generateDocs(),
      language: 'markdown',
    });

    return artifacts;
  }

  private generateThreatDetector(): string {
    return `/**
 * Threat Detection Engine
 * Analyzes request patterns to identify potential attacks in real-time.
 */

interface ThreatIndicator {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  evidence: string;
  timestamp: number;
}

interface RequestPattern {
  ip: string;
  userAgent: string;
  path: string;
  method: string;
  timestamp: number;
  statusCode: number;
  responseTime: number;
}

const THREAT_PATTERNS = {
  sqlInjection: /('|"--|UNION|SELECT|DROP|INSERT|DELETE|EXEC|xp_|sp_)/i,
  xss: /<script|javascript:|onerror=|onload=|<iframe/i,
  pathTraversal: /\\.\\.[\\/\\\\]/,
  commandInjection: /[;&|]\$\\(|\`|>\\s*\\/dev\\/|wget|curl|nc\\s/i,
  ssrf: /(169\\.254\\.169\\.254|localhost|127\\.0\\.0\\.1|0\\.0\\.0\\.0|metadata\\.google)/i,
  ldapInjection: /\\*\\)|\\(\\|/i,
  xmlInjection: /<!ENTITY|<!DOCTYPE/i,
};

const SUSPICIBLE_USER_AGENTS = [
  'sqlmap', 'nikto', 'nmap', 'masscan', 'dirb', 'gobuster',
  'wpscan', 'hydra', 'burp', 'zap', 'metasploit', 'curl/7',
];

export class ThreatDetector {
  private requestHistory: RequestPattern[] = [];
  private readonly maxHistory = 1000;

  analyzeRequest(pattern: RequestPattern): ThreatIndicator | null {
    this.recordRequest(pattern);

    // Check for known attack patterns in path
    for (const [name, regex] of Object.entries(THREAT_PATTERNS)) {
      if (regex.test(pattern.path)) {
        return {
          type: name,
          severity: 'high',
          confidence: 0.9,
          evidence: \`Pattern \${regex.source} matched in path: \${pattern.path.slice(0, 100)}\`,
          timestamp: Date.now(),
        };
      }
    }

    // Check for suspicious user agents
    const uaLower = pattern.userAgent.toLowerCase();
    for (const agent of SUSPICIBLE_USER_AGENTS) {
      if (uaLower.includes(agent)) {
        return {
          type: 'suspicious-tool',
          severity: 'medium',
          confidence: 0.7,
          evidence: \`Suspicious user agent: \${pattern.userAgent}\`,
          timestamp: Date.now(),
        };
      }
    }

    // Check for scanning behavior (many 404s from same IP)
    const recentFromIP = this.requestHistory.filter(
      (r) => r.ip === pattern.ip && r.timestamp > Date.now() - 60000,
    );
    const notFoundCount = recentFromIP.filter((r) => r.statusCode === 404).length;
    if (notFoundCount > 20) {
      return {
        type: 'directory-scanning',
        severity: 'medium',
        confidence: 0.8,
        evidence: \`\${notFoundCount} 404 responses from \${pattern.ip} in 60s\`,
        timestamp: Date.now(),
      };
    }

    // Check for slow responses (potential DoS)
    if (pattern.responseTime > 5000) {
      return {
        type: 'slow-response',
        severity: 'low',
        confidence: 0.5,
        evidence: \`Response took \${pattern.responseTime}ms for \${pattern.path}\`,
        timestamp: Date.now(),
      };
    }

    return null;
  }

  private recordRequest(pattern: RequestPattern): void {
    this.requestHistory.push(pattern);
    if (this.requestHistory.length > this.maxHistory) {
      this.requestHistory.shift();
    }
  }

  getThreatSummary(): { total: number; bySeverity: Record<string, number> } {
    const bySeverity: Record<string, number> = {
      low: 0, medium: 0, high: 0, critical: 0,
    };
    return { total: 0, bySeverity };
  }
}

export const threatDetector = new ThreatDetector();
`;
  }

  private generateAnomalyDetector(): string {
    return `/**
 * AI-Powered Anomaly Detection
 * Uses statistical analysis to detect unusual behavior patterns.
 * In production, this would integrate with ML models via Vercel AI SDK.
 */

interface AnomalyScore {
  score: number; // 0-1, higher = more anomalous
  reasons: string[];
  recommendation: 'allow' | 'monitor' | 'challenge' | 'block';
}

interface UserBehavior {
  userId: string;
  ip: string;
  userAgent: string;
  path: string;
  timestamp: number;
  requestCount: number;
  avgResponseTime: number;
  errorRate: number;
}

export class AnomalyDetector {
  private baseline = new Map<string, UserBehavior[]>();
  private readonly windowSize = 100;

  /**
   * Analyze user behavior for anomalies.
   * Uses statistical deviation from baseline.
   */
  analyze(behavior: UserBehavior): AnomalyScore {
    let score = 0;
    const reasons: string[] = [];

    // 1. Request frequency anomaly
    const history = this.baseline.get(behavior.userId) ?? [];
    if (history.length > 10) {
      const avgCount = history.reduce((sum, h) => sum + h.requestCount, 0) / history.length;
      const stdDev = Math.sqrt(
        history.reduce((sum, h) => sum + Math.pow(h.requestCount - avgCount, 2), 0) / history.length,
      );

      if (behavior.requestCount > avgCount + 3 * stdDev) {
        score += 0.3;
        reasons.push(\`Request frequency \${behavior.requestCount} exceeds baseline (avg: \${avgCount.toFixed(0)}, 3σ: \${(3 * stdDev).toFixed(0)})\`);
      }
    }

    // 2. IP change detection
    const knownIPs = new Set(history.map((h) => h.ip));
    if (knownIPs.size > 0 && !knownIPs.has(behavior.ip)) {
      score += 0.2;
      reasons.push(\`New IP address: \${behavior.ip} (known: \${Array.from(knownIPs).slice(0, 3).join(', ')})\`);
    }

    // 3. User agent change
    const knownUAs = new Set(history.map((h) => h.userAgent));
    if (knownUAs.size > 0 && !knownUAs.has(behavior.userAgent)) {
      score += 0.15;
      reasons.push('User agent changed');
    }

    // 4. Error rate spike
    if (behavior.errorRate > 0.5) {
      score += 0.25;
      reasons.push(\`High error rate: \${(behavior.errorRate * 100).toFixed(0)}%\`);
    }

    // 5. Unusual access patterns
    const knownPaths = new Set(history.map((h) => h.path));
    if (knownPaths.size > 0 && !knownPaths.has(behavior.path)) {
      score += 0.1;
      reasons.push(\`Accessing new path: \${behavior.path}\`);
    }

    // Update baseline
    this.updateBaseline(behavior);

    // Determine recommendation
    let recommendation: AnomalyScore['recommendation'] = 'allow';
    if (score > 0.8) recommendation = 'block';
    else if (score > 0.5) recommendation = 'challenge';
    else if (score > 0.3) recommendation = 'monitor';

    return { score: Math.min(score, 1), reasons, recommendation };
  }

  private updateBaseline(behavior: UserBehavior): void {
    const history = this.baseline.get(behavior.userId) ?? [];
    history.push(behavior);
    if (history.length > this.windowSize) history.shift();
    this.baseline.set(behavior.userId, history);
  }

  /**
   * Get behavioral profile for a user.
   */
  getProfile(userId: string): { avgRequests: number; knownIPs: string[]; knownPaths: string[] } | null {
    const history = this.baseline.get(userId);
    if (!history || history.length === 0) return null;

    return {
      avgRequests: history.reduce((sum, h) => sum + h.requestCount, 0) / history.length,
      knownIPs: [...new Set(history.map((h) => h.ip))],
      knownPaths: [...new Set(history.map((h) => h.path))].slice(0, 20),
    };
  }
}

export const anomalyDetector = new AnomalyDetector();
`;
  }

  private generateRedTeamToolkit(): string {
    return `/**
 * Red Team Toolkit — Internal attack simulation utilities.
 * For authorized testing only. All actions are logged.
 */

export interface RedTeamScenario {
  name: string;
  description: string;
  tactics: string[];
  detectionExpected: boolean;
}

export const RED_TEAM_SCENARIOS: RedTeamScenario[] = [
  {
    name: 'credential-stuffing',
    description: 'Test rate limiting and account lockout with leaked credentials',
    tactics: ['T1110 - Brute Force', 'T1078 - Valid Accounts'],
    detectionExpected: true,
  },
  {
    name: 'privilege-escalation',
    description: 'Attempt to access admin endpoints with regular user token',
    tactics: ['T1068 - Exploitation for Privilege Escalation'],
    detectionExpected: true,
  },
  {
    name: 'data-exfiltration',
    description: 'Attempt to bulk export data via API',
    tactics: ['T1041 - Exfiltration Over C2 Channel', 'T1567 - Exfiltration Over Web Service'],
    detectionExpected: true,
  },
  {
    name: 'lateral-movement',
    description: 'Attempt to access other tenant data (cross-tenant isolation test)',
    tactics: ['T1021 - Remote Services', 'T1078 - Valid Accounts'],
    detectionExpected: true,
  },
  {
    name: 'persistence-attempt',
    description: 'Attempt to create persistent backdoor (webhook, API key)',
    tactics: ['T1136 - Create Account', 'T1098 - Account Manipulation'],
    detectionExpected: true,
  },
  {
    name: 'defense-evasion',
    description: 'Attempt to bypass rate limits via IP rotation and header spoofing',
    tactics: ['T1090 - Proxy', 'T1090.004 - External Proxy'],
    detectionExpected: true,
  },
];

/**
 * Run a Red Team scenario and verify detection.
 */
export async function runScenario(
  scenarioName: string,
  baseUrl: string,
): Promise<{ scenario: string; detected: boolean; details: string }> {
  const scenario = RED_TEAM_SCENARIOS.find((s) => s.name === scenarioName);
  if (!scenario) throw new Error(\`Unknown scenario: \${scenarioName}\`);

  console.log(\`\\n🔴 Red Team: \${scenario.name}\`);
  console.log(\`   Description: \${scenario.description}\`);
  console.log(\`   Tactics: \${scenario.tactics.join(', ')}\`);

  let detected = false;
  let details = '';

  switch (scenario.name) {
    case 'credential-stuffing':
      detected = await testCredentialStuffing(baseUrl);
      details = 'Rate limiting and account lockout';
      break;
    case 'privilege-escalation':
      detected = await testPrivilegeEscalation(baseUrl);
      details = 'Permission checks on admin endpoints';
      break;
    case 'data-exfiltration':
      detected = await testDataExfiltration(baseUrl);
      details = 'Bulk export detection';
      break;
    case 'lateral-movement':
      detected = await testLateralMovement(baseUrl);
      details = 'Tenant isolation';
      break;
    case 'persistence-attempt':
      detected = await testPersistence(baseUrl);
      details = 'Backdoor creation blocked';
      break;
    case 'defense-evasion':
      detected = await testDefenseEvasion(baseUrl);
      details = 'Distributed rate limiting';
      break;
  }

  const status = detected ? '✅ DETECTED' : '❌ MISSED';
  console.log(\`   Result: \${status}\`);

  return { scenario: scenario.name, detected, details };
}

async function testCredentialStuffing(baseUrl: string): Promise<boolean> {
  let rateLimited = false;
  for (let i = 0; i < 50; i++) {
    const res = await fetch(\`\${baseUrl}/api/auth/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: \`user\${i}@test.com\`, password: 'pass' }),
    });
    if (res.status === 429) { rateLimited = true; break; }
  }
  return rateLimited;
}

async function testPrivilegeEscalation(baseUrl: string): Promise<boolean> {
  const res = await fetch(\`\${baseUrl}/api/admin/users\`);
  return res.status === 401 || res.status === 403;
}

async function testDataExfiltration(baseUrl: string): Promise<boolean> {
  const res = await fetch(\`\${baseUrl}/api/entities?limit=10000\`);
  if (res.ok) {
    const body = await res.json();
    const items = Array.isArray(body) ? body : body.data ?? [];
    return items.length < 1000; // Should limit bulk export
  }
  return true;
}

async function testLateralMovement(baseUrl: string): Promise<boolean> {
  // Attempt to access data with wrong tenant header
  const res = await fetch(\`\${baseUrl}/api/entities\`, {
    headers: { 'X-Tenant-Id': 'other-tenant' },
  });
  return res.status === 403 || !res.ok;
}

async function testPersistence(baseUrl: string): Promise<boolean> {
  // Attempt to create webhook without auth
  const res = await fetch(\`\${baseUrl}/api/webhooks\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'https://evil.com/hook', events: ['*'] }),
  });
  return res.status === 401 || res.status === 403;
}

async function testDefenseEvasion(baseUrl: string): Promise<boolean> {
  const requests = Array.from({ length: 300 }, (_, i) =>
    fetch(baseUrl, { headers: { 'X-Forwarded-For': \`10.0.\${i % 255}.\${i % 255}\` } })
      .then((r) => r.status),
  );
  const statuses = await Promise.all(requests);
  return statuses.filter((s) => s === 429).length > 0;
}
`;
  }

  private generateThreatsAPI(): string {
    return `import { NextResponse } from 'next/server';
import { threatDetector } from '@/lib/security/ThreatDetector';
import { anomalyDetector } from '@/lib/security/AnomalyDetector';

export async function GET() {
  const summary = threatDetector.getThreatSummary();
  return NextResponse.json({
    threats: summary,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, ip, userAgent, path, requestCount, avgResponseTime, errorRate } = body;

  const anomaly = anomalyDetector.analyze({
    userId,
    ip,
    userAgent,
    path,
    timestamp: Date.now(),
    requestCount,
    avgResponseTime,
    errorRate,
  });

  return NextResponse.json(anomaly);
}
`;
  }

  private generateRedTeamWorkflow(): string {
    return `name: Red Team Exercises

on:
  schedule:
    - cron: '0 2 * * 1'  # Weekly on Monday 2am
  workflow_dispatch:

jobs:
  red-team:
    name: Red Team Attack Simulation
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

      - name: Run Red Team Scenarios
        env:
          BASE_URL: \${{ secrets.STAGING_URL }}
        run: npx tsx -e "
          import { runScenario, RED_TEAM_SCENARIOS } from './src/lib/security/RedTeamToolkit';
          (async () => {
            let allDetected = true;
            for (const s of RED_TEAM_SCENARIOS) {
              const result = await runScenario(s.name, process.env.BASE_URL!);
              if (!result.detected) allDetected = false;
            }
            process.exit(allDetected ? 0 : 1);
          })();
        "

      - name: Notify security team
        if: failure()
        uses: slackapi/slack-github-action@v1.26.0
        with:
          slack-message: '🚨 Red Team exercise detected security gaps! Review needed.'
          slack-channel: '#security-alerts'
        env:
          SLACK_BOT_TOKEN: \${{ secrets.SLACK_BOT_TOKEN }}
`;
  }

  private generateDocs(): string {
    return `# Threat Intelligence & Red Team

## Overview

Proactive threat hunting and attack simulation to stay ahead of adversaries.

## Threat Detection (\`ThreatDetector.ts\`)

Real-time analysis of every request for:
- SQL injection, XSS, path traversal patterns
- Command injection, SSRF, LDAP injection
- XML external entity (XXE) attacks
- Suspicious user agents (sqlmap, nikto, nmap, etc.)
- Directory scanning behavior (many 404s)
- Slow response detection (potential DoS)

## AI Anomaly Detection (\`AnomalyDetector.ts\`)

Statistical analysis of user behavior:
- Request frequency deviation (3σ from baseline)
- IP address change detection
- User agent fingerprinting
- Error rate spike detection
- Unusual path access patterns

Recommendations: \`allow\` → \`monitor\` → \`challenge\` → \`block\`

## Red Team Toolkit (\`RedTeamToolkit.ts\`)

MITRE ATT&CK-aligned scenarios:

| Scenario | MITRE Tactics | Target |
|----------|--------------|--------|
| Credential Stuffing | T1110, T1078 | Rate limiting |
| Privilege Escalation | T1068 | Permission checks |
| Data Exfiltration | T1041, T1567 | Bulk export limits |
| Lateral Movement | T1021, T1078 | Tenant isolation |
| Persistence | T1136, T1098 | Backdoor prevention |
| Defense Evasion | T1090 | Distributed rate limiting |

## Automated Schedule

- **Red Team exercises**: Weekly (Monday 2am)
- **Chaos security tests**: Every 6 hours
- **Threat detection**: Real-time (every request)

## Dark Web Monitoring

For credential leak monitoring, integrate with:
- Have I Been Pwned API
- Recorded Future
- Digital Shadows

\`\`\`typescript
// Example: Check if user emails appear in breaches
const breaches = await fetch(\`https://haveibeenpwned.com/api/v3/breachedaccount/\${email}\`, {
  headers: { 'hibp-api-key': process.env.HIBP_API_KEY! },
});
\`\`\`

## Incident Response Playbook

1. **Detect**: ThreatDetector flags anomalous request
2. **Analyze**: AnomalyDetector scores severity
3. **Respond**: Auto-block (score > 0.8) or challenge (score > 0.5)
4. **Alert**: Slack notification to #security-alerts
5. **Investigate**: Red Team reviews false positives/negatives
6. **Improve**: Update detection rules based on findings
`;
  }
}
