/**
 * All routes declartion goes here
 */

const express = require('express'); // import express for express routes
const router = express.Router();

// import routes
const { getTickets, createTicket } = require('../controlers/TicketControler');

// evrey time we need to protect route , we pass the protect cosnt as 2nd arg
const { protect } = require('../middleware/authMiddleware');

// just get the user ticket
router.route('/').get(protect, getTickets).post(protect, createTicket);

module.exports = router;
