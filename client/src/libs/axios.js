import { useAuthStore } from '@/src/store/auth';
import axios from 'axios';

const authApi = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
})

authApi.interceptors.request.use(config => {
  const token = useAuthStore.getState().token
  config.headers = {
    Authorization: `Bearer ${token}`
  }
  return config
})

export default authApi;