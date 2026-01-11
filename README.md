# Boarding House Management System (BHMS)

A comprehensive boarding house management system built with modern web technologies.

## Overview

BHMS helps landlords manage their boarding house operations including:
- 🏠 Room management
- 👥 Boarder management
- 💰 Payment tracking
- ⚡ Utility billing
- 📊 Dashboard analytics

## Tech Stack

- **Frontend & Backend**: Next.js 14 (T3 Stack)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: tRPC
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS + shadcn/ui
- **Architecture**: Feature-Sliced Design

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/bhms.git

# Navigate to the project
cd bhms

# Install dependencies
pnpm install

# Navigate to the web app
cd apps/web

# Setup environment
cp .env.example .env

# Push database schema
pnpm db:push

# Seed database
pnpm db:seed

# Start development
pnpm dev
```

## Project Structure

```
bhms/
├── apps/
│   └── web/          # Next.js T3 application
├── packages/         # Shared packages
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Documentation

See [plan.md](./plan.md) for detailed architecture and implementation plans.

## License

MIT
