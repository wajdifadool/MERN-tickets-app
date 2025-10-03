// /api/tickets/:ticketID/notes
const express = require('express')
const router = express.Router({
  mergeParams: true,
})

const { protect } = require('../middleware/authMidlleware')

const { getNotes, addeNote } = require('../controlers/noteController')

// router.route('/').get(protect, getTickets).post(protect, createTicket)
// in order to get my tickets we have to be authinticated
// router.route('/').get(protect, getTickets).post(protect, createTicket)

router.get('/', protect, getNotes)
router.post('/', protect, addeNote)

module.exports = router

// we add protect as an argument , each time we need to protext someroute
// we add the  protect  to the route
