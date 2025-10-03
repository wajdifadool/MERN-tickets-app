// we use asyncHandler to make it eeasier, insted of using then.catch when working with mongoose
// https://github.com/Abazhenov/express-async-handler
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
// @desc     Register a new User
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    // return res.status(400).json({
    //   message: 'Please include all fields',
    // })

    res.status(400)
    throw new Error('Please include all fields')
  }
  // ok  , Find if user allready exist
  const userExiset = await User.findOne({ email: email })
  if (userExiset) {
    res.status(400)
    throw new Error('User allready exists')
  }
  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPasssword = await bcrypt.hash(password, salt)

  // Create user in the database
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPasssword,
  })

  // check if the user created in the data base
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new error('Invaled user data')
  }

  // console.log(req.body)
  // res.send('Register Route')
})
// @desc     Login a  User
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // res.send('Login Route')
  // get the eamil and passw
  const { email, password } = req.body
  const user = await User.findOne({ email })
  // copare password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Worng user credntails')
  }
})

// @desc    Get Current User
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
})

// @desc    Generate token for protected routes
// @access  Public
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
