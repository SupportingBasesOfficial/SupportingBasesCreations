import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
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
