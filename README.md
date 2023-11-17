# React Project using the MERN Stack and Redux Toolkit

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Deployed

- Deployed [on Render.com](https://tickets-r1vp.onrender.com)

## Used Tools:

- Frontend:
  - React.js
  - Redux toolkit
- Backend:
  - Express.js server
  - Authentication
  - MongoDB - Mongoose

## Environment variables:

- Create a file named `.env` and set these variables:
  - NODE_ENV - development
  - PORT - server's port number
  - MONGO_DB_CONNECT - Moingo DB connection string
  - JWT_SECRET - JSON Web Token Secret string

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs backend/server.js in development mode .\
Conencts to MongoDB.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

### `npm run server`

Runs with [nodemon](https://www.npmjs.com/package/nodemon) backend/server.js in development mode .\
Conencts to MongoDB.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.

### `npm run client`

initiates the frontend development server./
It runs npm start specifically within the frontend directory.

### `npm run dev`

Used as Development environment/
Concurrently runs both the server and client scripts.

## More :

adds the .env
