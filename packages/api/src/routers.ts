import { createRoomRouter as createModularRoomRouter } from './modules/room';
import { createBoarderRouter as createModularBoarderRouter } from './modules/boarder';
import { createPaymentRouter as createModularPaymentRouter } from './modules/payment';
import { createUtilityRouter as createModularUtilityRouter } from './modules/utility';
import { createUserRouter as createModularUserRouter } from './modules/user';
import { createDashboardRouter as createModularDashboardRouter } from './modules/dashboard';

/**
 * Factory function to create the app router with platform-specific procedures
 * This allows different platforms (web, mobile) to provide their own auth middleware
 */
export const createAppRouter = (protectedProcedure: any) => {
  return {
    boarder: createModularBoarderRouter(protectedProcedure),
    payment: createModularPaymentRouter(protectedProcedure),
    room: createModularRoomRouter(protectedProcedure),
    utility: createModularUtilityRouter(protectedProcedure),
    user: createModularUserRouter(protectedProcedure),
    dashboard: createModularDashboardRouter(protectedProcedure),
  };
};

// Export the type - this will be inferred from the actual implementation
export type AppRouter = ReturnType<typeof createAppRouter>;
