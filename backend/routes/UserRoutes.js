const express = require('express')
const router = express.Router()
const {
  loginUser,
  registerUser,
  getMe,
} = require('../controlers/userControler')

const { protect } = require('../middleware/authMidlleware')
/**
 * this is how its done with no controller
 */
// router.post('/', (req, res) => {
//   res.send('Register Route goes here ')
// })

// router.post('/login', (req, res) => {
//   res.send('Log in  Route goes here....  ')
// })

router.post('/login', loginUser)
router.post('/', registerUser)
router.get('/me', protect, getMe) // we add protect, see explination

module.exports = router

// we add protect as an argument , each time we need to protext someroute
// we add the  protect  to the route
