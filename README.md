# SupportingBasesCreations (SBC)

Enterprise-grade project generation platform. Creates full-stack projects via object-oriented configuration.

## Architecture

```
monorepo/
├── apps/dashboard       # Next.js visual dashboard
├── packages/cli         # CLI tool (`sbc generate`)
├── packages/core        # Domain, engine, resilience, security, observability
├── packages/generators  # Concrete generators (Prisma, tRPC, Next.js, etc.)
└── shared/types         # Shared TypeScript types
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Generate a project
node packages/cli/dist/index.js generate -n my-app -o ./my-app

# Validate configuration
node packages/cli/dist/index.js validate -c sbc.config.json

# Check system health
node packages/cli/dist/index.js health
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SBC_GENERATOR_TIMEOUT_MS` | `30000` | Per-generator timeout |
| `SBC_GENERATOR_MAX_RETRIES` | `2` | Retry attempts on failure |
| `SBC_GENERATOR_FAIL_FAST` | `0` | Abort on first failure if `1` |
| `SBC_GENERATOR_CONCURRENCY` | `5` | Parallel generators |
| `SBC_DISABLE_<GENERATOR>` | — | Disable a generator (`1` or `true`) |

## Resilience

- **Timeout**: Every generator has a configurable timeout.
- **Retry**: Failed generators retry with exponential backoff.
- **Circuit Breaker**: Opens after threshold failures.
- **Graceful Degradation**: With `failFast=false`, failing generators are skipped.
- **Transactional Writer**: Atomic commit/rollback with backup of existing output.

## Security

- **Path Sanitizer**: Blocks path traversal (`../etc/passwd`).
- **Rate Limiter**: 10 requests per minute per CLI invocation.

## Observability

- **GenerationMetrics**: Tracks duration, success/failure, artifacts per generator.
- **HealthChecker**: Validates disk space and permissions.
- **Metrics Export**: Saved to `<outputDir>/.sbc/metrics.json`.

## Testing

```bash
# Unit tests
pnpm --filter @sbc/core run test

# Coverage
pnpm --filter @sbc/core run coverage

# Type check all
pnpm check-types
```

## CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml`:
1. Lint & Type Check
2. Test Core
3. Build All

## License

MIT
