# SupportingBasesCreations (SBC)

Enterprise-grade **Mega-Tech** project generation platform. Design your architecture visually, deploy to the cloud automatically.

## Architecture

```
monorepo/
├── apps/dashboard       # Next.js visual dashboard (React Flow, Supabase Auth, Sentry)
│   ├── src/app/         # App router (pages, API routes)
│   ├── src/components/  # UI components (canvas, collaboration, settings)
│   ├── src/hooks/       # React hooks (deploy, persistence, session, OAuth)
│   ├── src/store/       # Zustand stores (graph, deploy)
│   ├── e2e/             # Playwright E2E tests
│   └── .storybook/      # Storybook component docs
├── packages/cli         # CLI tool (`sbc generate`, `sbc health`, `sbc init`)
├── packages/core        # Domain, engine, resilience, security, observability, plugins
├── packages/generators  # Concrete generators (Prisma, tRPC, Next.js, Auth, Events, etc.)
├── packages/cloud       # Cloud integrations (GitHub, Vercel, Supabase, OAuth PKCE)
└── shared/types         # Shared TypeScript types
```

## Mega-Tech Stack

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting (Next.js, Edge Functions) |
| **Supabase** | Postgres, Auth, Storage |
| **Upstash Redis** | Cache, rate limiting, KV store, plugin loader |
| **Upstash QStash** | Serverless event queue (emails, async tasks) |
| **Vercel Blob** | File storage |
| **Sentry** | Error tracking & performance monitoring |

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start dashboard
pnpm --filter @sbc/dashboard dev

# Generate a project via CLI
node packages/cli/dist/index.js generate -n my-app -o ./my-app

# Check system health
node packages/cli/dist/index.js health
```

## Environment Variables

### Dashboard (`apps/dashboard/.env.example`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `GITHUB_OAUTH_CLIENT_ID/SECRET` | GitHub OAuth app credentials |
| `VERCEL_OAUTH_CLIENT_ID/SECRET` | Vercel OAuth app credentials |
| `SUPABASE_OAUTH_CLIENT_ID/SECRET` | Supabase OAuth app credentials |
| `UPSTASH_REDIS_REST_URL/TOKEN` | Upstash Redis for rate limiting & KV |
| `QSTASH_TOKEN` | Upstash QStash for event queues |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |
| `SENTRY_DSN` | Sentry error tracking DSN |

### CLI / Core

| Variable | Default | Description |
|----------|---------|-------------|
| `SBC_GENERATOR_TIMEOUT_MS` | `30000` | Per-generator timeout |
| `SBC_GENERATOR_MAX_RETRIES` | `2` | Retry attempts on failure |
| `SBC_GENERATOR_FAIL_FAST` | `0` | Abort on first failure if `1` |
| `SBC_GENERATOR_CONCURRENCY` | `5` | Parallel generators |
| `SBC_DISABLE_<GENERATOR>` | — | Disable a generator (`1` or `true`) |

## Features

### Dashboard
- **Visual Architecture Designer** — Drag-and-drop nodes (Frontend, API, Database, Auth, Cache, Queue, CDN, Webhook)
- **Real-time Collaboration** — Live cursors, presence avatars via Yjs/WebRTC
- **Cloud Deploy** — One-click deploy to GitHub + Vercel + Supabase with SSE progress streaming
- **OAuth Integration** — Connect GitHub, Vercel, and Supabase accounts
- **Project Persistence** — Save/load projects from Supabase Postgres
- **Dark Mode** — Full dark/light theme support
- **Templates** — Pre-built architecture templates gallery
- **Export** — Download architecture as ZIP
- **Auth** — Supabase Auth (email/password + GitHub OAuth)

### Engine
- **Resilient Generation** — Timeout, retry, circuit breaker, graceful degradation
- **Transactional Writer** — Atomic commit/rollback with backup
- **Plugin System** — Load plugins from Upstash Redis KV
- **Security** — Path sanitizer, rate limiter, AES-256-GCM secure memory vault
- **Observability** — Structured logger, generation metrics, health checker

### Generators
- **Frontend**: Next.js (App Router, SSR, ISR)
- **Backend**: API routes, tRPC, Prisma schema
- **Auth**: Supabase Auth with PKCE, session management, RBAC
- **Events**: EventBus, EventStore, Saga orchestration (QStash)
- **CQRS**: Command/Query buses, read models
- **Security**: Headers, rate limiting, audit logging, confidential computing
- **Multi-tenancy**: Tenant isolation, JWT claims, tenant switching
- **CI/CD**: GitHub Actions with SAST, DAST, SBOM, secret scanning
- **Infrastructure**: Docker, docker-compose, observability stack

## Testing

```bash
# All tests
pnpm -r run test

# Type check all
pnpm -r run check-types

# E2E tests
pnpm --filter @sbc/dashboard run test:e2e

# Storybook build
pnpm --filter @sbc/dashboard run build-storybook
```

## CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml`:
1. Lint & Type Check
2. Unit Tests (all packages)
3. Build All
4. Security Scans (Semgrep, Snyk)
5. Storybook Build
6. Smoke Test

## License

MIT
