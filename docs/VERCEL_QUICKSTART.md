# Haven Space - Vercel Deployment (Quick Guide)

## Important: Monorepo Deployment on Vercel

Haven Space is a **monorepo** with multiple Next.js apps. Vercel requires each app to be deployed as a **separate project** with the correct **Root Directory** setting.

## Option A: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "chore: add vercel configuration"
git push origin main
```

### Step 2: Create Projects in Vercel Dashboard

Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository **5 times** (once for each app):

#### Project 1: Public Platform
| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `apps/(public)` |
| **Install Command** | `cd ../.. && corepack enable && bun install` |

#### Project 2: Admin Dashboard
| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `apps/admin` |
| **Install Command** | `cd ../.. && corepack enable && bun install` |

#### Project 3: Boarder Dashboard
| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `apps/boarder` |
| **Install Command** | `cd ../.. && corepack enable && bun install` |

#### Project 4: Landlord Portal
| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `apps/landlord` |
| **Install Command** | `cd ../.. && corepack enable && bun install` |

#### Project 5: API Server
| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `apps/server` |
| **Install Command** | `cd ../.. && corepack enable && bun install` |

### Step 3: Add Environment Variables

In each project's **Settings → Environment Variables**, add:

```
DATABASE_URL=your_postgresql_url
NEXTAUTH_SECRET=your_32_char_secret
NEXTAUTH_URL=https://your-app.vercel.app
REDIS_URL=your_redis_url
NEXT_PUBLIC_API_URL=https://your-api-server.vercel.app
```

### Step 4: Deploy

Click **Deploy** for each project. Vercel will auto-deploy on every push to main.

---

## Option B: Deploy via CLI (Manual Steps Required)

### 1. Deploy Public App

```bash
cd apps/\(public\)
vercel
```

When prompted:
- **Set up and deploy?** `Yes`
- **Which scope?** Select your account
- **Link to existing project?** `No`
- **Project name?** `haven-space-public`
- **Directory?** `../../` ⚠️ **Important: Must be ../../**
- **Build Command?** `vercel build` (leave default)
- **Output Directory?** `.next` (leave default)
- **Install Command?** `corepack enable && bun install`

Then deploy to production:
```bash
vercel --prod
```

### 2. Deploy Admin App

```bash
cd apps/admin
vercel
```

Settings:
- **Directory?** `../../`
- **Build Command?** `vercel build` (leave default)
- **Output Directory?** `.next` (leave default)

### 3. Deploy Boarder App

```bash
cd apps/boarder
vercel
```

Settings:
- **Directory?** `../../`
- **Build Command?** `vercel build` (leave default)
- **Output Directory?** `.next` (leave default)

### 4. Deploy Landlord App

```bash
cd apps/landlord
vercel
```

Settings:
- **Directory?** `../../`
- **Build Command?** `vercel build` (leave default)
- **Output Directory?** `.next` (leave default)

### 5. Deploy API Server

```bash
cd apps/server
vercel
```

Settings:
- **Directory?** `../../`
- **Build Command?** `vercel build` (leave default)
- **Output Directory?** `.next` (leave default)

---

## Environment Variables Reference

### All Apps Need:
```bash
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
NEXTAUTH_SECRET="min-32-character-secret-key-here"
REDIS_URL="redis://localhost:6379"
```

### Frontend Apps (Public, Admin, Boarder, Landlord):
```bash
NEXTAUTH_URL="https://your-app.vercel.app"
NEXT_PUBLIC_API_URL="https://your-api-server.vercel.app"
```

### API Server:
```bash
API_URL="https://haven-space-api.vercel.app"
JWT_SECRET="your-jwt-secret-min-32-chars"
CSRF_SECRET="your-csrf-secret-min-32-chars"
```

---

## After Deployment

1. **Update URLs**: Once deployed, update `NEXTAUTH_URL` and `NEXT_PUBLIC_API_URL` with actual deployment URLs

2. **Run Migrations**: 
   ```bash
   bun run db:migrate
   ```

3. **Seed Database** (optional):
   ```bash
   bun run db:seed
   ```

4. **Test All Apps**: Visit each deployment URL

---

## Troubleshooting

### "No Next.js version detected"
Make sure **Directory** is set to `../../` during CLI setup, or **Root Directory** is set to `apps/(public)` (or respective app) in Dashboard.

### "Command exited with 1"
Check that `corepack enable && bun install` works. Vercel supports Bun natively.

### Environment variables not working
- Redeploy after adding new environment variables
- Verify they're set for Production, Preview, AND Development
- Use `vercel env pull` to sync locally

---

## Useful Links

- [Vercel Monorepo Guide](https://vercel.com/docs/monorepos)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Bun on Vercel](https://vercel.com/docs/runtimes#official-runtimes/bun)
