"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Button from "@/components/ui/Button"

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="mx-auto max-w-md text-center py-20"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl mb-6"
      >
        🛒
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-black text-pink-blush-800 mb-3">
        سلتك فارغة
      </h2>
      <p className="text-neutral-600 mb-8">
        ابدئي التسوّق واضيفي اللي يعجبك — أحلى المنتجات في انتظارك
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          تسوّقي الآن
        </Button>
      </Link>
    </motion.div>
  )
}
