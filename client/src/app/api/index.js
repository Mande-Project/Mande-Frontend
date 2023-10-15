import axios from "axios";

const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : '';

export const accessApi = axios.create({
  baseURL: 'http://localhost:8000/api_users/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token,
  },
});


export const baseApi = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token,
  },
});
