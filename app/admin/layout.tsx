import type { ReactNode } from "react"
import AdminGuard from "@/components/layout/AdminGuard"
import AdminSidebar from "@/components/layout/AdminSidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-cream-50">
        <AdminSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </AdminGuard>
  )
}
