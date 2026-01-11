#!/bin/bash

# Seed script for BHMS database

set -e

echo "🌱 Seeding database..."

cd apps/web

# Run Prisma seed
pnpm db:seed

echo "✅ Database seeded successfully!"
