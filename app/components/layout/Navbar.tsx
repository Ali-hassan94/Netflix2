// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { movies } from "@/data/movies";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");

//   const filteredMovies = movies.filter(
//     movie =>
//       movie.title.toLowerCase().includes(query.toLowerCase()) ||
//       movie.genre.toLowerCase().includes(query.toLowerCase()),
//   );

//   return (
//     <motion.div
//       initial={{ y: -80 }}
//       animate={{ y: 0 }}
//       className="fixed w-full z-50 bg-black/90 backdrop-blur-md"
//     >
//       <div className="flex justify-between items-center px-6 md:px-10 py-4">
//         {/* Logo */}
//         <Link href="/" className="text-red-600 text-2xl font-bold">
//           NETFLIX
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link href="/">Home</Link>
//           <Link href="/watchlist">Watchlist</Link>
//           <Link href="/profile">Profile</Link>
//           <Link href="/admin">Admin</Link>

//           {/* Search */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search movies..."
//               className="bg-gray-800 px-4 py-2 rounded outline-none"
//               value={query}
//               onChange={e => setQuery(e.target.value)}
//             />

//             {query && (
//               <div className="absolute top-12 right-0 bg-black w-72 p-4 rounded shadow-lg max-h-60 overflow-y-auto">
//                 {filteredMovies.length > 0 ? (
//                   filteredMovies.map(movie => (
//                     <Link
//                       key={movie.id}
//                       href={`/movie/${movie.id}`}
//                       className="block py-2 border-b border-gray-700 hover:text-red-500"
//                       onClick={() => setQuery("")}
//                     >
//                       {movie.title}
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="text-gray-400">No results found</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Toggle */}
//         <button onClick={() => setOpen(!open)} className="md:hidden text-white">
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden px-6 pb-6 space-y-4 bg-black">
//           <Link href="/">Home</Link>
//           <Link href="/watchlist">Watchlist</Link>
//           <Link href="/profile">Profile</Link>
//           <Link href="/admin">Admin</Link>
//         </div>
//       )}
//     </motion.div>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMovieStore } from "@/store/movieStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // ✅ GET MOVIES FROM ZUSTAND STORE
  const { movies } = useMovieStore();

  const filteredMovies = movies.filter(movie => {
    const title = movie?.title?.toLowerCase() || "";
    const genre = movie?.genre?.toLowerCase() || "";
    const description = movie?.description?.toLowerCase() || "";
    const search = query.toLowerCase();

    return (
      title.includes(search) ||
      genre.includes(search) ||
      description.includes(search)
    );
  });

  return (
    <motion.div
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-black/90 backdrop-blur-md"
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-4">
        <Link href="/" className="text-red-600 text-2xl font-bold">
          NETFLIX
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">Home</Link>
          <Link href="/watchlist">Watchlist</Link>
          <Link href="/Profile">Profile</Link>
          <Link href="/admin">Admin</Link>

          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-gray-800 px-4 py-2 rounded outline-none"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />

            {query && (
              <div className="absolute top-12 right-0 bg-black w-72 p-4 rounded shadow-lg max-h-60 overflow-y-auto">
                {filteredMovies.length > 0 ? (
                  filteredMovies.map(movie => (
                    <Link
                      key={movie.id}
                      href={`/watch?id=${movie.id}`}
                      className="block py-2 border-b border-gray-700 hover:text-red-500"
                      onClick={() => setQuery("")}
                    >
                      {movie.title}
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          ☰
        </button>
      </div>
    </motion.div>
  );
}
