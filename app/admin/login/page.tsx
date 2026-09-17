"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Button from "@/components/ui/Button"
import { useAdminStore } from "@/lib/store/admin"

export default function AdminLoginPage() {
  const router = useRouter()
  const login = useAdminStore((s) => s.login)

  const [email, setEmail] = useState("admin@anaqa.com")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = login(email, password)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error ?? "بيانات الدخول غير صحيحة")
      return
    }
    router.replace("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-pink-blush-100 via-cream-50 to-cream-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="w-full max-w-md bg-cream-50 border border-pink-blush-100 rounded-2xl p-8 shadow-soft-lg"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-2xl font-black text-pink-blush-800">
            لوحة الإدارة
          </h1>
          <p className="text-sm text-neutral-500 mt-1">متجر أناقة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-pink-blush-800 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-base bg-white border-2 border-pink-blush-100 rounded-xl outline-none focus:border-pink-blush-500 focus:ring-2 focus:ring-pink-blush-200"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-pink-blush-800 mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="admin123"
              className="w-full px-4 py-3 text-base bg-white border-2 border-pink-blush-100 rounded-xl outline-none focus:border-pink-blush-500 focus:ring-2 focus:ring-pink-blush-200"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={submitting}
            className="w-full"
          >
            {submitting ? "جاري الدخول..." : "دخول"}
          </Button>
        </form>

        <p className="mt-6 text-xs text-center text-neutral-400">
          🔒 منطقة محمية — للأدمن فقط
        </p>
      </motion.div>
    </div>
  )
}
