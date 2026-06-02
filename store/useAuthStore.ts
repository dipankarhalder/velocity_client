import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isLoginOpen: boolean;
  user: User | null;
  openLogin: () => void;
  closeLogin: () => void;
  loginSuccess: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoginOpen: false,
      user: null,
      openLogin: () => set({ isLoginOpen: true }),
      closeLogin: () => set({ isLoginOpen: false }),
      loginSuccess: (user) => set({ user, isLoginOpen: false }),
      logout: () => set({ user: null }),
    }),
    {
      name: "velocity-auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
