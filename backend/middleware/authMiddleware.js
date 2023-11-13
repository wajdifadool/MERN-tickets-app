const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log('Protecting, Headers: ', req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];
      // The token format as follows: 'Bearer sdfodfj4454_json_web_token-afdafe;l;s'

      // verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
      /**
       * he next() function is not a part of the Node.js or
       *  Express API, but is the third argument that is passed to
       *  the middleware function.
       *  The next() function could be named anything,
       *  but by convention it is always named “next”.
       *  To avoid confusion, always use this convention.
       */
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  // no token
  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = { protect };
