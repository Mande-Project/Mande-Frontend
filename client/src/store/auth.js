import axios from '@/src/libs/axios';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAuthStore = create(devtools(persist((set, get) => ({
  access: null,
  refresh: null,
  user: null,
  isAuthenticated: false,

  loginSuccess: (payload) => set((state) => ({
    access: payload.access,
    refresh: payload.refresh,
    isAuthenticated: true
  })),

  userLoadedSuccess: (payload) => set((state) => ({ user: payload })),

  userLoadedFail: () => set((state) => ({ user: null })),

  loginFail: () => set((state) => ({
    access: "",
    refresh: "",
    isAuthenticated: false,
    user: null
  })),

  authenticatedSuccess: () => set((state) => ({ isAuthenticated: true })),

  authenticatedFail: () => set((state) => ({ isAuthenticated: false})),

  logoutUser: () => set((state) => ({
    access: null,
    refresh: null,
    user: null,
    isAuthenticated: false,
  })),

}), {
  name: "auth"
})));
