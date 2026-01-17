#!/bin/bash

# Database seeding script
# Seeds the database with sample data

echo "🌱 Seeding database..."
echo ""

# Check if database is accessible
pnpm db:push 2>/dev/null
if [ $? -ne 0 ]; then
    echo "❌ Database connection failed. Make sure PostgreSQL is running."
    exit 1
fi

# Run seed script
pnpm --filter @bhms/database db:seed

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database seeded successfully!"
    echo ""
    echo "Sample data created:"
    echo "  - Test landlord account"
    echo "  - Sample rooms"
    echo "  - Sample boarders"
    echo "  - Sample payments"
else
    echo ""
    echo "❌ Seeding failed. Check the error above."
    exit 1
fi
