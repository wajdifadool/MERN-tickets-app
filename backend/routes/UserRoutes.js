/**
 * All routes declartion goes here
 */

const express = require('express'); // import express for express routes
const router = express.Router();

// import routes
const {
  registatUser,
  loginUser,
  asyncCall,
} = require('../controlers/userControler');
// router.post('/', (req, res) => {
//   res.send('Registar Route goes here');
// });
// router.post('/login', (req, res) => {
//     res.send('Login Route goes here');
//   });

// Cleaner way is to import

router.post('/', registatUser);
router.post('/login', loginUser);

module.exports = router;
