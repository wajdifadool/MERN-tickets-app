const asyncHandler = require('express-async-handler');

// @desc    Registar a new user
// @route   /api/users
// @access  Public
const registatUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  // destructre the data response
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    //
    // return res.status(400).json({
    //   response: 'please include all fileds ',
    //   'Fildes[name,enmail,password]': [!!name, !!email, !!password],
    // });

    // handling errores in elegant way
    res.status(400);
    throw new Error('please include all fields');
  }
  res.send('Rigistar Route response '); // for sign up
});

// @desc    login a new user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login user Route');
});

module.exports = {
  registatUser,
  loginUser,
};
