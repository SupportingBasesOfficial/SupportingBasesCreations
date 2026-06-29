import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class ObservabilityStackGenerator implements Generator {
  readonly name = 'observability';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'src/lib/observability/tracing.ts',
      content: this.generateTracing(project),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/observability/logger.ts',
      content: this.generateLogger(project),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/observability/metrics.ts',
      content: this.generateMetrics(project),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/app/api/health/route.ts',
      content: this.generateHealthRoute(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'docker-compose.observability.yml',
      content: this.generateObservabilityCompose(),
      language: 'yaml',
    });

    artifacts.push({
      path: 'prometheus.yml',
      content: this.generatePrometheusConfig(),
      language: 'yaml',
    });

    artifacts.push({
      path: 'observability-dashboard.json',
      content: this.generateGrafanaDashboard(),
      language: 'json',
    });

    return artifacts;
  }

  private generateTracing(_project: Project): string {
    return `import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'sbc-app',
  [SemanticResourceAttributes.SERVICE_VERSION]: process.env.npm_package_version || '1.0.0',
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
});

const exporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
});

const sdk = new NodeSDK({
  resource,
  spanProcessor: new SimpleSpanProcessor(exporter),
});

export function initTracing(): void {
  sdk.start();
  process.on('SIGTERM', () => sdk.shutdown().catch(console.error));
}

export { sdk };
`;
  }

  private generateLogger(_project: Project): string {
    return `import { createLogger, transports, format } from 'winston';

const { combine, timestamp, json, errors } = format;

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    service: process.env.OTEL_SERVICE_NAME || 'sbc-app',
    environment: process.env.NODE_ENV || 'development',
  },
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export function logRequest(req: Request, res: Response, duration: number): void {
  logger.info('http_request', {
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    durationMs: duration,
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
  });
}
`;
  }

  private generateMetrics(_project: Project): string {
    return `import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { metrics } from '@opentelemetry/api';

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'sbc-app',
});

const metricReader = new PeriodicExportingMetricReader({
  exporter: new OTLPMetricExporter({
    url: process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT || 'http://localhost:4318/v1/metrics',
  }),
  exportIntervalMillis: 10000,
});

const meterProvider = new MeterProvider({ resource, readers: [metricReader] });
metrics.setGlobalMeterProvider(meterProvider);

export const meter = metrics.getMeter('sbc-app-meter');

export const httpRequestCounter = meter.createCounter('http_requests_total', {
  description: 'Total number of HTTP requests',
});

export const httpRequestDuration = meter.createHistogram('http_request_duration_seconds', {
  description: 'HTTP request duration in seconds',
});

export const activeConnections = meter.createUpDownCounter('active_connections', {
  description: 'Number of active connections',
});
`;
  }

  private generateHealthRoute(): string {
    return `import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    database: await checkDatabase(),
    cache: await checkCache(),
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  const healthy = checks.database && checks.cache;

  return NextResponse.json(
    { status: healthy ? 'healthy' : 'degraded', checks },
    { status: healthy ? 200 : 503 }
  );
}

async function checkDatabase(): Promise<boolean> {
  try {
    // TODO: Implement actual DB health check
    return true;
  } catch {
    return false;
  }
}

async function checkCache(): Promise<boolean> {
  try {
    // TODO: Implement actual cache health check
    return true;
  } catch {
    return false;
  }
}
`;
  }

  private generateObservabilityCompose(): string {
    return `version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - '9090:9090'
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  grafana:
    image: grafana/grafana:latest
    ports:
      - '3001:3000'
    volumes:
      - grafana-data:/var/lib/grafana
      - ./observability-dashboard.json:/etc/grafana/provisioning/dashboards/sbc-dashboard.json:ro
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - '16686:16686'
      - '4317:4317'
      - '4318:4318'
    environment:
      - COLLECTOR_OTLP_ENABLED=true

  loki:
    image: grafana/loki:latest
    ports:
      - '3100:3100'
    command: -config.file=/etc/loki/local-config.yaml

volumes:
  grafana-data:
`;
  }

  private generatePrometheusConfig(): string {
    return `global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'sbc-app'
    static_configs:
      - targets: ['host.docker.internal:3000']
    metrics_path: '/api/metrics'

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
`;
  }

  private generateGrafanaDashboard(): string {
    return JSON.stringify({
      dashboard: {
        title: 'SBC Observability',
        panels: [
          { title: 'Request Rate', type: 'graph', targets: [{ expr: 'rate(http_requests_total[5m])' }] },
          { title: 'Request Duration', type: 'graph', targets: [{ expr: 'histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))' }] },
          { title: 'Active Connections', type: 'stat', targets: [{ expr: 'active_connections' }] },
        ],
      },
    }, null, 2);
  }
}
