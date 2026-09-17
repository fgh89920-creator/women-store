"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Button from "@/components/ui/Button"
import ProductCard from "@/components/ui/ProductCard"
import { products } from "@/lib/data/products"
import { useFavoritesStore } from "@/lib/store/favorites"

export default function FavoritesList() {
  const ids = useFavoritesStore((s) => s.productIds)
  const favoriteProducts = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (favoriteProducts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <span className="text-6xl block mb-4">♡</span>
        <p className="text-xl font-bold text-pink-blush-700 mb-2">
          المفضلة فارغة
        </p>
        <p className="text-neutral-500 mb-6">
          اضغطي ♥ على أي منتج لإضافته هنا
        </p>
        <Link href="/">
          <Button variant="primary">تسوّقي الآن</Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {favoriteProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
