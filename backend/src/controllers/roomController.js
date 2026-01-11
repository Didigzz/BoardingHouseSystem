const pool = require('../config/database');

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms ORDER BY room_number');
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get room by ID
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM rooms WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching room:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create new room
const createRoom = async (req, res) => {
  try {
    const { room_number, capacity, type, rental_mode, monthly_rent } = req.body;

    const result = await pool.query(
      'INSERT INTO rooms (room_number, capacity, type, rental_mode, monthly_rent, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [room_number, capacity, type, rental_mode, monthly_rent, 'AVAILABLE']
    );

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error creating room:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update room
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { room_number, capacity, type, rental_mode, monthly_rent, status } = req.body;

    const result = await pool.query(
      'UPDATE rooms SET room_number = $1, capacity = $2, type = $3, rental_mode = $4, monthly_rent = $5, status = $6 WHERE id = $7 RETURNING *',
      [room_number, capacity, type, rental_mode, monthly_rent, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error updating room:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM rooms WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error deleting room:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get room occupancy
const getRoomOccupancy = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT r.*, COUNT(b.id) as occupied_beds FROM rooms r LEFT JOIN beds b ON r.id = b.room_id AND b.status = $1 WHERE r.id = $2 GROUP BY r.id',
      ['OCCUPIED', id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching room occupancy:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomOccupancy,
};
