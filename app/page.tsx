import Hero from "@/components/sections/Hero"
import CategoryStrip from "@/components/sections/CategoryStrip"
import ProductSection from "@/components/sections/ProductSection"
import PromoBanner from "@/components/sections/PromoBanner"
import { products } from "@/lib/data/products"

export default function HomePage() {
  const newProducts = products.filter((p) => p.isNew).slice(0, 4)
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4)

  return (
    <>
      <Hero />
      <CategoryStrip />
      <ProductSection
        title="وصل حديثاً"
        subtitle="أحدث المنتجات المختارة لكِ"
        products={newProducts}
        action={{ label: "شاهدي الكل", href: "/category/makeup" }}
      />
      <PromoBanner />
      <ProductSection
        title="الأكثر مبيعاً"
        subtitle="المفضلة عند زبوناتنا"
        products={featuredProducts}
        action={{ label: "شاهدي الكل", href: "/category/accessories" }}
      />
    </>
  )
}
