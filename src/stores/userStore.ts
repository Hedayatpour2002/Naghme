import { create } from "zustand";

interface User {
  user_id: number;
  user_name: string;
  email: string;
  contact: boolean;
  role: string;
  iat: number;
  exp: number;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
