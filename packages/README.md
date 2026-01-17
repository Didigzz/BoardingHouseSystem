# Packages

This directory contains all shared packages used across the BHMS applications.

## Structure

```
packages/
├── api/              # tRPC API definitions and routers
├── api-client/       # API client utilities
├── auth/             # Authentication logic
├── config/           # Shared configurations
├── database/         # Prisma database client
├── eslint-config/    # ESLint configurations
├── shared/           # Shared business logic and utilities
├── types/            # TypeScript type definitions
├── typescript-config/# TypeScript configurations
├── ui/               # Shared UI components
├── utils/            # Utility functions
└── validation/       # Zod validation schemas
```

## Core Packages

### 🔧 API (`packages/api/`)
- tRPC routers and procedures
- API endpoint definitions
- Used by: apps/api, apps/web, apps/mobile

### 💾 Database (`packages/database/`)
- Prisma client and schema
- Database types and utilities
- Used by: apps/api, packages/api

### 🔐 Auth (`packages/auth/`)
- NextAuth.js configuration
- Authentication middleware
- Used by: apps/web, apps/api

### 🎨 UI (`packages/ui/`)
- Shared React components
- Design system components
- Used by: apps/web, apps/mobile

### ✅ Validation (`packages/validation/`)
- Zod schemas for validation
- Input/output type validation
- Used by: All apps and packages

### 🔄 Shared (`packages/shared/`)
- Business logic utilities
- Common types and constants
- Used by: All apps

## Configuration Packages

### 📝 ESLint Config (`packages/eslint-config/`)
- Shared ESLint rules
- Code quality standards

### 📘 TypeScript Config (`packages/typescript-config/`)
- Shared TypeScript configurations
- Build settings

### ⚙️ Config (`packages/config/`)
- General shared configurations
- Environment-specific settings

## Utility Packages

### 🛠️ Utils (`packages/utils/`)
- General utility functions
- Helper methods

### 📋 Types (`packages/types/`)
- Shared TypeScript types
- Common interfaces

### 🌐 API Client (`packages/api-client/`)
- API client utilities
- HTTP request helpers

## Package Dependencies

```
apps/web → @bhms/ui, @bhms/api, @bhms/auth, @bhms/shared, @bhms/validation
apps/api → @bhms/api, @bhms/database, @bhms/auth, @bhms/shared, @bhms/validation
apps/mobile → @bhms/ui, @bhms/api, @bhms/shared, @bhms/validation

packages/api → @bhms/database, @bhms/validation, @bhms/shared
packages/auth → @bhms/database
packages/ui → @bhms/shared
```

## Development

### Build All Packages
```bash
pnpm build
```

### Type Check All Packages
```bash
pnpm typecheck
```

### Lint All Packages
```bash
pnpm lint
```

## Adding New Packages

1. Create directory in `packages/`
2. Add `package.json` with workspace dependencies
3. Add to `pnpm-workspace.yaml` (automatic with `packages/*`)
4. Update `turbo.json` if needed
5. Add to relevant app dependencies