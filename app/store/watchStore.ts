import { create } from "zustand";

interface WatchState {
  watchlist: string[];
  addToWatchlist: (id: string) => void;
  removeFromWatchlist: (id: string) => void;
}

export const useWatchStore = create<WatchState>(set => ({
  watchlist: JSON.parse(localStorage.getItem("watchlist") || "[]"),

  addToWatchlist: id =>
    set(state => {
      const updated = [...state.watchlist, id];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return { watchlist: updated };
    }),

  removeFromWatchlist: id =>
    set(state => {
      const updated = state.watchlist.filter(m => m !== id);
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return { watchlist: updated };
    }),
}));
