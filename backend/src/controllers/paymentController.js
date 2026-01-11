const prisma = require('../config/prisma');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        boarder: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Transform data for frontend compatibility
    const transformedPayments = payments.map((p) => ({
      ...p,
      boarder_id: p.boarderId,
      paid_amount: p.paidAmount,
      due_date: p.dueDate,
      payment_date: p.paymentDate,
      payment_type: p.paymentType,
      created_at: p.createdAt,
      updated_at: p.updatedAt,
      first_name: p.boarder?.firstName,
      last_name: p.boarder?.lastName,
    }));

    res.status(200).json({
      success: true,
      data: transformedPayments,
    });
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: {
        boarder: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        ...payment,
        boarder_id: payment.boarderId,
        paid_amount: payment.paidAmount,
        due_date: payment.dueDate,
        payment_date: payment.paymentDate,
        payment_type: payment.paymentType,
        first_name: payment.boarder?.firstName,
        last_name: payment.boarder?.lastName,
      },
    });
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create new payment
const createPayment = async (req, res) => {
  try {
    const { boarder_id, amount, due_date, payment_type, status, notes } = req.body;

    const payment = await prisma.payment.create({
      data: {
        boarderId: parseInt(boarder_id),
        amount: parseFloat(amount),
        dueDate: new Date(due_date),
        paymentType: payment_type || 'RENT',
        status: status || 'PENDING',
        notes: notes || null,
      },
      include: {
        boarder: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      data: {
        ...payment,
        boarder_id: payment.boarderId,
        due_date: payment.dueDate,
        payment_type: payment.paymentType,
        first_name: payment.boarder?.firstName,
        last_name: payment.boarder?.lastName,
      },
    });
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update payment
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, status, paid_amount, payment_date } = req.body;

    const updateData = {};
    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (status !== undefined) updateData.status = status;
    if (paid_amount !== undefined) updateData.paidAmount = parseFloat(paid_amount);
    if (payment_date !== undefined) updateData.paymentDate = new Date(payment_date);

    const payment = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        boarder: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      data: {
        ...payment,
        boarder_id: payment.boarderId,
        paid_amount: payment.paidAmount,
        due_date: payment.dueDate,
        payment_date: payment.paymentDate,
        payment_type: payment.paymentType,
        first_name: payment.boarder?.firstName,
        last_name: payment.boarder?.lastName,
      },
    });
  } catch (err) {
    console.error('Error updating payment:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Payment deleted successfully',
      data: payment,
    });
  } catch (err) {
    console.error('Error deleting payment:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get payments by boarder
const getPaymentsByBoarder = async (req, res) => {
  try {
    const { boarderId } = req.params;
    const payments = await prisma.payment.findMany({
      where: { boarderId: parseInt(boarderId) },
      orderBy: { dueDate: 'desc' },
    });

    const transformedPayments = payments.map((p) => ({
      ...p,
      boarder_id: p.boarderId,
      due_date: p.dueDate,
      payment_date: p.paymentDate,
      payment_type: p.paymentType,
      paid_amount: p.paidAmount,
    }));

    res.status(200).json({
      success: true,
      data: transformedPayments,
    });
  } catch (err) {
    console.error('Error fetching payments by boarder:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get overdue payments
const getOverduePayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        status: 'PENDING',
        dueDate: {
          lt: new Date(),
        },
      },
      orderBy: { dueDate: 'asc' },
      include: {
        boarder: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const transformedPayments = payments.map((p) => ({
      ...p,
      boarder_id: p.boarderId,
      due_date: p.dueDate,
      payment_type: p.paymentType,
      first_name: p.boarder?.firstName,
      last_name: p.boarder?.lastName,
    }));

    res.status(200).json({
      success: true,
      data: transformedPayments,
    });
  } catch (err) {
    console.error('Error fetching overdue payments:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get payment statistics
const getPaymentStats = async (req, res) => {
  try {
    const [totalPaid, totalPending, totalOverdue] = await Promise.all([
      prisma.payment.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true },
      }),
      prisma.payment.aggregate({
        where: { status: 'PENDING', dueDate: { gte: new Date() } },
        _sum: { amount: true },
      }),
      prisma.payment.aggregate({
        where: { status: 'PENDING', dueDate: { lt: new Date() } },
        _sum: { amount: true },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalPaid: totalPaid._sum.amount || 0,
        totalPending: totalPending._sum.amount || 0,
        totalOverdue: totalOverdue._sum.amount || 0,
      },
    });
  } catch (err) {
    console.error('Error fetching payment stats:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentsByBoarder,
  getOverduePayments,
  getPaymentStats,
};
