'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Trash2, ChevronLeft } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useCurrency } from '@/hooks/useCurrency'
import { CurrencyToggle } from '@/components/CurrencyToggle'
import { convertEURtoFCFA, formatPrice } from '@/lib/utils'
import { PRODUCTS } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default function CartPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()
  const { cart, removeItem, updateQuantity, total, isLoaded } = useCart()
  const { currency } = useCurrency()

  if (!isLoaded) {
    return <div className="container mx-auto py-12">Loading...</div>
  }

  const totalDisplay = currency === 'EUR' ? total : convertEURtoFCFA(total)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-xl text-gray-600 mb-6">{t('cart.empty')}</p>
        <Link
          href={`/${locale}/products`}
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {t('home.shop')}
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">{t('cart.title')}</h1>
        <CurrencyToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.product_id)
            if (!product) return null

            const name = locale === 'en' ? product.name_en : product.name_fr

            return (
              <div key={`${item.product_id}-${item.size}`} className="flex gap-4 bg-white p-4 rounded-lg border">
                {/* Image */}
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                  </div>

                  {/* Price */}
                  <div className="text-lg font-bold text-green-600">
                    {formatPrice(item.price_eur * item.quantity, currency)}
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.product_id, item.size)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-semibold">{formatPrice(total, currency)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">{t('cart.total')}</span>
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(totalDisplay, currency)}
              </span>
            </div>

            <Link
              href={`/${locale}/checkout`}
              className="block w-full py-3 bg-green-600 text-white font-bold rounded-lg text-center hover:bg-green-700 transition"
            >
              {t('cart.checkout')}
            </Link>

            <Link
              href={`/${locale}/products`}
              className="mt-3 flex items-center justify-center gap-2 text-green-600 hover:text-green-700"
            >
              <ChevronLeft className="w-5 h-5" />
              {locale === 'en' ? 'Continue Shopping' : 'Continuer mes Achats'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
