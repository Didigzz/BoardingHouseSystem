import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Health check endpoint for the Boarder app
 */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    app: {
      name: '@bhms/boarder',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    },
    urls: {
      boarder: process.env.BOARDER_URL || 'http://localhost:3004',
      api: process.env.API_URL || 'http://localhost:3001',
    },
  });
}
