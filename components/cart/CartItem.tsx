"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useCartStore } from "@/lib/store/cart"
import type { CartItem as CartItemType } from "@/lib/store/cart"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex gap-4 bg-cream-50 border border-pink-blush-100 rounded-2xl p-3 sm:p-4 shadow-soft"
    >
      {/* Image */}
      <Link
        href={`/product/${item.slug}`}
        className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-cream-100"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between gap-2">
          <Link
            href={`/product/${item.slug}`}
            className="font-bold text-pink-blush-800 line-clamp-2 hover:text-pink-blush-600 transition-colors text-sm sm:text-base"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem(item.productId)}
            aria-label="حذف من السلة"
            className="shrink-0 w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          {/* Quantity stepper */}
          <div className="inline-flex items-center bg-white border-2 border-pink-blush-100 rounded-lg overflow-hidden">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-pink-blush-700 font-bold hover:bg-pink-blush-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="إنقاص"
            >
              −
            </button>
            <span className="w-8 text-center font-bold text-pink-blush-800 text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity + 1)
              }
              disabled={item.quantity >= item.stock}
              className="w-8 h-8 flex items-center justify-center text-pink-blush-700 font-bold hover:bg-pink-blush-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="زيادة"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <span className="font-black text-pink-blush-600 text-sm sm:text-base">
            {item.price * item.quantity} ر.س
          </span>
        </div>
      </div>
    </motion.div>
  )
}
