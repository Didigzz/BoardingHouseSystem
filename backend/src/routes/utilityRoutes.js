const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');

// Get all utilities
router.get('/', utilityController.getAllUtilities);

// Get utility by ID
router.get('/:id', utilityController.getUtilityById);

// Create new utility
router.post('/', utilityController.createUtility);

// Update utility
router.put('/:id', utilityController.updateUtility);

// Delete utility
router.delete('/:id', utilityController.deleteUtility);

module.exports = router;
