import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL);

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
