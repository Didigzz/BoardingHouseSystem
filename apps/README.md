# Applications

This directory contains all runnable applications in the BHMS monorepo.

## Structure

```
apps/
├── web/          # Next.js Web Application
├── api/          # Backend API Server (Express + tRPC)
└── mobile/       # React Native Mobile App (Expo)
```

## Applications

### 🌐 Web App (`apps/web/`)
- **Framework:** Next.js 14 with App Router
- **Port:** 3000
- **Purpose:** Web interface for landlords and boarders
- **Start:** `pnpm web:dev`

### 🔧 API Server (`apps/api/`)
- **Framework:** Express + tRPC
- **Port:** 3001
- **Purpose:** Backend API server
- **Start:** `pnpm api:dev`

### 📱 Mobile App (`apps/mobile/`)
- **Framework:** React Native + Expo
- **Port:** 8081
- **Purpose:** Mobile app for boarders
- **Start:** `pnpm mobile:dev`

## Development

### Start All Apps
```bash
pnpm dev
```

### Start Individual Apps
```bash
pnpm web:dev      # Web only
pnpm api:dev      # API only
pnpm mobile:dev   # Mobile only
```

## URLs

- Web: http://localhost:3000
- API: http://localhost:3001
- Mobile: http://localhost:8081

## Dependencies

All apps share packages from the `packages/` directory:
- `@bhms/api` - tRPC routers
- `@bhms/ui` - Shared components
- `@bhms/auth` - Authentication
- `@bhms/database` - Database client
- `@bhms/validation` - Zod schemas
- `@bhms/shared` - Utilities and types