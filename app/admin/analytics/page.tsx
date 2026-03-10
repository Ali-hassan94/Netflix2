"use client";

import { useMovieStore } from "@/store/movieStore";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const { movies } = useMovieStore();

  const totalMovies = movies.length;
  const totalViews = movies.reduce((sum, m) => sum + (m.views || 0), 0);

  const uniqueCategories = [...new Set(movies.map(m => m.genre))].length;

  const stats = [
    { title: "Total Movies", value: totalMovies },
    { title: "Total Views", value: totalViews },
    { title: "Categories", value: uniqueCategories },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-10">
      <h1 className="text-4xl font-bold mb-14">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-xl bg-gray-900 border border-gray-800"
          >
            <h2 className="text-gray-400 text-sm mb-3">{stat.title}</h2>
            <p className="text-3xl font-bold text-red-500">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
