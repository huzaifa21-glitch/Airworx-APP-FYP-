const mongoose = require('mongoose');

const fireDisasterSchema = new mongoose.Schema({
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
  fireIntensity: {
    type: String,
    required: true,
  },
  highAlert: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const FireDisaster = mongoose.model('FireDisaster', fireDisasterSchema);

module.exports = FireDisaster;
