"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "./movieStore";

interface WatchlistState {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: string) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: movie => {
        const exists = get().watchlist.find(m => m.id === movie.id);
        if (!exists) {
          set(state => ({
            watchlist: [...state.watchlist, movie],
          }));
        }
      },

      removeFromWatchlist: id =>
        set(state => ({
          watchlist: state.watchlist.filter(m => m.id !== id),
        })),
    }),
    {
      name: "netflix-watchlist-storage",
    },
  ),
);
