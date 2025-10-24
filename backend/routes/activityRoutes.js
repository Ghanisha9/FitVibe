// routes/activityRoutes.js
const express = require('express');
const { getActivityByName } = require('../controllers/activityController');
const router = express.Router();

router.get('/:activityName', getActivityByName);

module.exports = router;