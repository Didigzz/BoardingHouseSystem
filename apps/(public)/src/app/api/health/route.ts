import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Health check endpoint for the Public app
 * Returns current status, timestamp, and app info
 */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    app: {
      name: '@bhms/public',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    },
    urls: {
      public: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
      api: process.env.API_URL || 'http://localhost:3001',
    },
  });
}
