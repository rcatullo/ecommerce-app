import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach JWT on every request if present
api.interceptors.request.use(config => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
export type { AxiosResponse };
