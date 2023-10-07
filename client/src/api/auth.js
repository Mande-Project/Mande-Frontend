import axios from "@/src/libs/axios";

export const loginRequest = async (email, password) => {
  return axios.post("login", {
    email,
    password
  });
}

export const profileRequest = async () => {
  return axios.get("profile");
}