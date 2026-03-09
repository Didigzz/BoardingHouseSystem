// Shared types for tRPC API
// This file provides type-safe access to the API router

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AnyRouter } from '@trpc/server';

// AppRouter type - defined directly to avoid circular dependencies
export type AppRouter = AnyRouter;

// Infer input and output types for all procedures
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
