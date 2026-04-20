'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function OrderConfirmationPage({
  params: { locale, id },
  searchParams: { email },
}: {
  params: { locale: string; id: string }
  searchParams: { email?: string }
}) {
  const t = useTranslations()

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />

        <h1 className="text-4xl font-bold mb-4">
          {locale === 'en' ? 'Order Confirmed!' : 'Commande Confirmée!'}
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          {locale === 'en'
            ? 'Thank you for your order. We have received your order and will process it shortly.'
            : 'Merci pour votre commande. Nous l\'avons reçue et la traiterons bientôt.'}
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-sm text-gray-600 mb-2">{locale === 'en' ? 'Order ID' : 'Numéro de Commande'}</p>
          <p className="text-2xl font-bold text-green-600">{id}</p>

          {email && (
            <>
              <p className="text-sm text-gray-600 mt-4 mb-2">{locale === 'en' ? 'Confirmation Email' : 'E-mail de Confirmation'}</p>
              <p className="text-sm font-semibold text-gray-700">{email}</p>
            </>
          )}

          <p className="text-sm text-gray-600 mt-6">
            {locale === 'en'
              ? 'A confirmation email has been sent. Payment is due upon delivery.'
              : 'Un e-mail de confirmation a été envoyé. Le paiement sera effectué à la livraison.'}
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href={`/${locale}/products`}
            className="block px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
          >
            {t('home.shop')}
          </Link>

          <Link
            href={`/${locale}/account`}
            className="block px-8 py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition"
          >
            {locale === 'en' ? 'View My Account' : 'Voir Mon Compte'}
          </Link>
        </div>
      </div>
    </div>
  )
}
