const path = require('path')
const express = require('express') // import express
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect to DB
connectDB()

const app = express()

//  we have to add the middleware to able to read the data
// otherwise we cant read the data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/api', (req, res) => {
  //   res.send('Hello');
  //   res.status(200).json({ message: 'message' });
  res.json({ message: 'Server is Live and Kicking ... ' })
})

// we create Routes with express
// app.get('/api/users', (req, res) => {
//   //   res.send('Hello');
//   //   res.status(200).json({ message: 'message' });
//   res.json({ message: 'message' });
// });

// app.get('/', (req, res) => {
//   //   res.send('Hello');
//   //   res.status(200).json({ message: 'message' });
//   res.status(200).json({ message: 'Welcome to server . . . ' });
// });

// Routes
// Conecct the app to the routes files
app.use('/api/users', require('./routes/UserRoutes'))
app.use('/api/tickets', require('./routes/TicketRoutes'))

// // Serve Frontend
// if (process.env.NODE_ENV === 'production') {
//   // Set build folder as static
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   // FIX: below code fixes app crashing on refresh in deployment
//   app.get('*', (_, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//   });
// } else {
//   app.get('/', (_, res) => {
//     res.status(200).json({ message: 'Welcome to the Support Desk API' });
//   });
// }

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started at port${PORT}`))
