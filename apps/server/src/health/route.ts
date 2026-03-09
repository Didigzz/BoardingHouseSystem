import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

/**
 * Health check endpoint for the API server
 * Includes database connectivity check
 */
export async function GET() {
  const healthStatus = {
    status: 'healthy' as const,
    timestamp: new Date().toISOString(),
    app: {
      name: '@bhms/api-server',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    },
    urls: {
      api: process.env.API_URL || 'http://localhost:3001',
    },
    database: {
      status: 'unknown' as const,
      error: null as string | null,
    },
  };

  // Check database connectivity
  try {
    await prisma.$connect();
    healthStatus.database.status = 'connected';
  } catch (error) {
    healthStatus.status = 'unhealthy';
    healthStatus.database.status = 'disconnected';
    healthStatus.database.error = error instanceof Error ? error.message : 'Unknown error';
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(healthStatus);
}
