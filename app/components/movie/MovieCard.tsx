"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWatchlistStore } from "@/store/watchlistStore";

export default function MovieCard({ movie }: any) {
  const { addToWatchlist } = useWatchlistStore();
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const title = movie?.title || "No Title";
  const description = movie?.description || "No description available";
  const genre = movie?.genre || "Unknown";
  const thumbnail =
    movie?.thumbnail || "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/watch?id=${movie?.id}`)}
      className="relative min-w-[230px] bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
    >
      <div className="relative h-[300px]">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />

        {hover && movie?.videoUrl && (
          <video
            src={movie.videoUrl}
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <button
        onClick={e => {
          e.stopPropagation();
          addToWatchlist(movie);
        }}
        className="bg-white text-black text-xs px-2 py-1 rounded mt-2"
      >
        + Watchlist
      </button>
      <div className="p-3 space-y-2">
        <h3 className="text-white font-semibold text-lg truncate">{title}</h3>

        <p className="text-gray-400 text-sm line-clamp-2">{description}</p>

        <span className="inline-block bg-red-600 text-xs px-2 py-1 rounded">
          {genre}
        </span>
      </div>
    </motion.div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useWatchlistStore } from "@/store/watchlistStore";
// import { Movie } from "@/store/movieStore";

// export default function MovieCard({ movie }: { movie: Movie }) {
//   const { addToWatchlist } = useWatchlistStore();
//   const [hover, setHover] = useState(false);
//   const router = useRouter();

//   if (!movie?.id) return null;

//   const {
//     id,
//     title = "No Title",
//     description = "No description available",
//     genre = "Unknown",
//     thumbnail = "https://via.placeholder.com/300x400?text=No+Image",
//     videoUrl,
//   } = movie;

//   return (
//     <motion.div
//       whileHover={{ scale: 1.08 }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       onClick={() => router.push(`/watch?id=${id}`)}
//       className="relative min-w-[230px] bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
//     >
//       {/* Thumbnail */}
//       <div className="relative h-[300px]">
//         <img
//           src={thumbnail}
//           alt={title}
//           className="w-full h-full object-cover"
//         />

//         {/* Hover Video Preview */}
//         {hover && videoUrl && (
//           <video
//             src={videoUrl}
//             autoPlay
//             muted
//             loop
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         )}
//       </div>

//       {/* Watchlist Button */}
//       <button
//         onClick={e => {
//           e.stopPropagation();
//           addToWatchlist(movie);
//         }}
//         className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded z-20"
//       >
//         + Watchlist
//       </button>

//       {/* Info */}
//       <div className="p-3 space-y-2">
//         <h3 className="text-white font-semibold text-lg truncate">{title}</h3>

//         <p className="text-gray-400 text-sm line-clamp-2">{description}</p>

//         <span className="inline-block bg-red-600 text-xs px-2 py-1 rounded">
//           {genre}
//         </span>
//       </div>
//     </motion.div>
//   );
// }
