# Scripts

This directory contains utility scripts for development, deployment, and maintenance of the BHMS project.

## Available Scripts

```
scripts/
├── setup.sh      # Initial project setup
├── dev.sh        # Start development environment
├── seed.sh       # Seed database with sample data
└── migrate.sh    # Run database migrations
```

## Scripts Overview

### 🚀 Setup (`setup.sh`)

**Purpose:** Initial project setup for new developers

**What it does:**

- Checks Node.js and pnpm versions
- Installs dependencies
- Sets up environment files
- Initializes database schema
- Configures Git hooks

**Usage:**

```bash
bash scripts/setup.sh
```

**When to use:**

- First time setting up the project
- After cloning the repository
- When onboarding new developers

### 🔧 Development (`dev.sh`)

**Purpose:** Start the complete development environment

**What it does:**

- Checks environment configuration
- Validates database connection
- Starts all services (web, api, mobile)
- Shows service URLs and status

**Usage:**

```bash
bash scripts/dev.sh
```

**Services started:**

- Web app: http://localhost:3000
- API server: http://localhost:3001
- Mobile app: http://localhost:8081

### 🌱 Seed (`seed.sh`)

**Purpose:** Populate database with sample data

**What it does:**

- Validates database connection
- Runs Prisma seed script
- Creates sample landlords, rooms, boarders, payments
- Shows summary of created data

**Usage:**

```bash
bash scripts/seed.sh
```

**Sample data created:**

- Test landlord accounts
- Sample rooms and properties
- Demo boarders and assignments
- Example payment records

### 📊 Migrate (`migrate.sh`)

**Purpose:** Run database migrations

**What it does:**

- Applies pending Prisma migrations
- Updates database schema
- Generates Prisma client
- Validates migration success

**Usage:**

```bash
bash scripts/migrate.sh
```

## Script Requirements

### System Requirements

- **Node.js:** 20.x or later
- **pnpm:** 9.x or later
- **PostgreSQL:** 16.x or later (or Docker)
- **Git:** For version control

### Environment Files

Scripts expect these environment files:

- `.env` (root)
- `apps/web/.env`
- `apps/api/.env`

## Usage Examples

### First Time Setup

```bash
# Clone repository
git clone <repository-url>
cd BoardingHouseSystem

# Run setup script
bash scripts/setup.sh

# Start development
bash scripts/dev.sh
```

### Daily Development

```bash
# Start all services
bash scripts/dev.sh

# In another terminal, seed database if needed
bash scripts/seed.sh
```

### Database Operations

```bash
# Apply new migrations
bash scripts/migrate.sh

# Reset and seed database
pnpm db:push
bash scripts/seed.sh
```

## Script Permissions

### Making Scripts Executable

```bash
# Make all scripts executable
chmod +x scripts/*.sh

# Or individually
chmod +x scripts/setup.sh
chmod +x scripts/dev.sh
chmod +x scripts/seed.sh
chmod +x scripts/migrate.sh
```

### Windows Users

Scripts are designed for Unix-like systems (Linux, macOS). Windows users should:

- Use Git Bash or WSL
- Or run commands manually from script contents

## Troubleshooting

### Common Issues

#### Permission Denied

```bash
# Fix: Make script executable
chmod +x scripts/setup.sh
```

#### Node.js Version Error

```bash
# Fix: Update Node.js to 20.x or later
nvm install 20
nvm use 20
```

#### Database Connection Failed

```bash
# Fix: Check PostgreSQL is running
docker ps | grep postgres

# Or start PostgreSQL
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:16
```

#### Port Already in Use

```bash
# Fix: Kill processes on ports
npx kill-port 3000
npx kill-port 3001
npx kill-port 8081
```

### Script Debugging

#### Enable Debug Mode

```bash
# Run with debug output
bash -x scripts/dev.sh
```

#### Check Script Status

```bash
# Check if script completed successfully
echo $?  # Should be 0 for success
```

## Customization

### Environment-Specific Scripts

Create environment-specific versions:

```bash
scripts/
├── dev.sh           # Development
├── staging.sh       # Staging environment
└── production.sh    # Production deployment
```

### Adding New Scripts

1. Create script in `scripts/` directory
2. Make it executable: `chmod +x scripts/new-script.sh`
3. Add documentation to this README
4. Test thoroughly before committing

### Script Template

```bash
#!/bin/bash

# Script Name: new-script.sh
# Purpose: Brief description
# Usage: bash scripts/new-script.sh

set -e  # Exit on error

echo "Starting script..."

# Your script logic here

echo "Script completed successfully!"
```

## Integration with Package.json

Scripts are integrated with npm/pnpm scripts:

```json
{
  "scripts": {
    "setup": "bash scripts/setup.sh",
    "dev": "bash scripts/dev.sh",
    "seed": "bash scripts/seed.sh",
    "migrate": "bash scripts/migrate.sh"
  }
}
```

**Usage:**

```bash
pnpm setup    # Same as bash scripts/setup.sh
pnpm dev      # Same as bash scripts/dev.sh
pnpm seed     # Same as bash scripts/seed.sh
pnpm migrate  # Same as bash scripts/migrate.sh
```

## Maintenance

### Regular Updates

- Update Node.js version checks as needed
- Add new environment variables to setup script
- Update service URLs and ports
- Keep documentation in sync

### Testing Scripts

Test scripts in clean environment:

```bash
# Create test directory
mkdir test-bhms
cd test-bhms

# Clone and test setup
git clone <repository-url> .
bash scripts/setup.sh
```

## Contributing

When modifying scripts:

1. Test in clean environment
2. Update documentation
3. Ensure cross-platform compatibility
4. Add error handling
5. Include helpful output messages

**Last Updated:** January 17, 2026
