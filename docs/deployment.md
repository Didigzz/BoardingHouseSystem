# BHMS Deployment Documentation

## Overview

This document covers deployment options for the Boarding House Management System.

## Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Docker (optional)
- pnpm

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bhms"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## Deployment Options

### 1. Docker Deployment

```bash
# Production build
docker compose -f infrastructure/docker/docker-compose.yml up -d

# Development
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d
```

### 2. Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Self-Hosted (VPS/Cloud)

```bash
# Build
pnpm build

# Start
pnpm start
```

## Database Setup

### Local Development

```bash
# Start PostgreSQL container
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d db

# Run migrations
pnpm db:push

# Seed database
pnpm db:seed
```

### Production

```bash
# Run migrations
pnpm db:migrate deploy

# Verify
pnpm db:studio
```

## CI/CD Pipeline

GitHub Actions workflow handles:

1. **Lint**: ESLint checks
2. **Typecheck**: TypeScript validation
3. **Build**: Production build verification
4. **Deploy**: Automatic deployment on merge to main

See `.github/workflows/ci.yml` and `.github/workflows/deploy.yml`.

## Monitoring

Recommended tools:
- Application: Vercel Analytics / Sentry
- Database: Prisma Metrics
- Logs: Vercel Logs / CloudWatch

## Scaling Considerations

1. **Database**: Use connection pooling (PgBouncer)
2. **Caching**: Implement Redis for session/data caching
3. **CDN**: Use Vercel Edge or CloudFront
4. **Database Replicas**: Read replicas for heavy read operations
