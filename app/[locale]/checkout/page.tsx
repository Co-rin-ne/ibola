'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useCart } from '@/hooks/useCart'
import { useCurrency } from '@/hooks/useCurrency'
import { convertEURtoFCFA, formatPrice } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default function CheckoutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()
  const router = useRouter()
  const { cart, total, clearCart } = useCart()
  const { currency } = useCurrency()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'France',
  })

  const [paymentMethod, setPaymentMethod] = useState<'card'>('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const totalDisplay = currency === 'EUR' ? total : convertEURtoFCFA(total)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode ||
      !formData.country
    ) {
      alert(locale === 'en' ? 'Please fill all fields' : 'Veuillez remplir tous les champs')
      return
    }

    setIsProcessing(true)

    try {
      // Save the order to Supabase so it can actually be tracked and fulfilled
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.name,
          customer_email: formData.email,
          address: formData.address,
          city: formData.city,
          zip_code: formData.zipCode,
          country: formData.country,
          items: cart,
          total_eur: total,
          total_fcfa: convertEURtoFCFA(total),
          payment_method: paymentMethod,
          status: 'pending',
        })
        .select('id')
        .single()

      if (error) throw error

      const orderId = data.id

      // Send confirmation email
      fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          orderId,
          customerName: formData.name,
          items: cart,
          totalEur: total,
          totalFcfa: convertEURtoFCFA(total),
          locale,
        }),
      }).catch((err) => console.error('Email send error:', err))

      if (paymentMethod === 'card') {
        // Redirect to Stripe's secure hosted checkout page.
        // Card numbers are entered on Stripe's page and never touch this site or its database.
        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            cart,
            locale,
            customerEmail: formData.email,
          }),
        })

        const { url, error: sessionError } = await res.json()

        if (sessionError || !url) throw new Error(sessionError || 'No checkout URL returned')

        clearCart()
        window.location.href = url
        return
      }

      // Cash on delivery: no payment gateway needed, go straight to confirmation
      clearCart()
      router.push(`/${locale}/order/${orderId}?email=${encodeURIComponent(formData.email)}`)
    } catch (error) {
      console.error('Checkout error:', error)
      alert(
        locale === 'en'
          ? 'Error processing order. Please check your connection and try again.'
          : 'Erreur lors du traitement de la commande. Vérifiez votre connexion et réessayez.'
      )
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-xl text-gray-600 mb-6">{t('cart.empty')}</p>
        <Link href={`/${locale}/products`} className="text-brand-green hover:text-brand-green-dark">
          {t('home.shop')}
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border">
            {/* Shipping Info */}
            <h2 className="text-xl font-bold mb-4">{t('checkout.shipping')}</h2>

            <div className="space-y-4 mb-8 pb-8 border-b">
              <div>
                <label className="block text-sm font-semibold mb-2">{t('account.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{t('account.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{locale === 'en' ? 'Address' : 'Adresse'}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">{locale === 'en' ? 'City' : 'Ville'}</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">{locale === 'en' ? 'Zip Code' : 'Code Postal'}</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">{locale === 'en' ? 'Country' : 'Pays'}</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <h2 className="text-xl font-bold mb-4">{t('checkout.payment')}</h2>

            <div className="space-y-3 mb-8">
              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-brand-cream">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card')}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-semibold">
                    {locale === 'en' ? 'Pay by card' : 'Payer par carte'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {locale === 'en'
                      ? 'Secure payment via Stripe. Your card number is never stored on our site.'
                      : 'Paiement sécurisé via Stripe. Ton numéro de carte n\'est jamais stocké sur notre site.'}
                  </p>
                </div>
              </label>

            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-brand-green-dark disabled:opacity-50 transition"
            >
              {isProcessing ? (locale === 'en' ? 'Processing...' : 'Traitement...') : t('checkout.placeOrder')}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-brand-cream p-6 rounded-lg sticky top-4">
            <h2 className="text-xl font-bold mb-4">{locale === 'en' ? 'Order Summary' : 'Résumé Commande'}</h2>

            <div className="space-y-2 mb-6 pb-6 border-b">
              {cart.map((item) => (
                <div key={`${item.product_id}-${item.size}`} className="flex justify-between text-sm">
                  <span>
                    {item.product_id} × {item.quantity} ({item.size})
                  </span>
                  <span className="font-semibold">{formatPrice(item.price_eur * item.quantity, currency)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-semibold">{formatPrice(total, currency)}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">{t('cart.total')}</span>
                <span className="text-2xl font-bold text-brand-green">
                  {formatPrice(totalDisplay, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
