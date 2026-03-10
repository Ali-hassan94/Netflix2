import { create } from "zustand";

interface HistoryState {
  history: string[];
  addToHistory: (id: string) => void;
}

export const useHistoryStore = create<HistoryState>(set => ({
  history: JSON.parse(localStorage.getItem("history") || "[]"),

  addToHistory: id =>
    set(state => {
      const updated = [...new Set([...state.history, id])];
      localStorage.setItem("history", JSON.stringify(updated));
      return { history: updated };
    }),
}));
