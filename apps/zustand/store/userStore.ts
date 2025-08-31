import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface User {
  id: number | null;
  name: string | null;
  email: string | null;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: { id: null, name: null, email: null },
        setUser: (user) => set({ user }),
        logout: () => set({ user: { id: null, name: null, email: null } }),
      }),
      {
        name: "user-storage",
      }
    ),
  )
);