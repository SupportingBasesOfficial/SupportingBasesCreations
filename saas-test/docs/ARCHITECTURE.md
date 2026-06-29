# Architecture Documentation

## System Overview

saas-platform follows a MODULAR_MONOLITH architecture pattern.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + React 18 |
| API | tRPC + Zod |
| Database | POSTGRESQL |
| ORM | Prisma |
| Cache | REDIS |
| Styling | Tailwind CSS |
| Testing | Vitest + Playwright |

## Project Structure

```
```

## Data Model

### User

- `id`: UUID
- `email`: STRING
- `name`: STRING
- `role`: ENUM
- `createdAt`: DATETIME
- `updatedAt`: DATETIME

### Organization

- `id`: UUID
- `name`: STRING
- `settings`: JSON (optional)
- `owner`: RELATION
- `createdAt`: DATETIME
- `updatedAt`: DATETIME

## Security

- Input validation via Zod schemas
- Authentication via NextAuth.js
- Row-level security in database
- Dependency vulnerability scanning

## Deployment

See `.github/workflows/deploy.yml` for deployment pipeline.
