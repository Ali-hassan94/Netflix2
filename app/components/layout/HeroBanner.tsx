"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";
import AdvancedPlayer from "@/components/movie/AdvancedPlayer";

export default function WatchPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { movies } = useMovieStore();

  const id = params.get("id");

  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="bg-black mt-5 text-white h-70 flex items-center justify-center">
        Movie not found
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-5 left-5 bg-white px-4 py-2 rounded"
      >
        Back
      </button>

      <AdvancedPlayer src={movie.videoUrl} />
    </div>
  );
}

// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useMovieStore } from "@/store/movieStore";
// import AdvancedPlayer from "@/components/movie/AdvancedPlayer";

// export default function WatchPage() {
//   const params = useSearchParams();
//   const router = useRouter();
//   const { movies } = useMovieStore();

//   const id = params.get("id");
//   const movie = movies.find(m => m.id === id);

//   if (!movie) {
//     return (
//       <div className="bg-black text-white min-h-screen flex items-center justify-center">
//         Movie not found
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black min-h-screen text-white">
//       {/* ================= HERO SECTION ================= */}
//       <div className="relative h-[85vh] w-full overflow-hidden">
//         {/* Background Image */}
//         <img
//           src={movie.thumbnail}
//           alt={movie.title}
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         {/* Dark Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

//         {/* Back Button */}
//         <button
//           onClick={() => router.back()}
//           className="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded z-20"
//         >
//           Back
//         </button>

//         {/* Hero Content */}
//         <div className="absolute bottom-24 left-16 max-w-2xl z-10">
//           <h1 className="text-6xl font-extrabold mb-4">{movie.title}</h1>

//           <p className="text-lg text-gray-300 mb-6">{movie.description}</p>

//           <div className="flex gap-4">
//             <button
//               onClick={() => {
//                 document
//                   .getElementById("player-section")
//                   ?.scrollIntoView({ behavior: "smooth" });
//               }}
//               className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200"
//             >
//               ▶ Play
//             </button>

//             <span className="bg-red-600 px-4 py-2 rounded text-sm">
//               {movie.genre}
//             </span>
//           </div>
//         </div>

//         {/* Curved Bottom Effect */}
//         <div className="absolute bottom-0 left-0 w-full h-32 bg-black rounded-t-[100%]" />
//       </div>

//       {/* ================= PLAYER SECTION ================= */}
//       <div id="player-section" className="flex justify-center py-20">
//         <AdvancedPlayer src={movie.videoUrl} />
//       </div>
//     </div>
//   );
// }
