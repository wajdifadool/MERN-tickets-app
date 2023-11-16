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

const noteService = { getNotes };
export default noteService;
