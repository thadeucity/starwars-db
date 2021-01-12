import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STAR_WARS_API,
});

export default api;
