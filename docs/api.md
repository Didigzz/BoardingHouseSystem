# BHMS API Documentation

## Overview

The API is built using tRPC, providing end-to-end type safety between client and server.

## Authentication

All protected routes require a valid session. Use `protectedProcedure` for authenticated endpoints.

## Routers

### Room Router (`room`)

| Procedure | Type | Description |
|-----------|------|-------------|
| `getAll` | Query | Get all rooms with optional filters |
| `getById` | Query | Get room by ID with boarders and utilities |
| `create` | Mutation | Create a new room |
| `update` | Mutation | Update room details |
| `delete` | Mutation | Delete a room |
| `getStats` | Query | Get room statistics |

### Boarder Router (`boarder`)

| Procedure | Type | Description |
|-----------|------|-------------|
| `getAll` | Query | Get all boarders with optional filters |
| `getById` | Query | Get boarder by ID |
| `create` | Mutation | Create a new boarder |
| `update` | Mutation | Update boarder details |
| `delete` | Mutation | Delete a boarder |
| `assignRoom` | Mutation | Assign boarder to a room |

### Payment Router (`payment`)

| Procedure | Type | Description |
|-----------|------|-------------|
| `getAll` | Query | Get all payments with filters |
| `getById` | Query | Get payment by ID |
| `create` | Mutation | Record a new payment |
| `update` | Mutation | Update payment status |
| `getStats` | Query | Get payment statistics |

### Utility Router (`utility`)

| Procedure | Type | Description |
|-----------|------|-------------|
| `getReadings` | Query | Get utility readings |
| `addReading` | Mutation | Add new utility reading |
| `calculateBill` | Query | Calculate utility bill |

### Dashboard Router (`dashboard`)

| Procedure | Type | Description |
|-----------|------|-------------|
| `getStats` | Query | Get dashboard statistics |
| `getRecentActivity` | Query | Get recent activities |
| `getRevenue` | Query | Get revenue data |

## Usage Example

```typescript
// Client-side
import { api } from "@/trpc/react";

function RoomList() {
  const { data: rooms } = api.room.getAll.useQuery();
  
  const createRoom = api.room.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch
      utils.room.getAll.invalidate();
    },
  });
}
```
