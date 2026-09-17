"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function SectionHeader({
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="mb-8 flex items-end justify-between gap-4"
    >
      <div>
        <h2 className="text-3xl font-black text-pink-blush-800">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-neutral-600">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  )
}
