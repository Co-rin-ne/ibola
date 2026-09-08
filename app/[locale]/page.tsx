'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/constants'

export const dynamic = 'force-dynamic'

const CAROUSEL_IMAGES = [
  '/images/accueil4.JPG',
  '/images/accueil3.jpeg',
  '/images/accueil5.jpg.avif',
]

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1))
  }

  return (
    <div>
      {/* Hero Carousel Section */}
      <section className="relative h-96 sm:h-[500px] overflow-hidden">
        <div className="relative h-full">
          {CAROUSEL_IMAGES.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Carousel ${index + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-brand-green p-2 rounded-full transition"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-brand-green p-2 rounded-full transition"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>

        {/* Center Text Overlay (Optional) */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 bg-black/20">
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            {t('home.title')}
          </h1>
        </div>

        {/* Shop Button - Bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Link
            href={`/${locale}/products/${PRODUCTS[0].slug}`}
            className="inline-block px-8 py-3 bg-white text-brand-green font-bold rounded-lg hover:bg-brand-cream transition"
          >
            {t('home.shop')}
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {t('products.title')}
        </h2>

        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                }}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gabon Section */}
      <section className="bg-brand-cream py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('home.gabon.title')}
          </h2>

          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            {t('about.gabon_description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: '/images/gabon1.png' },
              { image: '/images/gabon2.jpg' },
              { image: '/images/gabon3.jpg.avif'},
            ].map((slot, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden flex items-end justify-center border-2 border-dashed border-white/60 relative"
              >
                <img
                  src={slot.image}
                  className="absolute w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
