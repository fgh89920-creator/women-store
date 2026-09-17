import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-tajawal",
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
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
