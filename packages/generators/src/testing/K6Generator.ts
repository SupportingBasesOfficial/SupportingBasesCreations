import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class K6Generator implements Generator {
  readonly name = 'k6';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'k6/load-test.js',
      content: this.generateLoadTest(project),
      language: 'javascript',
    });

    artifacts.push({
      path: 'k6/soak-test.js',
      content: this.generateSoakTest(project),
      language: 'javascript',
    });

    artifacts.push({
      path: 'k6/spike-test.js',
      content: this.generateSpikeTest(project),
      language: 'javascript',
    });

    artifacts.push({
      path: 'k6/smoke-test.js',
      content: this.generateSmokeTest(project),
      language: 'javascript',
    });

    artifacts.push({
      path: '.github/workflows/performance.yml',
      content: this.generatePerformanceCI(),
      language: 'yaml',
    });

    artifacts.push({
      path: 'k6/grafana-dashboard.json',
      content: this.generateK6Dashboard(),
      language: 'json',
    });

    return artifacts;
  }

  private generateLoadTest(_project: Project): string {
    return `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '10m', target: 100 },
    { duration: '5m', target: 200 },
    { duration: '10m', target: 200 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(\`\${__ENV.BASE_URL}/api/health\`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
`;
  }

  private generateSoakTest(_project: Project): string {
    return `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10m', target: 50 },
    { duration: '4h', target: 50 },
    { duration: '10m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(\`\${__ENV.BASE_URL}/api/health\`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(Math.random() * 3 + 1);
}
`;
  }

  private generateSpikeTest(_project: Project): string {
    return `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '1m', target: 1000 },
    { duration: '10s', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  const res = http.get(\`\${__ENV.BASE_URL}/api/health\`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
`;
  }

  private generateSmokeTest(_project: Project): string {
    return `import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    http_req_duration: ['max<1000'],
    http_req_failed: ['rate===0'],
  },
};

const endpoints = [
  '/api/health',
  '/api/auth/session',
  '/api/users',
];

export default function () {
  for (const endpoint of endpoints) {
    const res = http.get(\`\${__ENV.BASE_URL}\${endpoint}\`);

    check(res, {
      [\`\${endpoint} status ok\`]: (r) => r.status < 500,
    });
  }
}
`;
  }

  private generatePerformanceCI(): string {
    return `name: Performance Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'

jobs:
  k6:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup K6
        uses: grafana/setup-k6-action@v1
      - name: Run Smoke Test
        run: k6 run k6/smoke-test.js
        env:
          BASE_URL: \${{ secrets.STAGING_URL || 'http://localhost:3000' }}
      - name: Run Load Test
        if: github.event_name == 'push'
        run: k6 run k6/load-test.js
        env:
          BASE_URL: \${{ secrets.STAGING_URL || 'http://localhost:3000' }}
`;
  }

  private generateK6Dashboard(): string {
    return JSON.stringify({
      title: 'K6 Performance Dashboard',
      panels: [
        { title: 'Requests per Second', type: 'graph', targets: [{ expr: 'rate(k6_http_reqs_total[5m])' }] },
        { title: 'Response Time', type: 'graph', targets: [{ expr: 'k6_http_req_duration_seconds{quantile="0.95"}' }] },
        { title: 'Error Rate', type: 'stat', targets: [{ expr: 'rate(k6_http_req_failed_total[5m])' }] },
      ],
    }, null, 2);
  }
}
