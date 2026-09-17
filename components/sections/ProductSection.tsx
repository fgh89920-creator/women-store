"use client"

import SectionHeader from "@/components/ui/SectionHeader"
import ProductCard from "@/components/ui/ProductCard"
import type { Product } from "@/types/product"

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  action?: { label: string; href: string }
  emptyMessage?: string
}

export default function ProductSection({
  title,
  subtitle,
  products,
  action,
  emptyMessage,
}: ProductSectionProps) {
  if (products.length === 0 && emptyMessage) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader title={title} subtitle={subtitle} />
        <p className="text-center text-neutral-500 py-12">{emptyMessage}</p>
      </section>
    )
  }

  const actionNode = action && (
    <a
      href={action.href}
      className="text-sm font-bold text-pink-blush-600 hover:text-pink-blush-700 transition-colors"
    >
      {action.label} ←
    </a>
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeader title={title} subtitle={subtitle} action={actionNode} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
