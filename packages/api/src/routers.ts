import { createTRPCRouter } from './trpc';
import {
  createBoarderRouter,
  createPaymentRouter,
  createRoomRouter,
  createUtilityRouter,
  createUserRouter,
  createDashboardRouter,
  createAdminRouter,
  createPropertyRouter,
  createBookingRouter,
} from './routers/index';

/**
 * Factory function to create the app router with platform-specific procedures
 * This allows different platforms (web, mobile) to provide their own auth middleware
 * 
 * @param protectedProcedure - Base protected procedure requiring authentication
 * @param adminProcedure - Admin-only procedure (optional, defaults to protectedProcedure)
 * @param landlordProcedure - Landlord-only procedure (optional, defaults to protectedProcedure)
 * @param boarderProcedure - Boarder-only procedure (optional, defaults to protectedProcedure)
 */
export const createAppRouter = (
  protectedProcedure: any,
  adminProcedure?: any,
  landlordProcedure?: any,
  boarderProcedure?: any
) => {
  return createTRPCRouter({
    boarder: createBoarderRouter(protectedProcedure),
    payment: createPaymentRouter(protectedProcedure),
    room: createRoomRouter(protectedProcedure),
    utility: createUtilityRouter(protectedProcedure),
    user: createUserRouter(protectedProcedure),
    dashboard: createDashboardRouter(protectedProcedure),
    admin: createAdminRouter(protectedProcedure, adminProcedure || protectedProcedure),
    property: createPropertyRouter(protectedProcedure, landlordProcedure),
    booking: createBookingRouter(protectedProcedure, boarderProcedure, landlordProcedure),
  });
};

// Export the type - this will be inferred from the actual implementation
export type AppRouter = ReturnType<typeof createAppRouter>;
