import axios from "@/src/libs/axios";

export const loginRequest = async (body) => {
  return axios.post("auth/jwt/create", body);
}

export const profileRequest = async () => {
  return axios.get("profile");
}