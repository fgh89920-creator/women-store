import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-black text-pink-blush-800">
        أهلاً بكِ في متجر أناقة
      </h1>
      <p className="mt-4 text-lg text-neutral-600">
        متجر نسائي متخصص بالمكياج، العناية بالبشرة، الإكسسوارات والملابس.
      </p>

      {/* Demo: Buttons */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-pink-blush-700 mb-4">الأزرار</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">أضيفي للسلة</Button>
          <Button variant="secondary">تصفحي المنتجات</Button>
          <Button variant="ghost">المفضلة</Button>
        </div>
      </div>

      {/* Demo: Card */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-pink-blush-700 mb-4">
          بطاقة منتج
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card interactive>
            <div className="aspect-square bg-pink-blush-100 flex items-center justify-center">
              <span className="text-pink-blush-700">صورة المنتج</span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-pink-blush-800">
                طقم فرش مكياج
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                طقم احترافي 12 قطعة
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-black text-pink-blush-600">
                  120 ر.س
                </span>
                <Button variant="primary" size="sm">
                  أضيفي
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Demo: Input */}
      <div className="mt-12 max-w-md">
        <h2 className="text-2xl font-bold text-pink-blush-700 mb-4">
          حقل الإدخال
        </h2>
        <Input label="البريد الإلكتروني" type="email" placeholder="name@example.com" />
      </div>
    </section>
  )
}
