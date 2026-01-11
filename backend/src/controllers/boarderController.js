const prisma = require('../config/prisma');
const { v4: uuidv4 } = require('uuid');

// Get all boarders
const getAllBoarders = async (req, res) => {
  try {
    const boarders = await prisma.boarder.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        room: {
          select: {
            id: true,
            roomNumber: true,
          },
        },
      },
    });

    // Transform data for frontend compatibility
    const transformedBoarders = boarders.map((b) => ({
      ...b,
      first_name: b.firstName,
      last_name: b.lastName,
      id_type: b.idType,
      id_number: b.idNumber,
      emergency_contact: b.emergencyContact,
      move_in_date: b.moveInDate,
      move_out_date: b.moveOutDate,
      contract_duration: b.contractDuration,
      rental_type: b.rentalType,
      bed_spaces: b.bedSpaces,
      room_id: b.roomId,
      shareable_link: b.shareableLink,
      created_at: b.createdAt,
      updated_at: b.updatedAt,
      room_number: b.room?.roomNumber,
    }));

    res.status(200).json({
      success: true,
      data: transformedBoarders,
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
    const boarder = await prisma.boarder.findUnique({
      where: { id: parseInt(id) },
      include: {
        room: {
          select: {
            id: true,
            roomNumber: true,
          },
        },
      },
    });

    if (!boarder) {
      return res.status(404).json({ success: false, error: 'Boarder not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        ...boarder,
        first_name: boarder.firstName,
        last_name: boarder.lastName,
        room_number: boarder.room?.roomNumber,
        room_id: boarder.roomId,
        bed_spaces: boarder.bedSpaces,
        move_in_date: boarder.moveInDate,
        move_out_date: boarder.moveOutDate,
        contract_duration: boarder.contractDuration,
        shareable_link: boarder.shareableLink,
      },
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
      sex,
      id_type,
      id_number,
      emergency_contact,
      move_in_date,
      contract_duration,
      rental_type,
      bed_spaces,
      room_id,
    } = req.body;

    const moveOutDate = new Date(move_in_date);
    moveOutDate.setMonth(moveOutDate.getMonth() + (contract_duration || 12));

    // Generate unique shareable link
    const shareableLink = uuidv4();

    const boarder = await prisma.boarder.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        email: email || null,
        phone: phone || null,
        sex: sex || null,
        idType: id_type || null,
        idNumber: id_number || null,
        emergencyContact: emergency_contact || null,
        moveInDate: new Date(move_in_date),
        moveOutDate,
        contractDuration: contract_duration || 12,
        rentalType: rental_type || 'PER_BED',
        bedSpaces: bed_spaces || 1,
        roomId: parseInt(room_id),
        status: 'ACTIVE',
        shareableLink,
      },
      include: {
        room: {
          select: {
            id: true,
            roomNumber: true,
          },
        },
      },
    });

    // Update room status if needed
    await updateRoomStatus(parseInt(room_id));

    res.status(201).json({
      success: true,
      message: 'Boarder created successfully',
      data: {
        ...boarder,
        first_name: boarder.firstName,
        last_name: boarder.lastName,
        room_number: boarder.room?.roomNumber,
        room_id: boarder.roomId,
        bed_spaces: boarder.bedSpaces,
        shareable_link: boarder.shareableLink,
      },
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
    const {
      first_name,
      last_name,
      email,
      phone,
      sex,
      status,
      bed_spaces,
      room_id,
      emergency_contact,
    } = req.body;

    const oldBoarder = await prisma.boarder.findUnique({
      where: { id: parseInt(id) },
    });

    const boarder = await prisma.boarder.update({
      where: { id: parseInt(id) },
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        phone,
        sex,
        status,
        bedSpaces: bed_spaces,
        roomId: room_id ? parseInt(room_id) : undefined,
        emergencyContact: emergency_contact,
      },
      include: {
        room: {
          select: {
            id: true,
            roomNumber: true,
          },
        },
      },
    });

    // Update room status if room changed
    if (oldBoarder && oldBoarder.roomId !== boarder.roomId) {
      await updateRoomStatus(oldBoarder.roomId);
      await updateRoomStatus(boarder.roomId);
    } else {
      await updateRoomStatus(boarder.roomId);
    }

    res.status(200).json({
      success: true,
      message: 'Boarder updated successfully',
      data: {
        ...boarder,
        first_name: boarder.firstName,
        last_name: boarder.lastName,
        room_number: boarder.room?.roomNumber,
        room_id: boarder.roomId,
        bed_spaces: boarder.bedSpaces,
      },
    });
  } catch (err) {
    console.error('Error updating boarder:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Boarder not found' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete boarder
const deleteBoarder = async (req, res) => {
  try {
    const { id } = req.params;

    const boarder = await prisma.boarder.delete({
      where: { id: parseInt(id) },
    });

    // Update room status
    await updateRoomStatus(boarder.roomId);

    res.status(200).json({
      success: true,
      message: 'Boarder deleted successfully',
      data: boarder,
    });
  } catch (err) {
    console.error('Error deleting boarder:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Boarder not found' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get boarders by room
const getBoardersByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const boarders = await prisma.boarder.findMany({
      where: {
        roomId: parseInt(roomId),
        status: 'ACTIVE',
      },
    });

    const transformedBoarders = boarders.map((b) => ({
      ...b,
      first_name: b.firstName,
      last_name: b.lastName,
      bed_spaces: b.bedSpaces,
      room_id: b.roomId,
    }));

    res.status(200).json({
      success: true,
      data: transformedBoarders,
    });
  } catch (err) {
    console.error('Error fetching boarders by room:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Helper function to update room status based on occupancy
async function updateRoomStatus(roomId) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        boarders: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!room) return;

    const occupiedBeds = room.boarders.reduce((sum, b) => sum + b.bedSpaces, 0);
    let newStatus;

    if (occupiedBeds === 0) {
      newStatus = 'AVAILABLE';
    } else if (occupiedBeds >= room.capacity) {
      newStatus = 'FULL';
    } else {
      newStatus = 'OCCUPIED';
    }

    await prisma.room.update({
      where: { id: roomId },
      data: { status: newStatus },
    });
  } catch (err) {
    console.error('Error updating room status:', err);
  }
}

module.exports = {
  getAllBoarders,
  getBoarderById,
  createBoarder,
  updateBoarder,
  deleteBoarder,
  getBoardersByRoom,
};
