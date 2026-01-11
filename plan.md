# Boarding House Management System - Migration Plan

## T3 Stack + shadcn/ui + Feature-Sliced Design

---

## 📋 Table of Contents

1. [Tech Stack Overview](#tech-stack-overview)
2. [Project Structure](#project-structure)
3. [Phase 1: Project Setup](#phase-1-project-setup)
4. [Phase 2: Database & Backend](#phase-2-database--backend)
5. [Phase 3: Frontend Architecture](#phase-3-frontend-architecture)
6. [Phase 4: Feature Implementation](#phase-4-feature-implementation)
7. [Phase 5: DevOps & Deployment](#phase-5-devops--deployment)
8. [Migration Checklist](#migration-checklist)

---

## Tech Stack Overview

### Core Stack (T3)

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | **Next.js 15** (App Router) | Full-stack React framework |
| Language | **TypeScript** | Type safety |
| API | **tRPC** | End-to-end typesafe APIs |
| Database | **PostgreSQL** | Relational database |
| ORM | **Prisma** | Database toolkit |
| Styling | **Tailwind CSS** | Utility-first CSS |
| UI Components | **shadcn/ui** | Accessible component library |
| Auth | **NextAuth.js v5** | Authentication |
| Validation | **Zod** | Schema validation |

### Additional Tools

| Tool | Purpose |
|------|---------|
| **React Hook Form** | Form management |
| **TanStack Query** | Server state (via tRPC) |
| **Zustand** | Client state management |
| **date-fns** | Date manipulation |
| **Recharts** | Charts & analytics |
| **Lucide React** | Icons |
| **pnpm** | Package manager |
| **Turborepo** | Monorepo build system |

---

## Project Structure

```
bhms/
├── apps/
│   └── web/                              # Next.js application
│       ├── public/
│       │   ├── images/
│       │   └── favicon.ico
│       │
│       ├── src/
│       │   ├── app/                      # Next.js App Router
│       │   │   ├── (auth)/               # Auth route group
│       │   │   │   ├── login/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── register/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── layout.tsx
│       │   │   │
│       │   │   ├── (dashboard)/          # Dashboard route group
│       │   │   │   ├── layout.tsx
│       │   │   │   ├── page.tsx          # /dashboard (redirect based on role)
│       │   │   │   │
│       │   │   │   ├── landlord/         # Landlord routes
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── rooms/
│       │   │   │   │   │   ├── page.tsx
│       │   │   │   │   │   └── [id]/
│       │   │   │   │   │       └── page.tsx
│       │   │   │   │   ├── boarders/
│       │   │   │   │   │   ├── page.tsx
│       │   │   │   │   │   └── [id]/
│       │   │   │   │   │       └── page.tsx
│       │   │   │   │   ├── payments/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── utilities/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── settings/
│       │   │   │   │       └── page.tsx
│       │   │   │   │
│       │   │   │   └── boarder/          # Boarder routes
│       │   │   │       ├── page.tsx
│       │   │   │       ├── payments/
│       │   │   │       │   └── page.tsx
│       │   │   │       └── profile/
│       │   │   │           └── page.tsx
│       │   │   │
│       │   │   ├── api/
│       │   │   │   ├── auth/
│       │   │   │   │   └── [...nextauth]/
│       │   │   │   │       └── route.ts
│       │   │   │   └── trpc/
│       │   │   │       └── [trpc]/
│       │   │   │           └── route.ts
│       │   │   │
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx              # Landing page
│       │   │   ├── loading.tsx
│       │   │   ├── error.tsx
│       │   │   ├── not-found.tsx
│       │   │   └── globals.css
│       │   │
│       │   ├── entities/                 # Domain entities UI
│       │   │   ├── room/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── room-card.tsx
│       │   │   │   │   ├── room-status-badge.tsx
│       │   │   │   │   ├── room-avatar.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── types.ts
│       │   │   │   │   └── schemas.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── boarder/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── boarder-card.tsx
│       │   │   │   │   ├── boarder-avatar.tsx
│       │   │   │   │   ├── boarder-status-badge.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── types.ts
│       │   │   │   │   └── schemas.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── payment/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── payment-card.tsx
│       │   │   │   │   ├── payment-status-badge.tsx
│       │   │   │   │   ├── payment-receipt.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── types.ts
│       │   │   │   │   └── schemas.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── utility/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── utility-card.tsx
│       │   │   │   │   ├── utility-reading-form.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── types.ts
│       │   │   │   │   └── schemas.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   └── user/
│       │   │       ├── ui/
│       │   │       │   ├── user-avatar.tsx
│       │   │       │   ├── user-menu.tsx
│       │   │       │   └── index.ts
│       │   │       ├── model/
│       │   │       │   └── types.ts
│       │   │       └── index.ts
│       │   │
│       │   ├── features/                 # Feature modules
│       │   │   ├── auth/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── login-form.tsx
│       │   │   │   │   ├── register-form.tsx
│       │   │   │   │   ├── logout-button.tsx
│       │   │   │   │   ├── boarder-access-form.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── auth-store.ts
│       │   │   │   │   └── types.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── rooms/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── room-list.tsx
│       │   │   │   │   ├── room-grid.tsx
│       │   │   │   │   ├── add-room-dialog.tsx
│       │   │   │   │   ├── edit-room-dialog.tsx
│       │   │   │   │   ├── delete-room-dialog.tsx
│       │   │   │   │   ├── room-filters.tsx
│       │   │   │   │   ├── room-occupancy-chart.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── room-store.ts
│       │   │   │   │   └── use-rooms.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── boarders/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── boarder-list.tsx
│       │   │   │   │   ├── boarder-table.tsx
│       │   │   │   │   ├── add-boarder-dialog.tsx
│       │   │   │   │   ├── edit-boarder-dialog.tsx
│       │   │   │   │   ├── boarder-filters.tsx
│       │   │   │   │   ├── assign-room-dialog.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── boarder-store.ts
│       │   │   │   │   └── use-boarders.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── payments/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── payment-list.tsx
│       │   │   │   │   ├── payment-table.tsx
│       │   │   │   │   ├── add-payment-dialog.tsx
│       │   │   │   │   ├── payment-filters.tsx
│       │   │   │   │   ├── payment-summary-card.tsx
│       │   │   │   │   ├── payment-history-chart.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── payment-store.ts
│       │   │   │   │   └── use-payments.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── utilities/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── utility-list.tsx
│       │   │   │   │   ├── add-utility-reading-dialog.tsx
│       │   │   │   │   ├── utility-consumption-chart.tsx
│       │   │   │   │   ├── utility-billing-summary.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   ├── model/
│       │   │   │   │   └── use-utilities.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   └── dashboard/
│       │   │       ├── ui/
│       │   │       │   ├── stats-cards.tsx
│       │   │       │   ├── recent-activity.tsx
│       │   │       │   ├── occupancy-overview.tsx
│       │   │       │   ├── revenue-chart.tsx
│       │   │       │   ├── upcoming-payments.tsx
│       │   │       │   └── index.ts
│       │   │       ├── model/
│       │   │       │   └── use-dashboard-stats.ts
│       │   │       └── index.ts
│       │   │
│       │   ├── widgets/                  # Composite UI blocks
│       │   │   ├── header/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── header.tsx
│       │   │   │   │   ├── mobile-nav.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── sidebar/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── sidebar.tsx
│       │   │   │   │   ├── sidebar-nav.tsx
│       │   │   │   │   ├── sidebar-item.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── footer/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── footer.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   └── theme-toggle/
│       │   │       ├── ui/
│       │   │       │   ├── theme-toggle.tsx
│       │   │       │   └── index.ts
│       │   │       └── index.ts
│       │   │
│       │   ├── shared/                   # Shared code
│       │   │   ├── ui/                   # shadcn/ui components
│       │   │   │   ├── button.tsx
│       │   │   │   ├── card.tsx
│       │   │   │   ├── dialog.tsx
│       │   │   │   ├── dropdown-menu.tsx
│       │   │   │   ├── form.tsx
│       │   │   │   ├── input.tsx
│       │   │   │   ├── label.tsx
│       │   │   │   ├── select.tsx
│       │   │   │   ├── table.tsx
│       │   │   │   ├── tabs.tsx
│       │   │   │   ├── toast.tsx
│       │   │   │   ├── avatar.tsx
│       │   │   │   ├── badge.tsx
│       │   │   │   ├── skeleton.tsx
│       │   │   │   ├── separator.tsx
│       │   │   │   ├── sheet.tsx
│       │   │   │   ├── alert-dialog.tsx
│       │   │   │   ├── calendar.tsx
│       │   │   │   ├── popover.tsx
│       │   │   │   ├── command.tsx
│       │   │   │   ├── data-table.tsx
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── hooks/
│       │   │   │   ├── use-debounce.ts
│       │   │   │   ├── use-media-query.ts
│       │   │   │   ├── use-local-storage.ts
│       │   │   │   ├── use-toast.ts
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── lib/
│       │   │   │   ├── utils.ts          # cn() utility
│       │   │   │   ├── trpc.ts           # tRPC client
│       │   │   │   ├── auth.ts           # Auth utilities
│       │   │   │   ├── validations.ts    # Shared Zod schemas
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   ├── config/
│       │   │   │   ├── site.ts           # Site metadata
│       │   │   │   ├── nav.ts            # Navigation config
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   └── types/
│       │   │       ├── index.ts
│       │   │       └── next-auth.d.ts
│       │   │
│       │   ├── server/                   # Server-side code
│       │   │   ├── api/
│       │   │   │   ├── routers/
│       │   │   │   │   ├── room.ts
│       │   │   │   │   ├── boarder.ts
│       │   │   │   │   ├── payment.ts
│       │   │   │   │   ├── utility.ts
│       │   │   │   │   ├── dashboard.ts
│       │   │   │   │   ├── user.ts
│       │   │   │   │   └── index.ts
│       │   │   │   ├── trpc.ts           # tRPC context & procedures
│       │   │   │   └── root.ts           # Root router
│       │   │   │
│       │   │   ├── auth/
│       │   │   │   ├── config.ts         # NextAuth config
│       │   │   │   └── index.ts
│       │   │   │
│       │   │   └── db/
│       │   │       ├── client.ts         # Prisma client
│       │   │       └── index.ts
│       │   │
│       │   └── trpc/                     # tRPC React hooks
│       │       ├── client.ts
│       │       ├── server.ts
│       │       └── react.tsx
│       │
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── migrations/
│       │   └── seed.ts
│       │
│       ├── .env
│       ├── .env.example
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── components.json             # shadcn/ui config
│       └── package.json
│
├── packages/                           # Shared packages (monorepo)
│   ├── database/                       # Prisma package (optional)
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   └── client.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/                             # Shared UI package (optional)
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── typescript-config/
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   └── package.json
│   │
│   └── eslint-config/
│       ├── next.js
│       └── package.json
│
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── docker-compose.dev.yml
│   │
│   └── scripts/
│       ├── setup.sh
│       └── seed.sh
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── database.md
│   └── deployment.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── .gitignore
├── .prettierrc
├── .eslintrc.js
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

## Phase 1: Project Setup

### 1.1 Initialize T3 App

```bash
# Create new T3 app
pnpm create t3-app@latest bhms --noGit

# Options to select:
# ✔ TypeScript
# ✔ Next.js App Router
# ✔ tRPC
# ✔ Prisma
# ✔ NextAuth.js
# ✔ Tailwind CSS
```

### 1.2 Install Additional Dependencies

```bash
cd bhms/apps/web

# shadcn/ui setup
pnpm dlx shadcn@latest init

# Install shadcn/ui components
pnpm dlx shadcn@latest add button card dialog dropdown-menu form input label select table tabs toast avatar badge skeleton separator sheet alert-dialog calendar popover command

# Additional packages
pnpm add zustand date-fns recharts lucide-react @tanstack/react-table zod react-hook-form @hookform/resolvers

# Dev dependencies
pnpm add -D @types/node prettier eslint-config-prettier
```

### 1.3 Configure shadcn/ui

```json
// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/shared/ui",
    "utils": "@/shared/lib/utils",
    "ui": "@/shared/ui",
    "lib": "@/shared/lib",
    "hooks": "@/shared/hooks"
  }
}
```

### 1.4 Configure Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/entities/*": ["./src/entities/*"],
      "@/features/*": ["./src/features/*"],
      "@/widgets/*": ["./src/widgets/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/server/*": ["./src/server/*"]
    }
  }
}
```

### 1.5 Environment Variables

```env
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bhms?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Phase 2: Database & Backend

### 2.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============ ENUMS ============

enum UserRole {
  LANDLORD
  BOARDER
}

enum RoomStatus {
  AVAILABLE
  OCCUPIED
  MAINTENANCE
}

enum PaymentStatus {
  PENDING
  PAID
  OVERDUE
  CANCELLED
}

enum PaymentType {
  RENT
  UTILITY
  DEPOSIT
  OTHER
}

enum UtilityType {
  ELECTRICITY
  WATER
  INTERNET
  OTHER
}

// ============ MODELS ============

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  role          UserRole  @default(LANDLORD)
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  boarder  Boarder?
  accounts Account[]
  sessions Session[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model Room {
  id          String     @id @default(cuid())
  roomNumber  String     @unique @map("room_number")
  floor       Int        @default(1)
  capacity    Int        @default(1)
  monthlyRate Decimal    @map("monthly_rate") @db.Decimal(10, 2)
  description String?
  amenities   String[]   @default([])
  status      RoomStatus @default(AVAILABLE)
  createdAt   DateTime   @default(now()) @map("created_at")
  updatedAt   DateTime   @updatedAt @map("updated_at")

  boarders        Boarder[]
  utilityReadings UtilityReading[]

  @@map("rooms")
}

model Boarder {
  id             String   @id @default(cuid())
  firstName      String   @map("first_name")
  lastName       String   @map("last_name")
  email          String   @unique
  phone          String?
  emergencyContact String? @map("emergency_contact")
  emergencyPhone String?  @map("emergency_phone")
  moveInDate     DateTime @map("move_in_date")
  moveOutDate    DateTime? @map("move_out_date")
  isActive       Boolean  @default(true) @map("is_active")
  accessCode     String?  @unique @map("access_code")
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")

  roomId String? @map("room_id")
  room   Room?   @relation(fields: [roomId], references: [id])

  userId String? @unique @map("user_id")
  user   User?   @relation(fields: [userId], references: [id])

  payments Payment[]

  @@map("boarders")
}

model Payment {
  id            String        @id @default(cuid())
  amount        Decimal       @db.Decimal(10, 2)
  type          PaymentType   @default(RENT)
  status        PaymentStatus @default(PENDING)
  dueDate       DateTime      @map("due_date")
  paidDate      DateTime?     @map("paid_date")
  description   String?
  receiptNumber String?       @unique @map("receipt_number")
  createdAt     DateTime      @default(now()) @map("created_at")
  updatedAt     DateTime      @updatedAt @map("updated_at")

  boarderId String  @map("boarder_id")
  boarder   Boarder @relation(fields: [boarderId], references: [id])

  @@index([boarderId])
  @@index([status])
  @@index([dueDate])
  @@map("payments")
}

model UtilityReading {
  id            String      @id @default(cuid())
  type          UtilityType
  previousReading Decimal   @map("previous_reading") @db.Decimal(10, 2)
  currentReading  Decimal   @map("current_reading") @db.Decimal(10, 2)
  ratePerUnit   Decimal     @map("rate_per_unit") @db.Decimal(10, 4)
  readingDate   DateTime    @map("reading_date")
  billingPeriodStart DateTime @map("billing_period_start")
  billingPeriodEnd   DateTime @map("billing_period_end")
  createdAt     DateTime    @default(now()) @map("created_at")
  updatedAt     DateTime    @updatedAt @map("updated_at")

  roomId String @map("room_id")
  room   Room   @relation(fields: [roomId], references: [id])

  @@index([roomId])
  @@index([type])
  @@map("utility_readings")
}

model Setting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("settings")
}
```

### 2.2 tRPC Routers

```typescript
// src/server/api/routers/room.ts

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { RoomStatus } from "@prisma/client";

export const roomRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        status: z.nativeEnum(RoomStatus).optional(),
        search: z.string().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.room.findMany({
        where: {
          status: input?.status,
          roomNumber: input?.search
            ? { contains: input.search, mode: "insensitive" }
            : undefined,
        },
        include: {
          boarders: {
            where: { isActive: true },
            select: { id: true, firstName: true, lastName: true },
          },
          _count: {
            select: { boarders: { where: { isActive: true } } },
          },
        },
        orderBy: { roomNumber: "asc" },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.room.findUnique({
        where: { id: input.id },
        include: {
          boarders: { where: { isActive: true } },
          utilityReadings: {
            orderBy: { readingDate: "desc" },
            take: 10,
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        roomNumber: z.string().min(1),
        floor: z.number().int().positive().default(1),
        capacity: z.number().int().positive().default(1),
        monthlyRate: z.number().positive(),
        description: z.string().optional(),
        amenities: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.create({
        data: input,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        roomNumber: z.string().min(1).optional(),
        floor: z.number().int().positive().optional(),
        capacity: z.number().int().positive().optional(),
        monthlyRate: z.number().positive().optional(),
        description: z.string().optional(),
        amenities: z.array(z.string()).optional(),
        status: z.nativeEnum(RoomStatus).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.room.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.delete({
        where: { id: input.id },
      });
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    const [total, available, occupied, maintenance] = await Promise.all([
      ctx.db.room.count(),
      ctx.db.room.count({ where: { status: "AVAILABLE" } }),
      ctx.db.room.count({ where: { status: "OCCUPIED" } }),
      ctx.db.room.count({ where: { status: "MAINTENANCE" } }),
    ]);

    return { total, available, occupied, maintenance };
  }),
});
```

### 2.3 Root Router

```typescript
// src/server/api/root.ts

import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { roomRouter } from "./routers/room";
import { boarderRouter } from "./routers/boarder";
import { paymentRouter } from "./routers/payment";
import { utilityRouter } from "./routers/utility";
import { dashboardRouter } from "./routers/dashboard";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  room: roomRouter,
  boarder: boarderRouter,
  payment: paymentRouter,
  utility: utilityRouter,
  dashboard: dashboardRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
```

---

## Phase 3: Frontend Architecture

### 3.1 Entity Example: Room Card

```tsx
// src/entities/room/ui/room-card.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Users, DoorOpen } from "lucide-react";
import { RoomStatusBadge } from "./room-status-badge";
import type { Room } from "../model/types";

interface RoomCardProps {
  room: Room;
  onClick?: () => void;
}

export function RoomCard({ room, onClick }: RoomCardProps) {
  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          Room {room.roomNumber}
        </CardTitle>
        <RoomStatusBadge status={room.status} />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <DoorOpen className="h-4 w-4" />
            <span>Floor {room.floor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {room._count?.boarders ?? 0}/{room.capacity}
            </span>
          </div>
        </div>
        <div className="mt-2 text-lg font-semibold">
          ₱{room.monthlyRate.toLocaleString()}/mo
        </div>
      </CardContent>
    </Card>
  );
}
```

### 3.2 Feature Example: Add Room Dialog

```tsx
// src/features/rooms/ui/add-room-dialog.tsx

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Plus } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "@/shared/hooks/use-toast";

const formSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floor: z.coerce.number().int().positive("Floor must be positive"),
  capacity: z.coerce.number().int().positive("Capacity must be positive"),
  monthlyRate: z.coerce.number().positive("Rate must be positive"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddRoomDialog() {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: "",
      floor: 1,
      capacity: 1,
      monthlyRate: 0,
      description: "",
    },
  });

  const createRoom = api.room.create.useMutation({
    onSuccess: () => {
      toast({ title: "Room created successfully" });
      utils.room.getAll.invalidate();
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error creating room",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    createRoom.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add other fields similarly */}
            <Button type="submit" disabled={createRoom.isPending}>
              {createRoom.isPending ? "Creating..." : "Create Room"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

### 3.3 Widget Example: Sidebar

```tsx
// src/widgets/sidebar/ui/sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import {
  LayoutDashboard,
  DoorOpen,
  Users,
  CreditCard,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { signOut } from "next-auth/react";

const landlordNavItems = [
  { href: "/landlord", label: "Dashboard", icon: LayoutDashboard },
  { href: "/landlord/rooms", label: "Rooms", icon: DoorOpen },
  { href: "/landlord/boarders", label: "Boarders", icon: Users },
  { href: "/landlord/payments", label: "Payments", icon: CreditCard },
  { href: "/landlord/utilities", label: "Utilities", icon: Zap },
  { href: "/landlord/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">BHMS</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {landlordNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
```

---

## Phase 4: Feature Implementation

### 4.1 Implementation Order

| Priority | Feature | Estimated Time |
|----------|---------|----------------|
| 1 | Authentication (Login/Register) | 4 hours |
| 2 | Dashboard Layout (Sidebar, Header) | 3 hours |
| 3 | Rooms CRUD | 6 hours |
| 4 | Boarders CRUD | 6 hours |
| 5 | Payments CRUD | 6 hours |
| 6 | Utilities Management | 4 hours |
| 7 | Dashboard Stats & Charts | 4 hours |
| 8 | Boarder Portal | 4 hours |
| 9 | Settings & Profile | 2 hours |
| 10 | Polish & Testing | 4 hours |

**Total Estimated Time: ~43 hours**

### 4.2 Data Migration Script

```typescript
// scripts/migrate-data.ts

import { PrismaClient as OldPrisma } from "@old/prisma";
import { PrismaClient as NewPrisma } from "@prisma/client";

async function migrateData() {
  const oldDb = new OldPrisma();
  const newDb = new NewPrisma();

  // Migrate rooms
  const oldRooms = await oldDb.room.findMany();
  for (const room of oldRooms) {
    await newDb.room.create({
      data: {
        roomNumber: room.room_number,
        floor: room.floor ?? 1,
        capacity: room.capacity,
        monthlyRate: room.monthly_rate,
        status: mapRoomStatus(room.status),
        // ... map other fields
      },
    });
  }

  // Migrate boarders
  const oldBoarders = await oldDb.boarder.findMany();
  // ... similar migration

  console.log("Migration complete!");
}

migrateData();
```

---

## Phase 5: DevOps & Deployment

### 5.1 Docker Setup

```yaml
# docker-compose.yml

version: "3.9"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://bhms:bhms@db:5432/bhms
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: bhms
      POSTGRES_PASSWORD: bhms
      POSTGRES_DB: bhms
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### 5.2 Dockerfile

```dockerfile
# Dockerfile

FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

### 5.3 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm typecheck

  build:
    runs-on: ubuntu-latest
    needs: [lint, typecheck]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm build
```

---

## Migration Checklist

### Pre-Migration
- [ ] Backup existing database
- [ ] Document current API endpoints
- [ ] List all existing features
- [ ] Set up new development environment

### Phase 1: Setup
- [ ] Create T3 app
- [ ] Configure shadcn/ui
- [ ] Set up path aliases
- [ ] Configure environment variables
- [ ] Set up Git repository

### Phase 2: Database
- [ ] Create Prisma schema
- [ ] Run initial migration
- [ ] Create seed data
- [ ] Verify database connection

### Phase 3: Backend
- [ ] Implement room router
- [ ] Implement boarder router
- [ ] Implement payment router
- [ ] Implement utility router
- [ ] Implement dashboard router
- [ ] Configure NextAuth

### Phase 4: Frontend
- [ ] Create shared UI components
- [ ] Create entity components
- [ ] Create feature modules
- [ ] Create widget components
- [ ] Create page layouts
- [ ] Implement all pages

### Phase 5: Testing & Polish
- [ ] Test all CRUD operations
- [ ] Test authentication flow
- [ ] Test responsive design
- [ ] Fix bugs and edge cases
- [ ] Performance optimization

### Phase 6: Deployment
- [ ] Set up Docker
- [ ] Configure CI/CD
- [ ] Deploy to staging
- [ ] Run data migration
- [ ] Deploy to production

---

## Key Commands Reference

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Database
pnpm db:push               # Push schema changes
pnpm db:migrate            # Create and run migrations
pnpm db:studio             # Open Prisma Studio
pnpm db:seed               # Seed database

# Code Quality
pnpm lint                  # Run ESLint
pnpm typecheck             # Run TypeScript check
pnpm format                # Run Prettier

# shadcn/ui
pnpm dlx shadcn@latest add [component]  # Add component
```

---

## Resources

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [Feature-Sliced Design](https://feature-sliced.design/)
