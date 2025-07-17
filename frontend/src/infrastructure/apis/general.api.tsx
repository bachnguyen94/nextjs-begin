import axios from 'axios';

export const AxiosClientBlog = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AxiosClientProduct = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

