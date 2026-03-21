# Haven Space - Production Deployment Guide

This guide covers deploying the Haven Space monorepo to Vercel in production.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Option A: Separate Vercel Projects (Recommended)](#option-a-separate-vercel-projects-recommended)
4. [Option B: Single Vercel Project](#option-b-single-vercel-project)
5. [Domain Configuration](#domain-configuration)
6. [Environment Variables](#environment-variables)
7. [Database Setup](#database-setup)
8. [Post-Deployment](#post-deployment)
9. [Troubleshooting](#troubleshooting)

---

## Overview

Haven Space consists of **5 separate applications**:

| App | Port | Description |
|-----|------|-------------|
| **Public** | 3000 | Public marketplace & landing page |
| **Boarder** | 3004 | Boarder dashboard |
| **Landlord** | 3005 | Landlord management portal |
| **Admin** | 3002 | Platform admin dashboard |
| **API Server** | 3006 | Backend tRPC/ORPC API |

Each app can be deployed independently or consolidated into a single project.

---

## Prerequisites

- [ ] **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
- [ ] **GitHub Repository** - Code pushed to GitHub/GitLab/Bitbucket
- [ ] **Domain Name** - Purchased domain (e.g., `havenspace.com`)
- [ ] **Database** - PostgreSQL database (Neon, Supabase, or self-hosted)
- [ ] **Redis** - Redis instance for caching (Upstash, Redis Cloud)
- [ ] **Environment Variables** - All required secrets ready

---

## Option A: Separate Vercel Projects (Recommended)

This approach deploys each app as an independent Vercel project with its own subdomain.

### Step 1: Create Vercel Projects

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository **5 times**, creating separate projects:

| Project Name | Root Directory | Framework Preset |
|--------------|----------------|------------------|
| `haven-space-public` | `apps/(public)` | Next.js |
| `haven-space-boarder` | `apps/boarder` | Next.js |
| `haven-space-landlord` | `apps/landlord` | Next.js |
| `haven-space-admin` | `apps/admin` | Next.js |
| `haven-space-api` | `apps/server` | Next.js |

### Step 2: Configure Build Settings

Each app has a `vercel.json` with the **Bun runtime** configured:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.x",
  "framework": "nextjs",
  "installCommand": "cd ../.. && bun install",
  "buildCommand": "cd ../.. && bun run <app>:build"
}
```

**Key Configuration:**
- `bunVersion: "1.x"` - Enables Vercel's native Bun runtime (28% faster for CPU-bound workloads)
- No manual Bun installation needed - Vercel handles it automatically
- TypeScript supported out-of-the-box with Bun

**Build Commands by App:**

| App | Build Command |
|-----|---------------|
| Public | `cd ../.. && bun run public:build` |
| Boarder | `cd ../.. && bun run boarder:build` |
| Landlord | `cd ../.. && bun run landlord:build` |
| Admin | `cd ../.. && bun run admin:build` |
| API Server | `cd ../.. && bun run api:build` |

**Output Directory:**
- All Next.js apps: `.next`

### Bun Runtime Benefits

| Feature | Benefit |
|---------|---------|
| **Performance** | 28% reduction in average latency for CPU-bound workloads |
| **TypeScript** | Zero-config TypeScript support (`.ts` files work natively) |
| **Cold Starts** | Faster cold starts compared to Node.js |
| **Simplicity** | No manual installation scripts needed |

### Important Notes

⚠️ **Middleware Configuration**: If using Next.js middleware, ensure it specifies Node.js runtime:

```typescript
// middleware.ts
export const config = {
  runtime: 'nodejs',
};
```

⚠️ **Limitations** (Beta):
- No automatic source maps
- No bytecode caching
- No request metrics for `node:http`/`node:https` (fetch-based metrics work)

### Step 3: Add Environment Variables

Navigate to **Project Settings → Environment Variables** and add:

#### All Projects (Shared)
```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
```

#### Public App
```bash
NEXT_PUBLIC_API_URL=https://api.havenspace.com
PUBLIC_URL=https://havenspace.com
```

#### Boarder App
```bash
NEXT_PUBLIC_API_URL=https://api.havenspace.com
BOARDER_URL=https://boarder.havenspace.com
```

#### Landlord App
```bash
NEXT_PUBLIC_API_URL=https://api.havenspace.com
LANDLORD_URL=https://landlord.havenspace.com
```

#### Admin App
```bash
NEXT_PUBLIC_API_URL=https://api.havenspace.com
ADMIN_URL=https://admin.havenspace.com
```

#### API Server
```bash
API_URL=https://api.havenspace.com
NEXT_PUBLIC_API_URL=https://api.havenspace.com
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
GCP_BUCKET=your-bucket
GCP_PROJECT_ID=your-project
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
CSRF_SECRET=csrf-secret
JWT_SECRET=jwt-secret
```

### Step 4: Deploy

1. Click **Deploy** for each project
2. Wait for build to complete (~2-5 minutes per app)
3. Verify deployment URL works

---

## Option B: Single Vercel Project

Consolidate all apps into one Vercel project using hostname-based routing.

### Step 1: Create Single Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository **once**
3. Leave **Root Directory** empty (deploy from root)

### Step 2: Configure `vercel.json`

Root `vercel.json` with Bun runtime:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.x",
  "framework": "nextjs",
  "installCommand": "bun install",
  "buildCommand": "bun run build",
  "regions": ["iad1"]
}
```

**Benefits of Bun Runtime:**
- 28% reduction in average latency for CPU-bound workloads
- Native TypeScript support (no transpilation needed)
- Faster cold starts compared to Node.js

### Step 3: Configure Hostname Routing

In each app's `next.config.js`, add hostname detection:

```javascript
// Example for apps/boarder/next.config.js
const hostname = process.env.VERCEL_PROJECT_PRODUCTION_URL || 'localhost:3004';

const hostnameConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'host',
            value: 'boarder.havenspace.com',
          },
        ],
      },
    ];
  },
};

module.exports = {
  ...yourExistingConfig,
  ...hostnameConfig,
};
```

### Step 4: Add Environment Variables

Add all environment variables from Option A to the single project.

### Step 5: Deploy

1. Click **Deploy**
2. Wait for build to complete (~10-15 minutes for all apps)

---

## Domain Configuration

### Purchase Domain

Buy **one domain** (e.g., `havenspace.com`) from:
- Vercel Marketplace (recommended)
- Namecheap
- GoDaddy
- Google Domains

### Configure Subdomains

In your domain DNS settings, add:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel.com` |
| CNAME | `api` | `cname.vercel.com` |
| CNAME | `boarder` | `cname.vercel.com` |
| CNAME | `landlord` | `cname.vercel.com` |
| CNAME | `admin` | `cname.vercel.com` |

### Add Domains in Vercel

For **each project**:

1. Go to **Project Settings → Domains**
2. Add your domain/subdomain:

| Project | Domain to Add |
|---------|---------------|
| Public | `havenspace.com`, `www.havenspace.com` |
| Boarder | `boarder.havenspace.com` |
| Landlord | `landlord.havenspace.com` |
| Admin | `admin.havenspace.com` |
| API | `api.havenspace.com` |

3. Vercel will auto-generate SSL certificates

---

## Database Setup

### Option 1: Neon (Recommended)

1. Create account at [neon.tech](https://neon.tech)
2. Create new PostgreSQL database
3. Copy connection string to `DATABASE_URL`

### Option 2: Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string to `DATABASE_URL`

### Option 3: Self-Hosted

1. Set up PostgreSQL 15+ on your server
2. Create database and user
3. Add connection string to `DATABASE_URL`

### Run Migrations

After deployment, run migrations:

```bash
# Connect to Vercel via CLI
vercel link

# Run migrations
vercel env pull
bun run db:migrate
bun run db:seed
```

---

## Redis Setup

### Option 1: Upstash (Recommended)

1. Create account at [upstash.com](https://upstash.com)
2. Create new Redis database
3. Copy connection string to `REDIS_URL`

### Option 2: Redis Cloud

1. Create account at [redis.com/cloud](https://redis.com/cloud)
2. Create new Redis instance
3. Copy connection string to `REDIS_URL`

---

## Post-Deployment

### 1. Verify Deployments

Check each app loads correctly:

- ✅ `https://havenspace.com` - Public marketplace
- ✅ `https://boarder.havenspace.com` - Boarder dashboard
- ✅ `https://landlord.havenspace.com` - Landlord portal
- ✅ `https://admin.havenspace.com` - Admin dashboard
- ✅ `https://api.havenspace.com` - API server

### 2. Test Authentication

1. Create test user accounts
2. Test login/logout flow
3. Verify role-based redirects

### 3. Configure Webhooks

For Stripe payments:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://api.havenspace.com/api/webhooks/stripe`
3. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 4. Set Up Monitoring

- **Vercel Analytics** - Enable in Project Settings
- **Vercel Speed Insights** - Enable for performance monitoring
- **Error Tracking** - Integrate Sentry or LogRocket

### 5. Configure Custom Domain Email (Optional)

Set up email for notifications:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@havenspace.com
SMTP_PASS=your-app-password
```

---

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Solution: Verify install command includes monorepo root
cd ../.. && bun install
```

**Error: Prisma schema not found**
```bash
# Solution: Add to vercel.json
{
  "build": {
    "env": {
      "PRISMA_GENERATE": "true"
    }
  }
}
```

### Runtime Errors

**Error: Database connection failed**
- Check `DATABASE_URL` is correct
- Ensure database allows connections from Vercel IPs
- Add Vercel IP ranges to database allowlist

**Error: NextAuth configuration invalid**
- Verify `NEXTAUTH_URL` matches your domain
- Regenerate `NEXTAUTH_SECRET`:
  ```bash
  openssl rand -base64 32
  ```

**Error: API calls failing**
- Check `NEXT_PUBLIC_API_URL` points to deployed API
- Verify CORS settings in API server

### Domain Issues

**Error: SSL certificate pending**
- Wait 5-10 minutes for Vercel to generate SSL
- Ensure DNS records are correct

**Error: 404 on subdomain**
- Verify domain is added in Vercel Project Settings
- Check DNS CNAME record points to `cname.vercel.com`

---

## Vercel CLI Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull

# Deploy preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Note: All deployments use Bun 1.x runtime automatically
# No additional configuration needed when vercel.json has "bunVersion": "1.x"
```

---

## Cost Estimates

### Vercel Pricing (Hobby - Free)

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ 10,000 serverless function invocations/day
- ✅ Automatic SSL

### Vercel Pricing (Pro - $20/member/month)

- ✅ Everything in Hobby
- ✅ 1TB bandwidth/month
- ✅ 1,000,000 serverless function invocations/day
- ✅ Priority support

### Additional Costs

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Domain** | - | ~$12-15/year |
| **Neon DB** | 0.5GB free | $0.50/GB/month |
| **Upstash Redis** | 10K commands/day free | $0.20/1M commands |
| **Stripe** | No monthly fee | 2.9% + $0.30/transaction |

**Estimated Monthly Cost (Small Scale):** $20-50/month

---

## Security Checklist

- [ ] All environment variables set correctly
- [ ] `NEXTAUTH_SECRET` is cryptographically secure
- [ ] Database connection uses SSL
- [ ] CORS configured for allowed origins only
- [ ] Rate limiting enabled on API
- [ ] HTTPS enforced on all domains
- [ ] Admin dashboard restricted to admin IPs (optional)
- [ ] Webhook secrets stored securely
- [ ] Regular backups enabled for database

---

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs:** [prisma.io/docs](https://prisma.io/docs)
- **Project Issues:** GitHub Issues

---

*Last updated: March 2026*
