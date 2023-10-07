import axios from '@/libs/axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAuthStore = create(devtools(persist((set) => ({
  token: "",
  profile: null,
  isAuth: false,
  setToken: (token) => set((state) => ({ token, isAuth: true })),
  setProfile: (profile) => set((state) => ({ profile })),
  logout: () => set((state) => ({ token: "", profile: null, isAuth: false })),
}), {
  name: "auth"
})));
