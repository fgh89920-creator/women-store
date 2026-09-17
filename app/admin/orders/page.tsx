"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  mockOrders,
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "@/lib/data/adminOrders"
import type { Order, OrderStatus } from "@/types/order"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    )
  }

  return (
    <div className="p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black text-pink-blush-800">إدارة الطلبات</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {orders.length} طلب — اضغطي على طلب لعرض التفاصيل
        </p>
      </motion.div>

      <div className="space-y-3">
        {orders.map((order) => {
          const expanded = expandedId === order.id
          return (
            <motion.div
              key={order.id}
              layout
              className="bg-cream-50 border border-pink-blush-100 rounded-2xl shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expanded ? null : order.id)}
                className="w-full p-4 sm:p-5 text-start hover:bg-pink-blush-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-pink-blush-800">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">
                      {order.customer.name} • {order.customer.city}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {order.createdAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-pink-blush-700">
                      {order.total} ر.س
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        ORDER_STATUS_COLORS[order.status]
                      }`}
                    >
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                    <span className="text-pink-blush-400">
                      {expanded ? "▲" : "▼"}
                    </span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-pink-blush-100 p-5 bg-pink-blush-50/30"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Items */}
                      <div>
                        <h3 className="text-sm font-black text-pink-blush-800 mb-3">
                          المنتجات
                        </h3>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between text-sm bg-white rounded-xl px-3 py-2"
                            >
                              <span className="text-pink-blush-800">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="font-bold text-pink-blush-700">
                                {item.price * item.quantity} ر.س
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer + Status */}
                      <div>
                        <h3 className="text-sm font-black text-pink-blush-800 mb-3">
                          بيانات الزبونة
                        </h3>
                        <dl className="text-sm space-y-1 mb-4 bg-white rounded-xl p-3">
                          <div>
                            <dt className="text-xs text-neutral-500 inline">
                              الهاتف:{" "}
                            </dt>
                            <dd className="inline font-bold text-pink-blush-800">
                              {order.customer.phone}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs text-neutral-500 inline">
                              العنوان:{" "}
                            </dt>
                            <dd className="inline text-pink-blush-800">
                              {order.customer.address}
                            </dd>
                          </div>
                          {order.customer.notes && (
                            <div>
                              <dt className="text-xs text-neutral-500 inline">
                                ملاحظات:{" "}
                              </dt>
                              <dd className="inline text-pink-blush-800">
                                {order.customer.notes}
                              </dd>
                            </div>
                          )}
                        </dl>

                        <h3 className="text-sm font-black text-pink-blush-800 mb-2">
                          تحديث الحالة
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {ORDER_STATUSES.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(order.id, s)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                                order.status === s
                                  ? ORDER_STATUS_COLORS[s] + " ring-2 ring-pink-blush-400"
                                  : "bg-white text-neutral-500 border-neutral-200 hover:border-pink-blush-300"
                              }`}
                            >
                              {ORDER_STATUS_LABELS[s]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
