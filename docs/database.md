# BHMS Database Documentation

## Overview

The database is PostgreSQL, managed through Prisma ORM.

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│      User       │       │      Room       │
├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │
│ email           │       │ roomNumber      │
│ name            │       │ floor           │
│ password        │       │ capacity        │
│ role            │       │ monthlyRate     │
│ image           │       │ status          │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │ 1:1                     │ 1:N
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│     Boarder     │◄──────│  UtilityReading │
├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │
│ firstName       │       │ type            │
│ lastName        │       │ previousReading │
│ email           │       │ currentReading  │
│ roomId ─────────┼──────►│ ratePerUnit     │
│ userId ─────────┼───┐   │ roomId          │
│ moveInDate      │   │   └─────────────────┘
│ isActive        │   │
└────────┬────────┘   │
         │            │
         │ 1:N        │
         ▼            │
┌─────────────────┐   │
│     Payment     │   │
├─────────────────┤   │
│ id              │   │
│ amount          │   │
│ type            │   │
│ status          │   │
│ dueDate         │   │
│ boarderId ──────┼───┘
└─────────────────┘
```

## Models

### User
- Stores authentication data
- Links to Boarder profile (for boarder role)
- Supports OAuth accounts

### Room
- Central entity for property management
- Tracks capacity and occupancy
- Links to boarders and utility readings

### Boarder
- Tenant information
- Links to user account (optional)
- Links to assigned room

### Payment
- Financial transactions
- Types: RENT, UTILITY, DEPOSIT, OTHER
- Status tracking: PENDING, PAID, OVERDUE, CANCELLED

### UtilityReading
- Tracks utility consumption per room
- Supports: ELECTRICITY, WATER, INTERNET, OTHER
- Calculates billing based on readings

## Migrations

```bash
# Create migration
pnpm db:migrate

# Push schema changes (dev)
pnpm db:push

# Open Prisma Studio
pnpm db:studio
```

## Seeding

```bash
pnpm db:seed
```

See `prisma/seed.ts` for seed data structure.
