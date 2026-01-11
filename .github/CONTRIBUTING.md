# Contributing to Boarding House Management System

Thank you for your interest in contributing! 🎉

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](../../issues)
2. If not, create a new issue using the **Bug Report** template
3. Provide as much detail as possible

### Suggesting Features

1. Check if the feature has already been suggested in [Issues](../../issues)
2. If not, create a new issue using the **Feature Request** template
3. Explain the use case and potential implementation

### Submitting Pull Requests

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** following our naming convention:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
4. **Make your changes** following our coding standards
5. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat(scope): add new feature"
   git commit -m "fix(scope): resolve bug"
   ```
6. **Push** to your fork
7. **Open a Pull Request** against the `develop` branch

## Development Setup

### Prerequisites

- Node.js >= 20.x
- pnpm >= 9.x
- PostgreSQL (or use Docker)

### Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/BoardingHouseSystem.git
cd BoardingHouseSystem

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local

# Start the database (Docker)
docker-compose -f infrastructure/docker/docker-compose.dev.yml up -d

# Run database migrations
pnpm db:push

# Seed the database
pnpm db:seed

# Start development server
pnpm dev
```

## Coding Standards

### TypeScript

- Use strict TypeScript configurations
- Avoid `any` types - use proper typing
- Export types from entity/feature `model` folders

### File Structure (Feature-Sliced Design)

```
src/
├── app/           # Next.js App Router pages
├── entities/      # Business entities (user, room, payment, etc.)
├── features/      # User-facing features (auth, dashboard, etc.)
├── widgets/       # Composite UI blocks (header, sidebar, etc.)
├── shared/        # Shared utilities, UI components, configs
└── server/        # Server-side code (tRPC, auth, db)
```

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

### Branch Naming

- `feature/` - New features
- `fix/` or `bugfix/` - Bug fixes
- `hotfix/` - Urgent production fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `chore/` - Maintenance tasks

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

## Questions?

Feel free to open a discussion or reach out to the maintainers.

Thank you for contributing! 🚀
