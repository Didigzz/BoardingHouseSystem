# Authentication App

Centralized authentication and user onboarding for the Boarding House Management System. This application handles all authentication flows and redirects users to their appropriate dashboards based on role and status.

## 🔐 Overview

**Port**: 3003  
**URL**: http://localhost:3003  
**Purpose**: Centralized authentication and user onboarding

## ✨ Features

### Authentication
- **User Login**: Email/password authentication
- **User Registration**: Role-based registration (Boarder/Landlord)
- **Social Login**: OAuth providers (Google, Facebook, etc.)
- **Password Recovery**: Forgot password flow
- **Session Management**: Secure session handling   

### User Onboarding
- **Role Selection**: Choose between Boarder and Landlord
- **Account Verification**: Email verification process
- **Status Handling**: Pending approval, suspended accounts
- **Profile Setup**: Initial profile information

### Routing & Redirects
- **Role-based Redirects**: Automatic routing after login
- **Status-aware Routing**: Handle pending/suspended accounts
- **Deep Linking**: Preserve intended destination

## 🏗️ Architecture

### Pages Structure
```
src/app/
├── page.tsx                    # Landing/login page
├── login/page.tsx             # Login form
├── register/page.tsx          # Registration form
├── pending-approval/page.tsx  # Landlord pending status
├── account-suspended/page.tsx # Suspended account notice
└── api/
    ├── auth/[...nextauth]/route.ts  # NextAuth.js API routes
    └── register/route.ts            # Registration API
```

### Components
```
src/components/
├── login-form.tsx      # Login form component
├── register-form.tsx   # Registration form component
└── index.ts           # Component exports
```

## 🚀 Getting Started

### Development

```bash
# Start development server
bun --filter @bhms/auth dev

# Or from root
cd apps/(auth)
bun dev
```

The application will be available at http://localhost:3003

### Environment Variables

Create `.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=your-secret-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bhms

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Email (for verification)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
```

## 🔐 Authentication Flow

### Registration Flow
```mermaid
graph TD
    A[User visits /register] --> B[Select Role]
    B --> C{Role Selected}
    C -->|Boarder| D[Fill Registration Form]
    C -->|Landlord| E[Fill Landlord Application]
    D --> F[Create Account]
    E --> G[Create Account with Pending Status]
    F --> H[Email Verification]
    G --> I[Admin Approval Required]
    H --> J[Redirect to Boarder Dashboard]
    I --> K[Redirect to Pending Page]
```

### Login Flow
```mermaid
graph TD
    A[User visits /login] --> B[Enter Credentials]
    B --> C[NextAuth Validation]
    C --> D{Valid Credentials?}
    D -->|No| E[Show Error]
    D -->|Yes| F[Check User Status]
    F --> G{User Status}
    G -->|Active Boarder| H[Redirect to Boarder Dashboard]
    G -->|Approved Landlord| I[Redirect to Landlord Portal]
    G -->|Pending Landlord| J[Redirect to Pending Page]
    G -->|Suspended| K[Redirect to Suspended Page]
    G -->|Admin| L[Redirect to Admin Dashboard]
```

## 🔧 NextAuth.js Configuration

### Providers Setup
```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validate credentials against database
        const user = await validateUser(credentials)
        return user ? user : null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.status = user.status
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.status = token.status
      return session
    },
    async redirect({ url, baseUrl }) {
      // Custom redirect logic based on user role
      return getRedirectUrl(user.role, user.status, baseUrl)
    }
  }
}
```

### Role-based Redirects
```typescript
function getRedirectUrl(role: string, status: string, baseUrl: string) {
  if (status === 'suspended') {
    return `${baseUrl}/account-suspended`
  }
  
  switch (role) {
    case 'boarder':
      return 'http://localhost:3004' // Boarder dashboard
    case 'landlord':
      if (status === 'pending') {
        return `${baseUrl}/pending-approval`
      }
      return 'http://localhost:3005' // Landlord portal
    case 'admin':
      return 'http://localhost:3002' // Admin dashboard
    default:
      return baseUrl
  }
}
```

## 📝 Registration Forms

### Boarder Registration
```typescript
interface BoarderRegistration {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role: 'boarder'
}
```

### Landlord Application
```typescript
interface LandlordApplication {
  // Personal Information
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  
  // Business Information
  businessName?: string
  businessAddress?: string
  taxId?: string
  
  // Verification Documents
  documents?: File[]
  
  role: 'landlord'
  status: 'pending'
}
```

## 🎨 UI Components

### Login Form
- Email/password fields
- Social login buttons
- "Remember me" checkbox
- "Forgot password" link
- Registration link

### Registration Form
- Role selection (Boarder/Landlord)
- Personal information fields
- Business information (landlords only)
- Document upload (landlords only)
- Terms and conditions acceptance

### Status Pages
- **Pending Approval**: For landlords awaiting approval
- **Account Suspended**: For suspended users
- **Email Verification**: For unverified accounts

## 🔒 Security Features

### Password Security
- Minimum 8 characters
- Bcrypt hashing
- Password strength indicator
- Secure password reset

### Session Security
- HTTP-only cookies
- CSRF protection
- Session timeout
- Secure cookie flags

### Input Validation
- Zod schema validation
- XSS prevention
- SQL injection protection
- Rate limiting

## 📧 Email Integration

### Email Templates
- Welcome email
- Email verification
- Password reset
- Account status updates

### Email Configuration
```typescript
// Email service setup
const emailConfig = {
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD
  }
}
```

## 🧪 Testing

### Test Coverage
- Authentication flows
- Registration validation
- Role-based redirects
- Error handling
- Security measures

### Running Tests
```bash
# Unit tests
bun test

# Integration tests
bun run test:integration

# E2E tests
bun run test:e2e
```

## 🚀 Deployment

### Environment Variables (Production)
```env
NEXTAUTH_URL=https://auth.yourdomain.com
NEXTAUTH_SECRET=production-secret-key
DATABASE_URL=production-database-url

# OAuth providers
GOOGLE_CLIENT_ID=production-google-id
GOOGLE_CLIENT_SECRET=production-google-secret

# Email service
EMAIL_SERVER_HOST=production-smtp-host
EMAIL_FROM=noreply@yourdomain.com
```

### Build and Deploy
```bash
# Build for production
bun run build

# Start production server
bun start
```

## 🔧 Configuration

### NextAuth.js Options
- Session strategy (JWT vs Database)
- Provider configurations
- Custom pages
- Callback URLs
- Security settings

### Middleware Setup
```typescript
// src/middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Custom middleware logic
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Authorization logic
        return !!token
      }
    }
  }
)
```

## 📊 Analytics

### Tracking Events
- Registration attempts
- Login success/failure
- Social login usage
- Password reset requests

### Implementation
```typescript
import { analytics } from '@/lib/analytics'

const trackRegistration = (role: string) => {
  analytics.track('User Registered', {
    role,
    method: 'email',
    timestamp: new Date()
  })
}
```

## 🤝 Contributing

1. Follow authentication security best practices
2. Test all authentication flows thoroughly
3. Update documentation for new providers
4. Ensure proper error handling
5. Maintain session security

## 📚 Related Documentation

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Main README](../../README.md)
- [API Documentation](../api/README.md)
- [Development Guidelines](../../DEVELOPMENT.md)