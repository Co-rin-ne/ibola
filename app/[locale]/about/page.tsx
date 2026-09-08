'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const dynamic = 'force-dynamic'

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  return (
    <div>
      {/* Hero */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden h-64 md:h-96">
        <img
          src="images/ban.propos4.png"
          alt="IBOLA Banner"
          className="w-full h-full object-contain"
        />
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
              { gradient: 'from-brand-green to-brand-blue', label: locale === 'en' ? 'Culture & heritage' : 'Culture & héritage' },
              { gradient: 'from-brand-yellow to-brand-heliconia', label: locale === 'en' ? 'Nature & wildlife' : 'Nature & faune' },
              { gradient: 'from-brand-heliconia to-brand-green', label: locale === 'en' ? 'Libreville & beyond' : 'Libreville & environs' },
            ].map((slot, i) => (
              <div
                key={i}
                className={`aspect-square bg-gradient-to-br ${slot.gradient} rounded-lg flex items-center justify-center border-2 border-dashed border-white/60`}
              >
                <div className="text-center px-4">
                  <p className="text-white font-semibold drop-shadow">
                    {slot.label}
                  </p>
                  <p className="text-sm text-white/80 mt-2">
                    {locale === 'en' ? 'Add your photo (600x600px)' : 'Ajoute ta photo (600x600px)'}
                  </p>
                </div>
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
