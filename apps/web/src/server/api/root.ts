import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import {
  roomRouter,
  boarderRouter,
  paymentRouter,
  utilityRouter,
  dashboardRouter,
  userRouter,
} from "./routers";

export const appRouter = createTRPCRouter({
  room: roomRouter,
  boarder: boarderRouter,
  payment: paymentRouter,
  utility: utilityRouter,
  dashboard: dashboardRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
