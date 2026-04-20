'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const dynamic = 'force-dynamic'

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-lg opacity-90">{t('home.tagline')}</p>
        </div>
      </section>

      {/* About Text */}
      <section className="container mx-auto py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t('about.text')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('about.gabon_description')}
          </p>
        </div>
      </section>

      {/* Gabon Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('home.gabon.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

          <div className="text-center">
            <Link
              href={`/${locale}/products`}
              className="inline-block px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            >
              {t('home.shop')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
