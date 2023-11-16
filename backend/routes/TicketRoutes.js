/**
 * All routes declartion goes here
 */

const express = require('express'); // import express for express routes
const router = express.Router();

// import routes
const {
  getTickets,
  createTicket,
  getSingleTicket,
  UpdateSingleTicket,
  DeleteSingleTicket,
} = require('../controlers/TicketControler');

// evrey time we need to protect route , we pass the protect cosnt as 2nd arg
const { protect } = require('../middleware/authMiddleware');

// Re-route into note routers
// bring the note routes
const noteRouter = require('./NoteRoute');
router.use('/:ticketId/notes', noteRouter);

// just get the user ticket
router.route('/').get(protect, getTickets).post(protect, createTicket);
router
  .route('/:id')
  .get(protect, getSingleTicket)
  .delete(protect, DeleteSingleTicket)
  .put(protect, UpdateSingleTicket);

module.exports = router;
