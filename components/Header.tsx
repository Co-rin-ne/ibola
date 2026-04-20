'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export function Header() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount, isLoaded } = useCart()

  const isEn = pathname.startsWith('/en') || (!pathname.startsWith('/fr') && !pathname.includes('fr-'))
  const locale = isEn ? 'en' : 'fr'

  const toggleLanguage = () => {
    const newPath = pathname.replace(`/${locale}`, `/${isEn ? 'fr' : 'en'}`)
    router.push(newPath || `/${isEn ? 'fr' : 'en'}`)
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">IB</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">IBOLA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={`/${locale}/products`} className="text-gray-700 hover:text-green-600 transition">
            {t('header.products')}
          </Link>
          <Link href={`/${locale}/about`} className="text-gray-700 hover:text-green-600 transition">
            {t('header.about')}
          </Link>
          <Link href={`/${locale}/account`} className="text-gray-700 hover:text-green-600 transition">
            {t('header.account')}
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {isEn ? 'FR' : 'EN'}
          </button>

          {/* Cart */}
          <Link
            href={`/${locale}/cart`}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {isLoaded && itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href={`/${locale}/products`} className="text-gray-700 hover:text-green-600 transition">
              {t('header.products')}
            </Link>
            <Link href={`/${locale}/about`} className="text-gray-700 hover:text-green-600 transition">
              {t('header.about')}
            </Link>
            <Link href={`/${locale}/account`} className="text-gray-700 hover:text-green-600 transition">
              {t('header.account')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
