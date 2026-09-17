"use client"

import Link from "next/link"
import { useCartStore, selectItemCount } from "@/lib/store/cart"
import { useFavoritesStore } from "@/lib/store/favorites"
import { useAuthStore } from "@/lib/store/auth"

export default function Header() {
  const cartCount = useCartStore((s) => selectItemCount(s.items))
  const favCount = useFavoritesStore((s) => s.productIds.length)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  return (
    <header className="sticky top-0 z-40 border-b border-pink-blush-100 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-2xl font-black text-pink-blush-800 hover:text-pink-blush-600 transition-colors"
        >
          متجر أناقة
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 text-sm">
          <Link
            href="/"
            className="hidden sm:inline-block px-2 py-1 text-neutral-700 hover:text-pink-blush-600 transition-colors"
          >
            الرئيسية
          </Link>
          <Link
            href="/category/makeup"
            className="hidden md:inline-block px-2 py-1 text-neutral-700 hover:text-pink-blush-600 transition-colors"
          >
            مكياج
          </Link>
          <Link
            href="/category/skincare"
            className="hidden md:inline-block px-2 py-1 text-neutral-700 hover:text-pink-blush-600 transition-colors"
          >
            عناية
          </Link>
          <Link
            href="/category/clothing"
            className="hidden md:inline-block px-2 py-1 text-neutral-700 hover:text-pink-blush-600 transition-colors"
          >
            ملابس
          </Link>

          <Link
            href="/account"
            aria-label={isLoggedIn ? "حسابي" : "تسجيل الدخول"}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-blush-50 transition-colors"
          >
            <span className="text-xl">{isLoggedIn ? "👤" : "🔑"}</span>
          </Link>

          <Link
            href="/account"
            aria-label="المفضلة"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-blush-50 transition-colors"
          >
            <span className="text-xl">♡</span>
            {favCount > 0 && (
              <span className="absolute -top-1 -end-1 bg-pink-blush-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            aria-label="السلة"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-blush-50 transition-colors"
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -end-1 bg-pink-blush-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
