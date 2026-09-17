"use client"

import { motion } from "framer-motion"

interface StatCardProps {
  icon: string
  label: string
  value: string | number
  trend?: string
  color?: "pink" | "cream" | "green" | "purple"
}

const colorMap = {
  pink: "from-pink-blush-100 to-pink-blush-50",
  cream: "from-cream-100 to-cream-50",
  green: "from-green-50 to-green-100",
  purple: "from-purple-50 to-purple-100",
}

export default function StatCard({
  icon,
  label,
  value,
  trend,
  color = "pink",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      whileHover={{ y: -4 }}
      className={`bg-gradient-to-br ${colorMap[color]} rounded-2xl p-5 shadow-soft border border-pink-blush-100`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-3xl">{icon}</span>
        {trend && (
          <span className="text-xs font-bold text-green-600 bg-white px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-pink-blush-800 mb-1">{value}</p>
      <p className="text-sm font-bold text-neutral-600">{label}</p>
    </motion.div>
  )
}
