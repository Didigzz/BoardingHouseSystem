import express from "express";
import type { Express } from "express";
import cors from "cors";
import { createContext } from "./context";
import { ORPCError } from "@orpc/server";
import { authMiddleware } from "./middleware/auth";
import { z } from "zod";
import { db } from "@bhms/database";

// Simple procedure builder
const publicProcedure = {
  query: (fn: any) => fn,
  mutation: (fn: any) => fn,
  input: (schema: any) => ({
    query: (fn: any) => fn,
    mutation: (fn: any) => fn,
  }),
  use: (middleware: any) => ({
    query: (fn: any) => fn,
    mutation: (fn: any) => fn,
    input: (schema: any) => ({
      query: (fn: any) => fn,
      mutation: (fn: any) => fn,
    }),
  }),
};

const app: Express = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
      "http://localhost:8081",
    ],
    credentials: true,
  })
);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Create a simple HTTP endpoint for testing
app.all("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API server is running",
    timestamp: new Date().toISOString(),
  });
});

// Auth middleware for all oRPC routes
app.use("/orpc", authMiddleware);

// Create protected procedure with auth check
const protectedProcedure = publicProcedure.use(
  async ({ context, next }: { context: any; next: any }) => {
    if (!context.session || !(context.session as any).user) {
      throw new ORPCError("UNAUTHORIZED", {
        message: "You must be logged in to access this resource",
      });
    }

    return next({
      context: {
        ...context,
        session: context.session,
      },
    });
  }
);

// Create simple inline routers to get server running
const createBoarderRouter = (protectedProcedure: any) => ({
  getAll: protectedProcedure.query(async ({ context }: any) => {
    const boarders = await context.db.boarder.findMany({
      include: { room: true },
      take: 10,
    });
    return {
      boarders,
      pagination: { page: 1, limit: 10, total: boarders.length, totalPages: 1 },
    };
  }),
});

const createRoomRouter = (protectedProcedure: any) => ({
  getAll: protectedProcedure.query(async ({ context }: any) => {
    const rooms = await context.db.room.findMany();
    return { rooms };
  }),
});

const createPaymentRouter = (protectedProcedure: any) => ({
  getAll: protectedProcedure.query(async ({ context }: any) => {
    const payments = await context.db.payment.findMany({ take: 10 });
    return { payments };
  }),
});

const createUserRouter = (protectedProcedure: any) => ({
  getAll: protectedProcedure.query(async ({ context }: any) => {
    const users = await context.db.user.findMany({ take: 10 });
    return { users };
  }),
});

const createUtilityRouter = (protectedProcedure: any) => ({
  getAll: protectedProcedure.query(async ({ context }: any) => {
    const utilities = await context.db.utility.findMany({ take: 10 });
    return { utilities };
  }),
});

const createDashboardRouter = (protectedProcedure: any) => ({
  getStats: protectedProcedure.query(async ({ context }: any) => {
    const [boarders, rooms] = await Promise.all([
      context.db.boarder.count(),
      context.db.room.count(),
    ]);
    return { totalBoarders: boarders, totalRooms: rooms };
  }),
});

// Create app router with protected procedure
const appRouter = {
  boarder: createBoarderRouter(protectedProcedure),
  payment: createPaymentRouter(protectedProcedure),
  room: createRoomRouter(protectedProcedure),
  utility: createUtilityRouter(protectedProcedure),
  user: createUserRouter(protectedProcedure),
  dashboard: createDashboardRouter(protectedProcedure),
};

// Simple endpoint to test database connection
app.post("/api/boarders", async (req, res) => {
  try {
    const context = await createContext({ req, res });
    const router = (appRouter as any).boarder;
    if (router?.getAll) {
      const result = await router.getAll({
        context,
        input: {},
      });
      res.json(result);
    } else {
      res.status(500).json({ error: "Router not available" });
    }
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : "Something went wrong",
    });
  }
});

// oRPC endpoint (simplified)
app.all("/orpc/*", async (req, res) => {
  try {
    const path = req.path.replace("/orpc", "").split("/").filter(Boolean);
    const procedure = path[0] as string;
    const action = path[1] as string;

    const context = await createContext({ req, res });
    const input = req.body;

    let result;
    const router = (appRouter as any)[procedure];

    if (procedure && action && router?.[action]) {
      result = await router[action]({
        context,
        input,
      });
    } else {
      throw new Error(`Procedure ${procedure}.${action} not found`);
    }

    res.json(result);
  } catch (error) {
    console.error("oRPC call error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : "Something went wrong",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Server error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
);

export { app, appRouter };
export type AppRouter = typeof appRouter;
