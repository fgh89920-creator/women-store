import { notFound } from "next/navigation"
import { categories } from "@/lib/data/categories"
import { products } from "@/lib/data/products"
import CategoryView from "./CategoryView"

interface CategoryPageProps {
  params: { slug: string }
  searchParams: { sort?: string; newOnly?: string }
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug)
  return {
    title: category ? `${category.name} — متجر أناقة` : "قسم — متجر أناقة",
    description: category?.description ?? "",
  }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug)
  if (!category) notFound()

  const allCategoryProducts = products.filter((p) => p.categoryId === category.id)
  const sort = (searchParams.sort ?? "newest") as
    | "newest"
    | "price-asc"
    | "price-desc"
    | "popular"
  const newOnly = searchParams.newOnly === "true"

  return (
    <CategoryView
      category={category}
      allProducts={allCategoryProducts}
      initialSort={sort}
      initialNewOnly={newOnly}
    />
  )
}
