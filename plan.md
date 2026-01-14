# Boarding House System - Project Restructure & Migration Plan

## Executive Summary

This document provides a comprehensive plan to restructure the Boarding House System monorepo from its current Next.js-centric architecture to a scalable, platform-agnostic structure that supports web, mobile, and future platforms.

---

## Current Problems

### 1. **Architectural Issues**

- Backend API logic embedded in `apps/(landlord-page)`, making it impossible to share with mobile
- Business logic (entities, features) locked inside a single Next.js app
- No clear separation between presentation and business logic layers
- Multiple duplicate Next.js apps with redundant configurations

### 2. **Scalability Blockers**

- Cannot add mobile application without duplicating business logic
- Tight coupling between frontend and backend code
- Feature-Sliced Design (FSD) architecture applied at app level instead of shared level
- No path to extract microservices or add new platforms

### 3. **Code Organization**

- Confusing folder names with parentheses: `(admin)`, `(boarder-page)`, `(landing-page)`
- Duplicate boilerplate across apps
- tRPC routers mixed with Next.js-specific code
- Shared utilities and types scattered across the codebase

### 4. **Team Collaboration Issues**

- Frontend and backend code intertwined
- Difficult to work on mobile without affecting web
- No clear ownership boundaries for different teams

---

## Proposed Project Structure

```
BoardingHouseSystem/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-landing.yml
│       ├── deploy-web.yml
│       └── test.yml
│
├── apps/
│   ├── admin/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── users/
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/
│   │   │   │   ├── charts/
│   │   │   │   ├── tables/
│   │   │   │   └── index.ts
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts
│   │   │   │   └── config.ts
│   │   │   └── providers.tsx
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   └── postcss.config.js
│   │
│   ├── landing/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── contact/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── pricing/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── features/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── blog/
│   │   │   │   │   ├── [slug]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/
│   │   │   │   ├── sections/
│   │   │   │   │   ├── CTA.tsx
│   │   │   │   │   ├── FAQ.tsx
│   │   │   │   │   ├── Features.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Hero.tsx
│   │   │   │   │   ├── HowItWorks.tsx
│   │   │   │   │   ├── Pricing.tsx
│   │   │   │   │   ├── Testimonials.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── ui/
│   │   │   │       ├── accordion.tsx
│   │   │   │       ├── badge.tsx
│   │   │   │       ├── button.tsx
│   │   │   │       ├── card.tsx
│   │   │   │       ├── input.tsx
│   │   │   │       └── index.ts
│   │   │   ├── lib/
│   │   │   │   └── utils.ts
│   │   │   └── assets/
│   │   │       ├── images/
│   │   │       └── icons/
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   ├── robots.txt
│   │   │   └── sitemap.xml
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── next-env.d.ts
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   └── .eslintrc.js
│   │
│   ├── mobile/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── common/
│   │   │   │   ├── forms/
│   │   │   │   └── cards/
│   │   │   ├── lib/
│   │   │   │   ├── api.ts
│   │   │   │   └── utils.ts
│   │   │   ├── navigation/
│   │   │   │   ├── AppNavigator.tsx
│   │   │   │   ├── AuthNavigator.tsx
│   │   │   │   └── types.ts
│   │   │   ├── screens/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginScreen.tsx
│   │   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   │   └── ForgotPasswordScreen.tsx
│   │   │   │   ├── boarder/
│   │   │   │   │   ├── DashboardScreen.tsx
│   │   │   │   │   ├── PaymentsScreen.tsx
│   │   │   │   │   ├── ProfileScreen.tsx
│   │   │   │   │   └── NotificationsScreen.tsx
│   │   │   │   └── landlord/
│   │   │   │       ├── DashboardScreen.tsx
│   │   │   │       ├── BoardersScreen.tsx
│   │   │   │       ├── RoomsScreen.tsx
│   │   │   │       ├── PaymentsScreen.tsx
│   │   │   │       └── UtilitiesScreen.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useTheme.ts
│   │   │   ├── store/
│   │   │   │   └── index.ts
│   │   │   ├── App.tsx
│   │   │   └── index.tsx
│   │   ├── android/
│   │   ├── ios/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── babel.config.js
│   │   └── metro.config.js
│   │
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/
│       │   │   │   ├── auth/
│       │   │   │   │   ├── [...nextauth]/
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── boarder-access/
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── verify-email/
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── reset-password/
│       │   │   │   │       └── route.ts
│       │   │   │   └── trpc/
│       │   │   │       └── [trpc]/
│       │   │   │           └── route.ts
│       │   │   ├── (auth)/
│       │   │   │   ├── boarder-access/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── login/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── register/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── forgot-password/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── reset-password/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── layout.tsx
│       │   │   │   ├── landlord/
│       │   │   │   │   ├── boarders/
│       │   │   │   │   │   ├── [id]/
│       │   │   │   │   │   │   ├── edit/
│       │   │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   ├── loading.tsx
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── payments/
│       │   │   │   │   │   ├── [id]/
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   ├── loading.tsx
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── rooms/
│       │   │   │   │   │   ├── [id]/
│       │   │   │   │   │   │   ├── edit/
│       │   │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   ├── loading.tsx
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── utilities/
│       │   │   │   │   │   ├── electricity/
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   ├── water/
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── reports/
│       │   │   │   │   │   ├── revenue/
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   ├── occupancy/
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── settings/
│       │   │   │   │   │   ├── profile/
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   ├── billing/
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   ├── notifications/
│       │   │   │   │   │   │   └── page.tsx
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── loading.tsx
│       │   │   │   │   ├── layout.tsx
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── layout.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── unauthorized/
│       │   │   │   └── page.tsx
│       │   │   ├── error.tsx
│       │   │   ├── layout.tsx
│       │   │   ├── loading.tsx
│       │   │   ├── not-found.tsx
│       │   │   ├── page.tsx
│       │   │   └── globals.css
│       │   ├── components/
│       │   │   ├── layouts/
│       │   │   │   ├── DashboardLayout.tsx
│       │   │   │   ├── AuthLayout.tsx
│       │   │   │   └── index.ts
│       │   │   └── navigation/
│       │   │       ├── Breadcrumbs.tsx
│       │   │       ├── Navigation.tsx
│       │   │       └── index.ts
│       │   ├── lib/
│       │   │   ├── auth.ts
│       │   │   ├── config.ts
│       │   │   ├── trpc-client.ts
│       │   │   ├── trpc-react.tsx
│       │   │   ├── trpc-server-api.ts
│       │   │   ├── trpc-server.ts
│       │   │   └── utils.ts
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── boarder-access-form.tsx
│       │   │   │   │   ├── login-form.tsx
│       │   │   │   │   ├── logout-button.tsx
│       │   │   │   │   ├── register-form.tsx
│       │   │   │   │   ├── forgot-password-form.tsx
│       │   │   │   │   ├── reset-password-form.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── boarders/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── add-boarder-dialog.tsx
│       │   │   │   │   ├── assign-room-dialog.tsx
│       │   │   │   │   ├── boarder-detail-view.tsx
│       │   │   │   │   ├── boarder-detail.tsx
│       │   │   │   │   ├── boarder-filters.tsx
│       │   │   │   │   ├── boarder-list.tsx
│       │   │   │   │   ├── boarder-table.tsx
│       │   │   │   │   ├── delete-boarder-dialog.tsx
│       │   │   │   │   ├── edit-boarder-dialog.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── dashboard/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── occupancy-chart.tsx
│       │   │   │   │   ├── occupancy-overview.tsx
│       │   │   │   │   ├── recent-activity.tsx
│       │   │   │   │   ├── revenue-chart.tsx
│       │   │   │   │   ├── stats-cards.tsx
│       │   │   │   │   ├── upcoming-payments.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── payments/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── add-payment-dialog.tsx
│       │   │   │   │   ├── mark-paid-dialog.tsx
│       │   │   │   │   ├── payment-filters.tsx
│       │   │   │   │   ├── payment-history-chart.tsx
│       │   │   │   │   ├── payment-list.tsx
│       │   │   │   │   ├── payment-summary-card.tsx
│       │   │   │   │   ├── payment-table.tsx
│       │   │   │   │   ├── payment-details.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── rooms/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── add-room-dialog.tsx
│       │   │   │   │   ├── delete-room-dialog.tsx
│       │   │   │   │   ├── edit-room-dialog.tsx
│       │   │   │   │   ├── room-detail-view.tsx
│       │   │   │   │   ├── room-detail.tsx
│       │   │   │   │   ├── room-filters.tsx
│       │   │   │   │   ├── room-grid.tsx
│       │   │   │   │   ├── room-list.tsx
│       │   │   │   │   ├── room-occupancy-chart.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   └── utilities/
│       │   │       ├── ui/
│       │   │       │   ├── utility-meter-form.tsx
│       │   │       │   ├── utility-history.tsx
│       │   │       │   ├── utility-calculator.tsx
│       │   │       │   └── index.ts
│       │   │       └── index.ts
│       │   ├── widgets/
│       │   │   ├── footer/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── footer.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── header/
│       │   │   │   ├── ui/
│       │   │   │   │   ├── header.tsx
│       │   │   │   │   ├── mobile-nav.tsx
│       │   │   │   │   ├── user-menu.tsx
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   └── sidebar/
│       │   │       ├── ui/
│       │   │       │   ├── sidebar-item.tsx
│       │   │       │   ├── sidebar-nav.tsx
│       │   │       │   ├── sidebar.tsx
│       │   │       │   └── index.ts
│       │   │       └── index.ts
│       │   ├── hooks/
│       │   │   ├── useAuth.ts
│       │   │   ├── useUser.ts
│       │   │   └── index.ts
│       │   ├── middleware.ts
│       │   └── providers.tsx
│       ├── public/
│       │   ├── favicon.ico
│       │   └── assets/
│       ├── package.json
│       ├── next.config.js
│       ├── next-env.d.ts
│       ├── tsconfig.json
│       ├── tailwind.config.ts
│       ├── postcss.config.js
│       ├── components.json
│       ├── .env
│       ├── .env.example
│       └── .eslintrc.js
│
├── packages/
│   ├── api/
│   │   ├── src/
│   │   │   ├── services/
│   │   │   │   ├── boarder.service.ts
│   │   │   │   ├── payment.service.ts
│   │   │   │   ├── room.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── utility.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── error.middleware.ts
│   │   │   │   ├── logger.middleware.ts
│   │   │   │   └── index.ts
│   │   │   ├── routers/
│   │   │   │   ├── boarder.router.ts
│   │   │   │   ├── dashboard.router.ts
│   │   │   │   ├── payment.router.ts
│   │   │   │   ├── room.router.ts
│   │   │   │   ├── user.router.ts
│   │   │   │   ├── utility.router.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── errors.ts
│   │   │   │   └── helpers.ts
│   │   │   ├── index.ts
│   │   │   ├── routers.ts
│   │   │   └── trpc.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── auth/
│   │   ├── src/
│   │   │   ├── guards/
│   │   │   │   ├── role.guard.ts
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── index.ts
│   │   │   ├── providers/
│   │   │   │   ├── credentials.provider.ts
│   │   │   │   ├── google.provider.ts
│   │   │   │   └── index.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── session.strategy.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── hash.ts
│   │   │   │   ├── token.ts
│   │   │   │   └── index.ts
│   │   │   ├── config.ts
│   │   │   ├── guards.ts
│   │   │   ├── middleware.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── database/
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   ├── seed.ts
│   │   │   └── schema.prisma
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── .env
│   │   └── .eslintrc.js
│   │
│   ├── shared/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── constants.ts
│   │   │   │   ├── formatters.ts
│   │   │   │   ├── hooks.ts
│   │   │   │   ├── utils.ts
│   │   │   │   ├── validators.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── common.ts
│   │   │   │   ├── api.ts
│   │   │   │   └── index.ts
│   │   │   ├── entities/
│   │   │   │   ├── boarder/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── utils.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── payment/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── utils.ts
│   │   │   │   │   │   ├── constants.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── room/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── utils.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── user/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── utility/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── features/
│   │   │   │   ├── boarder-management/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── hooks.ts
│   │   │   │   │   │   ├── store.ts
│   │   │   │   │   │   ├── boarder-store.ts
│   │   │   │   │   │   ├── use-boarders.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── payment-processing/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── hooks.ts
│   │   │   │   │   │   ├── store.ts
│   │   │   │   │   │   ├── calculator.ts
│   │   │   │   │   │   ├── payment-store.ts
│   │   │   │   │   │   ├── use-payments.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── room-management/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── hooks.ts
│   │   │   │   │   │   ├── store.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── utility-tracking/
│   │   │   │   │   ├── model/
│   │   │   │   │   │   ├── types.ts
│   │   │   │   │   │   ├── hooks.ts
│   │   │   │   │   │   ├── store.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── composite/
│   │   │   │   │   ├── BoarderCard/
│   │   │   │   │   │   ├── BoarderCard.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── PaymentCard/
│   │   │   │   │   │   ├── PaymentCard.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── RoomCard/
│   │   │   │   │   │   ├── RoomCard.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── StatsCard/
│   │   │   │   │   │   ├── StatsCard.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── primitives/
│   │   │   │   │   ├── accordion.tsx
│   │   │   │   │   ├── alert-dialog.tsx
│   │   │   │   │   ├── avatar.tsx
│   │   │   │   │   ├── badge.tsx
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── calendar.tsx
│   │   │   │   │   ├── card.tsx
│   │   │   │   │   ├── checkbox.tsx
│   │   │   │   │   ├── command.tsx
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

---

## Why This Structure Is Better

### 1. **Platform Independence**

**Problem Solved:** Backend logic locked in Next.js app

**Benefits:**

- `packages/api` works with web, mobile, desktop, or even CLI
- `packages/shared` contains business logic usable anywhere
- Easy to add React Native, Flutter, or native iOS/Android apps
- Can deploy standalone API server without Next.js

**Example:**

```typescript
// Both web and mobile use the same API
// apps/web/src/lib/trpc-client.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@repo/api";

// apps/mobile/src/lib/trpc-client.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@repo/api";
```

### 2. **Code Reusability**

**Problem Solved:** Duplicate business logic across apps

**Benefits:**

- Write business rules once in `packages/shared`
- Share UI components via `packages/ui`
- Consistent validation across all platforms via `packages/validation`
- Single source of truth for types and schemas

**Example:**

```typescript
// packages/shared/src/features/payment-processing/model/hooks.ts
export function usePaymentCalculation(roomId: string) {
  // Business logic here - works on web AND mobile
}

// apps/web/src/app/(dashboard)/landlord/payments/page.tsx
import { usePaymentCalculation } from "@repo/shared/features/payment-processing";

// apps/mobile/src/screens/landlord/PaymentsScreen.tsx
import { usePaymentCalculation } from "@repo/shared/features/payment-processing";
```

### 3. **Clear Separation of Concerns**

**Problem Solved:** Mixed responsibilities in single codebase

**Layers:**

```
┌─────────────────────────────────────────┐
│  Presentation Layer (apps/*)            │  ← Platform-specific UI
├─────────────────────────────────────────┤
│  API Layer (packages/api)               │  ← tRPC routers, services
├─────────────────────────────────────────┤
│  Business Logic (packages/shared)       │  ← Domain models, features
├─────────────────────────────────────────┤
│  Data Layer (packages/database)         │  ← Prisma, DB access
└─────────────────────────────────────────┘
```

**Benefits:**

- Frontend developers work in `apps/` without touching backend
- Backend developers work in `packages/api` and `packages/database`
- Business logic team focuses on `packages/shared`
- Clear boundaries reduce merge conflicts

### 4. **Scalability**

**Problem Solved:** Monolithic structure hard to scale

**Horizontal Scaling:**

- Add new platforms easily: `apps/desktop`, `apps/tablet-kiosk`
- Extract microservices: Move `packages/api/routers/payment.ts` → `services/payment-service`
- Split databases: Separate read/write replicas in `packages/database`

**Vertical Scaling:**

- Add features without affecting existing code
- Independent deployment of apps (web can deploy without mobile)
- Gradual migration path (no big-bang rewrite needed)

**Example Growth Path:**

```
Year 1: Web app only
Year 2: Add mobile app (reuse 80% of logic)
Year 3: Add admin dashboard (reuse API + business logic)
Year 4: Extract payment service (move to microservice)
Year 5: Add desktop app (reuse everything)
```

### 5. **Better Testing**

**Problem Solved:** Difficult to test business logic separately from UI

**Benefits:**

- Test business logic in `packages/shared` without rendering UI
- Test API endpoints in `packages/api` without Next.js
- Mock dependencies easily with clean boundaries
- Integration tests can target specific layers

**Example:**

```typescript
// packages/shared/src/features/payment-processing/model/calculator.test.ts
import { calculateUtilityBill } from "./calculator";

describe("calculateUtilityBill", () => {
  it("should calculate correctly", () => {
    // Pure business logic testing - no UI needed
  });
});

// packages/api/src/routers/payment.router.test.ts
import { appRouter } from "../root";

describe("Payment Router", () => {
  it("should create payment", async () => {
    // API testing without Next.js
  });
});
```

### 6. **Team Collaboration**

**Problem Solved:** Everyone working in same codebase causes conflicts

**Team Structure:**

```
Frontend Team (Web)     → apps/web + packages/ui
Frontend Team (Mobile)  → apps/mobile + packages/ui
Backend Team            → packages/api + packages/database
Business Logic Team     → packages/shared
DevOps Team             → services/* + docker + scripts
```

**Benefits:**

- Teams work in separate directories
- Clear ownership and responsibility
- Parallel development without blocking
- Easy to onboard new team members

### 7. **Deployment Flexibility**

**Problem Solved:** Monolithic deployment, all-or-nothing releases

**Deployment Options:**

```
Option 1 (Current): Vercel (Next.js with API routes)
apps/web → Vercel

Option 2 (Separate): Web on Vercel, API on Railway/Fly.io
apps/web → Vercel
services/api-server → Railway (wraps packages/api)

Option 3 (Mobile): Expo + separate API
apps/mobile → Expo/App Store
services/api-server → Railway

Option 4 (Microservices): Multiple specialized services
apps/web → Vercel
services/payment-service → Railway
services/notification-service → Railway
services/analytics-service → Railway
```

### 8. **Technology Independence**

**Problem Solved:** Locked into Next.js for everything

**Freedom to Choose:**

- Replace Next.js with Remix/Astro for `apps/landing` (marketing site)
- Use Expo for `apps/mobile` without affecting web
- Swap tRPC for REST/GraphQL in `packages/api` if needed
- Try different UI libraries per platform

### 9. **Developer Experience**

**Problem Solved:** Confusing structure, unclear where to put code

**Clear Mental Model:**

```
Need to add a feature?
1. Define types → packages/validation
2. Add DB model → packages/database
3. Create API endpoint → packages/api
4. Add business logic → packages/shared
5. Build UI (web) → apps/web
6. Build UI (mobile) → apps/mobile
```

**Benefits:**

- New developers know exactly where code goes
- Consistent patterns across the codebase
- Auto-imports work correctly
- Turborepo caching speeds up builds

### 10. **Future-Proof Architecture**

**Problem Solved:** Hard to adapt to new requirements

**Flexibility for:**

- **Multi-tenancy:** Add `packages/tenant-isolation`
- **Real-time features:** Add `packages/websocket`
- **Offline-first mobile:** Business logic already separated
- **White-labeling:** Share core logic, customize UI per tenant
- **API versioning:** Easily create v2 routers
- **GraphQL migration:** Wrap `packages/api` services with GraphQL layer

---

## Migration Plan

### Phase 1: Foundation (Week 1-2)

**Goal:** Set up new structure without breaking existing app

**Tasks:**

1. Create new folder structure
2. Set up packages: `database`, `validation`, `config`
3. Configure monorepo tooling (Turborepo, pnpm workspaces)
4. Set up shared TypeScript configs
5. Migrate Prisma schema to `packages/database`

**Commands:**

```bash
# Create new structure
mkdir -p packages/{database,validation,config,api,shared,auth,ui}
mkdir -p apps/{web,mobile,admin,landing}

# Initialize packages
cd packages/database && pnpm init
cd ../validation && pnpm init
# ... repeat for all packages

# Move Prisma
mv apps/\(landlord-page\)/prisma packages/database/

# Update package.json dependencies
```

**Verification:**

- [ ] All packages have correct dependencies
- [ ] Prisma generates types correctly
- [ ] TypeScript compiles without errors
- [ ] Existing app still runs

### Phase 2: Extract Database Layer (Week 2-3)

**Goal:** Centralize all database access

**Tasks:**

1. Move Prisma schema to `packages/database`
2. Create database client wrapper
3. Export types from `packages/database`
4. Update all imports in existing app

**Code Changes:**

```typescript
// packages/database/src/client.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// packages/database/src/index.ts
export { db } from "./client";
export * from "@prisma/client";
```

**Update imports across codebase:**

```typescript
// Before
import { db } from "~/server/db/client";

// After
import { db } from "@repo/database";
```

**Verification:**

- [ ] Database client works from all packages
- [ ] Types are correctly exported
- [ ] Existing queries work unchanged
- [ ] Can run migrations from root

### Phase 3: Extract Validation Layer (Week 3)

**Goal:** Share validation schemas across all platforms

**Tasks:**

1. Create `packages/validation`
2. Move all Zod schemas from entities
3. Export schemas and types
4. Update imports

**Code Changes:**

```typescript
// packages/validation/src/boarder.schemas.ts
import { z } from "zod";

export const createBoarderSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  // ... rest of schema
});

export const updateBoarderSchema = createBoarderSchema.partial();

export type CreateBoarderInput = z.infer<typeof createBoarderSchema>;
export type UpdateBoarderInput = z.infer<typeof updateBoarderSchema>;

// packages/validation/src/index.ts
export * from "./boarder.schemas";
export * from "./payment.schemas";
export * from "./room.schemas";
export * from "./user.schemas";
export * from "./utility.schemas";
```

**Verification:**

- [ ] Schemas work in API validation
- [ ] Schemas work in form validation
- [ ] Types are correctly inferred
- [ ] No duplicate schema definitions

### Phase 4: Extract API Layer (Week 4-5)

**Goal:** Make backend independent of Next.js

**Tasks:**

1. Create `packages/api`
2. Move tRPC routers from `apps/(landlord-page)/src/server/api/routers`
3. Move services/business logic
4. Create standalone tRPC context
5. Update web app to consume package

**Code Changes:**

```typescript
// packages/api/src/routers/boarder.router.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createBoarderSchema } from "@repo/validation";
import { db } from "@repo/database";

export const boarderRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return db.boarder.findMany({
      where: { landlordId: ctx.session.user.id },
    });
  }),

  create: protectedProcedure
    .input(createBoarderSchema)
    .mutation(async ({ ctx, input }) => {
      return db.boarder.create({
        data: {
          ...input,
          landlordId: ctx.session.user.id,
        },
      });
    }),
});

// packages/api/src/root.ts
import { boarderRouter } from "./routers/boarder.router";
import { paymentRouter } from "./routers/payment.router";
// ... other routers

export const appRouter = createTRPCRouter({
  boarder: boarderRouter,
  payment: paymentRouter,
  // ... other routers
});

export type AppRouter = typeof appRouter;

// apps/web/src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@repo/api";

// Thin adapter layer only
```

**Verification:**

- [ ] All API routes work from web app
- [ ] tRPC types are correctly inferred
- [ ] Context (auth) works correctly
- [ ] Error handling works
- [ ] Can test API without Next.js

### Phase 5: Extract Shared Business Logic (Week 5-6)

**Goal:** Create platform-agnostic business logic

**Tasks:**

1. Create `packages/shared`
2. Move entities from `apps/(landlord-page)/src/entities`
3. Move features from `apps/(landlord-page)/src/features`
4. Remove UI components (keep model/types only)
5. Create reusable hooks and utilities

**Code Changes:**

```typescript
// packages/shared/src/entities/payment/model/types.ts
export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  dueDate: Date;
  // ... other fields
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

// packages/shared/src/features/payment-processing/model/calculator.ts
export function calculateTotalPayment(
  roomRate: number,
  utilities: number,
  addons: number = 0
): number {
  return roomRate + utilities + addons;
}

export function isPaymentOverdue(dueDate: Date): boolean {
  return new Date() > dueDate;
}

// packages/shared/src/features/payment-processing/model/hooks.ts
import { useMemo } from "react";
import { trpc } from "@repo/api-client"; // Platform-agnostic tRPC client

export function usePaymentSummary(landlordId: string) {
  const { data: payments } = trpc.payment.getAll.useQuery({ landlordId });

  return useMemo(() => {
    const total = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0;
    const pending = payments?.filter((p) => p.status === "PENDING").length ?? 0;
    const overdue =
      payments?.filter((p) => isPaymentOverdue(p.dueDate)).length ?? 0;

    return { total, pending, overdue };
  }, [payments]);
}
```

**Verification:**

- [ ] Business logic works without UI
- [ ] Can unit test logic easily
- [ ] Hooks work in both web and mobile (after mobile setup)
- [ ] No platform-specific code in shared package

### Phase 6: Extract Auth Layer (Week 7)

**Goal:** Make authentication reusable across platforms

**Tasks:**

1. Create `packages/auth`
2. Move NextAuth config
3. Create platform-agnostic auth utilities
4. Export guards and middleware

**Code Changes:**

```typescript
// packages/auth/src/config.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@repo/database";
import bcrypt from "bcryptjs";

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

// packages/auth/src/guards/landlord.guard.ts
export function requireLandlord(role: string) {
  if (role !== "LANDLORD" && role !== "ADMIN") {
    throw new Error("Unauthorized: Landlord access required");
  }
}

// packages/auth/src/guards/boarder.guard.ts
export function requireBoarder(role: string) {
  if (role !== "BOARDER" && role !== "ADMIN") {
    throw new Error("Unauthorized: Boarder access required");
  }
}
```

**Verification:**

- [ ] NextAuth works with extracted config
- [ ] Guards work in API routes
- [ ] Session management works
- [ ] Can use auth in mobile app (with different provider)

### Phase 7: Extract UI Components (Week 8-9)

**Goal:** Create shareable UI component library

**Tasks:**

1. Create `packages/ui`
2. Move shadcn/ui components
3. Create platform-agnostic versions (where possible)
4. Set up Storybook for component development
5. Export composite components (BoarderCard, RoomCard, etc.)

**Code Changes:**

```typescript
// packages/ui/src/components/primitives/Button/Button.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

// packages/ui/src/components/composite/BoarderCard/BoarderCard.tsx
import { Card } from '../../primitives/Card';
import { Avatar } from '../../primitives/Avatar';
import { Badge } from '../../primitives/Badge';

interface BoarderCardProps {
  boarder: {
    id: string;
    name: string;
    email: string;
    status: string;
    room?: { number: string };
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export function BoarderCard({ boarder, onEdit, onDelete }: BoarderCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <Avatar>{boarder.name[0]}</Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">{boarder.name}</h3>
          <p className="text-sm text-muted-foreground">{boarder.email}</p>
        </div>
        <Badge>{boarder.status}</Badge>
      </div>
    </Card>
  );
}
```
