"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Button from "@/components/ui/Button"

interface OrderConfirmedPageProps {
  params: { id: string }
}

export default function OrderConfirmedPage({ params }: OrderConfirmedPageProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 text-green-600"
          viewBox="0 0 52 52"
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            d="M14 27 L22 35 L40 17"
          />
        </motion.svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-3xl sm:text-4xl font-black text-pink-blush-800 mb-4"
      >
        تم تأكيد طلبك بنجاح!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-neutral-600 mb-8"
      >
        سنقوم بالتواصل معك قريباً لتأكيد موعد التوصيل
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-cream-50 border border-pink-blush-100 rounded-2xl p-6 mb-8 shadow-soft"
      >
        <p className="text-sm text-neutral-500 mb-1">رقم الطلب</p>
        <p className="text-2xl font-black text-pink-blush-700 tracking-wider">
          {params.id}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="bg-pink-blush-50 border border-pink-blush-100 rounded-2xl p-4 mb-8 text-sm text-pink-blush-800"
      >
        💵 <strong>الدفع عند الاستلام</strong> — ادفعي للمندوب عند استلام الطلب
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        <Link href="/">
          <Button variant="primary" size="lg">
            العودة للرئيسية
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
