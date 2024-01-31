import { create } from "zustand";

interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  // State
  token: string | null;
  user: UserProps | null;
  userName: string;

  // Actions
  login: (user: UserProps) => void;
  logout: () => void;
  setName: (userName: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  // State
  token: null,
  userName: "Napunda",
  user: {
    id: "1",
    name: "Napunda",
    email: "napunda@mail.com",
  } as UserProps,

  // Actions
  login: (user) => set({ user }),
  setName: (userName: string) => set({ userName }),
  logout: () => set({ token: null, user: null }),
}));

export default useAuthStore;
