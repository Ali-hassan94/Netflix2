"use client";

import { useMovieStore } from "@/store/movieStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const { movies } = useMovieStore();
  const router = useRouter();

  const categories = Object.entries(
    movies.reduce((acc: Record<string, number>, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {}),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 px-10">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-14 text-center"
      >
        Categories
      </motion.h1>

      {categories.length === 0 ? (
        <div className="text-center text-gray-400">
          No categories found. Add movies first.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
          {categories.map(([genre, count], index) => (
            <motion.div
              key={genre}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ rotateY: 8, scale: 1.05 }}
              onClick={() => router.push(`/admin/categories/${genre}`)}
              className="cursor-pointer p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-red-500 transition"
            >
              <h2 className="text-2xl font-semibold mb-4">{genre}</h2>

              <p className="text-gray-400 text-sm">
                {count} Movie{count > 1 ? "s" : ""}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
