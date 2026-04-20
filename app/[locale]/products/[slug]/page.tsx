'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft } from 'lucide-react'
import { CurrencyToggle } from '@/components/CurrencyToggle'
import { useCart } from '@/hooks/useCart'
import { useCurrency } from '@/hooks/useCurrency'
import { convertEURtoFCFA, formatPrice } from '@/lib/utils'
import { PRODUCTS, SIZES } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default function ProductPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const t = useTranslations()
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { addItem } = useCart()
  const { currency } = useCurrency()

  if (!product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-xl text-gray-600">{t('products.title')} not found</p>
      </div>
    )
  }

  const price = currency === 'EUR' ? 25 : convertEURtoFCFA(25)
  const name = locale === 'en' ? product.name_en : product.name_fr
  const description = locale === 'en' ? product.description_en : product.description_fr

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(locale === 'en' ? 'Please select a size' : 'Veuillez sélectionner une taille')
      return
    }

    addItem(product.id, selectedSize, 25, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container mx-auto py-12">
      {/* Back Button */}
      <Link
        href={`/${locale}/products`}
        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8"
      >
        <ChevronLeft className="w-5 h-5" />
        {locale === 'en' ? 'Back to Products' : 'Retour aux Produits'}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            {product.images[currentImageIndex] && (
              <Image
                src={product.images[currentImageIndex]}
                alt={name}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                  currentImageIndex === idx ? 'border-green-600' : 'border-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{name}</h1>

          <div className="text-lg text-gray-700 mb-6">
            {description}
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-green-600">
              {formatPrice(price, currency)}
            </span>
            <CurrencyToggle />
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <label className="block font-semibold mb-3">
              {t('product.sizes')}
            </label>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 rounded-lg font-semibold border-2 transition ${
                    selectedSize === size
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block font-semibold mb-3">
              {t('product.qty')}
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                −
              </button>
              <span className="font-semibold text-lg w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-lg font-bold text-white text-lg transition ${
              added
                ? 'bg-green-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {added ? (locale === 'en' ? '✓ Added to Cart' : '✓ Ajouté au Panier') : t('product.addToCart')}
          </button>

          {/* Available Sizes Info */}
          <p className="text-sm text-gray-500 mt-6">
            {t('products.available_sizes')}: {product.sizes ? product.sizes.join(', ') : SIZES.join(', ')}
          </p>
        </div>
      </div>
    </div>
  )
}
