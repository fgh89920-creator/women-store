"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface AuthUser {
  id: string
  name: string
  email: string
  phone?: string
}

interface AuthState {
  user: AuthUser | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: async (email, password) => {
        // Placeholder: no backend yet. Validate basic format, then sign in.
        if (!email.includes("@")) {
          return { ok: false, error: "البريد الإلكتروني غير صالح" }
        }
        if (password.length < 6) {
          return { ok: false, error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }
        }
        const user: AuthUser = {
          id: `usr-${Date.now().toString(36)}`,
          name: email.split("@")[0],
          email,
        }
        set({ user, isLoggedIn: true })
        return { ok: true }
      },

      signup: async (name, email, password) => {
        if (!name.trim()) return { ok: false, error: "الاسم مطلوب" }
        if (!email.includes("@")) {
          return { ok: false, error: "البريد الإلكتروني غير صالح" }
        }
        if (password.length < 6) {
          return { ok: false, error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }
        }
        const user: AuthUser = {
          id: `usr-${Date.now().toString(36)}`,
          name,
          email,
        }
        set({ user, isLoggedIn: true })
        return { ok: true }
      },

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "anaqa-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
