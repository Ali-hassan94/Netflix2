"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

export default function AdminDashboard() {
  const cards = [
    { title: "Manage Movies", href: "/admin/movies" },
    { title: "Analytics", href: "/admin/analytics" },
    { title: "Categories", href: "/admin/categories" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 px-10 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-14 text-center"
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              rotateY: 8,
              rotateX: -8,
              scale: 1.05,
            }}
            className="group"
          >
            <Link
              href={card.href}
              className="block p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 hover:border-red-500 hover:shadow-red-500/30"
            >
              <div className="text-2xl font-semibold group-hover:text-red-500 transition">
                {card.title}
              </div>

              <p className="mt-4 text-gray-400 text-sm">
                Click to manage {card.title.toLowerCase()}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
