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
      accelerateUrl: databaseUrl,
      log:
        process.env.NODE_ENV === "development"
          ? ["error", "warn"]
          : ["error"],
    });
  }

  // For serverless environments using driver adapters with standard PostgreSQL
  if (databaseUrl) {
    const { Pool } = require("pg");
    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  }

  // No database URL available
  throw new Error(
    "DATABASE_URL environment variable is not set. " +
      "Please ensure DATABASE_URL is configured in your environment."
  );
}

// Lazy initialization - PrismaClient is only created when first accessed
function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Create a proxy that lazily initializes the PrismaClient on first access
// This allows the module to be imported at build time without requiring DATABASE_URL
export const db = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    return (client as any)[prop];
  },
});

// Keep the hot-reload for development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = getPrismaClient();
}

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
