const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    console.log("Please enter all fields");
  }

  // Check if user already exists
  const checkIfUserExits = await User.findOne({ username });

  if (checkIfUserExits) {
    console.log("User already exists");
  }

  // Create user
  const user = await User.create({
    username,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: username,
      password: password,
      token: generateToken(user._id),
      message: "User registered!",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    console.log("Enter all fields");
  }

  // Check for user
  const user = await User.findOne({ username });

  if (user && password === user.password) {
    res.status(200).json({
      _id: user.id,
      username: user.username,
      password: user.password,
      token: generateToken(user._id),
      message: "User logged in!",
    });
  } else {
    res.status(400);
    console.log("Invalid credentials!");
  }
});

// @desc Get user data for testing
// @route GET /api/users/get-users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { registerUser, loginUser, getUsers };
