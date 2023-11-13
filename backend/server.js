const express = require('express'); // import express
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Connect to DB
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

//  we have to add the middleware to able to read the data
// otherwise we cant read the data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// we create Routes with express
// app.get('/api/users', (req, res) => {
//   //   res.send('Hello');
//   //   res.status(200).json({ message: 'message' });
//   res.json({ message: 'message' });
// });

// Routes
app.get('/', (req, res) => {
  //   res.send('Hello');
  //   res.status(200).json({ message: 'message' });
  res.status(200).json({ message: 'Welcome to server . . . ' });
});
// Conecct the app to the routes files
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/tickets', require('./routes/TicketRoutes'));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port${PORT}`));
