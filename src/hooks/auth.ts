import { create } from "zustand";
import Cookies from "universal-cookie";

//encrypt cookies
export const cookie = new Cookies(null, {
  path: "/",
  sameSite: "strict",
  secure: true,
  maxAge: 60 * 60 * 24 * 30,
});

type AuthState = {
  email: string;
  isAthenticated: boolean;
};

interface AuthStore {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    email: cookie.get("email") || "",
    isAthenticated: cookie.get("email") ? true : false,
  },
  setAuth: (auth: AuthState) => {
    set({ auth: auth });
    cookie.set("email", auth.email, { path: "/" });
  },
  logout: () => {
    cookie.remove("email", { path: "/" });
    set({ auth: { email: "", isAthenticated: false } });
  },
}));
