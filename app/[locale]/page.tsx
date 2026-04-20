'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 sm:h-[500px] overflow-hidden bg-gradient-to-br from-yellow-300 via-yellow-200 to-green-300">
        <div className="absolute inset-0">
          {/* You can replace this with cover.jpeg */}
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-green-600 opacity-80" />
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
              {t('home.title')}
            </h1>
            <p className="text-lg sm:text-2xl text-white mb-8">
              {t('home.tagline')}
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-block px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              {t('home.shop')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {t('products.title')}
        </h2>

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
      </section>

      {/* Gabon Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('home.gabon.title')}
          </h2>

          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            {t('about.gabon_description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-yellow-200 to-green-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
              >
                <div className="text-center">
                  <p className="text-gray-600 font-semibold">
                    {t('home.gabon.placeholder1')}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">(600x600px recommended)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('home.explore')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('home.tagline')}
          </p>
          <Link
            href={`/${locale}/products`}
            className="inline-block px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            {t('home.shop')}
          </Link>
        </div>
      </section>
    </div>
  )
}
