// "use client";

// import MovieCard from "./MovieCard";

// export default function MovieSection({
//   title,
//   movies,
// }: {
//   title: string;
//   movies: any[];
// }) {
//   return (
//     <div className="px-10 mt-10">
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>

//       <div className="flex gap-6 overflow-x-auto">
//         {movies.map(movie => (
//           <MovieCard key={`section-${title}-${movie.id}`} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import MovieCard from "./MovieCard";
import { Movie } from "@/store/movieStore";

interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieSection({ title, movies }: Props) {
  if (!movies?.length) return null;

  return (
    <div className="px-10 mt-14">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {movies.map(movie => (
          <MovieCard key={`${title}-${movie.id}`} movie={movie} />
        ))}
      </div>
    </div>
  );
}
