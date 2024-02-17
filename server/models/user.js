const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
