// the Backend layer goes here

import axios from 'axios'

// define the api url
const API_URL = '/api/tickets/'

// reate New Ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

// fetch the user Tickets
// reate New Ticket
const fetchUserTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

// fetch the user Ticket by id
// reate New Ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}

// Close the user Ticket by id
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  )

  return response.data
}

const ticketService = {
  createTicket,
  fetchUserTickets,
  getTicket,
  closeTicket,
}

export default ticketService
