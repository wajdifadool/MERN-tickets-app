const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Ticket = require('../models/TicketsModel');
const Note = require('../models/noteModal');

/**
 *  @desc Get notes for a ticket
 *  @route Get /api/tickets/:ticketId/notes
 *  @access Private
 */
const getNotes = asyncHandler(async (req, res) => {
  // the protect function have the user in the req argumnet
  const user = req.user;
  if (!user) {
    res.status(401);
    throw new Error('NoteControler.js::getNotes(), User not found ');
  }

  // Grab the ticket
  const ticket = await Ticket.findById(req.params.ticketId); // the id from the url

  // make sure its the user ticket
  // each ticket have the user id in filed called user
  // the request for the cuurent user
  if (ticket.user.toString() !== req.user.id) {
    // not Auth
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({
    ticket: req.params.ticketId,
  });

  res.status(200).json(notes);
});

/**
 *  @desc Create notes for a ticket
 *  @route POST /api/tickets/:ticketId/notes
 *  @access Private
 */
const addNote = asyncHandler(async (req, res) => {
  // the protect function have the user in the req argumnet
  const user = req.user;
  if (!user) {
    res.status(401);
    throw new Error('NoteControler.js::getNotes(), User not found ');
  }

  // Grab the ticket
  const ticket = await Ticket.findById(req.params.ticketId); // the id from the url

  // make sure its the user ticket
  // each ticket have the user id in filed called user
  // the request for the cuurent user
  if (ticket.user.toString() !== req.user.id) {
    // not Auth
    res.status(401);
    throw new Error('User not authorized');
  }

  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text, // comes from form
    isStaff: false,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
