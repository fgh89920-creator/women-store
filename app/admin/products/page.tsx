"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { products } from "@/lib/data/products"
import { categories } from "@/lib/data/categories"
import Button from "@/components/ui/Button"

export default function AdminProductsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filtered = products.filter((p) => {
    if (
      search &&
      !p.name.includes(search) &&
      !p.slug.includes(search.toLowerCase())
    ) {
      return false
    }
    if (categoryFilter !== "all" && p.categoryId !== categoryFilter) {
      return false
    }
    return true
  })

  return (
    <div className="p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-pink-blush-800">
            إدارة المنتجات
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {filtered.length} من {products.length} منتج
          </p>
        </div>
        <Button variant="primary" disabled>
          + إضافة منتج
        </Button>
      </motion.div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحثي عن منتج..."
          className="flex-1 min-w-[200px] px-4 py-2 text-sm bg-white border-2 border-pink-blush-100 rounded-xl outline-none focus:border-pink-blush-400"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 text-sm bg-white border-2 border-pink-blush-100 rounded-xl outline-none cursor-pointer focus:border-pink-blush-400"
        >
          <option value="all">كل الأقسام</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-cream-50 border border-pink-blush-100 rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-pink-blush-50 text-pink-blush-800">
              <tr>
                <th className="text-start p-4 font-bold">المنتج</th>
                <th className="text-start p-4 font-bold">القسم</th>
                <th className="text-start p-4 font-bold">السعر</th>
                <th className="text-start p-4 font-bold">المخزون</th>
                <th className="text-start p-4 font-bold">الحالة</th>
                <th className="text-start p-4 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId)
                const lowStock = p.stock <= 5
                return (
                  <tr
                    key={p.id}
                    className="border-t border-pink-blush-100 hover:bg-pink-blush-50/40"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-pink-blush-800 truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-neutral-500">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-neutral-700">
                      {cat?.name ?? "—"}
                    </td>
                    <td className="p-4 font-bold text-pink-blush-700">
                      {p.price} ر.س
                    </td>
                    <td className="p-4">
                      <span
                        className={
                          lowStock
                            ? "text-red-600 font-bold"
                            : "text-neutral-700"
                        }
                      >
                        {p.stock}
                        {lowStock && " ⚠️"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.isNew && (
                          <span className="text-xs font-bold bg-pink-blush-100 text-pink-blush-700 px-2 py-0.5 rounded-full">
                            جديد
                          </span>
                        )}
                        {p.isFeatured && (
                          <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                            مميز
                          </span>
                        )}
                        {!p.isNew && !p.isFeatured && (
                          <span className="text-xs text-neutral-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          className="text-xs font-bold text-pink-blush-600 hover:text-pink-blush-700"
                        >
                          عرض
                        </Link>
                        <button
                          disabled
                          className="text-xs font-bold text-neutral-400 cursor-not-allowed"
                          title="قريباً"
                        >
                          تعديل
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-neutral-500"
                  >
                    لا توجد منتجات تطابق البحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
