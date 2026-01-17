@echo off
REM Docker Setup Script for BHMS (Windows)
echo 🐳 Setting up Docker environment for BHMS...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    exit /b 1
)

REM Check if .env exists, if not copy from example
if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ✅ .env file created. Please update it with your configuration.
) else (
    echo ✅ .env file already exists.
)

REM Start Docker services
echo 🚀 Starting Docker services...
docker-compose -f docker-compose.dev.yml up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak >nul

REM Check if PostgreSQL is ready
echo 🔍 Checking PostgreSQL connection...
docker-compose exec -T postgres pg_isready -U postgres >nul 2>&1
if errorlevel 1 (
    echo ⚠️  PostgreSQL might still be starting up. Check with: docker-compose logs postgres
) else (
    echo ✅ PostgreSQL is ready
)

REM Check if Redis is ready
echo 🔍 Checking Redis connection...
docker-compose exec -T redis redis-cli ping >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Redis might still be starting up. Check with: docker-compose logs redis
) else (
    echo ✅ Redis is ready
)

echo.
echo 🎉 Docker setup complete!
echo.
echo 📋 Next steps:
echo 1. Install dependencies: pnpm install
echo 2. Push database schema: pnpm db:push
echo 3. Start development servers: pnpm dev
echo.
echo 🌐 Available services:
echo - PostgreSQL: localhost:5432
echo - Redis: localhost:6379
echo - MailDev Web UI: http://localhost:1080
echo.
echo 📚 For more information, see DOCKER_SETUP.md
pause