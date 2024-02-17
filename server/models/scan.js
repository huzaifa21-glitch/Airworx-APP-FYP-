const mongoose = require('mongoose');

// Define the schema
const scanSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  scanType: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  affectedHouses: {
    type: Number,
    required: true,
  },
  affectedPeople: {
    type: Number,
    required: true,
  },
  damageCost: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  scanDate: {
    type: String, // You may want to use Date type if you want to store dates as objects
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

// Create the model
const Scan = mongoose.model('Scan', scanSchema);

module.exports = Scan;
