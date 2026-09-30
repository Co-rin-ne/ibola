'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const dynamic = 'force-dynamic'

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  return (
    <div>
      {/* Hero */}
      <section className="w-full">
        <div className="w-full aspect-[1920/566]">
          <img
            src="images/apropos1.svg"
            alt="IBOLA About"
            className="w-full h-full object-contain"
          />
        </div>
      </section>


      {/* About Text */}
      <section className="container mx-auto py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t('about.text')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t('about.text2')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t('about.text3')}
          </p>
        </div>
      </section>

      {/* Gabon Section */}
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('home.gabon.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { image: '/images/gabon1.png' },
              { image: '/images/gabon2.jpg' },
              { image: '/images/gabon3.jpg.avif' },
            ].map((slot, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden flex items-end justify-center border-2 border-dashed border-white/60 relative"
              >
                <img
                  src={slot.image}
                  alt="Gabon"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`/${locale}/products`}
              className="inline-block px-8 py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-brand-green-dark transition"
            >
              {t('home.shop')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
