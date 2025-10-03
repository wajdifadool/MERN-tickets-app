// EndPoint : /api/tickets
const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMidlleware')

const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require('../controlers/ticketController')

// Re-route into note router
const noteRouter = require('./NoteRoutes')
router.use('/:ticketId/notes', noteRouter)

// router.route('/').get(protect, getTickets).post(protect, createTicket)
// in order to get my tickets we have to be authinticated
// router.route('/').get(protect, getTickets).post(protect, createTicket)
router.get('/', protect, getTickets)
router.post('/', protect, createTicket)
router.get('/:id', protect, getTicket)
router.delete('/:id', protect, deleteTicket)
router.put('/:id', protect, updateTicket)

module.exports = router

// we add protect as an argument , each time we need to protext someroute
// we add the  protect  to the route
