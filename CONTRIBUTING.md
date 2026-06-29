# Contributing to SBC

## Development Workflow

1. **Branch**: Create a feature branch from `main`.
2. **Code**: Follow existing patterns in `packages/core/src`.
3. **Test**: Add tests in `*.test.ts` alongside source files.
4. **Lint**: `pnpm lint` and `pnpm format` run automatically on pre-commit via Husky.
5. **Build**: `pnpm check-types` and `pnpm --filter @sbc/core run test` must pass.
6. **PR**: Open a PR; CI runs automatically.

## Adding a New Generator

1. Create class in `packages/generators/src/<name>/`.
2. Implement `Generator` interface with `name`, `version`, `supportedFeatures`, `supportedArchitectures`, `generate()`.
3. Export from `packages/generators/src/index.ts`.
4. Register in `packages/cli/src/index.ts`.
5. Add tests in `packages/core/src/e2e/` or unit tests in generator package.

## Project Structure

- `packages/core/src/domain/` — Entities, Fields, validation
- `packages/core/src/engine/` — GenerationEngine, merge logic
- `packages/core/src/resilience/` — ResilientGenerator, retry, circuit breaker
- `packages/core/src/io/` — TransactionalWriter with atomic commit
- `packages/core/src/security/` — PathSanitizer, RateLimiter
- `packages/core/src/observability/` — GenerationMetrics, HealthChecker

## Commit Message Format

```
type(scope): description

[optional body]
```

Types: `feat`, `fix`, `test`, `docs`, `refactor`, `chore`
