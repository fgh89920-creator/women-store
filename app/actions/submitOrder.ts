"use server"

import type { CartItem } from "@/lib/store/cart"

export interface OrderCustomer {
  name: string
  phone: string
  city: string
  address: string
  notes?: string
}

export interface SubmitOrderInput {
  customer: OrderCustomer
  items: CartItem[]
}

export interface SubmitOrderResult {
  ok: boolean
  orderNumber?: string
  error?: string
}

const cities = [
  "الرياض",
  "جدة",
  "الدمام",
  "مكة المكرمة",
  "المدينة المنورة",
] as const

export type City = (typeof cities)[number]

export async function submitOrder(
  input: SubmitOrderInput
): Promise<SubmitOrderResult> {
  // Validation (server-side mirror of client form)
  const errors: string[] = []
  if (!input.customer.name.trim()) errors.push("الاسم مطلوب")
  const phoneDigits = input.customer.phone.replace(/\D/g, "")
  if (phoneDigits.length < 10) errors.push("رقم الهاتف غير صالح")
  if (!cities.includes(input.customer.city as City))
    errors.push("المدينة غير مدعومة")
  if (!input.customer.address.trim()) errors.push("العنوان مطلوب")
  if (input.items.length === 0) errors.push("السلة فارغة")

  if (errors.length > 0) {
    return { ok: false, error: errors.join("، ") }
  }

  // TODO Phase 5/6: persist to MongoDB.
  // For now, log to server console and return a generated order number.
  const orderNumber = `ANQ-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`

  const total = input.items.reduce((s, i) => s + i.price * i.quantity, 0)

  console.log("[submitOrder] new order", {
    orderNumber,
    customer: input.customer,
    itemCount: input.items.length,
    total,
    placedAt: new Date().toISOString(),
  })

  return { ok: true, orderNumber }
}

export const SAUDI_CITIES = cities as readonly City[]
