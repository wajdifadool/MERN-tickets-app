import axios from 'axios';

// define the api url
const API_URL = '/api/users';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  // console.log(object)
  if (response.data) {
    // save the user
    console.log('saved user to local Storag', JSON.stringify(response.data));
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  // retun the user data and token
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  // console.log(object)
  if (response.data) {
    // save the user
    console.log('saved user to local Storag', JSON.stringify(response.data));
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  // retun the user data and token
  return response.data;
};

// Log out user
const logout = () => localStorage.removeItem('user');
const authService = {
  register,
  logout,
  login,
};

export default authService;
