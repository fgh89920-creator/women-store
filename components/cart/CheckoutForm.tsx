"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import Button from "@/components/ui/Button"
import { useCartStore, type CartItem } from "@/lib/store/cart"
import { submitOrder, SAUDI_CITIES } from "@/app/actions/submitOrder"

const checkoutSchema = z.object({
  name: z.string().min(2, "الاسم قصير جداً"),
  phone: z
    .string()
    .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
    .regex(/^[0-9+\s-]+$/, "رقم الهاتف غير صالح"),
  city: z.string().min(1, "المدينة مطلوبة"),
  address: z.string().min(5, "العنوان قصير جداً"),
  notes: z.string().optional(),
})

type CheckoutInput = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  items: CartItem[]
}

export default function CheckoutForm({ items }: CheckoutFormProps) {
  const router = useRouter()
  const clearCart = useCartStore((s) => s.clear)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { city: "" },
  })

  const onSubmit = async (data: CheckoutInput) => {
    setServerError(null)
    const result = await submitOrder({
      customer: data,
      items,
    })
    if (!result.ok || !result.orderNumber) {
      setServerError(result.error ?? "حدث خطأ غير متوقع")
      return
    }
    clearCart()
    router.push(`/order-confirmed/${result.orderNumber}`)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="bg-cream-50 border border-pink-blush-100 rounded-2xl p-6 sm:p-8 shadow-soft"
    >
      <h2 className="text-2xl font-black text-pink-blush-800 mb-2">
        بيانات الطلب
      </h2>
      <p className="text-sm text-neutral-500 mb-6">
        💵 الدفع عند الاستلام — ادفعي للمندوب عند استلام الطلب
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Field
          label="الاسم الكامل"
          error={errors.name?.message}
          input={
            <input
              type="text"
              placeholder="مثال: نور الهدى"
              className={inputClasses(!!errors.name)}
              {...register("name")}
            />
          }
        />

        <Field
          label="رقم الهاتف"
          error={errors.phone?.message}
          input={
            <input
              type="tel"
              inputMode="tel"
              placeholder="05XXXXXXXX"
              className={inputClasses(!!errors.phone)}
              {...register("phone")}
            />
          }
        />

        <Field
          label="المدينة"
          error={errors.city?.message}
          input={
            <select
              className={inputClasses(!!errors.city)}
              {...register("city")}
            >
              <option value="">اختاري المدينة</option>
              {SAUDI_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          }
        />

        <Field
          label="العنوان التفصيلي"
          error={errors.address?.message}
          input={
            <textarea
              rows={3}
              placeholder="الحي، الشارع، رقم المبنى..."
              className={inputClasses(!!errors.address)}
              {...register("address")}
            />
          }
        />

        <Field
          label="ملاحظات (اختياري)"
          error={errors.notes?.message}
          input={
            <textarea
              rows={2}
              placeholder="ملاحظات إضافية للمندوب..."
              className={inputClasses(!!errors.notes)}
              {...register("notes")}
            />
          }
        />

        {serverError && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
          >
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting || items.length === 0}
          className="w-full"
        >
          {isSubmitting ? "جاري تأكيد الطلب..." : "تأكيد الطلب"}
        </Button>
      </form>
    </motion.section>
  )
}

function inputClasses(hasError: boolean) {
  return `w-full px-4 py-3 text-base bg-white border-2 rounded-xl outline-none transition-colors focus:ring-2 focus:ring-pink-blush-200 ${
    hasError ? "border-red-400" : "border-pink-blush-100 focus:border-pink-blush-500"
  }`
}

function Field({
  label,
  error,
  input,
}: {
  label: string
  error?: string
  input: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-pink-blush-800 mb-2">
        {label}
      </label>
      {input}
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
