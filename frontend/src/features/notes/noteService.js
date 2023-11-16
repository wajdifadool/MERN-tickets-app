import axios from 'axios';
// root url
const API_URL = '/api/tickets/';

// Get a notes for the  ticket
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${ticketId}/notes`, config);

  // console.log('resoponse is ', response);
  return response.data;
};

const createNote = async ({ noteText, ticketId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    // url path
    `${API_URL}/${ticketId}/notes`,
    // Object to send
    { text: noteText },
    // configration Object
    config
  );

  // console.log('resoponse is ', response);
  return response.data;
};

const noteService = { getNotes, createNote };
export default noteService;
