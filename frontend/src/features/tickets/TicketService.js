import axios from 'axios';
const API_URL = '/api/tickets';

// create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

//get User Tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get a ticket based on the id
const getTicket = async (ticketID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${ticketID}`, config);
  setTimeout(() => {
    console.log(response.url);
  }, 3000);

  console.log('resoponse is ', response);
  return response.data;
};

// Create the object
const ticketService = {
  createTicket,
  getTickets,
  getTicket,
};

export default ticketService;
