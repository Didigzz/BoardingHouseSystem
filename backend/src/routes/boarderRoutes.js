const express = require('express');
const router = express.Router();
const boarderController = require('../controllers/boarderController');

// Get all boarders
router.get('/', boarderController.getAllBoarders);

// Get boarder by ID
router.get('/:id', boarderController.getBoarderById);

// Create new boarder
router.post('/', boarderController.createBoarder);

// Update boarder
router.put('/:id', boarderController.updateBoarder);

// Delete boarder
router.delete('/:id', boarderController.deleteBoarder);

// Get boarder by room
router.get('/room/:roomId', boarderController.getBoardersByRoom);

module.exports = router;
