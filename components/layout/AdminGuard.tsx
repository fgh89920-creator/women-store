"use client"

import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import { useAdminStore } from "@/lib/store/admin"

interface AdminGuardProps {
  children: ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const isAdminLoggedIn = useAdminStore((s) => s.isAdminLoggedIn)

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.replace("/admin/login")
    }
  }, [isAdminLoggedIn, router])

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <p className="text-pink-blush-700 font-bold">جاري التحويل...</p>
      </div>
    )
  }

  return <>{children}</>
}
