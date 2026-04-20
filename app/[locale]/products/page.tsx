'use client'

import { useTranslations } from 'next-intl'
import { ProductCard } from '@/components/ProductCard'
import { CurrencyToggle } from '@/components/CurrencyToggle'
import { PRODUCTS } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  return (
    <div className="container mx-auto py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
        <h1 className="text-4xl font-bold">
          {t('products.title')}
        </h1>
        <CurrencyToggle />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              price_eur: 25,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }}
            locale={locale}
          />
        ))}
      </div>
    </div>
  )
}
