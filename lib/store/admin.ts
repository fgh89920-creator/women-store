"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface AdminState {
  isAdminLoggedIn: boolean
  adminName: string
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

// Hardcoded single admin for now. In production, replace with NextAuth + DB.
const ADMIN_EMAIL = "admin@anaqa.com"
const ADMIN_PASSWORD = "admin123"
const ADMIN_DISPLAY_NAME = "المديرة"

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdminLoggedIn: false,
      adminName: "",
      login: (email, password) => {
        if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
          return { ok: false, error: "البريد غير صحيح" }
        }
        if (password !== ADMIN_PASSWORD) {
          return { ok: false, error: "كلمة المرور غير صحيحة" }
        }
        set({ isAdminLoggedIn: true, adminName: ADMIN_DISPLAY_NAME })
        return { ok: true }
      },
      logout: () => set({ isAdminLoggedIn: false, adminName: "" }),
    }),
    {
      name: "anaqa-admin",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
