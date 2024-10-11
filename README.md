
# 
# Support Ticket System using the MERN Stack and Redux Toolkit
### Overview

This is a support ticket system built using the MERN stack (MongoDB, Express, React, and Node.js). 
The system allows users to register, log in, create tickets, view their tickets, and leave notes for support staff. Users can also close tickets once their issues are resolved.

The application features a clean and simple interface and uses Redux Toolkit for state management on the front end, along with authentication to protect routes and data.

### Features
- User Registration & Authentication: Users can register and log in to manage their tickets. Authentication is handled via JWT.
- Create and Manage Tickets: Logged-in users can create support tickets, choose the product related to the issue, and provide a description.

- View Tickets: Users can view a list of their tickets with details like the ticket ID, product, and description.

- Add Notes: Users can leave notes on a ticket for additional communication, which are displayed in a thread-like format.

- Close Tickets: Once an issue is resolved, users can close the ticket.
- State Management: The frontend is powered by Redux Toolkit for efficient state management.
- Backend API: A complete backend API is built with Node.js and Express to handle requests and manage the database using MongoDB.
Deployment
The app is deployed on Render and can be accessed [here](https://tickets-r1vp.onrender.com)

### Tech Stack
Frontend: React, Redux Toolkit
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Deployment [on Render.com](https://tickets-r1vp.onrender.com)


> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

###  run on your local machine

#### Environment variables:

- Create a file named `.env` and set these variables:
  - NODE_ENV - development
  - PORT - server's port number
  - MONGO_DB_CONNECT - Moingo DB connection string
  - JWT_SECRET - JSON Web Token Secret string
> Exmaple 
```sh
NODE_ENV = development
PORT = 5000
MONGO_URI =  mongodb+srv://xxx:xxx@xxx.xxx.mongodb.net/?retryWrites=true&w=majority&appName=xxx
JWT_SECRET = abc123

```
#### Available Scripts

In the project directory, you can run:

```sh 
npm run start
```

Runs backend/server.js in development mode .\
Conencts to MongoDB.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

```sh
npm run server
```

Runs with [nodemon](https://www.npmjs.com/package/nodemon) backend/server.js in development mode .\
Conencts to MongoDB.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.


```sh
npm run client
```


initiates the frontend development server./
It runs npm start specifically within the frontend directory.


```sh
npm run dev
```


Used as Development environment/
Concurrently runs both the server and client scripts.




