# Multi-stage build for SBC CLI
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY shared/types/package.json ./shared/types/
COPY packages/core/package.json ./packages/core/
COPY packages/generators/package.json ./packages/generators/
COPY packages/cli/package.json ./packages/cli/
COPY apps/dashboard/package.json ./apps/dashboard/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build all packages
RUN pnpm --filter @sbc/shared --filter @sbc/core --filter @sbc/generators --filter @sbc/cli run build

# Production image
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/packages/cli/dist ./dist
COPY --from=builder /app/packages/cli/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/core/dist ./node_modules/@sbc/core/dist
COPY --from=builder /app/packages/core/package.json ./node_modules/@sbc/core/
COPY --from=builder /app/packages/generators/dist ./node_modules/@sbc/generators/dist
COPY --from=builder /app/packages/generators/package.json ./node_modules/@sbc/generators/
COPY --from=builder /app/shared/types/dist ./node_modules/@sbc/shared/dist
COPY --from=builder /app/shared/types/package.json ./node_modules/@sbc/shared/

# Link workspace dependencies
RUN pnpm install --prod

ENTRYPOINT ["node", "./dist/index.js"]
CMD ["--help"]
