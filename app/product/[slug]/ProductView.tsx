"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import ProductCard from "@/components/ui/ProductCard"
import Button from "@/components/ui/Button"
import type { Product } from "@/types/product"
import type { Category } from "@/types/category"

interface ProductViewProps {
  product: Product
  category?: Category
  related: Product[]
}

export default function ProductView({
  product,
  category,
  related,
}: ProductViewProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const maxQty = Math.min(product.stock, 99)

  return (
    <>
      {/* Breadcrumb */}
      <nav
        aria-label="breadcrumb"
        className="mx-auto max-w-6xl px-4 pt-6 text-sm text-neutral-500"
      >
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link
              href="/"
              className="hover:text-pink-blush-600 transition-colors"
            >
              الرئيسية
            </Link>
          </li>
          <li aria-hidden>›</li>
          {category && (
            <>
              <li>
                <Link
                  href={`/category/${category.slug}`}
                  className="hover:text-pink-blush-600 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
              <li aria-hidden>›</li>
            </>
          )}
          <li className="text-pink-blush-800 font-bold line-clamp-1">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Product Section */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col lg:flex-row-reverse gap-4">
            {/* Main image */}
            <div className="flex-1 relative aspect-square bg-cream-100 rounded-2xl overflow-hidden shadow-soft">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={`${product.name} - صورة ${activeImage + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {product.isNew && (
                <span className="absolute top-4 end-4 z-10 bg-pink-blush-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-soft">
                  جديد
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="lg:w-24 flex lg:flex-col gap-2">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`صورة ${i + 1}`}
                  aria-pressed={i === activeImage}
                  className={`relative aspect-square w-full lg:w-24 rounded-xl overflow-hidden border-2 transition-all ${
                    i === activeImage
                      ? "border-pink-blush-500 shadow-soft"
                      : "border-pink-blush-100 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {category && (
              <span className="text-sm font-bold text-pink-blush-600 mb-2">
                {category.name}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-black text-pink-blush-800 leading-tight">
              {product.name}
            </h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-pink-blush-600">
                {product.price} ر.س
              </span>
            </div>

            <p className="mt-6 text-base sm:text-lg text-neutral-700 leading-relaxed">
              {product.description}
            </p>

            {/* Stock indicator */}
            <div className="mt-6 flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-bold text-neutral-700">
                    متوفر — {product.stock} في المخزون
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-sm font-bold text-red-600">
                    نفد المخزون
                  </span>
                </>
              )}
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="mt-8">
                <label className="block text-sm font-bold text-pink-blush-800 mb-2">
                  الكمية
                </label>
                <div className="inline-flex items-center bg-cream-50 border-2 border-pink-blush-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-pink-blush-700 font-black text-lg hover:bg-pink-blush-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="إنقاص الكمية"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-black text-pink-blush-800 text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(maxQty, q + 1))
                    }
                    disabled={quantity >= maxQty}
                    className="w-10 h-10 flex items-center justify-center text-pink-blush-700 font-black text-lg hover:bg-pink-blush-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="زيادة الكمية"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                disabled={product.stock === 0}
                className="flex-1"
              >
                أضيفي للسلة
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setIsWishlisted((v) => !v)}
                aria-pressed={isWishlisted}
              >
                {isWishlisted ? "♥ في المفضلة" : "♡ المفضلة"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-black text-pink-blush-800 mb-8">
            قد يعجبك أيضاً
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
