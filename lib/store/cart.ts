"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (existing) {
            const newQty = Math.min(existing.quantity + quantity, item.stock)
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, quantity: newQty } : i
              ),
            }
          }
          const safeQty = Math.min(quantity, item.stock)
          return { items: [...state.items, { ...item, quantity: safeQty }] }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId
                ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
                : i
            ),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "anaqa-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Selectors / helpers (pure, no hook)
export const selectSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export const selectItemCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
