"use client"

import { useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import ProductCard from "@/components/ui/ProductCard"
import type { Category } from "@/types/category"
import type { Product } from "@/types/product"

type SortOption = "newest" | "price-asc" | "price-desc" | "popular"

interface CategoryViewProps {
  category: Category
  allProducts: Product[]
  initialSort: SortOption
  initialNewOnly: boolean
}

const categoryGradients: Record<string, string> = {
  makeup: "from-pink-blush-300 via-pink-blush-200 to-cream-50",
  skincare: "from-cream-200 via-cream-100 to-pink-blush-50",
  accessories: "from-pink-blush-200 via-pink-blush-100 to-cream-50",
  clothing: "from-cream-100 via-pink-blush-50 to-pink-blush-100",
}

const sortLabels: Record<SortOption, string> = {
  newest: "الأحدث",
  "price-asc": "السعر: من الأقل",
  "price-desc": "السعر: من الأعلى",
  popular: "الأكثر مبيعاً",
}

export default function CategoryView({
  category,
  allProducts,
  initialSort,
  initialNewOnly,
}: CategoryViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Compute visible products
  const visibleProducts = useMemo(() => {
    let list = initialNewOnly ? allProducts.filter((p) => p.isNew) : [...allProducts]

    switch (initialSort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        list.sort((a, b) => b.price - a.price)
        break
      case "popular":
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
      case "newest":
      default:
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        break
    }
    return list
  }, [allProducts, initialSort, initialNewOnly])

  function updateParams(next: { sort?: SortOption; newOnly?: boolean }) {
    const params = new URLSearchParams(searchParams.toString())
    if (next.sort !== undefined) params.set("sort", next.sort)
    if (next.newOnly !== undefined) {
      if (next.newOnly) params.set("newOnly", "true")
      else params.delete("newOnly")
    }
    router.replace(`/category/${category.slug}?${params.toString()}`, { scroll: false })
  }

  const gradient = categoryGradients[category.slug] ?? categoryGradients.makeup

  return (
    <>
      {/* Banner */}
      <section
        className={`bg-gradient-to-bl ${gradient} relative overflow-hidden`}
      >
        <div className="absolute -top-16 -end-16 w-64 h-64 bg-white/30 rounded-full blur-3xl" aria-hidden />
        <div className="absolute -bottom-20 start-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-pink-blush-800">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-3 text-lg text-neutral-700 max-w-2xl">
              {category.description}
            </p>
          )}
          <p className="mt-4 text-sm font-bold text-pink-blush-700">
            {allProducts.length} منتج
          </p>
        </motion.div>
      </section>

      {/* Filters Bar */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-cream-50 border border-pink-blush-100 rounded-2xl px-4 py-3 shadow-soft">
          <p className="text-sm text-neutral-600">
            <span className="font-bold text-pink-blush-700">
              {visibleProducts.length}
            </span>{" "}
            منتج
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={initialNewOnly}
                onChange={(e) => updateParams({ newOnly: e.target.checked })}
                className="w-4 h-4 accent-pink-blush-500 cursor-pointer"
              />
              <span className="text-sm font-bold text-pink-blush-800">
                منتجات جديدة فقط
              </span>
            </label>

            <div className="relative">
              <select
                value={initialSort}
                onChange={(e) =>
                  updateParams({ sort: e.target.value as SortOption })
                }
                className="appearance-none bg-white border-2 border-pink-blush-200 text-pink-blush-800 font-bold text-sm rounded-xl px-4 py-2 pe-8 outline-none cursor-pointer hover:border-pink-blush-400 transition-colors"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                  <option key={opt} value={opt}>
                    {sortLabels[opt]}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-pink-blush-500 text-xs">
                ▼
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {visibleProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-2xl font-bold text-pink-blush-700">
              لا توجد منتجات تطابق الفلاتر
            </p>
            <p className="mt-2 text-neutral-500">
              جرّبي تغيير الفلتر أو امسحيه للعودة لكل المنتجات
            </p>
            <button
              onClick={() => updateParams({ newOnly: false })}
              className="mt-6 text-sm font-bold text-pink-blush-600 hover:text-pink-blush-700 underline"
            >
              مسح فلتر "منتجات جديدة فقط"
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  )
}
