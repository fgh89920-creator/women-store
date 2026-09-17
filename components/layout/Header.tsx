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