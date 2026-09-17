import { notFound } from "next/navigation"
import { products } from "@/lib/data/products"
import { categories } from "@/lib/data/categories"
import ProductView from "./ProductView"

interface ProductPageProps {
  params: { slug: string }
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)
  return {
    title: product ? `${product.name} — متجر أناقة` : "منتج — متجر أناقة",
    description: product?.description ?? "",
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const category = categories.find((c) => c.id === product.categoryId)
  const related = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  return <ProductView product={product} category={category} related={related} />
}
