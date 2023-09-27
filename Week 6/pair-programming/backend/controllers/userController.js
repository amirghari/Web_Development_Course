const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const secretKey = "abc123";

// @desc    Register a New User
// @route   POST /users
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: newUser._id }, secretKey);
    
    // Store the token in MongoDB for the registered user
    newUser.tokens = [];
    newUser.tokens = newUser.tokens.concat({ token });
    await newUser.save();

    // Respond with a success message and user data including the token
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    // Handle any errors that occur during registration
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If the email and password are valid, generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, secretKey);

    // Respond with a success message and user data including the token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    // Handle any errors that occur during login
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc    Get user data for the authenticated user
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    // Get the user ID from the request object
    const userId = req.user._id;

    // Find the user with the provided ID
    const user = await User.findById(userId);

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
