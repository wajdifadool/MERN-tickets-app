import React from 'react'
// Es6 Classes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewTicket from './pages/NewTicket'

// Components
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Tickets from './pages/Tickets'
import Ticket from './pages/Ticket'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-ticket" element={<PrivateRoute />}>
              {/*
               * So every time we want to create a private route, this is how we need to do it.
               * We wrap it in the private route and then we put the actual element that we want to access.
               * And the URL is going to be the same for for both of these.
               */}
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>

            {/* Tickets */}
            <Route path="/tickets" element={<PrivateRoute />}>
              {/*
               * So every time we want to create a private route, this is how we need to do it.
               * We wrap it in the private route and then we put the actual element that we want to access.
               * And the URL is going to be the same for for both of these.
               */}
              <Route path="/tickets" element={<Tickets />} />
            </Route>

            {/* Ticket */}
            <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
              {/*
               * So every time we want to create a private route, this is how we need to do it.
               * We wrap it in the private route and then we put the actual element that we want to access.
               * And the URL is going to be the same for for both of these.
               */}
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      {/* // Toast outside the Router */}
      <ToastContainer />
    </>
  )
}

export default App
