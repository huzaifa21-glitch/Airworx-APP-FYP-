const mongoose = require('mongoose');

const earthquakeDisasterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  DisasterType: {
    type: String,
    required: true,
  },
  CreationTime: {
    type: String,
    required: true,
  },
  DestroyedBuildings: {
    type: String,
    required: true,
  },
  PeopleAffected: {
    type: Number,
    required: true,
  },
  TotalDamageCost: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
});

const EarthquakeDisaster = mongoose.model('EarthquakeDisaster', earthquakeDisasterSchema);

module.exports = EarthquakeDisaster;
