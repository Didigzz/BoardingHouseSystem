# BHMS - Boarding House Management System

A modern boarding house management system built with the T3 Stack.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **API**: tRPC
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js v5
- **Styling**: Tailwind CSS + shadcn/ui
- **Architecture**: Feature-Sliced Design (FSD)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your database URL and auth secret:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/bhms"
AUTH_SECRET="your-secret-key"
```

4. Push database schema:
```bash
pnpm db:push
```

5. Seed the database:
```bash
pnpm db:seed
```

6. Start development server:
```bash
pnpm dev
```

## Default Credentials

After seeding:
- **Email**: landlord@bhms.com
- **Password**: Landlord123!

## Project Structure

```
src/
├── app/           # Next.js App Router
├── entities/      # Domain entities (FSD)
├── features/      # Feature modules (FSD)
├── widgets/       # Composite UI blocks (FSD)
├── shared/        # Shared code
├── server/        # Server-side code (tRPC, auth)
└── trpc/          # tRPC client
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:seed` - Seed database
