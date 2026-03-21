# Bun Runtime Configuration for Vercel

This document summarizes the Bun runtime configuration for Haven Space on Vercel.

---

## Overview

All Haven Space apps are configured to use **Vercel's Bun 1.x runtime** for improved performance and simplified deployment.

---

## Configuration Files

### Root `vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.x",
  "framework": "nextjs",
  "installCommand": "bun install",
  "buildCommand": "bun run build"
}
```

### App-Specific `vercel.json` Files

Each app has its own configuration:

| App | File Path |
|-----|-----------|
| Public | `apps/(public)/vercel.json` |
| Boarder | `apps/boarder/vercel.json` |
| Landlord | `apps/landlord/vercel.json` |
| Admin | `apps/admin/vercel.json` |
| API Server | `apps/server/vercel.json` |

**Template:**
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.x",
  "framework": "nextjs",
  "installCommand": "cd ../.. && bun install",
  "buildCommand": "cd ../.. && bun run <app>:build"
}
```

---

## Next.js Configuration

All apps include `outputFileTracingRoot` for proper monorepo deployment:

```javascript
// next.config.js
module.exports = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: '../../',
  },
};
```

---

## Package.json Scripts

### Development

```bash
# Standard development
bun run dev

# Development with Bun runtime (local)
bun run dev:bun

# Specific app development
bun run public:dev
bun run boarder:dev
bun run landlord:dev
bun run admin:dev
bun run api:dev
```

### Build

```bash
# Standard build
bun run build

# Build with Bun runtime optimization
bun run build:bun

# Specific app build
bun run public:build
bun run boarder:build
bun run landlord:build
bun run admin:build
bun run api:build
```

---

## Benefits of Bun Runtime

| Metric | Improvement |
|--------|-------------|
| **CPU-bound latency** | 28% reduction |
| **Cold starts** | Faster than Node.js |
| **TypeScript support** | Zero configuration |
| **Bundle size** | Smaller output |

---

## Known Limitations (Beta)

⚠️ **These features are not available with Bun runtime:**

1. **Automatic Source Maps** - Debugging may require manual configuration
2. **Bytecode Caching** - May impact repeated cold starts
3. **Request Metrics** - Not available for `node:http`/`node:https` modules
   - ✅ Works with `fetch`-based metrics

---

## Middleware Configuration

If using Next.js middleware, specify Node.js runtime:

```typescript
// middleware.ts
export const config = {
  runtime: 'nodejs',
};
```

**Note:** The Bun runtime applies to Serverless Functions, but middleware currently requires Node.js runtime.

---

## Deployment Checklist

- [ ] All `vercel.json` files have `"bunVersion": "1.x"`
- [ ] All `next.config.js` files have `outputFileTracingRoot: '../../'`
- [ ] Environment variables configured in Vercel
- [ ] Domain/subdomain configured
- [ ] Database connection string set
- [ ] Redis URL configured (if using)
- [ ] NextAuth secret generated
- [ ] Webhook secrets configured (Stripe, etc.)

---

## Troubleshooting

### Build Fails with Module Resolution Error

**Solution:** Ensure `outputFileTracingRoot` is set correctly:

```javascript
experimental: {
  outputFileTracingRoot: '../../',
}
```

### Middleware Not Working

**Solution:** Add runtime config to middleware:

```typescript
export const config = {
  runtime: 'nodejs',
};
```

### Performance Issues

**Check:**
1. Verify `bunVersion: "1.x"` is in `vercel.json`
2. Check Vercel deployment logs for Bun runtime confirmation
3. Monitor cold start times in Vercel Analytics

---

## Local Development with Bun

For local development that mirrors production:

```bash
# Install dependencies
bun install

# Run development server with Bun
bun run --bun next dev

# Build with Bun
bun run --bun next build

# Start production server locally
bun run --bun next start
```

---

## Resources

- [Vercel Bun Runtime Docs](https://vercel.com/docs/functions/runtimes/bun)
- [Bun Documentation](https://bun.sh/docs)
- [Next.js on Bun](https://nextjs.org/docs/pages/api-reference/next-config-js/bundlePagesRouterDependencies)

---

*Last updated: March 2026*
