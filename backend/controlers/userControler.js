const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const { userInfo } = require('os');
// @desc    get Current user
// @route   /api/users/me
// @access  private
const getMe = asyncHandler(async (req, res) => {
  // destructure the user data
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user); // return the user data
});
// @desc    Registar a new user
// @route   /api/users
// @access  Public
const registatUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  // destructre the data response
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    //
    // return res.status(400).json({
    //   response: 'please include all fileds ',
    //   'Fildes[name,enmail,password]': [!!name, !!email, !!password],
    // });

    // handling errores in elegant way
    res.status(400);
    throw new Error('please include all fields');
  }

  // find if user already existes
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists ');
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // crete User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // if user created Succeesfuly

  if (user) {
    res.status(201).json({
      _id: user._id, // id auto generted by mongodb
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invald User');
  }
});

// @desc    login a new user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invald Credintals');
  }
});
// generate Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
module.exports = {
  registatUser,
  loginUser,
  getMe,
};
