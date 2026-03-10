"use client";

import { useParams, useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";

export default function CategoryDetailPage() {
  const { genre } = useParams();
  const router = useRouter();
  const { movies } = useMovieStore();

  const filteredMovies = movies.filter(movie => movie.genre === genre);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-10">
      <button
        onClick={() => router.back()}
        className="mb-10 bg-gray-800 px-4 py-2 rounded"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold mb-10">{genre} Movies</h1>

      {filteredMovies.length === 0 ? (
        <p className="text-gray-400">No movies found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="font-semibold">{movie.title}</h2>

                <p className="text-sm text-gray-400 mt-2">
                  {movie.views} Views
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
