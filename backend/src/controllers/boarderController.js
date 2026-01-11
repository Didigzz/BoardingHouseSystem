const pool = require('../config/database');

// Get all boarders
const getAllBoarders = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT b.*, r.room_number FROM boarders b LEFT JOIN rooms r ON b.room_id = r.id ORDER BY b.created_at DESC'
    );
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching boarders:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get boarder by ID
const getBoarderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT b.*, r.room_number FROM boarders b LEFT JOIN rooms r ON b.room_id = r.id WHERE b.id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Boarder not found' });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching boarder:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create new boarder
const createBoarder = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      id_type,
      id_number,
      move_in_date,
      contract_duration,
      rental_type,
      room_id,
      bed_id,
    } = req.body;

    const moveOutDate = new Date(move_in_date);
    moveOutDate.setMonth(moveOutDate.getMonth() + contract_duration);

    const result = await pool.query(
      `INSERT INTO boarders (first_name, last_name, email, phone, id_type, id_number, move_in_date, move_out_date, contract_duration, rental_type, room_id, bed_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        first_name,
        last_name,
        email,
        phone,
        id_type,
        id_number,
        move_in_date,
        moveOutDate,
        contract_duration,
        rental_type,
        room_id,
        bed_id,
        'ACTIVE',
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Boarder created successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error creating boarder:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update boarder
const updateBoarder = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, status } = req.body;

    const result = await pool.query(
      'UPDATE boarders SET first_name = $1, last_name = $2, email = $3, phone = $4, status = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [first_name, last_name, email, phone, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Boarder not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Boarder updated successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error updating boarder:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete boarder
const deleteBoarder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM boarders WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Boarder not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Boarder deleted successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error deleting boarder:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get boarders by room
const getBoardersByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const result = await pool.query('SELECT * FROM boarders WHERE room_id = $1 AND status = $2', [
      roomId,
      'ACTIVE',
    ]);
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching boarders by room:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllBoarders,
  getBoarderById,
  createBoarder,
  updateBoarder,
  deleteBoarder,
  getBoardersByRoom,
};
