"use client"

import { motion } from "framer-motion"
import Button from "@/components/ui/Button"
import { selectSubtotal, type CartItem } from "@/lib/store/cart"

interface CartSummaryProps {
  items: CartItem[]
  onCheckout: () => void
  isSubmitting?: boolean
}

export default function CartSummary({
  items,
  onCheckout,
  isSubmitting,
}: CartSummaryProps) {
  const subtotal = selectSubtotal(items)
  const shipping = 0 // مجاني
  const total = subtotal + shipping

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="bg-cream-50 border border-pink-blush-100 rounded-2xl p-6 shadow-soft lg:sticky lg:top-6"
    >
      <h3 className="text-xl font-black text-pink-blush-800 mb-4">
        ملخص الطلب
      </h3>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-neutral-600">المجموع الفرعي</dt>
          <dd className="font-bold text-neutral-800">{subtotal} ر.س</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-600">التوصيل</dt>
          <dd className="font-bold text-green-600">مجاني</dd>
        </div>
        <div className="pt-3 border-t border-pink-blush-100 flex justify-between items-baseline">
          <dt className="text-base font-bold text-pink-blush-800">الإجمالي</dt>
          <dd className="text-2xl font-black text-pink-blush-600">
            {total} ر.س
          </dd>
        </div>
      </dl>

      {/* Promo code */}
      <div className="mt-6 pt-6 border-t border-pink-blush-100">
        <label
          htmlFor="promo"
          className="block text-xs font-bold text-pink-blush-700 mb-2"
        >
          كود الخصم
        </label>
        <div className="flex gap-2">
          <input
            id="promo"
            type="text"
            placeholder="ANAQA20"
            className="flex-1 px-3 py-2 text-sm bg-white border-2 border-pink-blush-100 rounded-lg outline-none focus:border-pink-blush-400"
          />
          <button className="px-4 py-2 text-sm font-bold text-pink-blush-700 bg-pink-blush-50 rounded-lg hover:bg-pink-blush-100 transition-colors">
            تطبيق
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Button
          variant="primary"
          size="lg"
          onClick={onCheckout}
          disabled={items.length === 0 || isSubmitting}
          className="w-full"
        >
          متابعة إلى الطلب
        </Button>
        <p className="mt-3 text-xs text-center text-neutral-500">
          💵 الدفع عند الاستلام
        </p>
      </div>
    </motion.aside>
  )
}
