// routes/orderRoutes.js
const express = require('express');
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// All order routes are protected
router.use(authenticateToken);

router.post('/', placeOrder);
router.get('/', getMyOrders);

module.exports = router;