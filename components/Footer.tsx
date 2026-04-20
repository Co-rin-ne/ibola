'use client'

import { useTranslations } from 'next-intl'
import { FOOTER_LINKS } from '@/lib/constants'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.path}
              className="text-sm text-gray-700 hover:text-green-600 transition"
            >
              {t(link.key as keyof typeof t)}
            </a>
          ))}
        </div>

        <div className="border-t pt-8 text-center">
          <p className="text-sm text-gray-600">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
