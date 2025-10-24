// routes/userRoutes.js
const express = require('express');
const { getMyProfile, getMyChallenges } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// All profile routes are protected
router.use(authenticateToken);

router.get('/me', getMyProfile);
router.get('/my-challenges', getMyChallenges);

module.exports = router;