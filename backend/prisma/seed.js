require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.payment.deleteMany();
  await prisma.boarder.deleteMany();
  await prisma.utility.deleteMany();
  await prisma.room.deleteMany();

  // Create 10 rooms
  console.log('🏠 Creating rooms...');
  const rooms = [];
  for (let i = 1; i <= 10; i++) {
    const room = await prisma.room.create({
      data: {
        roomNumber: `Room ${i}`,
        capacity: 4,
        type: 'SHARED',
        rentalMode: 'PER_BED',
        monthlyRent: 600,
        status: 'AVAILABLE',
      },
    });
    rooms.push(room);
    console.log(`  ✓ Created ${room.roomNumber}`);
  }

  // Create sample boarders
  console.log('👥 Creating sample boarders...');
  const boarderData = [
    { firstName: 'Juan', lastName: 'Dela Cruz', email: 'juan@email.com', phone: '09171234567', sex: 'Male', roomIndex: 0, bedSpaces: 1 },
    { firstName: 'Maria', lastName: 'Santos', email: 'maria@email.com', phone: '09181234567', sex: 'Female', roomIndex: 0, bedSpaces: 1 },
    { firstName: 'Pedro', lastName: 'Reyes', email: 'pedro@email.com', phone: '09191234567', sex: 'Male', roomIndex: 1, bedSpaces: 1 },
    { firstName: 'Ana', lastName: 'Garcia', email: 'ana@email.com', phone: '09201234567', sex: 'Female', roomIndex: 1, bedSpaces: 2 },
    { firstName: 'Jose', lastName: 'Mendoza', email: 'jose@email.com', phone: '09211234567', sex: 'Male', roomIndex: 2, bedSpaces: 1 },
  ];

  const boarders = [];
  for (const data of boarderData) {
    const moveInDate = new Date();
    moveInDate.setMonth(moveInDate.getMonth() - Math.floor(Math.random() * 6)); // Random move-in within last 6 months
    
    const moveOutDate = new Date(moveInDate);
    moveOutDate.setMonth(moveOutDate.getMonth() + 12);

    const boarder = await prisma.boarder.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        sex: data.sex,
        moveInDate,
        moveOutDate,
        contractDuration: 12,
        rentalType: 'PER_BED',
        bedSpaces: data.bedSpaces,
        roomId: rooms[data.roomIndex].id,
        status: 'ACTIVE',
        shareableLink: `${data.firstName.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
    });
    boarders.push(boarder);
    console.log(`  ✓ Created boarder: ${boarder.firstName} ${boarder.lastName}`);
  }

  // Update room statuses based on occupancy
  console.log('🔄 Updating room statuses...');
  for (const room of rooms) {
    const roomBoarders = await prisma.boarder.findMany({
      where: { roomId: room.id, status: 'ACTIVE' },
    });
    
    const occupiedBeds = roomBoarders.reduce((sum, b) => sum + b.bedSpaces, 0);
    let newStatus = 'AVAILABLE';
    
    if (occupiedBeds >= room.capacity) {
      newStatus = 'FULL';
    } else if (occupiedBeds > 0) {
      newStatus = 'OCCUPIED';
    }

    await prisma.room.update({
      where: { id: room.id },
      data: { status: newStatus },
    });
  }

  // Create sample payments
  console.log('💰 Creating sample payments...');
  const paymentTypes = ['RENT', 'UTILITY', 'DEPOSIT'];
  const paymentStatuses = ['PAID', 'PENDING', 'PAID', 'PAID']; // More paid than pending

  for (const boarder of boarders) {
    // Create 3 payments per boarder
    for (let i = 0; i < 3; i++) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() - i);
      
      const status = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
      const amount = boarder.bedSpaces * 600;

      await prisma.payment.create({
        data: {
          boarderId: boarder.id,
          amount,
          dueDate,
          paymentDate: status === 'PAID' ? dueDate : null,
          paidAmount: status === 'PAID' ? amount : null,
          paymentType: 'RENT',
          status,
        },
      });
    }
    console.log(`  ✓ Created payments for: ${boarder.firstName} ${boarder.lastName}`);
  }

  // Create sample utilities
  console.log('⚡ Creating sample utilities...');
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const utilityData = [
    { type: 'ELECTRICITY', amount: 3500, month: currentMonth, year: currentYear },
    { type: 'WATER', amount: 1200, month: currentMonth, year: currentYear },
    { type: 'WIFI', amount: 1500, month: currentMonth, year: currentYear },
  ];

  for (const data of utilityData) {
    await prisma.utility.create({
      data: {
        type: data.type,
        billingMode: 'SPLIT',
        amount: data.amount,
        month: data.month,
        year: data.year,
      },
    });
    console.log(`  ✓ Created utility: ${data.type} - ₱${data.amount}`);
  }

  console.log('');
  console.log('✅ Database seed completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - ${rooms.length} rooms created`);
  console.log(`   - ${boarders.length} boarders created`);
  console.log(`   - ${boarders.length * 3} payments created`);
  console.log(`   - ${utilityData.length} utility bills created`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
