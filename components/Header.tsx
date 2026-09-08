'use client'

import Image from 'next/image'
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

  // French is the default locale and has no URL prefix (e.g. /about).
  // English is the only locale that needs a prefix (e.g. /en/about).
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const locale = isEn ? 'en' : 'fr'

  const toggleLanguage = () => {
    if (isEn) {
      // Switch to French: strip the /en prefix
      const newPath = pathname.replace(/^\/en(\/|$)/, '/')
      router.push(newPath || '/')
    } else {
      // Switch to English: add the /en prefix (avoid a double slash on the homepage)
      router.push(pathname === '/' ? '/en' : `/en${pathname}`)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="relative w-20 h-20">
            <Image
              src="/images/logo-cropped.png"
              alt="Ibola Vibes"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={`/${locale}/products`} className="text-gray-700 hover:text-brand-green transition">
            {t('header.products')}
          </Link>
          <Link href={`/${locale}/about`} className="text-gray-700 hover:text-brand-green transition">
            {t('header.about')}
          </Link>
          <Link href={`/${locale}/account`} className="text-gray-700 hover:text-brand-green transition">
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
            <Link href={`/${locale}/products`} className="text-gray-700 hover:text-brand-green transition">
              {t('header.products')}
            </Link>
            <Link href={`/${locale}/about`} className="text-gray-700 hover:text-brand-green transition">
              {t('header.about')}
            </Link>
            <Link href={`/${locale}/account`} className="text-gray-700 hover:text-brand-green transition">
              {t('header.account')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
