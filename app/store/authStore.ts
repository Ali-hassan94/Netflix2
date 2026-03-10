import { create } from "zustand";

interface Profile {
  id: string;
  name: string;
}

interface User {
  email: string;
  profiles: Profile[];
  activeProfile: Profile | null;
}

interface AuthState {
  user: User | null;
  login: (email: string) => void;
  selectProfile: (profileId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,

  login: email => {
    const newUser: User = {
      email,
      profiles: [
        { id: "1", name: "Ali" },
        { id: "2", name: "Kids" },
      ],
      activeProfile: null,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    set({ user: newUser });
  },

  selectProfile: profileId =>
    set(state => {
      if (!state.user) return state;
      const profile = state.user.profiles.find(p => p.id === profileId) || null;

      const updatedUser = { ...state.user, activeProfile: profile };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { user: updatedUser };
    }),

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
