#!/bin/bash

# Setup script for BHMS
# Initializes the project for first-time use

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║   🏠 Boarding House Management System - Setup        ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Check Node.js version
echo "1️⃣  Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js 20+ required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v)"
echo ""

# Check pnpm
echo "2️⃣  Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Installing..."
    npm install -g pnpm@9.0.0
fi
echo "✅ pnpm $(pnpm -v)"
echo ""

# Install dependencies
echo "3️⃣  Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo ""

# Setup environment
echo "4️⃣  Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file"
else
    echo "⚠️  .env already exists, skipping"
fi

if [ ! -f apps/api/.env ]; then
    cp apps/api/.env.example apps/api/.env
    echo "✅ Created apps/api/.env file"
else
    echo "⚠️  apps/api/.env already exists, skipping"
fi

if [ ! -f apps/web/.env ]; then
    cp apps/web/.env.example apps/web/.env
    echo "✅ Created apps/web/.env file"
else
    echo "⚠️  apps/web/.env already exists, skipping"
fi
echo ""

# Database setup
echo "5️⃣  Setting up database..."
echo "⚠️  Make sure PostgreSQL is running and update DATABASE_URL in .env"
read -p "Press Enter to continue with database setup (or Ctrl+C to skip)..."

pnpm db:push
if [ $? -eq 0 ]; then
    echo "✅ Database schema created"
    
    # Seed database
    read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        pnpm db:seed
        echo "✅ Database seeded"
    fi
else
    echo "⚠️  Database setup failed. Please check your DATABASE_URL"
fi
echo ""

# Git hooks
echo "6️⃣  Setting up Git hooks..."
pnpm prepare
echo "✅ Git hooks installed"
echo ""

# Success
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║   ✅ Setup Complete!                                  ║"
echo "║                                                       ║"
echo "║   Next steps:                                         ║"
echo "║   1. Update .env with your database credentials       ║"
echo "║   2. Run: pnpm dev                                    ║"
echo "║   3. Open: http://localhost:3000                      ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
