"use client";

import { useState } from "react";
import { movies } from "@/data/movies";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const filtered = movies.filter(
    m =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.genre.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="p-10">
      <input
        placeholder="Search movies..."
        className="w-full p-4 bg-gray-800 rounded"
        onChange={e => setQuery(e.target.value)}
      />

      <div className="mt-6 grid grid-cols-4 gap-6">
        {filtered.map(movie => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
}
