# 🏠 Boarding House Management System (BHMS)

A modern, multi-tenant boarding house management platform built with Next.js, React Native, tRPC, and Prisma.

A modern, full-stack web application for managing boarding houses, built with the **T3 Stack** and **Feature-Sliced Design** architecture.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-5.10-2D3748?style=flat-square&logo=prisma)
![tRPC](https://img.shields.io/badge/tRPC-11-398CCB?style=flat-square&logo=trpc)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database](#-database)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## Features

### For Landlords

- **Room Management** - Create, update, and track room availability
- **Boarder Management** - Register boarders, assign rooms, and manage profiles
- **Payment Tracking** - Record rent payments, generate receipts, track overdue payments
- **Utility Management** - Track electricity, water, and internet readings per room
- **Dashboard Analytics** - Visualize occupancy rates, revenue, and payment statistics
- **Reports** - Generate financial and occupancy reports

### For Boarders

- **Access Code Login** - Simple authentication via access code
- **View Room Details** - See assigned room and amenities
- **Payment History** - Track payment status and history
- **Profile Management** - Update personal information

### General

- **Secure Authentication** - NextAuth.js v5 with role-based access
- **Responsive Design** - Works on desktop and mobile devices
- **Dark Mode** - Light/dark theme support
- **Real-time Updates** - Optimistic UI updates with TanStack Query

## Tech Stack

### Core (T3 Stack)

| Technology         | Purpose                                 |
| ------------------ | --------------------------------------- |
| **Next.js 15**     | Full-stack React framework (App Router) |
| **TypeScript**     | Type safety across the entire stack     |
| **tRPC**           | End-to-end typesafe APIs                |
| **Prisma**         | Type-safe database ORM                  |
| **PostgreSQL**     | Relational database                     |
| **NextAuth.js v5** | Authentication & authorization          |
| **Tailwind CSS**   | Utility-first CSS framework             |

### UI & Components

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| **shadcn/ui**    | Accessible, customizable components |
| **Radix UI**     | Headless UI primitives              |
| **Lucide React** | Beautiful icons                     |
| **Recharts**     | Data visualization & charts         |

### Forms & Validation

| Technology          | Purpose                    |
| ------------------- | -------------------------- |
| **React Hook Form** | Performant form management |
| **Zod**             | Schema validation          |

### State Management

| Technology         | Purpose                            |
| ------------------ | ---------------------------------- |
| **TanStack Query** | Server state management (via tRPC) |
| **Zustand**        | Client state management            |

### Development Tools

| Technology     | Purpose                              |
| -------------- | ------------------------------------ |
| **Turborepo**  | Monorepo build system                |
| **pnpm**       | Fast, disk-efficient package manager |
| **ESLint**     | Code linting                         |
| **Prettier**   | Code formatting                      |
| **Husky**      | Git hooks                            |
| **Commitlint** | Commit message linting               |

## Project Structure

This project follows a monorepo architecture with the following structure:

```
BoardingHouseSystem/
├── apps/
│   ├── web/                              # Main web application (Next.js)
│   │   ├── src/
│   │   │   ├── app/                      # Next.js App Router
│   │   │   │   ├── (auth)/
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── register/
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── (dashboard)/
│   │   │   │   │   ├── landlord/
│   │   │   │   │   │   ├── boarders/
│   │   │   │   │   │   ├── rooms/
│   │   │   │   │   │   ├── payments/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── boarder/
│   │   │   │   │   │   ├── profile/
│   │   │   │   │   │   ├── payments/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── api/
│   │   │   │   │   ├── trpc/[trpc]/route.ts      # Thin tRPC adapter
│   │   │   │   │   └── auth/[...nextauth]/route.ts
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/                # Web-specific components only
│   │   │   │   ├── layouts/
│   │   │   │   ├── navigation/
│   │   │   │   └── providers.tsx
│   │   │   └── lib/
│   │   │       ├── trpc-client.ts
│   │   │       └── utils.ts
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── mobile/                            # React Native app (future)
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   │   ├── auth/
│   │   │   │   ├── landlord/
│   │   │   │   └── boarder/
│   │   │   ├── navigation/
│   │   │   │   ├── AuthNavigator.tsx
│   │   │   │   ├── LandlordNavigator.tsx
│   │   │   │   └── RootNavigator.tsx
│   │   │   ├── components/               # Mobile-specific components
│   │   │   └── lib/
│   │   │       └── trpc-client.ts
│   │   ├── android/
│   │   ├── ios/
│   │   ├── app.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── admin/                             # Admin dashboard (optional)
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── users/
│   │   │       ├── analytics/
│   │   │       └── settings/
│   │   └── package.json
│   │
│   └── landing/                           # Marketing/public website
│       ├── src/
│       │   └── app/
│       │       ├── about/
│       │       ├── pricing/
│       │       └── contact/
│       └── package.json
│
├── packages/
│   ├── api/                              # Backend API layer (tRPC)
│   │   ├── src/
│   │   │   ├── routers/
│   │   │   │   ├── boarder.router.ts
│   │   │   │   ├── payment.router.ts
│   │   │   │   ├── room.router.ts
│   │   │   │   ├── user.router.ts
│   │   │   │   ├── utility.router.ts
│   │   │   │   ├── dashboard.router.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/                 # Business logic services
│   │   │   │   ├── boarder.service.ts
│   │   │   │   ├── payment.service.ts
│   │   │   │   ├── room.service.ts
│   │   │   │   └── utility.service.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── error.middleware.ts
│   │   │   │   └── logger.middleware.ts
│   │   │   ├── context.ts
│   │   │   ├── root.ts
│   │   │   └── trpc.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── database/                         # Prisma + database client
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── auth/                             # Authentication & authorization
│   │   ├── src/
│   │   │   ├── providers/
│   │   │   │   ├── credentials.provider.ts
│   │   │   │   ├── google.provider.ts
│   │   │   │   └── index.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── session.strategy.ts
│   │   │   ├── guards/
│   │   │   │   ├── landlord.guard.ts
│   │   │   │   ├── boarder.guard.ts
│   │   │   │   └── admin.guard.ts
│   │   │   ├── config.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared/                           # Shared business logic & domain models
│   │   ├── src/
│   │   │   ├── entities/                 # Domain entities (FSD)
│   │   │   │   ├── boarder/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── schemas.ts
│   │   │   │   │   │   └── utils.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── payment/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── schemas.ts
│   │   │   │   │   │   ├── constants.ts
│   │   │   │   │   │   └── utils.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── room/
│   │   │   │   │   ├── model/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── user/
│   │   │   │   │   ├── model/
│   │   │   │   │   └── index.ts
│   │   │   │   └── utility/
│   │   │   │       ├── model/
│   │   │   │       └── index.ts
│   │   │   ├── features/                 # Business features (FSD)
│   │   │   │   ├── boarder-management/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── store.ts
│   │   │   │   │   │   ├── hooks.ts
│   │   │   │   │   │   └── types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── payment-processing/
│   │   │   │   │   ├── model/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── room-management/
│   │   │   │   │   ├── model/
│   │   │   │   │   └── index.ts
│   │   │   │   └── utility-tracking/
│   │   │   │       ├── model/
│   │   │   │       └── index.ts
│   │   │   ├── lib/                      # Shared utilities
│   │   │   │   ├── formatters.ts
│   │   │   │   ├── validators.ts
│   │   │   │   ├── constants.ts
│   │   │   │   └── utils.ts
│   │   │   └── types/
│   │   │       ├── index.ts
│   │   │       └── common.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/                               # Shared UI components (cross-platform)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── primitives/           # Basic components
│   │   │   │   │   ├── Button/
│   │   │   │   │   │   ├── Button.tsx
│   │   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Input/
│   │   │   │   │   ├── Card/
│   │   │   │   │   ├── Badge/
│   │   │   │   │   ├── Avatar/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── composite/            # Composite components
│   │   │   │   │   ├── BoarderCard/
│   │   │   │   │   ├── RoomCard/
│   │   │   │   │   ├── PaymentCard/
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useDebounce.ts
│   │   │   │   ├── useMediaQuery.ts
│   │   │   │   ├── useLocalStorage.ts
│   │   │   │   └── index.ts
│   │   │   ├── theme/
│   │   │   │   ├── colors.ts
│   │   │   │   ├── typography.ts
│   │   │   │   └── index.ts
│   │   │   └── utils/
│   │   │       ├── cn.ts
│   │   │       └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── validation/                       # Zod schemas (shared across platforms)
│   │   ├── src/
│   │   │   ├── boarder.schemas.ts
│   │   │   ├── payment.schemas.ts
│   │   │   ├── room.schemas.ts
│   │   │   ├── user.schemas.ts
│   │   │   ├── utility.schemas.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/                           # Shared configuration packages
│       ├── eslint-config/
│       │   ├── base.js
│       │   ├── react.js
│       │   ├── next.js
│       │   └── package.json
│       ├── typescript-config/
│       │   ├── base.json
│       │   ├── nextjs.json
│       │   ├── react-native.json
│       │   └── package.json
│       └── tailwind-config/
│           ├── base.js
│           ├── web.js
│           └── package.json
│
├── services/                             # Standalone backend services (optional)
│   ├── api-server/                       # Standalone API server (Express/Fastify)
│   │   ├── src/
│   │   │   ├── server.ts
│   │   │   └── index.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── workers/                          # Background jobs (Bull/BullMQ)
│       ├── src/
│       │   ├── queues/
│       │   │   ├── payment-reminder.worker.ts
│       │   │   └── utility-calculation.worker.ts
│       │   └── index.ts
│       └── package.json
│
├── docs/
│   ├── api.md
│   ├── architecture.md
│   ├── database.md
│   └── deployment.md
│
├── scripts/
│   ├── setup.sh
│   ├── seed.sh
│   └── migrate.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-web.yml
│       └── deploy-mobile.yml
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment (creates .env files)
bash scripts/setup.sh

# 3. Update .env with your database credentials

# 4. Start all services (web + api + mobile)
pnpm dev
```

Visit:
- **Web App:** http://localhost:3000
- **API Server:** http://localhost:3001
- **Mobile App:** http://localhost:8081

## Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **pnpm** 9.x or later
- **PostgreSQL** 16.x or later (or Docker)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/bhms.git
   cd bhms
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy example files
   cp .env.example .env
   cp apps/web/.env.example apps/web/.env
   cp apps/api/.env.example apps/api/.env
   ```

   See [Environment Variables](#-environment-variables) for configuration details.

4. **Start the database** (using Docker)

   ```bash
   docker compose up -d
   ```

5. **Push database schema**

   ```bash
   pnpm db:push
   ```

6. **Seed the database** (optional)

   ```bash
   pnpm db:seed
   ```

7. **Start the development servers**

   ```bash
   # Start all services (web + api + mobile)
   pnpm dev

   # Or start individually
   pnpm web:dev    # Web app only
   pnpm api:dev    # API server only
   pnpm mobile:dev # Mobile app only
   ```

8. **Open your browser**
   - Web: [http://localhost:3000](http://localhost:3000)
   - API: [http://localhost:3001](http://localhost:3001)
   - Mobile: [http://localhost:8081](http://localhost:8081)

### Demo Credentials

After seeding the database:

| Role     | Email                  | Password      |
| -------- | ---------------------- | ------------- |
| Landlord | `landlord@example.com` | `password123` |
| Boarder  | Access Code: `MS2024`  | -             |
| Boarder  | Access Code: `PC2024`  | -             |

## Environment Variables

Create a `.env` file in `apps/web/` with the following variables:

```env
# Database
DATABASE_URL="postgresql://bhms:bhms@localhost:5432/bhms"

# NextAuth.js
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Variable Descriptions

| Variable              | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| `DATABASE_URL`        | PostgreSQL connection string                                            |
| `NEXTAUTH_SECRET`     | Secret key for JWT encryption (generate with `openssl rand -base64 32`) |
| `NEXTAUTH_URL`        | Base URL of your application                                            |
| `NEXT_PUBLIC_APP_URL` | Public-facing URL of your application                                   |

## Database

### Schema Overview

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐
│    User     │     │    Room     │     │  UtilityReading  │
├─────────────┤     ├─────────────┤     ├──────────────────┤
│ id          │     │ id          │     │ id               │
│ email       │     │ roomNumber  │◄────│ roomId           │
│ password    │     │ floor       │     │ type             │
│ role        │     │ capacity    │     │ currentReading   │
│ ...         │     │ monthlyRate │     │ previousReading  │
└──────┬──────┘     │ status      │     │ ratePerUnit      │
       │            └──────┬──────┘     └──────────────────┘
       │ 1:1               │ 1:N
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│   Boarder   │─────│   Payment   │
├─────────────┤     ├─────────────┤
│ id          │     │ id          │
│ firstName   │     │ boarderId   │
│ lastName    │     │ amount      │
│ roomId      │◄────│ type        │
│ accessCode  │     │ status      │
│ ...         │     │ dueDate     │
└─────────────┘     └─────────────┘
```

### Database Commands

```bash
# Push schema to database (development)
pnpm db:push

# Run migrations (production)
pnpm db:migrate

# Open Prisma Studio (GUI)
pnpm db:studio

# Seed database with sample data
pnpm db:seed
```

## API Documentation

The API is built with **tRPC**, providing end-to-end type safety.

### Available Routers

| Router      | Description                            |
| ----------- | -------------------------------------- |
| `room`      | Room CRUD operations and statistics    |
| `boarder`   | Boarder management and room assignment |
| `payment`   | Payment tracking and receipts          |
| `utility`   | Utility readings and billing           |
| `dashboard` | Analytics and statistics               |
| `user`      | User management                        |

### Example Usage

```typescript
import { api } from "@/trpc/react";

// Query rooms
const { data: rooms } = api.room.getAll.useQuery();

// Create a room
const createRoom = api.room.create.useMutation({
  onSuccess: () => {
    utils.room.getAll.invalidate();
  },
});

// Call mutation
createRoom.mutate({
  roomNumber: "301",
  floor: 3,
  capacity: 2,
  monthlyRate: 5000,
});
```

See [docs/api.md](docs/api.md) for complete API documentation.

## Deployment

### Docker Deployment

```bash
# Build and run production containers
docker compose -f infra/docker/docker-compose.yml up -d
```

### Vercel Deployment

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy

```bash
# Using Vercel CLI
npm i -g vercel
vercel --prod
```

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

See [docs/deployment.md](docs/deployment.md) for detailed deployment instructions.

## Available Scripts

### Development

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Start all services (web + api)      |
| `pnpm web:dev`   | Start web app only                  |
| `pnpm api:dev`   | Start API server only               |
| `pnpm mobile:dev`| Start mobile app only               |

### Build & Production

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `pnpm build`     | Build all apps                 |
| `pnpm web:build` | Build web app only             |
| `pnpm api:build` | Build API server only          |
| `pnpm start`     | Start production server        |

### Code Quality

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `pnpm lint`      | Run ESLint                     |
| `pnpm typecheck` | Run TypeScript type checking   |
| `pnpm format`    | Format code with Prettier      |
| `pnpm clean`     | Clean build artifacts          |

### Database

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `pnpm db:push`    | Push Prisma schema to database |
| `pnpm db:migrate` | Run database migrations        |
| `pnpm db:studio`  | Open Prisma Studio             |
| `pnpm db:seed`    | Seed database with sample data |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ T3 Stack</p>
  <p>
    <a href="https://create.t3.gg/">T3 Stack</a> •
    <a href="https://nextjs.org/">Next.js</a> •
    <a href="https://trpc.io/">tRPC</a> •
    <a href="https://prisma.io/">Prisma</a> •
    <a href="https://ui.shadcn.com/">shadcn/ui</a>
  </p>
</div>
