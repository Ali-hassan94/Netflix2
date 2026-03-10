"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then(res => res.json())
      .then(data => {
        setMovies(data);
      });
  }, []);

  useEffect(() => {
    const result = movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.description.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(result);
  }, [query, movies]);

  return (
    <div className="px-10 mt-20">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h2>

      {filtered.length === 0 && (
        <p className="text-gray-400">No movies found</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {filtered.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}