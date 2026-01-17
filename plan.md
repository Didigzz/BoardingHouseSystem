================================================================================
SIMPLE MULTI-TENANT BOARDING HOUSE SYSTEM - FINAL STRUCTURE
================================================================================

BoardingHouseSystem/
│
├── apps/                           # Applications
│   ├── web/                        # Next.js Web App (Frontend)
│   │   ├── src/
│   │   │   ├── app/                # Next.js 14 App Router
│   │   │   │   ├── (auth)/         # Auth pages (login, register)
│   │   │   │   ├── (dashboard)/    # Dashboard (landlord, boarder)
│   │   │   │   ├── api/            # API routes
│   │   │   │   └── layout.tsx
│   │   │   ├── components/         # Page-specific components
│   │   │   ├── lib/                # Utils, config
│   │   │   └── styles/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── tsconfig.json
│   │
│   ├── api/                        # Backend API Server (tRPC)
│   │   ├── src/
│   │   │   ├── server.ts           # HTTP server setup
│   │   │   ├── context.ts          # Request context
│   │   │   └── index.ts            # Entry point
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── mobile/                     # React Native App
│       ├── app/                    # Expo Router
│       ├── src/
│       ├── package.json
│       └── app.json
│
├── packages/                       # Shared Code (Monorepo)
│   │
│   ├── api/                        # tRPC API Definitions
│   │   ├── src/
│   │   │   ├── routers/            # API endpoints
│   │   │   │   ├── user.router.ts
│   │   │   │   ├── room.router.ts
│   │   │   │   ├── boarder.router.ts
│   │   │   │   ├── payment.router.ts
│   │   │   │   └── index.ts
│   │   │   ├── trpc.ts             # tRPC setup
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── database/                   # Database (Prisma)
│   │   ├── prisma/
│   │   │   ├── schema.prisma       # Database schema
│   │   │   ├── migrations/         # Auto-generated
│   │   │   └── seed.ts             # Seed data
│   │   ├── src/
│   │   │   └── client.ts           # Prisma client
│   │   └── package.json
│   │
│   ├── auth/                       # Authentication
│   │   ├── src/
│   │   │   ├── config.ts           # NextAuth config
│   │   │   ├── middleware.ts       # Auth middleware
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── ui/                         # Shared UI Components
│   │   ├── src/
│   │   │   ├── components/         # Reusable components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── shared/                     # Shared Business Logic
│   │   ├── src/
│   │   │   ├── lib/                # Utilities
│   │   │   │   ├── utils.ts
│   │   │   │   ├── formatters.ts
│   │   │   │   └── constants.ts
│   │   │   ├── types/              # TypeScript types
│   │   │   │   └── index.ts
│   │   │   ├── hooks/              # React hooks
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── validation/                 # Validation Schemas (Zod)
│   │   ├── src/
│   │   │   ├── user.schemas.ts
│   │   │   ├── room.schemas.ts
│   │   │   ├── payment.schemas.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── config/                     # Shared Configs
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
│
├── infra/                          # Infrastructure
│   ├── docker/
│   │   ├── Dockerfile.web          # Frontend Docker
│   │   ├── Dockerfile.api          # Backend Docker
│   │   ├── docker-compose.yml      # Local dev
│   │   └── docker-compose.prod.yml # Production
│   │
│   ├── terraform/                  # GCP Infrastructure
│   │   ├── environments/
│   │   │   ├── dev/
│   │   │   │   ├── main.tf
│   │   │   │   └── variables.tf
│   │   │   └── production/
│   │   │       ├── main.tf
│   │   │       └── variables.tf
│   │   └── modules/
│   │       ├── cloud-run/
│   │       ├── cloud-sql/
│   │       └── vpc/
│   │
│   └── k8s/                        # Kubernetes (if using GKE)
│       ├── api-deployment.yaml
│       ├── web-deployment.yaml
│       └── ingress.yaml
│
├── database/                       # Database Documentation
│   ├── migrations/                 # SQL migrations (manual)
│   │   └── 001_initial_schema.sql
│   ├── seeds/                      # Seed data
│   │   ├── dev/
│   │   │   ├── users.sql
│   │   │   └── rooms.sql
│   │   └── production/
│   └── docs/
│       └── schema-design.md
│
├── docs/                           # Documentation
│   ├── architecture.md
│   ├── api.md
│   ├── deployment.md
│   └── setup.md
│
├── scripts/                        # Utility Scripts
│   ├── setup.sh                    # Project setup
│   ├── dev.sh                      # Start dev environment
│   ├── deploy.sh                   # Deploy to GCP
│   └── seed.sh                     # Seed database
│
├── .github/                        # CI/CD
│   └── workflows/
│       ├── web-deploy.yml
│       ├── api-deploy.yml
│       └── test.yml
│
├── package.json                    # Root package.json
├── pnpm-workspace.yaml             # Monorepo config
├── turbo.json                      # Build orchestration
├── .gitignore
├── .env.example
├── docker-compose.yml              # Quick start
└── README.md

================================================================================
PACKAGE DEPENDENCIES FLOW
================================================================================

apps/web (Next.js Frontend)
  ├─→ @repo/ui (UI components)
  ├─→ @repo/api (tRPC client)
  ├─→ @repo/auth (Authentication)
  ├─→ @repo/shared (Utils, types)
  └─→ @repo/validation (Schemas)

apps/api (Backend Server)
  ├─→ @repo/api (tRPC routers)
  ├─→ @repo/database (Prisma)
  ├─→ @repo/auth (Auth logic)
  ├─→ @repo/shared (Utils)
  └─→ @repo/validation (Schemas)

apps/mobile (React Native)
  ├─→ @repo/ui (Shared components)
  ├─→ @repo/api (tRPC client)
  ├─→ @repo/shared (Utils, types)
  └─→ @repo/validation (Schemas)

packages/api (tRPC Routers)
  ├─→ @repo/database (Prisma)
  ├─→ @repo/validation (Schemas)
  └─→ @repo/shared (Utils)

packages/database (Prisma)
  └─→ No dependencies

packages/auth (Authentication)
  └─→ @repo/database (User model)

packages/ui (Components)
  └─→ @repo/shared (Utils for styling)

packages/shared (Core Logic)
  └─→ No dependencies

packages/validation (Zod Schemas)
  └─→ No dependencies

packages/config (Configs)
  └─→ No dependencies

================================================================================
DEPLOYMENT ARCHITECTURE (GCP)
================================================================================

Users
  ↓
Cloud Load Balancer
  ↓
  ├─→ Cloud Run (Frontend - apps/web/)
  │   └─→ 3-5 instances (auto-scale)
  │
  └─→ Cloud Run (Backend - apps/api/)
      └─→ 5-10 instances (auto-scale)
      ↓
      ├─→ Cloud SQL (PostgreSQL)
      │   ├─→ Primary (write)
      │   └─→ Replica (read)
      │
      ├─→ Memorystore (Redis Cache)
      │
      └─→ Cloud Storage (Files/Images)

================================================================================
DEVELOPMENT WORKFLOW
================================================================================

1. LOCAL DEVELOPMENT:
   $ pnpm install              # Install dependencies
   $ pnpm dev                  # Start all apps
   
   Running:
   - Web:    http://localhost:3000
   - API:    http://localhost:3001
   - Mobile: http://localhost:8081

2. DATABASE:
   $ pnpm db:migrate          # Run migrations
   $ pnpm db:seed             # Seed data
   $ pnpm db:studio           # Open Prisma Studio

3. BUILD:
   $ pnpm build               # Build all apps
   $ pnpm test                # Run tests

4. DEPLOY:
   $ pnpm deploy:dev          # Deploy to dev
   $ pnpm deploy:prod         # Deploy to production

================================================================================
MULTI-TENANT SETUP
================================================================================

Database Schema (Simplified):

┌─────────────┐
│   Tenants   │ (Landlords)
└──────┬──────┘
       │ 1
       │
       │ N
┌──────┴──────┐
│    Rooms    │
└──────┬──────┘
       │ 1
       │
       │ N
┌──────┴──────┐
│  Boarders   │
└──────┬──────┘
       │ 1
       │
       │ N
┌──────┴──────┐
│  Payments   │
└─────────────┘

Key Points:
- Each Landlord = 1 Tenant
- Landlords can only see their own rooms/boarders
- Boarders belong to one landlord
- Row-level security in queries
- Tenant ID in every query

================================================================================
FILE COUNT COMPARISON
================================================================================

Your Current Structure:
- 165 directories
- 382 files
- Complexity: HIGH

This Simplified Structure:
- ~50 directories
- ~150 files
- Complexity: MEDIUM
- Easier to navigate
- Clear separation
- Less duplication

================================================================================
KEY SIMPLIFICATIONS
================================================================================

1. Merged scattered packages:
   ✓ types/ + utils/ → shared/
   ✓ Removed api-client/ (built into @repo/api)
   ✓ Single config/ package

2. Clear app structure:
   ✓ apps/ = runnable applications
   ✓ packages/ = shared libraries
   ✓ infra/ = deployment configs

3. Removed empty/duplicate:
   ✓ No empty backend/services/
   ✓ Single database/ for docs only
   ✓ Prisma migrations in packages/database/

4. Single source of truth:
   ✓ Schema: packages/database/prisma/schema.prisma
   ✓ Types: Generated from schema + shared/types/
   ✓ API: packages/api/routers/
   ✓ UI: packages/ui/components/

================================================================================