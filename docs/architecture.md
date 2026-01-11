# Boarding House Management System - Architecture

## Overview

This document describes the architecture of the Boarding House Management System (BHMS), built using the T3 Stack with Feature-Sliced Design principles.

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 15 (App Router) | Full-stack React framework |
| Language | TypeScript | Type safety |
| API | tRPC | End-to-end typesafe APIs |
| Database | PostgreSQL | Relational database |
| ORM | Prisma | Database toolkit |
| Styling | Tailwind CSS | Utility-first CSS |
| UI Components | shadcn/ui | Accessible component library |
| Auth | NextAuth.js v5 | Authentication |
| Validation | Zod | Schema validation |

## Project Structure

The project follows Feature-Sliced Design (FSD) architecture:

```
src/
├── app/           # Next.js App Router pages
├── entities/      # Business domain entities (Room, Boarder, Payment, etc.)
├── features/      # Feature modules (CRUD operations, forms, etc.)
├── widgets/       # Composite UI blocks (Sidebar, Header, etc.)
├── shared/        # Shared utilities, hooks, UI components
├── server/        # Server-side code (tRPC routers, auth, db)
└── trpc/          # tRPC React hooks
```

## Data Flow

```
Client → tRPC Client → tRPC Router → Prisma → PostgreSQL
                           ↓
                    Zod Validation
```

## Authentication Flow

1. User submits credentials
2. NextAuth validates against database
3. JWT session created
4. tRPC procedures check session via `protectedProcedure`

## Key Design Decisions

1. **Monorepo Structure**: Using Turborepo for build optimization
2. **Feature-Sliced Design**: Clear separation of concerns
3. **tRPC**: Type-safe API without REST boilerplate
4. **shadcn/ui**: Customizable, accessible components
