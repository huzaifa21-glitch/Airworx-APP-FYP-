const mongoose = require('mongoose');

const survivorsDisasterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  disasterType: {
    type: String,
    required: true,
  },
  creationTime: {
    type: Date,
    required: true,
  },
  totalSurvivorsDetected: {
    type: Number,
    required: true,
  },
  ambulances: {
    type: Number,
    required: true,
  },
  boats: {
    type: Number,
    required: true,
  },
  helicopters: {
    type: Number,
    required: true,
  },
  rescueVolunteers: {
    type: Number,
    required: true,
  },
});

const SurvivorsDisaster = mongoose.model('SurvivorsDisaster', survivorsDisasterSchema);

module.exports = SurvivorsDisaster;
