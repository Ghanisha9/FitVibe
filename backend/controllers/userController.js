// controllers/userController.js
const User = require('../models/userModel');

// GET /profile/me
exports.getMyProfile = async (req, res) => {
  try {
    // req.user.id comes from the authenticateToken middleware
    // .select('-password') is redundant since we did it in the model, but good practice
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /profile/my-challenges
exports.getMyChallenges = async (req, res) => {
  try {
    // Find user and populate their joined challenges
    const user = await User.findById(req.user.id)
      .populate('challenges.challengeId');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};