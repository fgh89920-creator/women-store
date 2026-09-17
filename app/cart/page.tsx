"use client"

import { motion } from "framer-motion"
import { useCartStore } from "@/lib/store/cart"
import CartItem from "@/components/cart/CartItem"
import CartSummary from "@/components/cart/CartSummary"
import EmptyCart from "@/components/cart/EmptyCart"
import CheckoutForm from "@/components/cart/CheckoutForm"

export default function CartPage() {
  const items = useCartStore((s) => s.items)

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="mx-auto max-w-6xl px-4 py-8"
    >
      <h1 className="text-3xl sm:text-4xl font-black text-pink-blush-800 mb-8">
        سلة التسوّق
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Items + Checkout */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}

          {/* Checkout form directly below */}
          <div className="pt-4">
            <CheckoutForm items={items} />
          </div>
        </div>

        {/* Summary (sticky on desktop) */}
        <div className="lg:col-span-1">
          <CartSummary items={items} onCheckout={() => undefined} />
        </div>
      </div>
    </motion.div>
  )
}
