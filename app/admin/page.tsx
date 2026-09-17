"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import StatCard from "@/components/admin/StatCard"
import { mockOrders, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/data/adminOrders"
import { products } from "@/lib/data/products"

export default function AdminDashboardPage() {
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0)
  const todayOrders = mockOrders.filter((o) => o.createdAt === "2026-09-15")
  const recentOrders = [...mockOrders]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)
  const featured = products.filter((p) => p.isFeatured).slice(0, 4)

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black text-pink-blush-800">لوحة التحكم</h1>
        <p className="text-sm text-neutral-500 mt-1">
          نظرة عامة على أداء المتجر
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="📦"
          label="طلبات اليوم"
          value={todayOrders.length}
          color="pink"
        />
        <StatCard
          icon="💰"
          label="إيرادات إجمالية"
          value={`${totalRevenue} ر.س`}
          color="green"
        />
        <StatCard
          icon="🛍️"
          label="إجمالي المنتجات"
          value={products.length}
          color="cream"
        />
        <StatCard
          icon="👥"
          label="إجمالي الزبائن"
          value={0}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 22 }}
          className="bg-cream-50 border border-pink-blush-100 rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-pink-blush-800">
              آخر الطلبات
            </h2>
            <Link
              href="/admin/orders"
              className="text-sm font-bold text-pink-blush-600 hover:text-pink-blush-700"
            >
              عرض الكل ←
            </Link>
          </div>

          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-pink-blush-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-pink-blush-800 text-sm truncate">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {order.customer.name}
                  </p>
                </div>
                <div className="text-end shrink-0">
                  <p className="font-black text-pink-blush-700 text-sm">
                    {order.total} ر.س
                  </p>
                  <span
                    className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full border ${
                      ORDER_STATUS_COLORS[order.status]
                    }`}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Featured Products */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 22 }}
          className="bg-cream-50 border border-pink-blush-100 rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-pink-blush-800">
              المنتجات المميزة
            </h2>
            <Link
              href="/admin/products"
              className="text-sm font-bold text-pink-blush-600 hover:text-pink-blush-700"
            >
              عرض الكل ←
            </Link>
          </div>

          <div className="space-y-2">
            {featured.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-pink-blush-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-pink-blush-800 text-sm truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    المخزون: {p.stock}
                  </p>
                </div>
                <p className="font-black text-pink-blush-700 text-sm shrink-0">
                  {p.price} ر.س
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
