import axios from 'axios';

const client = axios.create({
  // baseURL: import.meta.env.VITE_SERVER_API,
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});

export default client;

const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    return null;
  }
  return accessToken;
};
