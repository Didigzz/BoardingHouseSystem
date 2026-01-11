require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const roomRoutes = require('./routes/roomRoutes');
const boarderRoutes = require('./routes/boarderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const utilityRoutes = require('./routes/utilityRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Import Prisma client for connection check
const prisma = require('./config/prisma');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/boarders', boarderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/utilities', utilityRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'Server is running', database: 'Connected' });
  } catch (err) {
    res.json({ status: 'Server is running', database: 'Disconnected', error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📊 Using Prisma with PostgreSQL`);
});

module.exports = app;
