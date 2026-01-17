# BHMS API Server

Backend API server for the Boarding House Management System.

## Tech Stack

- **Runtime:** Node.js with Express
- **API:** tRPC
- **Database:** Prisma + PostgreSQL
- **Auth:** NextAuth.js (session-based)

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database

### Installation

```bash
# From project root
pnpm install
```

### Environment Setup

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your configuration
```

### Development

```bash
# Start dev server with hot reload
pnpm dev

# Or from project root
pnpm api:dev
```

Server will start at `http://localhost:3001`

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## API Endpoints

### Health Check
```
GET /health
```

Returns server status and uptime.

### tRPC Endpoint
```
POST /trpc
```

All tRPC procedures are available at this endpoint.

## Available Routers

- `user` - User management
- `room` - Room management
- `boarder` - Boarder management
- `payment` - Payment processing
- `utility` - Utility billing
- `dashboard` - Dashboard statistics

## Authentication

The API uses session-based authentication. Include the session token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Multi-Tenant Support

Each request should include the tenant ID in headers:

```
X-Tenant-ID: <tenant-id>
```

This ensures data isolation between landlords.

## Docker

### Build Image

```bash
docker build -f apps/api/Dockerfile -t bhms-api .
```

### Run Container

```bash
docker run -p 3001:3001 --env-file apps/api/.env bhms-api
```

## Project Structure

```
apps/api/
├── src/
│   ├── middleware/
│   │   └── auth.ts          # Authentication middleware
│   ├── context.ts           # tRPC context creation
│   ├── server.ts            # Express + tRPC setup
│   └── index.ts             # Entry point
├── Dockerfile               # Production Docker image
├── package.json
└── tsconfig.json
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `NEXTAUTH_SECRET` | Auth secret key | - |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |

## Troubleshooting

### Port already in use

```bash
# Kill process on port 3001
npx kill-port 3001
```

### Database connection issues

Ensure PostgreSQL is running and `DATABASE_URL` is correct.

### CORS errors

Add your frontend URL to `ALLOWED_ORIGINS` in `.env`.

## License

Private - Boarding House Management System
