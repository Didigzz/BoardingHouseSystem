const prisma = require('../config/prisma');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get room stats
    const rooms = await prisma.room.findMany({
      include: {
        boarders: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    const totalRooms = rooms.length;
    const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
    const occupiedBeds = rooms.reduce(
      (sum, r) => sum + r.boarders.reduce((s, b) => s + b.bedSpaces, 0),
      0
    );
    const availableBeds = totalCapacity - occupiedBeds;

    // Get boarder stats
    const activeBoarders = await prisma.boarder.count({
      where: { status: 'ACTIVE' },
    });

    // Get payment stats
    const [paidPayments, pendingPayments, overduePayments] = await Promise.all([
      prisma.payment.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.payment.aggregate({
        where: { status: 'PENDING', dueDate: { gte: new Date() } },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.payment.aggregate({
        where: { status: 'PENDING', dueDate: { lt: new Date() } },
        _sum: { amount: true },
        _count: true,
      }),
    ]);

    // Calculate monthly income (assuming ₱600 per bed-space)
    const monthlyIncome = occupiedBeds * 600;

    // Get recent boarders
    const recentBoarders = await prisma.boarder.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        room: {
          select: { roomNumber: true },
        },
      },
    });

    // Get recent payments
    const recentPayments = await prisma.payment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        boarder: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: {
        rooms: {
          total: totalRooms,
          totalCapacity,
          occupiedBeds,
          availableBeds,
          occupancyRate: totalCapacity > 0 ? ((occupiedBeds / totalCapacity) * 100).toFixed(1) : 0,
        },
        boarders: {
          active: activeBoarders,
        },
        payments: {
          collected: parseFloat(paidPayments._sum.amount) || 0,
          pending: parseFloat(pendingPayments._sum.amount) || 0,
          overdue: parseFloat(overduePayments._sum.amount) || 0,
          paidCount: paidPayments._count || 0,
          pendingCount: pendingPayments._count || 0,
          overdueCount: overduePayments._count || 0,
        },
        monthlyIncome,
        recentBoarders: recentBoarders.map((b) => ({
          id: b.id,
          name: `${b.firstName} ${b.lastName}`,
          room: b.room?.roomNumber,
          moveInDate: b.moveInDate,
        })),
        recentPayments: recentPayments.map((p) => ({
          id: p.id,
          boarder: p.boarder ? `${p.boarder.firstName} ${p.boarder.lastName}` : 'Unknown',
          amount: p.amount,
          status: p.status,
          dueDate: p.dueDate,
        })),
      },
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getDashboardStats,
};
