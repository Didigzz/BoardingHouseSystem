const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get all payments
router.get('/', paymentController.getAllPayments);

// Get payment by ID
router.get('/:id', paymentController.getPaymentById);

// Create new payment
router.post('/', paymentController.createPayment);

// Update payment
router.put('/:id', paymentController.updatePayment);

// Delete payment
router.delete('/:id', paymentController.deletePayment);

// Get payments by boarder
router.get('/boarder/:boarderId', paymentController.getPaymentsByBoarder);

// Get overdue payments
router.get('/status/overdue', paymentController.getOverduePayments);

// Get payment statistics
router.get('/stats/summary', paymentController.getPaymentStats);

module.exports = router;
