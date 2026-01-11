const pool = require('../config/database');

// Get all utilities
const getAllUtilities = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM utilities ORDER BY type');
    res.status(200).json({
      success: true,
      data: result.rows,
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
    const result = await pool.query('SELECT * FROM utilities WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Utility not found' });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching utility:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create new utility
const createUtility = async (req, res) => {
  try {
    const { type, billing_mode, monthly_rate, unit_rate } = req.body;

    const result = await pool.query(
      'INSERT INTO utilities (type, billing_mode, monthly_rate, unit_rate) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, billing_mode, monthly_rate, unit_rate]
    );

    res.status(201).json({
      success: true,
      message: 'Utility created successfully',
      data: result.rows[0],
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
    const { type, billing_mode, monthly_rate, unit_rate } = req.body;

    const result = await pool.query(
      'UPDATE utilities SET type = $1, billing_mode = $2, monthly_rate = $3, unit_rate = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [type, billing_mode, monthly_rate, unit_rate, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Utility not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Utility updated successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error updating utility:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete utility
const deleteUtility = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM utilities WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Utility not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Utility deleted successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error deleting utility:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllUtilities,
  getUtilityById,
  createUtility,
  updateUtility,
  deleteUtility,
};
