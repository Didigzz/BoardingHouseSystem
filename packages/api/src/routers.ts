import { createTRPCRouter } from './trpc';
import {
  createBoarderRouter,
  createPaymentRouter,
  createRoomRouter,
  createUtilityRouter,
  createUserRouter,
  createDashboardRouter,
} from './routers/index';

/**
 * Factory function to create the app router with platform-specific procedures
 * This allows different platforms (web, mobile) to provide their own auth middleware
 */
export const createAppRouter = (protectedProcedure: any) => {
  return createTRPCRouter({
    boarder: createBoarderRouter(protectedProcedure),
    payment: createPaymentRouter(protectedProcedure),
    room: createRoomRouter(protectedProcedure),
    utility: createUtilityRouter(protectedProcedure),
    user: createUserRouter(protectedProcedure),
    dashboard: createDashboardRouter(protectedProcedure),
  });
};

// Export the type - this will be inferred from the actual implementation
export type AppRouter = ReturnType<typeof createAppRouter>;
