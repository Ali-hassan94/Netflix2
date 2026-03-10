"use client";

import { useWatchlistStore } from "@/store/watchlistStore";
import MovieCard from "@/components/movie/MovieCard";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlistStore();

  return (
    <div className="pt-24 px-10">
      <h1 className="text-3xl mb-8">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">No movies in watchlist</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {watchlist.map(movie => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} />
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
