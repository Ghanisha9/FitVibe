// controllers/challengeController.js
const Challenge = require('../models/challengeModel');

// GET /challenges
exports.getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ startDate: -1 });
    res.json(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /challenges/:id
exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    res.json(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};