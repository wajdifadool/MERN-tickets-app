const express = require('express'); // import express for express routes
const router = express.Router({ mergeParams: true });

// evrey time we need to protect route , we pass the protect cosnt as 2nd arg
const { protect } = require('../middleware/authMiddleware');
const { getNotes, addNote } = require('../controlers/NoteControler');

// route format /api/tickets/:ticketId/notes
router.route('/').get(protect, getNotes);
router.route('/').post(protect, addNote);

module.exports = router;
