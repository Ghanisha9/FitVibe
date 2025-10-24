// models/activityModel.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // Allows for flexible JSON content
    required: true,
  },
});

module.exports = mongoose.model('Activity', activitySchema);