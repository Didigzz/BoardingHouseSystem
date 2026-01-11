#!/bin/bash

# Setup script for BHMS development environment

set -e

echo "🚀 Setting up Boarding House Management System..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check if Docker is running
if command -v docker &> /dev/null; then
    echo "🐳 Starting database container..."
    docker compose -f infrastructure/docker/docker-compose.dev.yml up -d db
    
    # Wait for database to be ready
    echo "⏳ Waiting for database to be ready..."
    sleep 5
else
    echo "⚠️  Docker not found. Please start your PostgreSQL database manually."
fi

# Setup environment files
if [ ! -f "apps/web/.env" ]; then
    echo "📝 Creating .env file..."
    cp apps/web/.env.example apps/web/.env
    echo "⚠️  Please update apps/web/.env with your configuration"
fi

# Run database migrations
echo "🗃️  Running database migrations..."
cd apps/web
pnpm db:push
cd ../..

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd apps/web
pnpm db:generate
cd ../..

echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  pnpm dev"
