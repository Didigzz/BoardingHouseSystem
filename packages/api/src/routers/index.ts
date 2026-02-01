import { createTRPCRouter } from "../trpc";
import { createBoarderRouter } from "./boarder.router";
import { createPaymentRouter } from "./payment.router";
import { createRoomRouter } from "./room.router";
import { createUtilityRouter } from "./utility.router";
import { createUserRouter } from "./user.router";
import { createDashboardRouter } from "./dashboard.router";

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

export type AppRouter = ReturnType<typeof createAppRouter>;

export { createBoarderRouter } from './boarder.router';
export { createPaymentRouter } from './payment.router';
export { createRoomRouter } from './room.router';
export { createUtilityRouter } from './utility.router';
export { createUserRouter } from './user.router';
export { createDashboardRouter } from './dashboard.router';