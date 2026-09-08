'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { CheckCircle, Loader2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function OrderConfirmationPage({
  params: { locale, id },
  searchParams: { email, session_id },
}: {
  params: { locale: string; id: string }
  searchParams: { email?: string; session_id?: string }
}) {
  const t = useTranslations()
  const [paymentStatus, setPaymentStatus] = useState<'checking' | 'paid' | 'cash' | 'error'>(
    session_id ? 'checking' : 'cash'
  )

  useEffect(() => {
    if (!session_id) return

    fetch('/api/confirm-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session_id }),
    })
      .then((res) => res.json())
      .then((data) => setPaymentStatus(data.paid ? 'paid' : 'error'))
      .catch(() => setPaymentStatus('error'))
  }, [session_id])

  if (paymentStatus === 'checking') {
    return (
      <div className="container mx-auto py-24 text-center">
        <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-brand-green" />
        <p className="text-gray-600">
          {locale === 'en' ? 'Confirming your payment...' : 'Confirmation du paiement...'}
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-6" />

        <h1 className="text-4xl font-bold mb-4">
          {locale === 'en' ? 'Order Confirmed!' : 'Commande Confirmée!'}
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          {locale === 'en'
            ? 'Thank you for your order. We have received your order and will process it shortly.'
            : 'Merci pour votre commande. Nous l\'avons reçue et la traiterons bientôt.'}
        </p>

        <div className="bg-brand-cream p-6 rounded-lg mb-8">
          <p className="text-sm text-gray-600 mb-2">{locale === 'en' ? 'Order ID' : 'Numéro de Commande'}</p>
          <p className="text-2xl font-bold text-brand-green">{id}</p>

          {email && (
            <>
              <p className="text-sm text-gray-600 mt-4 mb-2">{locale === 'en' ? 'Confirmation Email' : 'E-mail de Confirmation'}</p>
              <p className="text-sm font-semibold text-gray-700">{email}</p>
            </>
          )}

          {paymentStatus === 'paid' && (
            <p className="text-sm font-semibold text-brand-green-dark mt-4">
              {locale === 'en' ? 'Payment received.' : 'Paiement reçu.'}
            </p>
          )}

          {paymentStatus === 'error' && (
            <p className="text-sm font-semibold text-red-600 mt-4">
              {locale === 'en'
                ? 'We could not confirm your payment automatically — we will verify manually and contact you.'
                : "Nous n'avons pas pu confirmer automatiquement le paiement — nous vérifions manuellement et te contacterons."}
            </p>
          )}

          <p className="text-sm text-gray-600 mt-6">
            {locale === 'en'
              ? 'We have received your order and will contact you shortly to confirm delivery details.'
              : 'Nous avons bien reçu votre commande et vous contacterons prochainement pour confirmer les détails de livraison.'}
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href={`/${locale}/products`}
            className="block px-8 py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-brand-green-dark transition"
          >
            {t('home.shop')}
          </Link>

          <Link
            href={`/${locale}/account`}
            className="block px-8 py-3 border-2 border-brand-green text-brand-green font-bold rounded-lg hover:bg-brand-cream transition"
          >
            {locale === 'en' ? 'View My Account' : 'Voir Mon Compte'}
          </Link>
        </div>
      </div>
    </div>
  )
}
