const express = require('express'); // import express
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port${PORT}`));

// we create Routes with express
app.get('/api/users', (req, res) => {
  //   res.send('Hello');
  //   res.status(200).json({ message: 'message' });
  res.json({ message: 'message' });
});
// Routes
// conect the route to the file
app.use('/api/users', require('./routes/UserRoutes'));
