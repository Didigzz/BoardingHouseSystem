# ✅ Vercel Configuration Complete

## What's Been Set Up

Your Haven Space monorepo is now configured for Vercel deployment with `vercel build`.

### Files Created/Updated

| File | Purpose |
|------|---------|
| `vercel.json` (root) | Base Vercel config with `vercel build` |
| `apps/(public)/vercel.json` | Public platform config |
| `apps/admin/vercel.json` | Admin dashboard config |
| `apps/boarder/vercel.json` | Boarder dashboard config |
| `apps/landlord/vercel.json` | Landlord portal config |
| `apps/server/vercel.json` | API server config |
| `scripts/deploy-vercel.ts` | Automated deployment script |
| `docs/VERCEL_QUICKSTART.md` | Quick start guide |
| `docs/VERCEL_DEPLOYMENT.md` | Full deployment documentation |

### Updated package.json Scripts

```bash
bun run deploy:vercel          # Deploy all apps
bun run deploy:vercel:public   # Deploy public platform
bun run deploy:vercel:admin    # Deploy admin dashboard
bun run deploy:vercel:boarder  # Deploy boarder dashboard
bun run deploy:vercel:landlord # Deploy landlord portal
bun run deploy:vercel:api      # Deploy API server
```

---

## How to Deploy

### Option 1: Vercel Dashboard (Recommended for Monorepos)

This is the **most reliable** method for monorepo deployments.

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "chore: add vercel configuration"
   git push origin main
   ```

2. **Create 5 Projects in Vercel Dashboard:**
   
   Go to [vercel.com/new](https://vercel.com/new) and import your repository 5 times:

   | App | Root Directory |
   |-----|----------------|
   | Public Platform | `apps/(public)` |
   | Admin Dashboard | `apps/admin` |
   | Boarder Dashboard | `apps/boarder` |
   | Landlord Portal | `apps/landlord` |
   | API Server | `apps/server` |

3. **For each project, set:**
   - **Framework Preset:** Next.js
   - **Install Command:** `cd ../.. && corepack enable && bun install`
   - **Build Command:** Leave as default (uses `vercel build`)
   - **Output Directory:** Leave as default (uses `.next`)

4. **Add Environment Variables** in each project's Settings → Environment Variables

5. **Deploy!** Vercel will auto-deploy on every push to main.

---

### Option 2: Vercel CLI

Deploy each app individually:

```bash
# 1. Public Platform
cd apps/\(public\)
vercel          # Initial setup (set Directory to ../../)
vercel --prod   # Deploy to production

# 2. Admin Dashboard
cd apps/admin
vercel
vercel --prod

# 3. Boarder Dashboard
cd apps/boarder
vercel
vercel --prod

# 4. Landlord Portal
cd apps/landlord
vercel
vercel --prod

# 5. API Server
cd apps/server
vercel
vercel --prod
```

**During first setup, when prompted:**
- **Directory?** `../../`
- **Build Command?** Press Enter (default: `vercel build`)
- **Output Directory?** Press Enter (default: `.next`)
- **Install Command?** `corepack enable && bun install`

---

### Option 3: Automated Script

```bash
bun run deploy:vercel
```

This script will attempt to deploy all apps sequentially.

---

## Environment Variables

Set these in Vercel Dashboard for **each project**:

### Required for All Apps:
```bash
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
NEXTAUTH_SECRET="min-32-character-secret-key"
REDIS_URL="redis://localhost:6379"
```

### Frontend Apps (Public, Admin, Boarder, Landlord):
```bash
NEXTAUTH_URL="https://your-app.vercel.app"
NEXT_PUBLIC_API_URL="https://your-api-server.vercel.app"
```

### API Server:
```bash
API_URL="https://your-api-server.vercel.app"
JWT_SECRET="your-jwt-secret-min-32-chars"
CSRF_SECRET="your-csrf-secret-min-32-chars"
```

---

## Why `vercel build`?

Using `vercel build` (instead of custom build commands) provides:

✅ **Zero Configuration** - Vercel auto-detects Next.js and builds correctly  
✅ **Optimized Caching** - Vercel caches build artifacts efficiently  
✅ **Automatic Updates** - Benefits from Vercel's build improvements  
✅ **Standard Approach** - Follows Vercel's recommended practices  

---

## Troubleshooting

### "No Next.js version detected"
This happens when deploying from the monorepo root. Solution:
- Set **Root Directory** to the specific app folder (e.g., `apps/(public)`)
- Or use `Directory: ../../` when deploying via CLI

### "Project names can be up to 100 characters long"
Vercel is auto-generating an invalid project name. Solution:
- Provide a valid project name during initial setup
- Or set it in Vercel Dashboard → Settings → General

### Build fails with "command not found"
Ensure `corepack enable && bun install` is set as the Install Command.

---

## Next Steps

1. **Deploy to Vercel** using one of the methods above
2. **Set environment variables** in Vercel Dashboard
3. **Run database migrations:** `bun run db:migrate`
4. **Test all applications** at their deployment URLs
5. **Update URLs** in environment variables after deployment

---

## Documentation

- **Quick Start Guide:** `docs/VERCEL_QUICKSTART.md`
- **Full Deployment Guide:** `docs/VERCEL_DEPLOYMENT.md`
- **Vercel Monorepo Docs:** https://vercel.com/docs/monorepos
- **Vercel CLI Docs:** https://vercel.com/docs/cli
