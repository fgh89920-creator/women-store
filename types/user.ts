export interface Address {
  label: string
  city: string
  street: string
  phone: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  addresses: Address[]
  favoriteProducts: string[]
  createdAt: string
}