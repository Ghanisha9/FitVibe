// routes/challengeRoutes.js
const express = require('express');
const { getChallenges, getChallengeById } = require('../controllers/challengeController');
const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);

module.exports = router;