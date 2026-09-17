"use client"

import { useAuthStore } from "@/lib/store/auth"
import LoginForm from "./LoginForm"
import AccountDashboard from "./AccountDashboard"

export default function AccountPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  return isLoggedIn ? <AccountDashboard /> : <LoginForm />
}
