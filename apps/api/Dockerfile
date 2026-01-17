# Multi-stage build for production
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Stage 1: Dependencies
FROM base AS deps
WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/api/package.json ./packages/api/
COPY packages/database/package.json ./packages/database/
COPY packages/auth/package.json ./packages/auth/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

# Copy source code
COPY . .

# Build the API server
RUN pnpm --filter @bhms/api-server build

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiserver

# Copy built application
COPY --from=builder --chown=apiserver:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=apiserver:nodejs /app/apps/api/package.json ./
COPY --from=builder --chown=apiserver:nodejs /app/node_modules ./node_modules

USER apiserver

EXPOSE 3001

CMD ["node", "dist/index.js"]
