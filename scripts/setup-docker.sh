#!/bin/bash

# Docker Setup Script for BHMS
echo "🐳 Setting up Docker environment for BHMS..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Check if .env exists, if not copy from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists."
fi

# Start Docker services
echo "🚀 Starting Docker services..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if PostgreSQL is ready
echo "🔍 Checking PostgreSQL connection..."
if docker-compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ PostgreSQL is ready"
else
    echo "⚠️  PostgreSQL might still be starting up. Check with: docker-compose logs postgres"
fi

# Check if Redis is ready
echo "🔍 Checking Redis connection..."
if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is ready"
else
    echo "⚠️  Redis might still be starting up. Check with: docker-compose logs redis"
fi

echo ""
echo "🎉 Docker setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Install dependencies: pnpm install"
echo "2. Push database schema: pnpm db:push"
echo "3. Start development servers: pnpm dev"
echo ""
echo "🌐 Available services:"
echo "- PostgreSQL: localhost:5432"
echo "- Redis: localhost:6379"
echo "- MailDev Web UI: http://localhost:1080"
echo ""
echo "📚 For more information, see DOCKER_SETUP.md"