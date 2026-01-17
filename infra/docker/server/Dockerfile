FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Development stage
FROM base AS development
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm db:generate
EXPOSE 4000
CMD ["pnpm", "dev"]

# Build stage
FROM base AS builder
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm db:generate
RUN pnpm build

# Production stage
FROM base AS production
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 4000
CMD ["node", "dist/server.js"]
