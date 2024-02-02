import { create } from "zustand";
import { auth } from "../services/firebaseConnection";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  type UserCredential,
} from "firebase/auth";

export interface Credentials {
  email: string;
  password: string;
}

export interface UserProps {
  email: string | null;
  displayName: string | null;
  uid: string;
}

interface AuthState {
  // State
  isLoggedIn: boolean;
  loginError: string;
  user: UserProps | null;

  // Actions
  login: (credentials: Credentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: !!auth.currentUser,
  loginError: "",
  login: async (credentials: Credentials) => {
    const { email, password } = credentials;
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: UserProps = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        uid: userCredential.user.uid,
      };
      set({ isLoggedIn: true, user });
    } catch (e: unknown) {
      set({ isLoggedIn: false, loginError: e ? (e as Error).message : "" });
    }
  },
  logout: () => {
    auth.signOut();
    set({ isLoggedIn: false, user: null });
  },
  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );
      const user: UserProps = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        uid: userCredential.user.uid,
      };
      set({ isLoggedIn: true, user });
    } catch (e: unknown) {
      set({ isLoggedIn: false, loginError: e ? (e as Error).message : "" });
    }
  },
}));

export default useAuthStore;
