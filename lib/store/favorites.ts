"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface FavoritesState {
  productIds: string[]
  toggle: (productId: string) => void
  isFavorite: (productId: string) => boolean
  clear: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        })),
      isFavorite: (productId) => get().productIds.includes(productId),
      clear: () => set({ productIds: [] }),
    }),
    {
      name: "anaqa-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
