const mongoose = require('mongoose');

const floodDisasterSchema = new mongoose.Schema({
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
  totalHousesAffected: {
    type: Number,
    required: true,
  },
  totalDamage: {
    type: Number,
    required: true,
  },
  peopleAffected: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const FloodDisaster = mongoose.model('FloodDisaster', floodDisasterSchema);

module.exports = FloodDisaster;
