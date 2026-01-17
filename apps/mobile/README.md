# BHMS Mobile App

React Native mobile application for the Boarding House Management System built with Expo.

## Design System

Based on UI/UX Pro Max recommendations:

### Color Palette (Real Estate/Property)
- **Primary:** Teal (#0F766E) - Trust & Property
- **Secondary:** Blue (#2563EB) - Trust
- **CTA:** Orange (#F97316) - Action
- **Background:** Light Gray (#F8FAFC)
- **Text:** Dark Slate (#1E293B)

### Typography (Modern Professional)
- **Headings:** Poppins (geometric, modern)
- **Body:** Open Sans (humanist, readable)

### Style
- Clean minimalist design
- Soft shadows for depth
- Rounded corners (12-16px)
- Consistent spacing scale

## Features

### For Landlords
- Dashboard with occupancy stats & revenue
- Room management (CRUD, status tracking)
- Boarder management (profiles, access codes)
- Payment tracking (rent, utilities)
- Settings & preferences

### For Boarders
- Home with room info & announcements
- Payment history & status
- Profile management
- Access code authentication

## Project Structure

```
apps/mobile/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── access-code.tsx
│   ├── (landlord)/        # Landlord tab screens
│   │   ├── dashboard.tsx
│   │   ├── rooms.tsx
│   │   ├── boarders.tsx
│   │   ├── payments.tsx
│   │   └── settings.tsx
│   ├── (boarder)/         # Boarder tab screens
│   │   ├── home.tsx
│   │   ├── payments.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Welcome screen
├── src/
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── Badge.tsx
│   └── lib/
│       ├── theme.ts       # Design tokens
│       ├── store.ts       # Zustand stores
│       └── trpc.ts        # tRPC client setup
├── assets/
│   └── fonts/             # Custom fonts
├── app.json               # Expo config
├── package.json
└── tsconfig.json
```

## Setup

### Prerequisites
- Node.js 20+
- pnpm 9+
- Expo CLI
- iOS Simulator / Android Emulator

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Download fonts from Google Fonts and place in `assets/fonts/`:
   - Poppins (Regular, Medium, SemiBold, Bold)
   - Open Sans (Regular, Medium, SemiBold)

3. Start the development server:
```bash
pnpm start
```

4. Run on device/simulator:
```bash
# iOS
pnpm ios

# Android
pnpm android
```

## API Integration

The app uses tRPC for type-safe API calls. Configure the API URL in `src/lib/trpc.ts`.

Authentication tokens are stored securely using `expo-secure-store`.

## State Management

- **Zustand** for client state (auth, theme)
- **TanStack Query** (via tRPC) for server state

## Navigation

Uses Expo Router with file-based routing:
- Tab navigation for main screens
- Stack navigation for auth flow
- Type-safe navigation with TypeScript

## Accessibility

- Proper contrast ratios (WCAG AA)
- Touch targets ≥ 44px
- Screen reader support
- Reduced motion support
