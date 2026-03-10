import { create } from "zustand";

interface UIState {
  notifications: string[];
  addNotification: (msg: string) => void;
}

export const useUIStore = create<UIState>(set => ({
  notifications: [],

  addNotification: msg =>
    set(state => ({
      notifications: [...state.notifications, msg],
    })),
}));
