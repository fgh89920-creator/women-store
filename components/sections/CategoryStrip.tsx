"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import SectionHeader from "@/components/ui/SectionHeader"
import { categories } from "@/lib/data/categories"

const categoryEmojis: Record<string, string> = {
  makeup: "💄",
  skincare: "🧴",
  accessories: "💍",
  clothing: "👗",
}

const categoryGradients: Record<string, string> = {
  makeup: "from-pink-blush-200 to-pink-blush-50",
  skincare: "from-cream-200 to-cream-50",
  accessories: "from-pink-blush-100 to-pink-blush-50",
  clothing: "from-cream-100 to-pink-blush-50",
}

export default function CategoryStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeader title="تسوّقي حسب القسم" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 22,
              delay: i * 0.08,
            }}
          >
            <Link href={`/category/${cat.slug}`}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`bg-gradient-to-br ${
                  categoryGradients[cat.slug] ?? categoryGradients.makeup
                } rounded-2xl p-6 sm:p-8 text-center shadow-soft hover:shadow-soft-lg transition-shadow cursor-pointer h-full flex flex-col items-center justify-center min-h-[160px]`}
              >
                <span className="text-5xl sm:text-6xl mb-3 block">
                  {categoryEmojis[cat.slug] ?? "✨"}
                </span>
                <span className="text-base sm:text-lg font-bold text-pink-blush-800">
                  {cat.name}
                </span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
