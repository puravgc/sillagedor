import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  user: any;
  token: string | null;
  setUser: (user: any, token: string | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: Cookies.get("auth_token") || null,

  setUser: (user, token) => {
    Cookies.set("auth_token", token || "", { expires: 7, path: "/" });
    set({ user, token });
  },

  clearUser: () => {
    Cookies.remove("auth_token");
    set({ user: null, token: null });
  },
}));
