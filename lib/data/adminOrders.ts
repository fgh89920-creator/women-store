import type { Order, OrderStatus } from "@/types/order"

// Mock orders for admin demo. Once we wire MongoDB, replace with db queries.
export const mockOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ANQ-MOCK-0001",
    customer: {
      name: "نور الهدى",
      phone: "0501234567",
      city: "الرياض",
      address: "حي العليا، شارع الملك فهد",
    },
    items: [
      {
        productId: "p-1",
        name: "أحمر شفاه مات ساتان",
        price: 45,
        quantity: 2,
        image: "https://source.unsplash.com/600x600/?lipstick&sig=1",
      },
      {
        productId: "p-2",
        name: "طقم فرش مكياج 12 قطعة",
        price: 120,
        quantity: 1,
        image: "https://source.unsplash.com/600x600/?makeup-brushes&sig=3",
      },
    ],
    total: 210,
    status: "new",
    createdAt: "2026-09-15",
  },
  {
    id: "ord-002",
    orderNumber: "ANQ-MOCK-0002",
    customer: {
      name: "سارة الأحمد",
      phone: "0559876543",
      city: "جدة",
      address: "حي الروضة، شارع صاري",
    },
    items: [
      {
        productId: "p-5",
        name: "سيروم فيتامين C 20%",
        price: 110,
        quantity: 1,
        image: "https://source.unsplash.com/600x600/?skincare&sig=9",
      },
    ],
    total: 110,
    status: "processing",
    createdAt: "2026-09-14",
  },
  {
    id: "ord-003",
    orderNumber: "ANQ-MOCK-0003",
    customer: {
      name: "مريم العتيبي",
      phone: "0533334444",
      city: "الدمام",
      address: "حي الفيصلية، شارع الأمير نايف",
      notes: "التوصيل بعد العصر",
    },
    items: [
      {
        productId: "p-11",
        name: "فستان سهرة ميدي",
        price: 280,
        quantity: 1,
        image: "https://source.unsplash.com/600x600/?evening-dress&sig=21",
      },
    ],
    total: 280,
    status: "shipped",
    createdAt: "2026-09-13",
  },
  {
    id: "ord-004",
    orderNumber: "ANQ-MOCK-0004",
    customer: {
      name: "هند المالكي",
      phone: "0566667777",
      city: "مكة المكرمة",
      address: "حي العزيزية، شارع إبراهيم الجفالي",
    },
    items: [
      {
        productId: "p-7",
        name: "عطر زهري 50 مل",
        price: 180,
        quantity: 1,
        image: "https://source.unsplash.com/600x600/?perfume&sig=13",
      },
      {
        productId: "p-9",
        name: "حلق فضي مع حجر كريستال",
        price: 65,
        quantity: 1,
        image: "https://source.unsplash.com/600x600/?earrings&sig=17",
      },
    ],
    total: 245,
    status: "delivered",
    createdAt: "2026-09-10",
  },
  {
    id: "ord-005",
    orderNumber: "ANQ-MOCK-0005",
    customer: {
      name: "ليلى الشهري",
      phone: "0577778888",
      city: "المدينة المنورة",
      address: "حي الخالدية، شارع سلطانة",
    },
    items: [
      {
        productId: "p-12",
        name: "بلوزة قطنية كاجوال",
        price: 75,
        quantity: 3,
        image: "https://source.unsplash.com/600x600/?blouse&sig=23",
      },
    ],
    total: 225,
    status: "cancelled",
    createdAt: "2026-09-09",
  },
]

export const ORDER_STATUSES: OrderStatus[] = [
  "new",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "جديد",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
}
