"use client"

import { motion } from "framer-motion"

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="relative overflow-hidden bg-gradient-to-l from-pink-blush-700 via-pink-blush-500 to-pink-blush-600 rounded-3xl shadow-soft-lg"
      >
        {/* Decorative circles */}
        <div className="absolute -top-12 -end-12 w-48 h-48 bg-white/10 rounded-full" aria-hidden />
        <div className="absolute -bottom-16 start-10 w-64 h-64 bg-white/10 rounded-full" aria-hidden />

        <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full mb-4"
          >
            عرض محدود
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 22 }}
            className="text-4xl sm:text-5xl font-black"
          >
            خصم 20٪
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-3 text-lg sm:text-xl text-pink-blush-50 max-w-xl mx-auto"
          >
            على طلبك الأول — استخدمي كود{" "}
            <span className="font-black bg-white/20 px-2 py-0.5 rounded">ANAQA20</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <button className="bg-white text-pink-blush-700 font-bold px-8 py-3 rounded-2xl hover:bg-cream-50 transition-colors shadow-soft">
              احصلي على الخصم
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
