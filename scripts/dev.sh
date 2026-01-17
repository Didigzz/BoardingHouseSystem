#!/bin/bash

# Development startup script for BHMS
# Starts all services in development mode

echo "🏠 Starting Boarding House Management System - Development Mode"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your configuration."
    echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    pnpm install
    echo ""
fi

# Check if database is accessible
echo "🔍 Checking database connection..."
pnpm db:push 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Database connected"
else
    echo "⚠️  Database connection failed. Make sure PostgreSQL is running."
    echo "   Update DATABASE_URL in .env file."
fi
echo ""

# Start all services
echo "🚀 Starting all services..."
echo ""
echo "   - Web App:  http://localhost:3000"
echo "   - API:      http://localhost:3001"
echo "   - Mobile:   http://localhost:8081"
echo ""

pnpm dev
