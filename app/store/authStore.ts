import { create } from "zustand";
import apiClient from "@/utils/apiClient";
import {
  removeUserTokenCookie,
  saveUserTokenToCookie,
} from "@/utils/userToken";

interface User {
  id: string;
  email: string;
  role: "admin" | "customer";
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: (url?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
  logout: (token: string, url?: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  checkAuth: async (url?: string) => {
    set({ loading: true });
    try {
      const res = await apiClient.get(`/api/auth/me${url ? `/${url}` : ""}`);
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    set({ loading: true });
    try {
      const res = await apiClient.post("/api/auth/login", { email, password });
      if (res.data.user.role === "customer") {
        saveUserTokenToCookie(res.data.token, "customer_token");
      } else {
        saveUserTokenToCookie(res.data.token, "token");
      }
      set({ user: res.data.user, loading: false });
      return res.data.user;
    } catch (error) {
      set({ user: null, loading: false });
      throw error;
    }
  },

  logout: async (tokenKey: string, url?: string) => {
    set({ loading: true });
    try {
      await apiClient.post(`/api/auth/logout${url ? `/${url}` : ""}`);
      removeUserTokenCookie(tokenKey);
      set({ user: null, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
