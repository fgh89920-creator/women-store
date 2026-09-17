"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      <Card interactive className="h-full flex flex-col">
        <Link
          href={`/product/${product.slug}`}
          className="block relative aspect-square overflow-hidden bg-cream-100"
        >
          {product.isNew && (
            <span className="absolute top-3 start-3 z-10 bg-pink-blush-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              جديد
            </span>
          )}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
        <div className="p-4 flex flex-col flex-1">
          <Link
            href={`/product/${product.slug}`}
            className="text-base font-bold text-pink-blush-800 line-clamp-2 hover:text-pink-blush-600 transition-colors"
          >
            {product.name}
          </Link>
          <div className="mt-auto pt-3 flex items-center justify-between gap-2">
            <span className="text-lg font-black text-pink-blush-600">
              {product.price} ر.س
            </span>
            <Button variant="primary" size="sm">
              أضيفي
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
