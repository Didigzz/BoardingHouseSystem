const prisma = require('../config/prisma');

// Get all utilities
const getAllUtilities = async (req, res) => {
  try {
    const utilities = await prisma.utility.findMany({
      orderBy: [{ year: 'desc' }, { month: 'desc' }, { type: 'asc' }],
    });

    // Transform data for frontend compatibility
    const transformedUtilities = utilities.map((u) => ({
      ...u,
      billing_mode: u.billingMode,
      monthly_rate: u.monthlyRate,
      unit_rate: u.unitRate,
      created_at: u.createdAt,
      updated_at: u.updatedAt,
    }));

    res.status(200).json({
      success: true,
      data: transformedUtilities,
    });
  } catch (err) {
    console.error('Error fetching utilities:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get utility by ID
const getUtilityById = async (req, res) => {
  try {
    const { id } = req.params;
    const utility = await prisma.utility.findUnique({
      where: { id: parseInt(id) },
    });

    if (!utility) {
      return res.status(404).json({ success: false, error: 'Utility not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        ...utility,
        billing_mode: utility.billingMode,
        monthly_rate: utility.monthlyRate,
        unit_rate: utility.unitRate,
      },
    });
  } catch (err) {
    console.error('Error fetching utility:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create new utility
const createUtility = async (req, res) => {
  try {
    const { type, billing_mode, monthly_rate, unit_rate, amount, month, year } = req.body;

    const utility = await prisma.utility.create({
      data: {
        type: type || 'OTHER',
        billingMode: billing_mode || 'SPLIT',
        monthlyRate: monthly_rate ? parseFloat(monthly_rate) : null,
        unitRate: unit_rate ? parseFloat(unit_rate) : null,
        amount: amount ? parseFloat(amount) : null,
        month: month || null,
        year: year ? parseInt(year) : null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Utility created successfully',
      data: {
        ...utility,
        billing_mode: utility.billingMode,
        monthly_rate: utility.monthlyRate,
        unit_rate: utility.unitRate,
      },
    });
  } catch (err) {
    console.error('Error creating utility:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update utility
const updateUtility = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, billing_mode, monthly_rate, unit_rate, amount, month, year } = req.body;

    const utility = await prisma.utility.update({
      where: { id: parseInt(id) },
      data: {
        type,
        billingMode: billing_mode,
        monthlyRate: monthly_rate ? parseFloat(monthly_rate) : undefined,
        unitRate: unit_rate ? parseFloat(unit_rate) : undefined,
        amount: amount ? parseFloat(amount) : undefined,
        month,
        year: year ? parseInt(year) : undefined,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Utility updated successfully',
      data: {
        ...utility,
        billing_mode: utility.billingMode,
        monthly_rate: utility.monthlyRate,
        unit_rate: utility.unitRate,
      },
    });
  } catch (err) {
    console.error('Error updating utility:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Utility not found' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete utility
const deleteUtility = async (req, res) => {
  try {
    const { id } = req.params;
    const utility = await prisma.utility.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Utility deleted successfully',
      data: utility,
    });
  } catch (err) {
    console.error('Error deleting utility:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Utility not found' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get utility split per boarder
const getUtilitySplit = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Get active boarders count
    const activeBoarders = await prisma.boarder.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bedSpaces: true,
      },
    });

    // Get utilities for the month
    const utilities = await prisma.utility.findMany({
      where: {
        month: month || undefined,
        year: year ? parseInt(year) : undefined,
      },
    });

    const totalBoarders = activeBoarders.length;
    const totalAmount = utilities.reduce((sum, u) => sum + (parseFloat(u.amount) || 0), 0);
    const splitPerPerson = totalBoarders > 0 ? totalAmount / totalBoarders : 0;

    res.status(200).json({
      success: true,
      data: {
        utilities,
        totalAmount,
        totalBoarders,
        splitPerPerson,
        boarders: activeBoarders.map((b) => ({
          id: b.id,
          name: `${b.firstName} ${b.lastName}`,
          share: splitPerPerson,
        })),
      },
    });
  } catch (err) {
    console.error('Error calculating utility split:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllUtilities,
  getUtilityById,
  createUtility,
  updateUtility,
  deleteUtility,
  getUtilitySplit,
};
