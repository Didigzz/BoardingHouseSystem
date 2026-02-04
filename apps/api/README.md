# API Server

The backend API server for the Boarding House Management System. This Next.js application provides tRPC-based API endpoints serving all frontend applications with type-safe, role-based access control.

## 🔌 Overview

**Port**: 3001  
**URL**: http://localhost:3001  
**Purpose**: Backend API server with tRPC endpoints

## ✨ Features

### API Architecture
- **tRPC Integration**: Type-safe API with end-to-end type safety
- **Role-based Access Control**: Secure endpoints based on user roles
- **Authentication Middleware**: NextAuth.js integration
- **Data Validation**: Zod schema validation for all inputs

### Core Services
- **User Management**: User CRUD operations and authentication
- **Property Management**: Boarding house listing operations
- **Booking System**: Reservation and booking management
- **Payment Processing**: Secure payment handling
- **Messaging System**: In-platform communication
- **File Upload**: Image and document upload handling

### Database Integration
- **Prisma ORM**: Type-safe database operations
- **PostgreSQL**: Primary database
- **Connection Pooling**: Optimized database connections
- **Migration Management**: Database schema versioning

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # NextAuth.js endpoints
│   │   ├── trpc/[trpc]/route.ts          # tRPC API handler
│   │   └── health/route.ts               # Health check endpoint
│   ├── layout.tsx                        # Root layout
│   └── page.tsx                          # API documentation page
└── lib/
    └── trpc.ts                           # tRPC server configuration
```

### tRPC Router Structure
```
packages/api/src/routers/
├── index.ts                    # Main router
├── user.router.ts             # User operations
├── property.router.ts         # Property management
├── booking.router.ts          # Booking system
├── payment.router.ts          # Payment processing
├── message.router.ts          # Messaging system
├── admin.router.ts            # Admin operations
└── upload.router.ts           # File upload handling
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Bun package manager
- PostgreSQL database
- Redis (optional, for caching)

### Development

```bash
# Start development server
bun --filter @bhms/api-server dev

# Or from app directory
cd apps/api
bun dev
```

The API will be available at http://localhost:3001

### Environment Variables

Create `.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bhms

# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key

# JWT
JWT_SECRET=your-jwt-secret

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760  # 10MB

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Email
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# Payment Providers
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
```

## 🔐 Authentication & Authorization

### NextAuth.js Configuration
```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@bhms/auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### tRPC Context
```typescript
// src/lib/trpc.ts
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts
  const session = await getServerSession(req, res, authOptions)
  
  return {
    session,
    db: prisma,
    req,
    res
  }
}
```

### Role-based Middleware
```typescript
// Middleware for protected procedures
const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user }
    }
  })
})

// Role-specific middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN' })
  }
  
  return next({ ctx })
})

const landlordProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== 'landlord' || ctx.session.user.status !== 'approved') {
    throw new TRPCError({ code: 'FORBIDDEN' })
  }
  
  return next({ ctx })
})
```

## 🏠 API Endpoints

### User Router
```typescript
// packages/api/src/routers/user.router.ts
export const userRouter = createTRPCRouter({
  // Get current user profile
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id }
      })
    }),
  
  // Update user profile
  updateProfile: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input
      })
    }),
  
  // Register new user
  register: publicProcedure
    .input(registerUserSchema)
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 12)
      
      return await ctx.db.user.create({
        data: {
          ...input,
          password: hashedPassword
        }
      })
    })
})
```

### Property Router
```typescript
// packages/api/src/routers/property.router.ts
export const propertyRouter = createTRPCRouter({
  // Public property search
  search: publicProcedure
    .input(propertySearchSchema)
    .query(async ({ ctx, input }) => {
      const { filters, pagination, sort } = input
      
      return await ctx.db.boardingHouse.findMany({
        where: {
          status: 'active',
          ...buildSearchFilters(filters)
        },
        orderBy: buildSortOrder(sort),
        skip: pagination.page * pagination.limit,
        take: pagination.limit,
        include: {
          images: true,
          landlord: {
            select: { name: true, avatar: true }
          }
        }
      })
    }),
  
  // Create property (landlords only)
  create: landlordProcedure
    .input(createPropertySchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.boardingHouse.create({
        data: {
          ...input,
          landlordId: ctx.session.user.id
        }
      })
    }),
  
  // Get landlord's properties
  getMyProperties: landlordProcedure
    .query(async ({ ctx }) => {
      return await ctx.db.boardingHouse.findMany({
        where: { landlordId: ctx.session.user.id },
        include: {
          images: true,
          bookings: {
            where: { status: 'active' }
          }
        }
      })
    })
})
```

### Booking Router
```typescript
// packages/api/src/routers/booking.router.ts
export const bookingRouter = createTRPCRouter({
  // Create booking request (boarders only)
  create: protectedProcedure
    .input(createBookingSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify user is a boarder
      if (ctx.session.user.role !== 'boarder') {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      
      return await ctx.db.booking.create({
        data: {
          ...input,
          boarderId: ctx.session.user.id,
          status: 'pending'
        }
      })
    }),
  
  // Approve booking (landlords only)
  approve: landlordProcedure
    .input(approveBookingSchema)
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.findUnique({
        where: { id: input.bookingId },
        include: { boardingHouse: true }
      })
      
      // Verify landlord owns the property
      if (booking?.boardingHouse.landlordId !== ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      
      return await ctx.db.booking.update({
        where: { id: input.bookingId },
        data: { status: 'approved' }
      })
    })
})
```

## 💳 Payment Integration

### Payment Router
```typescript
// packages/api/src/routers/payment.router.ts
export const paymentRouter = createTRPCRouter({
  // Create payment intent
  createIntent: protectedProcedure
    .input(createPaymentIntentSchema)
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.findUnique({
        where: { id: input.bookingId }
      })
      
      if (!booking || booking.boarderId !== ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      
      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(booking.totalAmount * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          bookingId: booking.id,
          userId: ctx.session.user.id
        }
      })
      
      return {
        clientSecret: paymentIntent.client_secret
      }
    }),
  
  // Confirm payment
  confirmPayment: protectedProcedure
    .input(confirmPaymentSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify payment with Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(input.paymentIntentId)
      
      if (paymentIntent.status === 'succeeded') {
        // Update booking status
        await ctx.db.booking.update({
          where: { id: input.bookingId },
          data: { status: 'confirmed' }
        })
        
        // Create payment record
        await ctx.db.payment.create({
          data: {
            bookingId: input.bookingId,
            amount: paymentIntent.amount / 100,
            status: 'completed',
            transactionId: paymentIntent.id
          }
        })
      }
      
      return { success: paymentIntent.status === 'succeeded' }
    })
})
```

## 📁 File Upload System

### Upload Router
```typescript
// packages/api/src/routers/upload.router.ts
export const uploadRouter = createTRPCRouter({
  // Upload property images
  uploadPropertyImages: landlordProcedure
    .input(uploadImagesSchema)
    .mutation(async ({ ctx, input }) => {
      const uploadedFiles = []
      
      for (const file of input.files) {
        // Validate file type and size
        if (!isValidImageFile(file)) {
          throw new TRPCError({ 
            code: 'BAD_REQUEST', 
            message: 'Invalid file type' 
          })
        }
        
        // Save file to storage
        const filename = generateUniqueFilename(file.name)
        const filepath = path.join(process.env.UPLOAD_DIR!, filename)
        
        await fs.writeFile(filepath, file.buffer)
        
        uploadedFiles.push({
          filename,
          originalName: file.name,
          size: file.size,
          url: `/uploads/${filename}`
        })
      }
      
      return uploadedFiles
    })
})
```

## 📧 Email System

### Email Service
```typescript
// src/lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT!),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD
  }
})

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  })
}

// Email templates
export const sendBookingConfirmation = async (booking: Booking) => {
  const html = `
    <h1>Booking Confirmed</h1>
    <p>Your booking for ${booking.boardingHouse.name} has been confirmed.</p>
    <p>Check-in: ${booking.startDate}</p>
    <p>Check-out: ${booking.endDate}</p>
  `
  
  await sendEmail(booking.boarder.email, 'Booking Confirmed', html)
}
```

## 🔍 Health Monitoring

### Health Check Endpoint
```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@bhms/database'

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Check Redis connection (if configured)
    if (process.env.REDIS_URL) {
      // Redis health check
    }
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'healthy',
        redis: 'healthy'
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    }, { status: 500 })
  }
}
```

## 🧪 Testing

### Test Structure
```
src/__tests__/
├── routers/
│   ├── user.router.test.ts
│   ├── property.router.test.ts
│   ├── booking.router.test.ts
│   └── payment.router.test.ts
├── middleware/
│   ├── auth.test.ts
│   └── validation.test.ts
└── utils/
    ├── email.test.ts
    └── upload.test.ts
```

### Running Tests
```bash
# Unit tests
bun test

# Integration tests
bun run test:integration

# API tests
bun run test:api

# Test coverage
bun run test:coverage
```

### Test Example
```typescript
// src/__tests__/routers/user.router.test.ts
import { createTRPCMsw } from 'msw-trpc'
import { userRouter } from '../routers/user.router'

describe('User Router', () => {
  it('should get user profile', async () => {
    const caller = userRouter.createCaller({
      session: mockSession,
      db: mockDb
    })
    
    const profile = await caller.getProfile()
    
    expect(profile).toMatchObject({
      id: mockSession.user.id,
      email: mockSession.user.email
    })
  })
})
```

## 🚀 Deployment

### Build Process
```bash
# Build for production
bun run build

# Start production server
bun start
```

### Environment Variables (Production)
```env
# Database
DATABASE_URL=postgresql://user:password@prod-db:5432/bhms

# NextAuth
NEXTAUTH_URL=https://api.yourdomain.com
NEXTAUTH_SECRET=production-secret

# File Upload
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE=10485760

# Payment Providers
STRIPE_SECRET_KEY=sk_live_...
PAYPAL_CLIENT_ID=production-paypal-id

# Email
EMAIL_SERVER_HOST=smtp.yourdomain.com
EMAIL_FROM=noreply@yourdomain.com
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3001

CMD ["bun", "start"]
```

## 📊 Performance

### Optimization Strategies
- **Database Indexing**: Optimized database queries
- **Connection Pooling**: Efficient database connections
- **Caching**: Redis caching for frequently accessed data
- **Rate Limiting**: API rate limiting protection

### Monitoring
```typescript
// Performance monitoring middleware
const performanceMiddleware = middleware(async ({ path, type, next }) => {
  const start = Date.now()
  
  try {
    const result = await next()
    const duration = Date.now() - start
    
    // Log performance metrics
    console.log(`${type} ${path} - ${duration}ms`)
    
    return result
  } catch (error) {
    // Log errors
    console.error(`${type} ${path} - Error:`, error)
    throw error
  }
})
```

## 🔒 Security

### Security Features
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM
- **Rate Limiting**: API rate limiting
- **CORS Configuration**: Cross-origin request handling

### Security Middleware
```typescript
// Rate limiting
const rateLimitMiddleware = middleware(async ({ ctx, next }) => {
  const key = `rate_limit:${ctx.req.ip}`
  const requests = await redis.incr(key)
  
  if (requests === 1) {
    await redis.expire(key, 60) // 1 minute window
  }
  
  if (requests > 100) { // 100 requests per minute
    throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })
  }
  
  return next()
})
```

## 🤝 Contributing

1. Follow the tRPC router structure
2. Use TypeScript for all new code
3. Add comprehensive tests for new endpoints
4. Follow security best practices
5. Document all API changes

## 📚 Related Documentation

- [Main README](../../README.md)
- [tRPC Documentation](https://trpc.io/)
- [Prisma Documentation](https://www.prisma.io/)
- [NextAuth.js Documentation](https://next-auth.js.org/)