import { useAuthStore } from '@/src/store/auth';
import axios from 'axios';

export const apiWithAutorization = axios.create({
  // baseURL: 'http://localhost:8000/',
  // eslint-disable-next-line no-undef
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
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
  // eslint-disable-next-line no-undef
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
})

apiWithoutAutorization.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  return config
})