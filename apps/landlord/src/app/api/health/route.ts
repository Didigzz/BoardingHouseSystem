import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Health check endpoint for the Landlord app
 */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    app: {
      name: '@bhms/landlord',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    },
    urls: {
      landlord: process.env.LANDLORD_URL || 'http://localhost:3005',
      api: process.env.API_URL || 'http://localhost:3001',
    },
  });
}
