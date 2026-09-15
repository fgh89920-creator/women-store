# Women Store — Phase 1 Scaffolding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** تأسيس مشروع Next.js كامل الإعدادات (Tailwind + RTL بالعربي + Framer Motion + Zustand) مع بيانات وهمية مؤقتة، بحيث يكون المشروع قابل للتشغيل بـ `npm run dev` ويظهر بنية عربية RTL صحيحة من اليمين لليسار.

**Architecture:** Next.js 14 App Router + TypeScript + Tailwind CSS. موقع من اليمين لليسار (RTL) بخط Cairo. البنية على شكل مجلدات بحسب المسؤولية (`app/` للصفحات، `components/` للمكونات، `lib/` للمنطق، `types/` للأنواع، `data/` للبيانات الوهمية).

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand, Lucide React, React Hook Form, Zod

**Spec:** [docs/superpowers/specs/2026-09-15-women-store-design.md](../specs/2026-09-15-women-store-design.md)

## Global Constraints

هذه القواعد تنطبق على **كل مهمة** بالخطة. أي مهمة لاحقاً ترثها ضمنياً:

- **المسار الجذر:** `D:\LD_store` — كل الأوامر تشتغل من هلأ
- **الـ Shell:** Bash (Git Bash على Windows). ملاحظة: إعادة التوجيه `>` و`2>&1` خاصة بـ Bash، لا تستخدم PowerShell `>` redirect
- **اللغة الافتراضية:** عربي. أسماء الملفات والمتغيرات بالإنجليزية، لكن محتواها (نصوص UI، تعليقات) بالعربي حيث يلزم
- **الترميز:** كل الملفات الجديدة UTF-8
- **RTL:** كل صفحة HTML لازم يكون `<html lang="ar" dir="rtl">` من الجذر
- **Tailwind:** استخدام `ms-*` و`me-*` بدل `ml-*` و`mr-*` (Logical Properties) تلقائياً
- **الخط:** Cairo عبر `next/font/google` (نبدأ به — يمكن تغييره لاحقاً)
- **لون افتراضي:** حالياً رمادي/أسود (نغيّره بنظام التصميم — مرحلة لاحقة)
- **Git:** المشروع ليس git repo. أول مهمة بتشغيل git init
- **Node:** يفترض Node.js ≥ 18
- **العملات:** الأسعار حالياً عشوائية (سنحدد العملة لاحقاً)

---

## File Structure

ما الذي يُنشأ في هذه الخطة:

```
D:\LD_store\                                  # جذر المشروع
├── package.json                              # يُنشأ عبر create-next-app
├── tsconfig.json                             # يُنشأ، يُعدّل
├── tailwind.config.ts                        # يُنشأ، يُعدّل (RTL + font)
├── postcss.config.js                         # يُنشأ
├── next.config.js                            # يُنشأ
├── .eslintrc.json                            # يُنشأ
├── .gitignore                                # يُنشأ (Node + Next)
├── app/
│   ├── layout.tsx                            # الجذر: <html dir="rtl" lang="ar">
│   ├── page.tsx                              # صفحة ترحيب موقتة
│   └── globals.css                           # تُنشأ، تُعدّل (خط Cairo)
├── components/
│   └── layout/
│       ├── Header.tsx                        # Placeholder (شعار + تنقل فاضي)
│       └── Footer.tsx                        # Placeholder
├── lib/
│   ├── store/
│   │   └── cart.ts                           # Zustand store (يُهيّأ فاضي أول)
│   └── data/
│       ├── categories.ts                     # 4 أقسام
│       └── products.ts                       # 12 منتج وهمي
├── types/
│   ├── product.ts                            # واجهة Product
│   ├── category.ts                           # واجهة Category
│   ├── order.ts                              # واجهة Order
│   └── user.ts                               # واجهة User
└── public/
    └── (أيقونات وملفات static)
```

كل ملف له مسؤولية واحدة. التغييرات كلها تخدم المهمة الموصوفة — لا نضيف ملفات "احتياطياً".

---

## Task 1: إنشاء مشروع Next.js

**Files:**
- Create: `D:\LD_store\package.json` (تلقائي)
- Create: `D:\LD_store\tsconfig.json` (تلقائي)
- Create: `D:\LD_store\tailwind.config.ts` (تلقائي)
- Create: `D:\LD_store\next.config.js` (تلقائي)
- Create: `D:\LD_store\app\layout.tsx` (تلقائي، يُعدّل لاحقاً)
- Create: `D:\LD_store\app\page.tsx` (تلقائي، يُستبدل لاحقاً)

**Interfaces:**
- Consumes: لا شيء (هذه أول مهمة)
- Produces: مشروع Next.js قابل للتشغيل على `localhost:3000`

- [ ] **Step 1: تأكيد أن المجلد فارغ**

Run: `ls -la "D:\LD_store"`
Expected: المجلد فاضي تماماً (`.` و`..` فقط) أو فيه مجلدات مخفية (`docs/`)

- [ ] **Step 2: تشغيل create-next-app داخل المجلد الحالي**

```bash
cd "/d/LD_store" && npx --yes create-next-app@14 . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*" --use-npm
```

⚠️ **مهم:** استخدمنا `14` بنسخة محددة من Next.js حتى لا نجلب تغييرات جذرية من الإصدارات الأحدث. اسم المشروع `.` يعني داخل المجلد الحالي.

Expected: رسالة تأكيد "Success! Created ... at D:\LD_store"

- [ ] **Step 3: التحقق من البنية**

Run: `ls "D:\LD_store"`
Expected: ملفات `package.json`، `tsconfig.json`، `tailwind.config.ts`، `app/`، `public/`

- [ ] **Step 4: تشغيل خادم التطوير للتحقق**

```bash
cd "/d/LD_store" && npm run dev
```

Expected: الخادم يبدأ ويُطبع رقم المنفذ (افتراضياً 3000). افتح `http://localhost:3000` برا — لازم تشوف صفحة Next.js الافتراضية.

⚠️ **أوقف الخادم** بعد التحقق (`Ctrl+C`) قبل المتابعة.

- [ ] **Step 5: Commit (في مهمة لاحقة مع git init)**

نترك الـ commit لمهمة 12، لكن لا ننسى أن المشروع غير مُهيّأ لـ git بعد.

---

## Task 2: تفعيل RTL في Tailwind و layout.tsx

**Files:**
- Modify: `D:\LD_store\tailwind.config.ts`
- Modify: `D:\LD_store\app\layout.tsx`
- Modify: `D:\LD_store\app\globals.css` (إن وُجد)

**Interfaces:**
- Consumes: ما أنشأته Task 1 (مشروع Next.js جاهز)
- Produces: جذر HTML بـ `lang="ar" dir="rtl"` وخط Cairo مطبّق

- [ ] **Step 1: تحديث `tailwind.config.ts` لاستخدام font family عبر CSS variable و Logical Properties**

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-cairo)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: تحديث `app/layout.tsx` ليدعم RTL والعربي وخط Cairo**

```typescript
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "متجر أناقة — متجر نسائي",
  description: "متجر إلكتروني متخصص بمنتجات النساء",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: تشغيل dev server والتحقق من RTL**

```bash
cd "/d/LD_store" && npm run dev
```

افتح `http://localhost:3000`. تحقق بصرياً:
- اتجاه الصفحة من اليمين لليسار
- النص مطبّق بخط Cairo (ليس خط افتراضي للمتصفح)
- اللغة في `<html>` هي `ar`

أوقف الخادم (`Ctrl+C`).

---

## Task 3: تثبيت Framer Motion و Zustand

**Files:**
- Modify: `D:\LD_store\package.json` (تلقائي عند التثبيت)

**Interfaces:**
- Consumes: مشروع Next.js جاهز (Task 2)
- Produces: `framer-motion` و`zustand` في `dependencies` ويُمكن استيرادهما

- [ ] **Step 1: تثبيت الحزمتين معاً**

```bash
cd "/d/LD_store" && npm install framer-motion zustand
```

Expected: رسالة "added X packages" ولا أخطاء

- [ ] **Step 2: التحقق من الحزم في package.json**

Run: `cat "D:\LD_store\package.json" | grep -E "framer-motion|zustand"`
Expected: سطرين يظهران، كلاهما تحت `"dependencies"`

---

## Task 4: تثبيت أدوات النماذج والأيقونات

**Files:**
- Modify: `D:\LD_store\package.json`

**Interfaces:**
- Consumes: مشروع Next.js جاهز
- Produces: `react-hook-form`، `zod`، `lucide-react` قابلة للاستيراد

- [ ] **Step 1: تثبيت react-hook-form وzod وlucide-react**

```bash
cd "/d/LD_store" && npm install react-hook-form zod lucide-react
```

Expected: رسالة "added X packages"

- [ ] **Step 2: التحقق**

Run: `cat "D:\LD_store\package.json" | grep -E "react-hook-form|zod|lucide-react"`
Expected: ثلاث أسطر تظهر تحت `"dependencies"`

---

## Task 5: إنشاء هيكل المجلدات

**Files:**
- Create: `D:\LD_store\components\` (مجلد)
- Create: `D:\LD_store\components\layout\` (مجلد)
- Create: `D:\LD_store\lib\` (مجلد)
- Create: `D:\LD_store\lib\store\` (مجلد)
- Create: `D:\LD_store\lib\data\` (مجلد)
- Create: `D:\LD_store\types\` (مجلد)

**Interfaces:**
- Consumes: لا شيء
- Produces: مجلدات جاهزة للملفات القادمة

- [ ] **Step 1: إنشاء المجلدات**

في Git Bash:

```bash
cd "/d/LD_store" && mkdir -p components/layout lib/store lib/data types
```

Expected: لا رسائل خطأ

- [ ] **Step 2: التحقق**

Run: `ls -d "D:\LD_store"/{components,lib,types}`
Expected: ثلاث أسطر، كل واحد يقول إنه مجلد

---

## Task 6: تعريف أنواع TypeScript للمجال

**Files:**
- Create: `D:\LD_store\types\product.ts`
- Create: `D:\LD_store\types\category.ts`
- Create: `D:\LD_store\types\order.ts`
- Create: `D:\LD_store\types\user.ts`

**Interfaces:**
- Consumes: لا شيء
- Produces: 4 ملفات types تُستورد لاحقاً من `lib/data/products.ts` وغيرها

- [ ] **Step 1: كتابة `types/category.ts`**

```typescript
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}
```

- [ ] **Step 2: كتابة `types/product.ts`**

```typescript
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
```

- [ ] **Step 3: كتابة `types/order.ts`**

```typescript
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
```

- [ ] **Step 4: كتابة `types/user.ts`**

```typescript
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
```

- [ ] **Step 5: التحقق من TypeScript**

```bash
cd "/d/LD_store" && npx tsc --noEmit
```

Expected: لا أخطاء (رسالة فاضية أو "no errors")

---

## Task 7: إنشاء بيانات وهمية للأقسام والمنتجات

**Files:**
- Create: `D:\LD_store\lib\data\categories.ts`
- Create: `D:\LD_store\lib\data\products.ts`

**Interfaces:**
- Consumes: types من المهمة 6
- Produces: مصفوفة `categories` فيها 4 أقسام، مصفوفة `products` فيها 12 منتج

- [ ] **Step 1: كتابة `lib/data/categories.ts`**

```typescript
import type { Category } from "@/types/category"

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "مكياج وأدوات تجميل",
    slug: "makeup",
    description: "أحدث صيحات المكياج وأدوات التجميل",
  },
  {
    id: "cat-2",
    name: "العناية بالبشرة والجسم",
    slug: "skincare",
    description: "منتجات عناية طبيعية وفعّالة",
  },
  {
    id: "cat-3",
    name: "إكسسوارات ومجوهرات",
    slug: "accessories",
    description: "قطع أنيقة تكمل إطلالتك",
  },
  {
    id: "cat-4",
    name: "ملابس نسائية",
    slug: "clothing",
    description: "أزياء عصرية لكل المناسبات",
  },
]
```

- [ ] **Step 2: كتابة `lib/data/products.ts` بـ 12 منتجاً**

```typescript
import type { Product } from "@/types/product"

export const products: Product[] = [
  {
    id: "p-1",
    name: "أحمر شفاه مات ساتان",
    slug: "matte-satin-lipstick",
    description: "لون غني يدوم طويلاً مع ترطيب عميق. مكون من زيوت طبيعية.",
    price: 45,
    images: ["/images/p-1-1.jpg", "/images/p-1-2.jpg"],
    categoryId: "cat-1",
    stock: 30,
    isNew: true,
    isFeatured: true,
    createdAt: "2026-09-01",
  },
  {
    id: "p-2",
    name: "طقم فرش مكياج 12 قطعة",
    slug: "makeup-brush-set-12",
    description: "طقم فرش احترافي بشعيرات ناعمة جداً، مع حقيبة حمل.",
    price: 120,
    images: ["/images/p-2-1.jpg"],
    categoryId: "cat-1",
    stock: 15,
    isNew: true,
    isFeatured: true,
    createdAt: "2026-09-05",
  },
  {
    id: "p-3",
    name: "باليت ظلال عيون 18 لون",
    slug: "eyeshadow-palette-18",
    description: "مزيج من الألوان المطفية واللامعة لإطلالة كاملة.",
    price: 95,
    images: ["/images/p-3-1.jpg"],
    categoryId: "cat-1",
    stock: 20,
    isNew: false,
    isFeatured: true,
    createdAt: "2026-08-15",
  },
  {
    id: "p-4",
    name: "كريم أساس سائل SPF 30",
    slug: "liquid-foundation-spf30",
    description: "تغطية متوسطة مع حماية من الشمس، مناسب لكل أنواع البشرة.",
    price: 75,
    images: ["/images/p-4-1.jpg"],
    categoryId: "cat-1",
    stock: 25,
    isNew: false,
    isFeatured: false,
    createdAt: "2026-07-20",
  },
  {
    id: "p-5",
    name: "سيروم فيتامين C 20%",
    slug: "vitamin-c-serum-20",
    description: "سيروم مضاد للأكسدة، يفتح البشرة ويوحّد لونها.",
    price: 110,
    images: ["/images/p-5-1.jpg"],
    categoryId: "cat-2",
    stock: 18,
    isNew: true,
    isFeatured: true,
    createdAt: "2026-09-10",
  },
  {
    id: "p-6",
    name: "ماسك طين للوجه",
    slug: "clay-face-mask",
    description: "ينقّي المسام ويزيل اللمعان. مناسب للبشرة الدهنية والمختلطة.",
    price: 55,
    images: ["/images/p-6-1.jpg"],
    categoryId: "cat-2",
    stock: 40,
    isNew: false,
    isFeatured: false,
    createdAt: "2026-06-10",
  },
  {
    id: "p-7",
    name: "عطر زهري 50 مل",
    slug: "floral-perfume-50ml",
    description: "مزيج من الورد والياسمين مع قاعدة خشبية دافئة.",
    price: 180,
    images: ["/images/p-7-1.jpg"],
    categoryId: "cat-2",
    stock: 12,
    isNew: true,
    isFeatured: false,
    createdAt: "2026-09-08",
  },
  {
    id: "p-8",
    name: "سوار ذهب إيطالي",
    slug: "italian-gold-bracelet",
    description: "سوار من الذهب الإيطالي عيار 18، قابل للتعديل.",
    price: 350,
    images: ["/images/p-8-1.jpg"],
    categoryId: "cat-3",
    stock: 5,
    isNew: true,
    isFeatured: true,
    createdAt: "2026-09-12",
  },
  {
    id: "p-9",
    name: "حلق فضي مع حجر كريستال",
    slug: "silver-earrings-crystal",
    description: "حلق أنيق بتفصيل كريستالي متلألئ.",
    price: 65,
    images: ["/images/p-9-1.jpg"],
    categoryId: "cat-3",
    stock: 22,
    isNew: false,
    isFeatured: false,
    createdAt: "2026-05-30",
  },
  {
    id: "p-10",
    name: "قلادة لؤلؤ صناعي",
    slug: "pearl-necklace-faux",
    description: "قلادة أنيقة بلمسة كلاسيكية معاصرة.",
    price: 45,
    images: ["/images/p-10-1.jpg"],
    categoryId: "cat-3",
    stock: 28,
    isNew: false,
    isFeatured: true,
    createdAt: "2026-04-22",
  },
  {
    id: "p-11",
    name: "فستان سهرة ميدي",
    slug: "midi-evening-dress",
    description: "فستان ميدي بقصة A-line، مناسب للمناسبات.",
    price: 280,
    images: ["/images/p-11-1.jpg"],
    categoryId: "cat-4",
    stock: 8,
    isNew: true,
    isFeatured: true,
    createdAt: "2026-09-14",
  },
  {
    id: "p-12",
    name: "بلوزة قطنية كاجوال",
    slug: "casual-cotton-blouse",
    description: "بلوزة قطنية مريحة بقصة واسعة، مثالية للنهار.",
    price: 75,
    images: ["/images/p-12-1.jpg"],
    categoryId: "cat-4",
    stock: 35,
    isNew: false,
    isFeatured: false,
    createdAt: "2026-07-05",
  },
]
```

- [ ] **Step 3: التحقق بـ TypeScript**

```bash
cd "/d/LD_store" && npx tsc --noEmit
```

Expected: لا أخطاء

- [ ] **Step 4: إنشاء مجلد images داخل public (لتجنب 404)**

```bash
cd "/d/LD_store" && mkdir -p public/images && touch public/images/.gitkeep
```

ملاحظة: مجلد `public/images/` فاضي حالياً. سنضيف صور حقيقية لاحقاً (أو نستخدم placeholders).

---

## Task 8: إنشاء Header و Footer كقوالب فارغة

**Files:**
- Create: `D:\LD_store\components\layout\Header.tsx`
- Create: `D:\LD_store\components\layout\Footer.tsx`

**Interfaces:**
- Consumes: لا شيء (placeholder)
- Produces: مكونان React بسيطان بالعربي

- [ ] **Step 1: كتابة `components/layout/Header.tsx`**

```typescript
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-neutral-900">
          متجر أناقة
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-neutral-600">
            الرئيسية
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: كتابة `components/layout/Footer.tsx`**

```typescript
export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-neutral-600">
        © 2026 متجر أناقة. جميع الحقوق محفوظة.
      </div>
    </footer>
  )
}
```

---

## Task 9: تركيب Header و Footer في layout الجذر

**Files:**
- Modify: `D:\LD_store\app\layout.tsx`

**Interfaces:**
- Consumes: `components/layout/Header.tsx` و`Footer.tsx` من Task 8
- Produces: صفحة الجذر تعرض الـ Header في الأعلى و الـ Footer في الأسفل

- [ ] **Step 1: تعديل `app/layout.tsx` ليُركّب Header و Footer**

```typescript
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "متجر أناقة — متجر نسائي",
  description: "متجر إلكتروني متخصص بمنتجات النساء",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

ملاحظة: `flex min-h-screen flex-col` يضمن الـ Footer يلتصق بأسفل الصفحة حتى لو المحتوى قليل.

---

## Task 10: استبدال الصفحة الافتراضية بصفحة ترحيب عربية

**Files:**
- Modify: `D:\LD_store\app\page.tsx`

**Interfaces:**
- Consumes: لا شيء
- Produces: صفحة ترحيب "smoke test" بالعربي لتأكيد RTL والخط والمكونات

- [ ] **Step 1: استبدال محتوى `app\page.tsx`**

```typescript
export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold text-neutral-900">
        أهلاً بكِ في متجر أناقة
      </h1>
      <p className="mt-4 text-lg text-neutral-600">
        متجر نسائي متخصص بالمكياج، العناية بالبشرة، الإكسسوارات والملابس.
      </p>
      <p className="mt-8 text-sm text-neutral-500">
        جاري العمل على الموقع — تصفحي لاحقاً!
      </p>
    </section>
  )
}
```

⚠️ **هام لـ Next.js 14 App Router:** `app\page.tsx` لازم يكون `"use client"` أو `default export` بدون directives. نستخدم `default export` بدون "use client" لأن الصفحة حالياً بسيطة (server-side).

---

## Task 11: تشغيل dev server والتحقق الشامل

**Files:**
- لا يوجد تعديل ملفات

**Interfaces:**
- Consumes: كل ما بناه Task 1-10
- Produces: تحقق يدوي أن الموقع يشتغل صحيح

- [ ] **Step 1: تشغيل dev server**

```bash
cd "/d/LD_store" && npm run dev
```

Expected: الخادم يبدأ ويُطبع:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
 ✓ Ready in Xs
```

- [ ] **Step 2: التحقق البصري بفتح المتصفح**

افتح `http://localhost:3000` وتحقق:

| العنصر | المتوقع |
|---|---|
| اتجاه الصفحة | من اليمين لليسار |
| النص "أهلاً بكِ في متجر أناقة" | ظاهر، يبدأ من اليمين |
| الخط | Cairo (سميك وحاد) لا Tahoma/الافتراضي |
| Header بشعار "متجر أناقة" | ظاهر بالأعلى |
| رابط "الرئيسية" بالـ Header | ظاهر (وإن كان يفتح نفس الصفحة) |
| Footer بنص الحقوق | ظاهر بأسفل الصفحة |
| Console errors | لا أخطاء (F12 → Console) |

- [ ] **Step 3: تحقق من tsc مرة أخيرة**

في ترمنال منفصل (أو أوقف dev server أولاً):

```bash
cd "/d/LD_store" && npx tsc --noEmit
```

Expected: لا أخطاء

- [ ] **Step 4: أوقف dev server**

`Ctrl+C` في الـ terminal.

---

## Task 12: تهيئة git و commit أولي

**Files:**
- Create: `D:\LD_store\.gitignore` (يُولّد تلقائياً من create-next-app)

**Interfaces:**
- Consumes: مشروع كامل من Task 1-11
- Produces: git repo محلي بـ commit أوّلي

- [ ] **Step 1: إنشاء .gitignore إذا ما وُجد**

Run: `ls "D:\LD_store\.gitignore"`
Expected: موجود (أنشأه create-next-app)

- [ ] **Step 2: التأكد من تجاهل `.next` و `node_modules` و `.env*.local`**

Run: `cat "D:\LD_store\.gitignore" | grep -E "node_modules|\.next|env"`
Expected: ثلاث أسطر على الأقل

- [ ] **Step 3: تهيئة git وعمل commit أولي**

```bash
cd "/d/LD_store" && git init && git add . && git commit -m "feat: scaffold Next.js project with RTL Arabic, Tailwind, Framer Motion, Zustand

- Next.js 14 + TypeScript + Tailwind + App Router
- RTL enabled (lang=ar, dir=rtl, Cairo font via next/font)
- Zustand store placeholders, lucide-react, react-hook-form, zod
- Folder structure: components/lib/types/data
- 12 mock products across 4 categories
- Header/Footer layout components
- Home page smoke test in Arabic"
```

Expected: رسالة تأكيد commit مع SHA

---

## Self-Review (يُنفّذ بعد كتابة الخطة مباشرة)

**1. تغطية الـ Spec:**
- ✅ Next.js + TypeScript + Tailwind + App Router — Task 1
- ✅ RTL + خط عربي + `<html dir="rtl" lang="ar">` — Task 2
- ✅ Framer Motion + Zustand + React Hook Form + Zod + Lucide React — Tasks 3 & 4
- ✅ هيكل المجلدات (`app/`, `components/`, `lib/`, `types/`, `data/`) — Task 5
- ✅ TypeScript types لكل النماذج (Product, Category, Order, User) — Task 6
- ✅ بيانات وهمية 12 منتج + 4 أقسام — Task 7
- ✅ Home page placeholder (سنبني الحقيقي لاحقاً) — Task 10
- ✅ Layout basics (Header/Footer) — Tasks 8 & 9
- ✅ Dev server verification — Task 11
- ✅ Git init + commit — Task 12

**2. فحص Placeholders:**
- لا "TBD" أو "TODO"
- كل خطوة فيها كود فعلي أو أمر واضح
- لا "similar to Task N"

**3. تطابق الأنواع:**
- `Product` في Task 6 يُستهلك بنفس الحقول في Task 7 ✓
- `Category` في Task 6 يُستهلك بنفس الحقول في Task 7 ✓
- مكونات Header/Footer في Task 8 لا تكشف عن props لحد الآن — أبقيتهم بدون props ✓

**4. فحص الاتساق:**
- كل المهام تستخدم `cd "/d/LD_store"` بدايةً (Bash على Windows)
- Tailwind يستخدم logical properties (`me-*`, `ms-*` لم تُستخدم بعد لأن Header بسيط، ستُستخدم لاحقاً)
- السعر بالأرقام (`45` لا `"45"`) — حسب ما هو محدد بـ `types/product.ts`

---

## ملاحظات بعد التنفيذ

- **المنتجات بصور وهمية حالياً** — الصور ستُستبدل لاحقاً بصور حقيقية (الشخصية أو من stock)
- **اللون الافتراضي رمادي** — نظام الألوان يُحدّد في المرحلة التالية (Design System) بناءً على وصف المستخدم
- **Header حالياً فيه رابط واحد** — يُتوسع عند تصميم الـ Navigation
- **السلة غير مفعّلة** — Zustand store غير مربوط بعد؛ هذا يحدث مع مهمة الـ Cart لاحقاً

---

## ما هو ليس ضمن هذه الخطة

- ❌ تصميم الـ Home page الفعلي (Hero + أقسام) — المرحلة 3 من الـ spec
- ❌ صفحات الأقسام / تفاصيل المنتج — نفس المرحلة
- ❌ نظام الألوان والخطوط المختار — مرحلة Design System
- ❌ الاتصال بـ MongoDB — مرحلة لاحقة (يكفي حالياً بيانات وهمية)
- ❌ المصادقة ولوحة الإدارة — مرحلة لاحقة
- ❌ أي حركات فعلية بـ Framer Motion — يبدأ مع تصميم الواجهات

هذه كلها **متعمّدة** كـ YAGNI. ما نبنيه اليوم يحتاجه فقط ما نبنيه اليوم.
