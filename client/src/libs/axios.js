import { useAuthStore } from '@/src/store/auth';
import axios from 'axios';

export const apiWithAutorization = axios.create({
  baseURL: 'http://localhost:8000/',
})

apiWithAutorization.interceptors.request.use(config => {
  const access = useAuthStore.getState().access
  config.headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${access}`,
    'Accept': 'application/json',
  }
  return config
})


export const apiWithoutAutorization = axios.create({
  baseURL: 'http://localhost:8000/',
  // baseURL: `${process.env.REACT_APP_API_URL}`,
})

apiWithoutAutorization.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json',
  }
  return config
})