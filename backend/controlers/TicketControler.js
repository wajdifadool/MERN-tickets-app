const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Ticket = require('../models/TicketsModel');

// @desc    get  user Tickets
// @route   GET /api/tickets
// @access  Private
/**
 * NOTE NOTE NOTE 
 * Does the req.user get passed to our createTicket function from the 
 * authMiddleware that (if successful) sets the req.user equal to the 
 * user returned by the USER.findById() method ?
Yes that is exactly it.
The req object in Express middleware is the same object passed to each
 subsequent bit of middleware or route handler.
So if you have..
middlewareOne -> middlewareTwo -> middlwareThree -> routeHandler -> errorHandler
Then if middlewareOne adds something to the req object then all the 
following bits of middleware, route handler and error handler
 have access to the same req object and the same property that middlewareOne added.
Hope that answers it for you.
 */
const getTickets = asyncHandler(async (req, res) => {
  // json web token have the user id
  // Get user  id using the JWT
  // the user allready in the request,
  const user = req.user;
  if (!user) {
    res.status(401);
    throw new Error('user not found ');
  }
  const tickets = await Ticket.find({
    user: req.user.id,
  });
  // console.log('Request', req);
  res.status(200).json(tickets); // return the user Tickets
});

// @desc    create new  Tickets
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error('add Both product and description ');
  }

  // get the user , we allreay have it from the middleware
  const user = req.user;

  // check for user
  if (!user) {
    res.status(401);
    throw new Error('user not found ');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });
  res.status(201).json(ticket); // return the user Tickets
});

// @desc    get user Single Ticket
// @route   GET /api/tickets/:id
// @access  Private
const getSingleTicket = asyncHandler(async (req, res) => {
  // the user allready in the request,
  const user = req.user;
  if (!user) {
    res.status(401);
    throw new Error('user not found ');
  }
  // Accses the ticket ID via the url
  const ticketID = req.params.id;
  const ticket = await Ticket.findById(ticketID);
  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found ');
  }

  // limit to the user , inDB we saved The user Id as "user"
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('not Authorized ');
  }

  res.status(200).json(ticket); // return the user Tickets
});

// @desc    delete user Single Ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const DeleteSingleTicket = asyncHandler(async (req, res) => {
  // the user allready in the request,
  const user = req.user;
  if (!user) {
    res.status(401);
    throw new Error('user not found ');
  }
  // Accses the ticket ID via the url
  const ticketID = req.params.id;

  const ticket = await Ticket.findById(ticketID);

  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found ');
  }

  // limit to the user , inDB we saved The user Id as "user"
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('not Authorized ');
  }
  console.log('My Ticker', ticket);
  // delete the ticket from DB
  await ticket.deleteOne();
  res.status(200).json({
    success: true,
  });
});

// @desc    update user Single Ticket
// @route   PUT /api/tickets/:id
// @access  Private
const UpdateSingleTicket = asyncHandler(async (req, res) => {
  // the user allready in the request,
  // const user = req.user;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('user not found ');
  }
  // Accses the ticket ID via the url
  const ticketID = req.params.id;

  const ticket = await Ticket.findById(ticketID);

  if (!ticket) {
    res.status(401);
    throw new Error('Ticket not found ');
  }

  // limit to the user , inDB we saved The user Id as "user"
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('not Authorized ');
  }

  // delete the ticket from DB
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log('req Body', req.body);
  console.log('req Body', req.params);
  res.status(200).json(updatedTicket);
});

module.exports = {
  createTicket,
  getTickets,
  getSingleTicket,
  DeleteSingleTicket,
  UpdateSingleTicket,
};
