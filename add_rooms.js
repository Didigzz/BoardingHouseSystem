const axios = require('axios');

const API_URL = 'http://localhost:5000/api/rooms';

async function addRooms() {
  console.log('Adding 10 rooms to the database...\n');
  
  try {
    for (let i = 1; i <= 10; i++) {
      const roomData = {
        boarding_house_id: 1,
        room_number: i.toString(),
        capacity: 4,
        room_type: 'shared',
        rental_mode: 'bed_spacer',
        monthly_rent: 2400
      };

      const response = await axios.post(API_URL, roomData);
      console.log(`✅ Room ${i} added successfully`);
    }
    
    console.log('\n✨ All 10 rooms added!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.response?.data?.error || error.message);
    process.exit(1);
  }
}

addRooms();
