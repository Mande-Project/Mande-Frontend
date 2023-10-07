import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(persist((set) => ({
  token: "",
  profile: null,
  isAuth: false,
  setToken: (token) => set((state) => ({ token, isAuth: true })),
  setProfile: (profile) => set((state) => ({ profile })),
  logout: () => set((state) => ({ token: "", profile: null, isAuth: false })),
}), {
  name: "auth"
}));

export const profileRequest = async () => {
  await axios.get('http://localhost:3000/dataUsers.json')
}