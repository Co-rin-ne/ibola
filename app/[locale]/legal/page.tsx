'use client'

import { BUSINESS_INFO } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default function LegalPage({ params: { locale } }: { params: { locale: string } }) {
  const isFr = locale === 'fr'

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto prose">
        <h1 className="text-3xl font-bold mb-8">
          {isFr ? 'Mentions légales & Confidentialité' : 'Legal Notice & Privacy'}
        </h1>

        {!isFr && (
          <p className="text-sm text-gray-600 mb-8 italic">
            This page is provided primarily in French, as it reflects French legal requirements.
            Contact us at {BUSINESS_INFO.email} for questions in English.
          </p>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Éditeur du site</h2>
          <ul className="text-gray-700 space-y-1">
            <li><strong>Nom / Raison sociale :</strong> {BUSINESS_INFO.name}</li>
            <li><strong>Statut :</strong> {BUSINESS_INFO.status}</li>
            <li><strong>SIRET :</strong> {BUSINESS_INFO.siret}</li>
            <li><strong>Adresse :</strong> {BUSINESS_INFO.address}</li>
            <li><strong>Contact :</strong> {BUSINESS_INFO.email}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Hébergement</h2>
          <p className="text-gray-700">
            Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
            (vercel.com), avec une base de données fournie par Supabase Inc.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Propriété intellectuelle</h2>
          <p className="text-gray-700">
            L&apos;ensemble des contenus présents sur ce site (textes, images, logo) est la
            propriété exclusive d&apos;IBOLA, sauf mention contraire. Toute reproduction, même
            partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Données personnelles</h2>
          <p className="text-gray-700 mb-3">
            Les données personnelles collectées lors d&apos;une commande (nom, email, adresse de
            livraison) sont utilisées uniquement pour traiter et livrer ta commande. Elles ne
            sont jamais revendues à des tiers.
          </p>
          <p className="text-gray-700">
            Conformément au RGPD, tu disposes d&apos;un droit d&apos;accès, de rectification et de
            suppression de tes données, en écrivant à {BUSINESS_INFO.email}.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Cookies</h2>
          <p className="text-gray-700">
            Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement
            (panier d&apos;achat, préférence de langue et de devise). Aucun cookie publicitaire
            ou de suivi tiers n&apos;est utilisé pour le moment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Litiges</h2>
          <p className="text-gray-700">
            En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les
            tribunaux français seront compétents.
          </p>
        </section>
      </div>
    </div>
  )
}
