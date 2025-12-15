FROM oven/bun:1.3-alpine AS base

# Build stage
FROM base AS builder
WORKDIR /app

# Copy root package files
COPY package.json bun.lock ./
COPY apps/server/package.json ./apps/server/
COPY packages/auth/package.json ./packages/auth/
COPY packages/config/package.json ./packages/config/
COPY packages/db/package.json ./packages/db/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Build server
WORKDIR /app/apps/server
RUN bun run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built files
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./

EXPOSE 3000

CMD ["bun", "run", "dist/index.js"]

