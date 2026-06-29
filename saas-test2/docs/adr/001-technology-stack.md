# ADR 001: Technology Stack Selection

## Status

Accepted

## Context

We needed to select a technology stack that balances developer productivity, type safety, and enterprise scalability.

## Decision

Selected the T3 Stack (TypeScript, Tailwind, tRPC) with Prisma ORM.

## Consequences

### Positive

- Full type safety from database to UI
- Rapid development with Prisma migrations
- Excellent ecosystem and community support

### Negative

- Learning curve for tRPC
- Prisma has some query limitations

## Alternatives Considered

- REST API + Express (less type safety)
- GraphQL (overkill for this scope)
- MongoDB (relational data fits PostgreSQL better)
