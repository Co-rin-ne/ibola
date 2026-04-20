'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default function AccountPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()
  const { user, isLoading } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (isLoading) {
    return <div className="container mx-auto py-12">Loading...</div>
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">{t('account.login')}</h1>

          <p className="text-gray-700 mb-8">
            {locale === 'en'
              ? 'Create an account or login to track your orders and manage your loyalty points.'
              : 'Créez un compte ou connectez-vous pour suivre vos commandes et gérer vos points de fidélité.'}
          </p>

          <div className="space-y-4">
            <button className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition">
              {t('account.login')}
            </button>

            <button className="w-full py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition">
              {t('account.signup')}
            </button>

            <p className="text-sm text-gray-600 pt-4">
              {locale === 'en'
                ? 'Authentication coming soon. For now, continue shopping.'
                : 'L\'authentification arrive bientôt. Pour l\'instant, continuez vos achats.'}
            </p>

            <Link
              href={`/${locale}/products`}
              className="block text-green-600 hover:text-green-700 font-semibold"
            >
              {t('home.shop')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('account.myOrders')}</h1>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-green-400 p-6 rounded-lg text-white">
            <p className="text-sm opacity-90">{t('account.loyaltyPoints')}</p>
            <p className="text-3xl font-bold">{user.loyalty_points || 0}</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-lg text-white">
            <p className="text-sm opacity-90">{locale === 'en' ? 'Member Since' : 'Membre depuis'}</p>
            <p className="text-xl font-bold">{new Date(user.created_at).getFullYear()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{locale === 'en' ? 'Your Orders' : 'Vos Commandes'}</h2>
          <p className="text-gray-600">
            {locale === 'en'
              ? 'No orders yet. Start shopping to earn loyalty points!'
              : 'Aucune commande pour le moment. Commencez vos achats pour gagner des points de fidélité!'}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-6 py-3 border-2 border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-50 transition"
        >
          {t('account.logout')}
        </button>
      </div>
    </div>
  )
}
