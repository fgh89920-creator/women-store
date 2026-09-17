"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Button from "@/components/ui/Button"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-pink-blush-100 via-pink-blush-50 to-cream-50">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -end-20 w-72 h-72 bg-pink-blush-200 rounded-full opacity-50 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 start-10 w-96 h-96 bg-pink-blush-300 rounded-full opacity-30 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-pink-blush-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6">
            ✨ مجموعة الموسم الجديد
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-pink-blush-800 leading-tight">
            اكتشفي
            <br />
            <span className="text-pink-blush-600">عالم الأناقة</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-700 max-w-xl">
            أحدث صيحات المكياج، الإكسسوارات الأنيقة، والملابس العصرية
            — كلها في مكان واحد.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="/category/makeup">
              <Button variant="primary" size="lg">
                تسوّقي الآن
              </Button>
            </Link>
            <Link href="/category/clothing">
              <Button variant="secondary" size="lg">
                تصفحي الملابس
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
