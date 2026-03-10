// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { v4 as uuidv4 } from "uuid";

// export interface Movie {
//   id: string;
//   title: string;
//   genre: string;
//   description: string;
//   thumbnail: string;
//   videoUrl: string;
//   createdAt: string;
//   views: number;
// }

// interface MovieState {
//   movies: Movie[];
//   hasHydrated: boolean;

//   setHasHydrated: (state: boolean) => void;

//   addMovie: (movie: Omit<Movie, "id" | "createdAt" | "views">) => void;

//   deleteMovie: (id: string) => void;

//   updateMovie: (id: string, updatedData: Partial<Movie>) => void;

//   incrementViews: (id: string) => void;
// }

// export const useMovieStore = create<MovieState>()(
//   persist(
//     set => ({
//       movies: [],
//       hasHydrated: false,

//       setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

//       addMovie: movie =>
//         set(state => ({
//           movies: [
//             ...state.movies,
//             {
//               ...movie,
//               id: uuidv4(),
//               createdAt: new Date().toISOString(),
//               views: 0,
//             },
//           ],
//         })),

//       deleteMovie: id =>
//         set(state => ({
//           movies: state.movies.filter(m => m.id !== id),
//         })),

//       updateMovie: (id, updatedData) =>
//         set(state => ({
//           movies: state.movies.map(m =>
//             m.id === id ? { ...m, ...updatedData } : m,
//           ),
//         })),

//       incrementViews: id =>
//         set(state => ({
//           movies: state.movies.map(m =>
//             m.id === id ? { ...m, views: m.views + 1 } : m,
//           ),
//         })),
//     }),
//     {
//       name: "netflix-movie-storage",

//       onRehydrateStorage: () => state => {
//         state?.setHasHydrated(true);
//       },
//     },
//   ),
// );

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

/* ---------- TYPES ---------- */

export type ContentType = "movie" | "series" | "drama";

export interface Episode {
  id: string;
  title: string;
  videoUrl: string;
}

export interface Season {
  id: string;
  seasonNumber: number;
  episodes: Episode[];
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  description: string;
  thumbnail: string;

  type: ContentType;

  videoUrl?: string; // For movies
  seasons?: Season[]; // For series/drama

  createdAt: string;
  views: number;
}

interface MovieState {
  movies: Movie[];
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;

  addMovie: (movie: Omit<Movie, "id" | "createdAt" | "views">) => void;

  deleteMovie: (id: string) => void;

  updateMovie: (id: string, updatedData: Partial<Movie>) => void;

  incrementViews: (id: string) => void;
}

export const useMovieStore = create<MovieState>()(
  persist(
    set => ({
      movies: [],
      hasHydrated: false,

      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      addMovie: movie =>
        set(state => ({
          movies: [
            ...state.movies,
            {
              ...movie,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
              views: 0,
            },
          ],
        })),

      deleteMovie: id =>
        set(state => ({
          movies: state.movies.filter(m => m.id !== id),
        })),

      updateMovie: (id, updatedData) =>
        set(state => ({
          movies: state.movies.map(m =>
            m.id === id ? { ...m, ...updatedData } : m,
          ),
        })),

      incrementViews: id =>
        set(state => ({
          movies: state.movies.map(m =>
            m.id === id ? { ...m, views: m.views + 1 } : m,
          ),
        })),
    }),
    {
      name: "netflix-movie-storage",
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
