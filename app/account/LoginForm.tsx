"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Button from "@/components/ui/Button"
import { useAuthStore } from "@/lib/store/auth"

type Mode = "login" | "signup"

export default function LoginForm() {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)
  const signup = useAuthStore((s) => s.signup)

  const [mode, setMode] = useState<Mode>("login")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const fd = new FormData(e.currentTarget)
    const email = String(fd.get("email") ?? "")
    const password = String(fd.get("password") ?? "")
    const name = String(fd.get("name") ?? "")

    const result =
      mode === "login"
        ? await login(email, password)
        : await signup(name, email, password)

    setSubmitting(false)

    if (!result.ok) {
      setError(result.error ?? "حدث خطأ")
      return
    }
    router.refresh()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="mx-auto max-w-md bg-cream-50 border border-pink-blush-100 rounded-2xl p-6 sm:p-8 shadow-soft"
    >
      <h1 className="text-3xl font-black text-pink-blush-800 mb-2 text-center">
        {mode === "login" ? "تسجيل الدخول" : "حساب جديد"}
      </h1>
      <p className="text-sm text-neutral-500 mb-6 text-center">
        {mode === "login"
          ? "أهلاً بعودتك — سجّلي دخولك للمتابعة"
          : "انضمي لنا — أنشئي حسابك خلال ثوانٍ"}
      </p>

      {/* Tabs */}
      <div className="flex bg-pink-blush-50 rounded-xl p-1 mb-6">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
            mode === "login"
              ? "bg-white text-pink-blush-700 shadow-soft"
              : "text-neutral-500"
          }`}
        >
          دخول
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
            mode === "signup"
              ? "bg-white text-pink-blush-700 shadow-soft"
              : "text-neutral-500"
          }`}
        >
          حساب جديد
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <Field
            label="الاسم الكامل"
            input={
              <input
                name="name"
                type="text"
                placeholder="مثال: نور الهدى"
                required
                className={inputCls}
              />
            }
          />
        )}
        <Field
          label="البريد الإلكتروني"
          input={
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className={inputCls}
            />
          }
        />
        <Field
          label="كلمة المرور"
          input={
            <input
              name="password"
              type="password"
              placeholder="6 أحرف على الأقل"
              required
              minLength={6}
              className={inputCls}
            />
          }
        />

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
          {submitting
            ? "جاري..."
            : mode === "login"
            ? "تسجيل الدخول"
            : "إنشاء الحساب"}
        </Button>
      </form>

      <div className="relative my-6 text-center text-sm text-neutral-400">
        <span className="bg-cream-50 px-2 relative z-10">أو</span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-pink-blush-100" />
      </div>

      <Button
        variant="secondary"
        size="lg"
        onClick={() => router.push("/cart")}
        className="w-full"
      >
        متابعة كضيف
      </Button>

      <p className="mt-6 text-xs text-center text-neutral-400">
        💡 الحفظ تجريبي — الحساب ما ينتقل بين الأجهزة حتى نربط backend
      </p>
    </motion.div>
  )
}

const inputCls =
  "w-full px-4 py-3 text-base bg-white border-2 border-pink-blush-100 rounded-xl outline-none transition-colors focus:border-pink-blush-500 focus:ring-2 focus:ring-pink-blush-200"

function Field({
  label,
  input,
}: {
  label: string
  input: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-pink-blush-800 mb-2">
        {label}
      </label>
      {input}
    </div>
  )
}
