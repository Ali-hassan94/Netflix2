// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useMovieStore } from "@/store/movieStore";
// import { useEffect, useRef } from "react";
// import AdvancedPlayer from "@/components/movie/AdvancedPlayer";

// export default function WatchPage() {
//   const params = useSearchParams();
//   const router = useRouter();

//   const { movies, hasHydrated, incrementViews } = useMovieStore();

//   const id = params.get("id");

//   const hasIncremented = useRef(false);

//   // Wait for hydration
//   if (!hasHydrated) {
//     return (
//       <div className="bg-black text-white min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!id) {
//     return (
//       <div className="bg-black text-white min-h-screen flex items-center justify-center">
//         Invalid movie ID
//       </div>
//     );
//   }

//   const movie = movies.find(m => m.id === id);

//   // ✅ SAFE VIEW INCREMENT (NO LOOP)
//   useEffect(() => {
//     if (movie && !hasIncremented.current) {
//       incrementViews(movie.id);
//       hasIncremented.current = true;
//     }
//   }, [movie, incrementViews]);

//   if (!movie) {
//     return (
//       <div className="bg-black text-white min-h-screen flex items-center justify-center">
//         Movie not found
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black min-h-screen flex flex-col items-center justify-center relative">
//       <button
//         onClick={() => router.back()}
//         className="absolute top-5 left-5 bg-white px-4 py-2 rounded"
//       >
//         Back
//       </button>

//       <AdvancedPlayer src={movie.videoUrl} />
//     </div>
//   );
// }
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";
import { useEffect, useRef, useState, useMemo } from "react";
import AdvancedPlayer from "@/components/movie/AdvancedPlayer";

export default function WatchPage() {
  const params = useSearchParams();
  const router = useRouter();

  const { movies, hasHydrated, incrementViews } = useMovieStore();

  const id = params.get("id");

  const hasIncremented = useRef(false);
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState<string | null>(
    null,
  );

  const movie = useMemo(() => {
    if (!id) return null;
    return movies.find(m => m.id === id) ?? null;
  }, [id, movies]);

  /* ---------------- INCREMENT VIEWS ---------------- */

  useEffect(() => {
    if (movie && !hasIncremented.current) {
      incrementViews(movie.id);
      hasIncremented.current = true;
    }
  }, [movie, incrementViews]);

  /* ---------------- AUTO SELECT FIRST EPISODE ---------------- */

  useEffect(() => {
    if (!hasHydrated) return;
    if (!movie) return;

    const type = movie.type?.toLowerCase();

    if (type === "series" || type === "drama") {
      const firstSeason = movie.seasons?.[0];
      const firstEpisode = firstSeason?.episodes?.[0];

      if (firstEpisode?.videoUrl?.trim()) {
        setSelectedEpisodeUrl(firstEpisode.videoUrl);
      }
    }
  }, [movie, hasHydrated]);

  /* ---------------- SAFETY CHECKS ---------------- */

  if (!hasHydrated) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!id) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Invalid ID
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Content not found
      </div>
    );
  }

  const type = movie.type?.toLowerCase();

  /* ---------------- RENDER ---------------- */

  return (
    <div className="bg-black min-h-screen flex flex-col items-center relative p-10">
      <button
        onClick={() => router.back()}
        className="absolute top-5 left-5 bg-white px-4 py-2 rounded"
      >
        Back
      </button>

      {/* MOVIE */}
      {type === "movie" && movie.videoUrl && (
        <AdvancedPlayer key={movie.videoUrl} src={movie.videoUrl} />
      )}

      {/* SERIES / DRAMA */}
      {(type === "series" || type === "drama") && movie.seasons && (
        <div className="w-full max-w-5xl text-white">
          {selectedEpisodeUrl ? (
            <AdvancedPlayer key={selectedEpisodeUrl} src={selectedEpisodeUrl} />
          ) : (
            <p className="text-center mb-6">No Episode Selected</p>
          )}

          {movie.seasons.map(season => (
            <div key={season.id} className="mt-8">
              <h2 className="text-xl mb-4">Season {season.seasonNumber}</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {season.episodes.map(ep => (
                  <button
                    key={ep.id}
                    onClick={() => {
                      if (ep.videoUrl?.trim()) {
                        setSelectedEpisodeUrl(ep.videoUrl);
                      }
                    }}
                    className="bg-gray-800 p-4 rounded hover:bg-red-600 transition"
                  >
                    {ep.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useMovieStore } from "@/store/movieStore";
// import { useEffect, useRef, useState, useMemo } from "react";
// import AdvancedPlayer from "@/components/movie/AdvancedPlayer";

// export default function WatchPage() {
//   /* ---------------- HOOKS ---------------- */

//   const params = useSearchParams();
//   const router = useRouter();

//   const { movies, hasHydrated, incrementViews } = useMovieStore();

//   const id = params.get("id");

//   const hasIncremented = useRef(false);
//   const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState<string | null>(
//     null,
//   );

//   const movie = useMemo(() => {
//     if (!id) return null;
//     return movies.find(m => m.id === id) ?? null;
//   }, [id, movies]);

//   /* ---------------- INCREMENT VIEWS ---------------- */

//   useEffect(() => {
//     if (movie && !hasIncremented.current) {
//       incrementViews(movie.id);
//       hasIncremented.current = true;
//     }
//   }, [movie, incrementViews]);

//   /* ---------------- AUTO PLAY FIRST EPISODE ---------------- */

//   // useEffect(() => {
//   //   if (
//   //     movie &&
//   //     (movie.type === "series" || movie.type === "drama") &&
//   //     movie.seasons?.length &&
//   //     movie.seasons[0].episodes?.length
//   //   ) {
//   //     const firstEp = movie.seasons[0].episodes[0];
//   //     if (firstEp.videoUrl) {
//   //       setSelectedEpisodeUrl(firstEp.videoUrl);
//   //     }
//   //   }
//   // }, [movie]);
//   useEffect(() => {
//     if (!hasHydrated) return;
//     if (!movie) return;

//     if (movie.type === "series" || movie.type === "drama") {
//       if (
//         movie.seasons &&
//         movie.seasons.length > 0 &&
//         movie.seasons[0].episodes &&
//         movie.seasons[0].episodes.length > 0
//       ) {
//         const firstEpisode = movie.seasons[0].episodes[0];

//         if (firstEpisode.videoUrl && firstEpisode.videoUrl.trim() !== "") {
//           setSelectedEpisodeUrl(firstEpisode.videoUrl);
//         }
//       }
//     }
//   }, [movie, hasHydrated]);

//   /* ---------------- SAFETY CHECKS ---------------- */

//   if (!hasHydrated) {
//     return (
//       <div className="bg-black text-white min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!id) {
//     return (
//       <div className="bg-black text-white min-h-screen flex items-center justify-center">
//         Invalid ID
//       </div>
//     );
//   }

//   if (!movie) {
//     return (
//       <div className="bg-black text-white min-h-screen flex items-center justify-center">
//         Content not found
//       </div>
//     );
//   }

//   /* ---------------- RENDER ---------------- */

//   return (
//     <div className="bg-black min-h-screen flex flex-col items-center relative p-10">
//       <button
//         onClick={() => router.back()}
//         className="absolute top-5 left-5 bg-white px-4 py-2 rounded"
//       >
//         Back
//       </button>

//       {/* MOVIE */}
//       {movie.type === "movie" && movie.videoUrl && (
//         <AdvancedPlayer src={movie.videoUrl} />
//       )}

//       {/* SERIES / DRAMA */}
//       {(movie.type === "series" || movie.type === "drama") && movie.seasons && (
//         <div className="w-full max-w-5xl text-white">
//           {selectedEpisodeUrl ? (
//             <AdvancedPlayer src={selectedEpisodeUrl} />
//           ) : (
//             <p className="text-center mb-6">No Episode Selected</p>
//           )}

//           {movie.seasons.map(season => (
//             <div key={season.id} className="mt-8">
//               <h2 className="text-xl mb-4">Season {season.seasonNumber}</h2>

//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {season.episodes.map(ep => (
//                   <button
//                     key={ep.id}
//                     onClick={() => {
//                       if (ep.videoUrl) {
//                         setSelectedEpisodeUrl(ep.videoUrl);
//                       }
//                     }}
//                     className="bg-gray-800 p-4 rounded hover:bg-red-600 transition"
//                   >
//                     {ep.title}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
