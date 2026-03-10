"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="/f1.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6"
        >
          Unlimited Movies, TV Shows & More
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-8"
        >
          Watch anywhere. Cancel anytime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded text-white font-semibold text-lg transition">
            ▶ Play
          </button>

          <button className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded text-white font-semibold text-lg transition">
            More Info
          </button>
        </motion.div>
      </div>
    </div>
  );
}
