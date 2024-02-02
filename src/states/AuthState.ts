import { create } from "zustand";
import { auth } from "../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserCredential } from "firebase/auth"; // Import UserCredential type

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
    } catch (e) {
      set({ isLoggedIn: false, loginError: e.message });
    }
  },
  logout: () => {
    auth.signOut();
    set({ isLoggedIn: false, user: null });
  },
}));

export default useAuthStore;
