"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAdminStore } from "@/lib/store/admin"

const navItems = [
  { href: "/admin", label: "لوحة التحكم", icon: "📊", exact: true },
  { href: "/admin/orders", label: "الطلبات", icon: "📦" },
  { href: "/admin/products", label: "المنتجات", icon: "🛍️" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const adminName = useAdminStore((s) => s.adminName)
  const logout = useAdminStore((s) => s.logout)

  return (
    <aside className="w-64 bg-cream-50 border-l border-pink-blush-100 min-h-screen sticky top-0 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-pink-blush-100">
        <Link href="/admin" className="block">
          <h2 className="text-xl font-black text-pink-blush-800">متجر أناقة</h2>
          <p className="text-xs text-neutral-500">لوحة الإدارة</p>
        </Link>
      </div>

      {/* User */}
      <div className="px-6 py-4 border-b border-pink-blush-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-blush-500 text-white font-black flex items-center justify-center">
            أ
          </div>
          <div>
            <p className="text-sm font-bold text-pink-blush-800">
              {adminName || "المديرة"}
            </p>
            <p className="text-xs text-neutral-500">admin@anaqa.com</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  active
                    ? "bg-pink-blush-500 text-white shadow-soft"
                    : "text-neutral-700 hover:bg-pink-blush-50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-pink-blush-100 space-y-2">
        <Link
          href="/"
          className="block w-full text-center px-4 py-2 rounded-xl text-sm font-bold text-pink-blush-700 hover:bg-pink-blush-50 transition-colors"
        >
          ← العودة للمتجر
        </Link>
        <button
          onClick={() => {
            logout()
            router.replace("/admin/login")
          }}
          className="w-full text-center px-4 py-2 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
        >
          تسجيل الخروج
        </button>
      </div>
    </aside>
  )
}
