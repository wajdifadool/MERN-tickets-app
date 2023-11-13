const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Ticket = require('../models/TicketsModel');

// const { userInfo } = require('os');
// @desc    get  user Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'get Tickets',
  }); // return the user Tickets
});

// @desc    create new  Tickets
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'Creating new  Ticket goes here ',
  }); // return the user Tickets
});

module.exports = {
  createTicket,
  getTickets,
};
