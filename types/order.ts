export interface OrderCustomer {
  name: string
  phone: string
  address: string
  city: string
  notes?: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export type OrderStatus =
  | "new"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export interface Order {
  id: string
  orderNumber: string
  customer: OrderCustomer
  items: OrderItem[]
  total: number
  status: OrderStatus
  userId?: string
  createdAt: string
}
