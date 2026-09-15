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
