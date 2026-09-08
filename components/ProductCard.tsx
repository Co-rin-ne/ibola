'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCurrency } from '@/hooks/useCurrency'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  locale: string
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const { currency } = useCurrency()

  const price = currency === 'EUR' ? product.price_eur : product.price_fcfa
  const name = locale === 'en' ? product.name_en : product.name_fr

  return (
    <Link href={`/${locale}/products/${product.id}`}>
      <div className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-brand-cream">
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-brand-green transition">
            {name}
          </h3>

          <div className="text-sm text-gray-600 mb-3 line-clamp-2">
            {locale === 'en' ? product.description_en : product.description_fr}
          </div>

          {/* Price and Sizes */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-brand-green">
              {formatPrice(price, currency)}
            </span>
            <span className="text-sm text-gray-500">
              {product.sizes.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
