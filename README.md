# Boarding House Management System (BHMS)

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

This project follows **Feature-Sliced Design (FSD)** architecture within a **Turborepo** monorepo:

```
bhms/
├── apps/
│   └── web/                          # Next.js application
│       ├── prisma/                   # Database schema & migrations
│       │   ├── schema.prisma
│       │   └── seed.ts
│       └── src/
│           ├── app/                  # Next.js App Router
│           │   ├── (auth)/           # Auth pages (login, register)
│           │   ├── (dashboard)/      # Dashboard pages
│           │   │   ├── landlord/     # Landlord views
│           │   │   └── boarder/      # Boarder views
│           │   └── api/              # API routes
│           │
│           ├── entities/             # Domain entities (UI & models)
│           │   ├── boarder/
│           │   ├── payment/
│           │   ├── room/
│           │   ├── user/
│           │   └── utility/
│           │
│           ├── features/             # Feature modules
│           │   ├── auth/
│           │   ├── boarders/
│           │   ├── dashboard/
│           │   ├── payments/
│           │   ├── rooms/
│           │   └── utilities/
│           │
│           ├── widgets/              # Composite UI blocks
│           │   ├── header/
│           │   ├── sidebar/
│           │   └── footer/
│           │
│           ├── shared/               # Shared utilities
│           │   ├── ui/               # UI components
│           │   ├── lib/              # Utilities
│           │   ├── hooks/            # Custom hooks
│           │   └── config/           # Configuration
│           │
│           ├── server/               # Server-side code
│           │   ├── api/              # tRPC routers
│           │   ├── auth/             # Auth configuration
│           │   └── db/               # Database client
│           │
│           └── trpc/                 # tRPC client setup
│
├── packages/
│   ├── database/                     # Shared Prisma client
│   ├── eslint-config/                # Shared ESLint config
│   ├── typescript-config/            # Shared TypeScript config
│   └── ui/                           # Shared UI components
│
├── infra/
│   ├── docker/                       # Docker configuration
│   └── scripts/                      # Setup & deployment scripts
│
└── docs/                             # Documentation
    ├── api.md
    ├── architecture.md
    ├── database.md
    └── deployment.md
```

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
   cp apps/web/.env.example apps/web/.env
   ```

   See [Environment Variables](#-environment-variables) for configuration details.

4. **Start the database** (using Docker)

   ```bash
   docker compose -f infra/docker/docker-compose.dev.yml up -d
   ```

5. **Push database schema**

   ```bash
   pnpm db:push
   ```

6. **Seed the database** (optional)

   ```bash
   pnpm db:seed
   ```

7. **Start the development server**

   ```bash
   pnpm dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

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

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `pnpm dev`       | Start development server       |
| `pnpm build`     | Build for production           |
| `pnpm start`     | Start production server        |
| `pnpm lint`      | Run ESLint                     |
| `pnpm typecheck` | Run TypeScript type checking   |
| `pnpm format`    | Format code with Prettier      |
| `pnpm clean`     | Clean build artifacts          |
| `pnpm db:push`   | Push Prisma schema to database |
| `pnpm db:studio` | Open Prisma Studio             |
| `pnpm db:seed`   | Seed database with sample data |

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
