// controllers/activityController.js
const Activity = require('../models/activityModel');

// GET /activities/:activityName
exports.getActivityByName = async (req, res) => {
  try {
    const { activityName } = req.params;
    
    // Find by the 'slug' field
    const activity = await Activity.findOne({ 
      slug: activityName.toLowerCase() 
    });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};