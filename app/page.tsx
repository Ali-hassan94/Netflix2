// "use client";

// import HeroBanner from "@/components/layout/HeroBanner";
// import HeroSection from "@/components/layout/HeroSection";
// import { movies } from "@/data/movies";
// import MovieSection from "@/components/movie/MovieSection";
// import { useMovieStore } from "@/store/movieStore";

// export default function Home() {
//   const { movies } = useMovieStore();

//   return (
//     <div className="pt-20">
//       <HeroBanner />
//       <HeroSection />
//       <MovieSection title="Trending" movies={movies} />
//       <MovieSection title="Top Rated" movies={movies} />
//     </div>
//   );
// }

"use client";

import HeroBanner from "@/components/layout/HeroBanner";
import HeroSection from "@/components/layout/HeroSection";
import MovieSection from "@/components/movie/MovieSection";
import { useMovieStore } from "@/store/movieStore";

export default function Home() {
  const { movies } = useMovieStore();

  const moviesOnly = movies.filter(m => m.type === "movie");

  const seriesOnly = movies.filter(m => m.type === "series");

  const dramaOnly = movies.filter(m => m.type === "drama");

  return (
    <div className="pt-20">
      <HeroBanner />
      <HeroSection />

      <MovieSection title="Movies" movies={moviesOnly} />

      <MovieSection title="Series" movies={seriesOnly} />

      <MovieSection title="Dramas" movies={dramaOnly} />
    </div>
  );
}
