import axios from "axios";

export const accessApi = axios.create({
  baseURL: 'http://localhost:8000/api_users/'
})



