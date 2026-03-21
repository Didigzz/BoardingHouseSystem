import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import type {
  Prisma,
  Boarder,
  Room,
  Payment,
  UtilityReading,
  User,
  LandlordProfile,
  Property,
  Booking,
  SavedListing,
  Account,
  Session,
  Setting,
  UserRole,
  UserStatus,
  RoomStatus,
  PaymentStatus,
  PaymentType,
  UtilityType,
  BookingStatus,
} from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;

  // For Prisma Accelerate URLs
  if (databaseUrl?.includes("accelerate.prisma-data.net")) {
    return new PrismaClient({
      datasourceUrl: databaseUrl,
      log:
        process.env.NODE_ENV === "development"
          ? ["error", "warn"]
          : ["error"],
    });
  }

  // For serverless environments using driver adapters with standard PostgreSQL
  if (databaseUrl) {
    try {
      // Try using pg adapter for PostgreSQL
      const { Pool } = require("pg");
      const pool = new Pool({ connectionString: databaseUrl });
      const adapter = new PrismaPg(pool);
      return new PrismaClient({ adapter });
    } catch {
      // Fallback to direct connection for non-serverless
      return new PrismaClient({
        datasourceUrl: databaseUrl,
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      });
    }
  }

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Re-export Prisma types
export type {
  Prisma,
  PrismaClient as PrismaClientType,
  Boarder,
  Room,
  Payment,
  UtilityReading,
  User,
  LandlordProfile,
  Property,
  Booking,
  SavedListing,
  Account,
  Session,
  Setting,
  UserRole,
  UserStatus,
  RoomStatus,
  PaymentStatus,
  PaymentType,
  UtilityType,
  BookingStatus,
};
