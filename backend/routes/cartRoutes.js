// routes/cartRoutes.js
const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// All cart routes are protected
router.use(authenticateToken);

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:productId', removeFromCart);

module.exports = router;