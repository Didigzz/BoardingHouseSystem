const pool = require('../config/database');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT p.*, b.first_name, b.last_name FROM payments p LEFT JOIN boarders b ON p.boarder_id = b.id ORDER BY p.created_at DESC'
    );
    res.status(200).json({
      success: true,
      data: result.rows,
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
    const result = await pool.query(
      'SELECT p.*, b.first_name, b.last_name FROM payments p LEFT JOIN boarders b ON p.boarder_id = b.id WHERE p.id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create new payment
const createPayment = async (req, res) => {
  try {
    const { boarder_id, amount, due_date, payment_type, status } = req.body;

    const result = await pool.query(
      'INSERT INTO payments (boarder_id, amount, due_date, payment_type, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [boarder_id, amount, due_date, payment_type, status || 'PENDING']
    );

    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      data: result.rows[0],
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

    const result = await pool.query(
      'UPDATE payments SET amount = $1, status = $2, paid_amount = $3, payment_date = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [amount, status, paid_amount, payment_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM payments WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Payment deleted successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get payments by boarder
const getPaymentsByBoarder = async (req, res) => {
  try {
    const { boarderId } = req.params;
    const result = await pool.query('SELECT * FROM payments WHERE boarder_id = $1 ORDER BY due_date DESC', [
      boarderId,
    ]);
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching payments by boarder:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get overdue payments
const getOverduePayments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, b.first_name, b.last_name FROM payments p 
       LEFT JOIN boarders b ON p.boarder_id = b.id 
       WHERE p.status = $1 AND p.due_date < NOW()
       ORDER BY p.due_date ASC`,
      ['PENDING']
    );
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching overdue payments:', err);
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
};
