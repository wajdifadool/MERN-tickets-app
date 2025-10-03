// we use asyncHandler to make it eeasier, insted of using then.catch when working with mongoose
// https://github.com/Abazhenov/express-async-handler
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc    Get Notes for a  ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user tickets using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // we get the req.params.ticketId from the param
  // we passed the /api/tickets in the NotRoute.js
  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('USer not authorized')
  }

  const notes = await Note.find({
    ticket: req.params.ticketId,
  })

  res.status(200).json(notes)
})

// @desc    Create  a  ticket Note
// @route   Post /api/tickets/:ticketId/notes
// @access  Private
const addeNote = asyncHandler(async (req, res) => {
  // Get user tickets using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // we get the req.params.ticketId from the param
  // we passed the /api/tickets in the NotRoute.js
  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('USer not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  })

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addeNote,
}
