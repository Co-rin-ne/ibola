'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Page non trouvée</p>
      <Link href="/" className="px-6 py-3 bg-green-600 text-white rounded-lg">
        Retour à l'accueil
      </Link>
    </div>
  )
}
