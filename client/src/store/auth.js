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

  signupSuccess: (payload) => set((state) => ({
    isAuthenticated: false
  })),

  activationSuccess: () => set((state) => ({
  })),

  userLoadedFail: () => set((state) => ({ user: null })),

  loginFail: () => set((state) => ({
    access: "",
    refresh: "",
    isAuthenticated: false,
    user: null
  })),

  signupFail: () => set((state) => ({
  })),

  activationFail: () => set((state) => ({
  })),

  authenticatedSuccess: () => set((state) => ({ isAuthenticated: true })),

  authenticatedFail: () => set((state) => ({ isAuthenticated: false })),

  logoutUser: () => set((state) => ({
    access: null,
    refresh: null,
    user: null,
    isAuthenticated: false,
  })),

}), {
  name: "auth"
})));
