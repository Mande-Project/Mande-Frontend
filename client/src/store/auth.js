import axios from '@/src/libs/axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAuthStore = create(devtools(persist((set, get) => ({
  access: "",
  refresh: "",
  user: null,
  isAuthenticated: false,

  setAccess: (access) => set((state) => ({
    access,
    isAuthenticated: true
  })),

  setRefresh: (refresh) => set((state) => ({ refresh })),

  setUser: (user) => set((state) => ({ user })),

  logout: () => set((state) => ({
    access: "",
    refresh: "",
    user: null,
    isAuthenticated: false,

  })),

  loginSuccess: (payload) => set((state) => ({
    access: payload.access,
    refresh: payload.access,
    isAuthenticated: true
  })),

  userLoadedSuccess: (payload) => set((state) => ({ user:payload })),

  userLoadedFail: () => set((state) => ({ user: null })),

  loginFail: () => set((state) => ({
    access: "",
    refresh: "",
    isAuthenticated: false,
    user: null
  })),
}), {
  name: "auth"
})));
