const prisma = require('../config/prisma');

// Get all rooms with boarder count
const getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { roomNumber: 'asc' },
      include: {
        boarders: {
          where: { status: 'ACTIVE' },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            bedSpaces: true,
          },
        },
      },
    });

    // Transform data to include occupied beds count
    const roomsWithOccupancy = rooms.map((room) => ({
      ...room,
      room_number: room.roomNumber,
      monthly_rent: room.monthlyRent,
      rental_mode: room.rentalMode,
      created_at: room.createdAt,
      updated_at: room.updatedAt,
      occupiedBeds: room.boarders.reduce((sum, b) => sum + b.bedSpaces, 0),
      availableBeds: room.capacity - room.boarders.reduce((sum, b) => sum + b.bedSpaces, 0),
    }));

    res.status(200).json({
      success: true,
      data: roomsWithOccupancy,
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
    const room = await prisma.room.findUnique({
      where: { id: parseInt(id) },
      include: {
        boarders: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        ...room,
        room_number: room.roomNumber,
        monthly_rent: room.monthlyRent,
        rental_mode: room.rentalMode,
      },
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

    const room = await prisma.room.create({
      data: {
        roomNumber: room_number,
        capacity: capacity || 4,
        type: type || 'SHARED',
        rentalMode: rental_mode || 'PER_BED',
        monthlyRent: monthly_rent || 600,
        status: 'AVAILABLE',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: {
        ...room,
        room_number: room.roomNumber,
        monthly_rent: room.monthlyRent,
        rental_mode: room.rentalMode,
      },
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

    const room = await prisma.room.update({
      where: { id: parseInt(id) },
      data: {
        roomNumber: room_number,
        capacity,
        type,
        rentalMode: rental_mode,
        monthlyRent: monthly_rent,
        status,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: {
        ...room,
        room_number: room.roomNumber,
        monthly_rent: room.monthlyRent,
        rental_mode: room.rentalMode,
      },
    });
  } catch (err) {
    console.error('Error updating room:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.room.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
      data: room,
    });
  } catch (err) {
    console.error('Error deleting room:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get room occupancy
const getRoomOccupancy = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.room.findUnique({
      where: { id: parseInt(id) },
      include: {
        boarders: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }

    const occupiedBeds = room.boarders.reduce((sum, b) => sum + b.bedSpaces, 0);

    res.status(200).json({
      success: true,
      data: {
        ...room,
        room_number: room.roomNumber,
        occupiedBeds,
        availableBeds: room.capacity - occupiedBeds,
      },
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
