/**
 * All routes declartion goes here
 */

const express = require('express'); // import express for express routes
const router = express.Router();

// import routes
const {
  registatUser,
  loginUser,
  getMe,
} = require('../controlers/userControler');
// evrey time we need to protect route , we pass the protect cosnt as 2nd arg
const { protect } = require('../middleware/authMiddleware');
// router.post('/', (req, res) => {
//   res.send('Registar Route goes here');
// });
// router.post('/login', (req, res) => {
//     res.send('Login Route goes here');
//   });

// Cleaner way is to import

router.post('/', registatUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
