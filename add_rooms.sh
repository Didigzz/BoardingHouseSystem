#!/bin/bash

echo "Adding 10 rooms to the database..."

for i in {1..10}; do
  curl -X POST http://localhost:5000/api/rooms \
    -H "Content-Type: application/json" \
    -d "{
      \"boarding_house_id\": 1,
      \"room_number\": \"$i\",
      \"capacity\": 4,
      \"room_type\": \"shared\",
      \"rental_mode\": \"bed_spacer\",
      \"monthly_rent\": 2400
    }" 2>/dev/null
  echo ""
done

echo "All 10 rooms added successfully!"
