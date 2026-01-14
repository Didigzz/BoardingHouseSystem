# Complete URL Routing Map - Boarding House System

## 🌐 Landing Site (`apps/landing`)
**Base URL:** `https://boardinghouse.com` or `https://www.boardinghouse.com`

### Public Pages
```
GET  /                          → Home page
GET  /about                     → About us
GET  /features                  → Features overview
GET  /pricing                   → Pricing plans
GET  /contact                   → Contact form
GET  /blog                      → Blog listing
GET  /blog/[slug]               → Individual blog post
GET  /faq                       → Frequently asked questions
GET  /terms                     → Terms of service
GET  /privacy                   → Privacy policy
```

### Call-to-Actions (Redirects to Web App)
```
GET  /get-started               → Redirect to /register
GET  /login                     → Redirect to web app login
GET  /sign-up                   → Redirect to web app register
```

---

## 🔐 Authentication Flow (`apps/web`)
**Base URL:** `https://app.boardinghouse.com` or `https://boardinghouse.com/app`

### Auth Pages
```
GET  /login                     → Login page
POST /api/auth/login            → Login API endpoint

GET  /register                  → Registration page
POST /api/auth/register         → Registration API endpoint

GET  /boarder-access            → Boarder access code page
POST /api/auth/boarder-access   → Verify boarder access code

GET  /forgot-password           → Forgot password page
POST /api/auth/forgot-password  → Send reset email

GET  /reset-password            → Reset password page (with token)
POST /api/auth/reset-password   → Reset password API

GET  /verify-email              → Email verification page
POST /api/auth/verify-email     → Verify email API

POST /api/auth/logout           → Logout endpoint
```

---

## 🏠 Dashboard Redirects (Based on Role)

### Root Dashboard (Auto-redirect based on role)
```
GET  /                          → Redirect based on user role:
                                  - LANDLORD → /landlord
                                  - BOARDER  → /boarder
                                  - ADMIN    → /admin (if applicable)
                                  - Not logged in → /login

GET  /dashboard                 → Same as / (alias)
```

---

## 👨‍💼 Landlord Dashboard (`apps/web`)
**Base URL:** `https://app.boardinghouse.com/landlord`

### Overview
```
GET  /landlord                  → Dashboard overview
GET  /landlord/loading          → Loading state
```

### Boarders Management
```
GET  /landlord/boarders                     → All boarders list
GET  /landlord/boarders?status=active       → Filter by status
GET  /landlord/boarders?search=john         → Search boarders
GET  /landlord/boarders/[id]                → Boarder detail page
GET  /landlord/boarders/[id]/edit           → Edit boarder page
POST /api/trpc/boarder.create               → Create boarder
PUT  /api/trpc/boarder.update               → Update boarder
DEL  /api/trpc/boarder.delete               → Delete boarder
```

### Rooms Management
```
GET  /landlord/rooms                        → All rooms list
GET  /landlord/rooms?status=available       → Filter rooms
GET  /landlord/rooms/[id]                   → Room detail page
GET  /landlord/rooms/[id]/edit              → Edit room page
POST /api/trpc/room.create                  → Create room
PUT  /api/trpc/room.update                  → Update room
DEL  /api/trpc/room.delete                  → Delete room
```

### Payments Management
```
GET  /landlord/payments                     → All payments list
GET  /landlord/payments?status=pending      → Filter payments
GET  /landlord/payments?month=2024-01       → Filter by month
GET  /landlord/payments/[id]                → Payment detail page
POST /api/trpc/payment.create               → Create payment
PUT  /api/trpc/payment.markAsPaid           → Mark as paid
POST /api/trpc/payment.sendReminder         → Send payment reminder
```

### Utilities Management
```
GET  /landlord/utilities                    → Utilities overview
GET  /landlord/utilities/electricity        → Electricity tracking
GET  /landlord/utilities/water              → Water tracking
POST /api/trpc/utility.recordReading        → Record meter reading
GET  /api/trpc/utility.calculate            → Calculate utility bills
```

### Reports & Analytics
```
GET  /landlord/reports                      → Reports overview
GET  /landlord/reports/revenue              → Revenue report
GET  /landlord/reports/revenue?year=2024    → Filter by year
GET  /landlord/reports/occupancy            → Occupancy report
GET  /landlord/reports/payments             → Payment analysis
GET  /api/trpc/dashboard.getRevenueStats    → Revenue stats API
GET  /api/trpc/dashboard.getOccupancyStats  → Occupancy stats API
```

### Settings
```
GET  /landlord/settings                     → Settings overview
GET  /landlord/settings/profile             → Profile settings
GET  /landlord/settings/billing             → Billing settings
GET  /landlord/settings/notifications       → Notification preferences
PUT  /api/trpc/user.updateProfile           → Update profile
PUT  /api/trpc/user.updateSettings          → Update settings
```

---

## 🎓 Boarder Dashboard (`apps/web`)
**Base URL:** `https://app.boardinghouse.com/boarder`

### Overview
```
GET  /boarder                   → Boarder dashboard overview
GET  /boarder/loading           → Loading state
```

### Profile
```
GET  /boarder/profile           → View/edit profile
PUT  /api/trpc/user.updateProfile → Update profile
```

### Payments
```
GET  /boarder/payments                      → Payment history
GET  /boarder/payments?status=pending       → Filter payments
GET  /boarder/payments/[id]                 → Payment detail
POST /api/trpc/payment.payOnline            → Make online payment (if enabled)
GET  /api/trpc/payment.getMyPayments        → Get boarder's payments
```

### Maintenance Requests (Future Feature)
```
GET  /boarder/maintenance                   → Maintenance requests
POST /api/trpc/maintenance.create           → Create request
```

### Notifications
```
GET  /boarder/notifications                 → All notifications
PUT  /api/trpc/notification.markAsRead      → Mark as read
```

---

## 🔧 Admin Dashboard (`apps/admin`)
**Base URL:** `https://admin.boardinghouse.com`

### Overview
```
GET  /                          → Admin dashboard
GET  /analytics                 → System analytics
```

### User Management
```
GET  /users                     → All users
GET  /users/[id]                → User detail
PUT  /api/users/[id]            → Update user
DEL  /api/users/[id]            → Delete user
```

### Settings
```
GET  /settings                  → System settings
GET  /settings/features         → Feature flags
GET  /settings/integrations     → Third-party integrations
```

---

## 📱 Mobile App Routes (React Native)

### Auth Screens
```
/Auth/Login                     → Login screen
/Auth/Register                  → Register screen
/Auth/ForgotPassword            → Forgot password
/Auth/BoarderAccess             → Boarder access code
```

### Landlord Screens
```
/Landlord/Dashboard             → Dashboard
/Landlord/Boarders              → Boarders list
/Landlord/BoarderDetail/:id     → Boarder detail
/Landlord/Rooms                 → Rooms list
/Landlord/RoomDetail/:id        → Room detail
/Landlord/Payments              → Payments list
/Landlord/Utilities             → Utilities tracking
/Landlord/Settings              → Settings
```

### Boarder Screens
```
/Boarder/Dashboard              → Dashboard
/Boarder/Profile                → Profile
/Boarder/Payments               → Payment history
/Boarder/PaymentDetail/:id      → Payment detail
/Boarder/Notifications          → Notifications
```

---

## 🔄 Redirect Logic Flow

### After Login (NextAuth Callback)
```javascript
// In apps/web/src/lib/auth.ts

callbacks: {
  async redirect({ url, baseUrl }) {
    // User just logged in
    if (url === baseUrl) {
      const session = await getSession();
      
      if (session?.user?.role === 'LANDLORD') {
        return `${baseUrl}/landlord`;
      }
      
      if (session?.user?.role === 'BOARDER') {
        return `${baseUrl}/boarder`;
      }
      
      if (session?.user?.role === 'ADMIN') {
        return `${process.env.ADMIN_URL}`;
      }
    }
    
    return url.startsWith(baseUrl) ? url : baseUrl;
  }
}
```

### Middleware Protection
```javascript
// In apps/web/src/middleware.ts

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('next-auth.session-token');
  
  // Protect landlord routes
  if (pathname.startsWith('/landlord')) {
    if (!session) return NextResponse.redirect(new URL('/login', request.url));
    // Check role is LANDLORD
  }
  
  // Protect boarder routes
  if (pathname.startsWith('/boarder')) {
    if (!session) return NextResponse.redirect(new URL('/login', request.url));
    // Check role is BOARDER
  }
  
  // Redirect authenticated users from auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (session) {
      // Redirect to appropriate dashboard
    }
  }
}
```

---

## 🌍 URL Structure Best Practices

### Landing to Web App Flow
```
Landing Site:     boardinghouse.com
                  ↓ (Click "Get Started" or "Login")
Web App Auth:     app.boardinghouse.com/login
                  ↓ (After successful login)
Landlord:         app.boardinghouse.com/landlord
Boarder:          app.boardinghouse.com/boarder
```

### Alternative Structure (Subdirectory)
```
Landing Site:     boardinghouse.com
Web App:          boardinghouse.com/app/login
Landlord:         boardinghouse.com/app/landlord
Boarder:          boardinghouse.com/app/boarder
```

---

## 🔗 API Endpoints (tRPC)

### Base URL
```
POST /api/trpc/[trpc]           → All tRPC procedures
```

### Example Procedures
```
boarder.getAll
boarder.getById
boarder.create
boarder.update
boarder.delete
boarder.assignRoom

room.getAll
room.getById
room.getAvailable
room.create
room.update
room.delete

payment.getAll
payment.getById
payment.getByBoarder
payment.create
payment.markAsPaid
payment.delete

dashboard.getStats
dashboard.getRevenueData
dashboard.getOccupancyData

user.updateProfile
user.updateSettings
user.changePassword

utility.recordReading
utility.getHistory
utility.calculate
```

---

## 🚀 Deployment URLs

### Production
```
Landing:    https://boardinghouse.com
Web App:    https://app.boardinghouse.com
Admin:      https://admin.boardinghouse.com
API:        https://api.boardinghouse.com
```

### Staging
```
Landing:    https://staging.boardinghouse.com
Web App:    https://app-staging.boardinghouse.com
Admin:      https://admin-staging.boardinghouse.com
API:        https://api-staging.boardinghouse.com
```

### Development
```
Landing:    http://localhost:3000
Web App:    http://localhost:3001
Admin:      http://localhost:3002
API:        http://localhost:4000
```