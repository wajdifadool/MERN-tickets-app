// we use asyncHandler to make it eeasier, insted of using then.catch when working with mongoose
// https://github.com/Abazhenov/express-async-handler
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const userModel = require('../models/userModel')

// @desc    Get this User tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user tickets using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json({ message: 'succsfull', tickets: tickets })
})

// @desc    Get  User single tickets
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user tickets using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // grab user Ticket
  const _id = req.params.id
  const ticket = await Ticket.findById(_id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found ')
  }

  //   TODO::do we really need this one here?
  // chicking  if this is the user ticket ?
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const resObj = ticket

  res.status(200).json(resObj)
})

// @desc    create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('please add a product and descreption')
  }

  // Get user tickets using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const TicketObj = {
    product: product,
    description,
    user: req.user.id,
    status: 'new',
  }

  const ticket = await Ticket.create(TicketObj)

  res.status(201).json({ message: 'created Ticket', ticket: ticket })
})

// @desc    Delete  User single tickets
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user tickets using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // grab user Ticket
  const _id = req.params.id
  const ticket = await Ticket.findById(_id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found ')
  }

  //   TODO::do we really need this one here
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.deleteOne() // delete the first instance

  res.status(200).json({ message: 'succsfull deleteion', success: true })
})

// @desc    Update  User single tickets
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user tickets using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // grab user Ticket
  const _id = req.params.id
  const ticket = await Ticket.findById(_id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found ')
  }

  //   TODO::do we really need this one her
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  // the new Tickets Data sent in the req.body headers, (2nd paramter)
  //  the object {new : true }  means if the Model not there thne createit
  const updatedTicket = await Ticket.findByIdAndUpdate(_id, req.body, {
    new: true,
  })

  res.status(200).json({ message: 'succsfull update', updatedTicket })
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
