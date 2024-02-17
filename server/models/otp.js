const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userEmail: {
        type: String,
       
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
   
    
});

const Otp = mongoose.model('otp', otpSchema);

module.exports = Otp;