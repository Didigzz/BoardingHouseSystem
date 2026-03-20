# Haven Space - Vercel Deployment Guide

## Overview

This guide covers deploying the Haven Space monorepo to Vercel. The platform consists of 5 Next.js applications that need to be deployed as separate Vercel projects.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Already installed (v50.22.0)
3. **Database**: PostgreSQL database (e.g., Neon, Supabase)
4. **Redis**: Redis instance (e.g., Upstash)

## Quick Start

### Step 1: Login to Vercel

```bash
vercel login
```

### Step 2: Deploy Each App Separately

Navigate to each app directory and run the deploy command:

**Important:** During the first deploy, you'll be prompted for settings. Use these:

| Setting | Value |
|---------|-------|
| **Directory?** | `../../` |
| **Build Command?** | `vercel build` (or leave default) |
| **Output Directory?** | `.next` (or leave default) |
| **Install Command?** | `corepack enable && bun install` |

#### 1. Deploy Public Platform (apps/(public))

```bash
cd apps/\(public\)
vercel --prod
```

#### 2. Deploy Admin Dashboard (apps/admin)

```bash
cd apps/admin
vercel --prod
```

#### 3. Deploy Boarder Dashboard (apps/boarder)

```bash
cd apps/boarder
vercel --prod
```

#### 4. Deploy Landlord Portal (apps/landlord)

```bash
cd apps/landlord
vercel --prod
```

#### 5. Deploy API Server (apps/server)

```bash
cd apps/server
vercel --prod
```

## Step 3: Configure Environment Variables

After deploying each app, set the environment variables in Vercel Dashboard:

### Required Variables (All Apps)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | NextAuth secret (min 32 chars) |
| `NEXTAUTH_URL` | Your app URL (update after deploy) |
| `REDIS_URL` | Redis connection string |

### Additional Variables (API Server)

| Variable | Description |
|----------|-------------|
| `API_URL` | API server URL |
| `JWT_SECRET` | JWT signing secret |
| `CSRF_SECRET` | CSRF protection secret |

### Additional Variables (All Frontend Apps)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Public API URL |

### Set via CLI

```bash
# Navigate to each project and set variables
cd apps/\(public\)
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add REDIS_URL
vercel env add NEXT_PUBLIC_API_URL
```

### Set via Dashboard

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add variables for Production, Preview, and Development

## Step 4: Update URLs After Deployment

After all apps are deployed, update the environment variables with the actual deployment URLs:

```bash
# Example URLs - replace with your actual deployment URLs
NEXTAUTH_URL="https://haven-space-public.vercel.app"
NEXT_PUBLIC_API_URL="https://haven-space-api.vercel.app"
API_URL="https://haven-space-api.vercel.app"
```

## Step 5: Database Setup

1. Create a PostgreSQL database (Neon recommended for Vercel)
2. Run migrations:
   ```bash
   bun run db:migrate
   ```
3. Seed initial data (optional):
   ```bash
   bun run db:seed
   ```

## Step 6: Redis Setup

1. Create a Redis instance (Upstash recommended for serverless)
2. Get the connection URL
3. Set `REDIS_URL` environment variable in all projects

## GitHub Integration (Recommended for Production)

For automatic deployments on git push:

1. **Push code to GitHub**

2. **Import each app in Vercel Dashboard:**
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure as follows:

   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | Next.js |
   | **Root Directory** | `apps/(public)` (or respective app) |
   | **Install Command** | `cd ../.. && corepack enable && bun install` |

   Leave **Build Command** and **Output Directory** as default (Vercel will use `vercel build`)

3. **Add environment variables** in Vercel Dashboard

4. **Deploy** - Vercel will auto-deploy on push to main branch

## Deployment URLs

After deployment, your apps will be available at:

- **Public**: `https://haven-space-public.vercel.app`
- **Admin**: `https://haven-space-admin.vercel.app`
- **Boarder**: `https://haven-space-boarder.vercel.app`
- **Landlord**: `https://haven-space-landlord.vercel.app`
- **API**: `https://haven-space-api.vercel.app`

## Troubleshooting

### Build Fails with "No Next.js version detected"

Ensure the **Directory** setting points to the monorepo root (`../../`), not the app directory.

### Bun Not Found

Vercel supports Bun via corepack. The install command `corepack enable && bun install` should work automatically.

### Environment Variables Not Working

- Verify variables are set for the correct environment (Production/Preview/Development)
- Redeploy after adding new environment variables
- Use `vercel env pull` to sync local environment

### Database Connection Issues

- Use a cloud-hosted database (Neon, Supabase, AWS RDS)
- Ensure connection string allows connections from Vercel IPs
- Consider using connection pooling for serverless functions

## Useful Commands

```bash
# View deployment logs
vercel logs <deployment-url>

# List all deployments
vercel ls

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add VARIABLE_NAME

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Additional Resources

- [Vercel Monorepo Documentation](https://vercel.com/docs/monorepos)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Bun on Vercel](https://vercel.com/docs/runtimes#official-runtimes/bun)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
