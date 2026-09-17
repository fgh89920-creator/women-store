"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Button from "@/components/ui/Button"

export default function OrdersList() {
  // TODO Phase 5/6: load orders from MongoDB by userId
  // For now, the Server Action logs to console — no DB persistence yet.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16 bg-cream-50 border border-pink-blush-100 rounded-2xl"
    >
      <span className="text-6xl block mb-4">📦</span>
      <p className="text-xl font-bold text-pink-blush-700 mb-2">
        لا توجد طلبات بعد
      </p>
      <p className="text-neutral-500 mb-2 max-w-md mx-auto">
        ستظهر طلباتك السابقة هنا بعد إتمام أول طلب
      </p>
      <p className="text-xs text-neutral-400 mb-6">
        (سيتم ربط هذا بقاعدة البيانات في المرحلة القادمة)
      </p>
      <Link href="/">
        <Button variant="primary">ابدئي التسوّق</Button>
      </Link>
    </motion.div>
  )
}
