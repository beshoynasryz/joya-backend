const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({
    message: 'User registered successfully',
    user: { email: user.email },
  });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
    res.status(200).json({
      message: "Login successful",
      token,
    });
  });
  

module.exports = { registerUser, loginUser };
