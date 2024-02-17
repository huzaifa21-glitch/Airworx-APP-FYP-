const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user'); // Make sure to provide the correct path to your User model
const Scan = require('./models/scan');
const Otp = require('./models/otp');
const Earth= require('./models/earthquake');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const cors = require('cors'); // Import cors

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('mongodburl', {
// console.log("MongoDB Connected");
});

// Use cors middleware
app.use(cors());
// Middleware
app.use(bodyParser.json());



app.get('/scans/:email', async (req, res) => {
  const userEmail = req.params.email;

  try {
    // Fetch scans for the specified user
    const userScans = await Scan.find({ email: userEmail });

    // Send the scans as a JSON response
    res.json(userScans);
  } catch (error) {
    console.error('Error fetching scans:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/disasters/:disasterType', async (req, res) => {
  const DisasterType = req.params.disasterType;
  // console.log(disasterType);
  try {
    // Find all documents with the specified disasterType
    const disasters = await Scan.find({ DisasterType });

    res.json(disasters);
    // console.log(disasters);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/disasters/:disasterType', async (req, res) => {
  const DisasterType = req.params.disasterType;
  // console.log(disasterType);
  try {
    // Find all documents with the specified disasterType
    const disasters = await Scan.find({ DisasterType });

    res.json(disasters);
    // console.log(disasters);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/find-disasters/:email/:disasterType', async (req, res) => {
  const { email, disasterType } = req.params;

  try {
    // Find all documents with the specified email and disasterType
    const disasters = await Scan.find({ email, DisasterType: disasterType });

    res.json(disasters);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/allscans', async (req, res) => {
  try {
    // Fetch all scans
    const allScans = await Scan.find();

    // Send the scans as a JSON response
    res.json(allScans);
  } catch (error) {
    console.error('Error fetching scans:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getreport/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Use findById to fetch a document by its id
    const scan = await Scan.findOne({id:id});

    if (scan) {
      res.json(scan);
    } else {
      res.status(404).json({ message: 'Scan not found' });
    }
  } catch (error) {
    console.error('Error fetching scan by id:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to register a new user
app.post('/register', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      email,
      username: name,
      password:hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user with the given email exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(402).json({ error: 'Invalid email or password' });
      }
  
      // If email and password are valid, respond with a success message
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fyp5620@gmail.com',  // Replace with your Gmail email
    pass: 'dctr axtx srsz pcns',   // Replace with your Gmail password
  },
});

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Route to send OTP via email
app.post('/send-otp', async (req, res) => {
  try {
    const { userEmail } = req.body;

    const user = await User.findOne({ email : userEmail });
  
    if (!user) {
      // console.log('user not found');
      return res.status(300).json({ error: 'Invalid email or password' });
    }
    // Generate OTP
    const otpCode = generateOTP();

    // Save OTP to the database
    const otp = new Otp({
      userEmail,
      code: otpCode,
    });
    await otp.save();

    // Email configuration
    const mailOptions = {
      from: 'fyp5620@gmail.com',  // Replace with your Gmail email
      to: userEmail,
      subject: 'OTP for Password Reset',
      text: `Your OTP for password reset is: ${otpCode}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Error sending OTP.' });
  }
});

app.post('/verify-otp', async (req, res) => {
  try {
    const { userEmail, code, newPassword } = req.body;

    // Check if OTP is valid
    const otpRecord = await Otp.findOne({ userEmail, code });

    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Update user password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email: userEmail }, { password: hashedPassword });

    // Remove used OTP record
    await otpRecord.deleteOne();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});
