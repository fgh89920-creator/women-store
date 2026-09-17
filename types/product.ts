export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  categoryId: string
  stock: number
  isNew: boolean
  isFeatured: boolean
  createdAt: string
}
