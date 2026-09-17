"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/ui/Button"
import FavoritesList from "./FavoritesList"
import OrdersList from "./OrdersList"
import { useAuthStore } from "@/lib/store/auth"
import { useFavoritesStore } from "@/lib/store/favorites"

type Tab = "info" | "orders" | "favorites"

export default function AccountDashboard() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const favCount = useFavoritesStore((s) => s.productIds.length)
  const [tab, setTab] = useState<Tab>("info")

  if (!user) return null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="bg-gradient-to-l from-pink-blush-100 via-pink-blush-50 to-cream-50 border border-pink-blush-100 rounded-2xl p-6 sm:p-8 mb-6 shadow-soft"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-pink-blush-500 text-white text-2xl font-black flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-pink-blush-800">
                أهلاً، {user.name}
              </h1>
              <p className="text-sm text-neutral-600">{user.email}</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={logout}>
            تسجيل الخروج
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-pink-blush-100">
        <TabButton
          label="معلوماتي"
          active={tab === "info"}
          onClick={() => setTab("info")}
        />
        <TabButton
          label="طلباتي"
          active={tab === "orders"}
          onClick={() => setTab("orders")}
        />
        <TabButton
          label={`المفضلة${favCount > 0 ? ` (${favCount})` : ""}`}
          active={tab === "favorites"}
          onClick={() => setTab("favorites")}
        />
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {tab === "info" && <InfoTab />}
        {tab === "orders" && <OrdersList />}
        {tab === "favorites" && <FavoritesList />}
      </motion.div>
    </div>
  )
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 font-bold text-sm rounded-t-xl transition-colors ${
        active
          ? "bg-cream-50 text-pink-blush-700 border border-pink-blush-100 border-b-cream-50 -mb-px"
          : "text-neutral-500 hover:text-pink-blush-600"
      }`}
    >
      {label}
    </button>
  )
}

function InfoTab() {
  const user = useAuthStore((s) => s.user)
  if (!user) return null
  return (
    <div className="bg-cream-50 border border-pink-blush-100 rounded-2xl p-6 sm:p-8 shadow-soft max-w-2xl">
      <h2 className="text-xl font-black text-pink-blush-800 mb-6">
        معلوماتي الشخصية
      </h2>
      <dl className="space-y-4">
        <div>
          <dt className="text-xs text-neutral-500 mb-1">الاسم</dt>
          <dd className="text-base font-bold text-pink-blush-800">
            {user.name}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500 mb-1">البريد الإلكتروني</dt>
          <dd className="text-base font-bold text-pink-blush-800">
            {user.email}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500 mb-1">رقم العضوية</dt>
          <dd className="text-base font-mono font-bold text-pink-blush-800">
            {user.id}
          </dd>
        </div>
      </dl>
      <p className="mt-6 text-xs text-neutral-400">
        💡 تعديل المعلومات سيكون متاحاً بعد ربط backend (المرحلة القادمة)
      </p>
    </div>
  )
}
