'use client'

import { BUSINESS_INFO } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default function CGVPage({ params: { locale } }: { params: { locale: string } }) {
  const isFr = locale === 'fr'

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto prose">
        <h1 className="text-3xl font-bold mb-8">
          {isFr ? 'Conditions Générales de Vente' : 'Terms & Conditions of Sale'}
        </h1>

        {!isFr && (
          <p className="text-sm text-gray-600 mb-8 italic">
            These terms are provided primarily in French, as the legally binding version under
            French law. Contact {BUSINESS_INFO.email} for questions in English.
          </p>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">1. Objet</h2>
          <p className="text-gray-700">
            Les présentes CGV régissent les ventes de produits réalisées sur le site IBOLA par{' '}
            {BUSINESS_INFO.name}, SIRET {BUSINESS_INFO.siret}, entre le vendeur et tout client
            (le &quot;Client&quot;).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">2. Produits et prix</h2>
          <p className="text-gray-700">
            Les produits proposés à la vente sont décrits sur le site avec leurs caractéristiques
            essentielles. Les prix sont indiqués en euros, toutes taxes comprises (TTC), avec
            conversion indicative en FCFA. Le vendeur se réserve le droit de modifier ses prix à
            tout moment, les produits étant facturés sur la base des tarifs en vigueur au moment
            de la commande.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">3. Commande</h2>
          <p className="text-gray-700">
            Toute commande passée sur le site implique l&apos;acceptation pleine et entière des
            présentes CGV. Un récapitulatif de la commande (produits, prix, total) est affiché
            avant validation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">4. Paiement</h2>
          <p className="text-gray-700">
            Le paiement s&apos;effectue selon la méthode choisie au moment de la commande
            (paiement à la livraison actuellement ; le paiement en ligne sera ajouté
            prochainement).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">5. Livraison</h2>
          <p className="text-gray-700">
            Les produits sont livrés à l&apos;adresse indiquée par le Client lors de la commande.
            Le vendeur ne saurait être tenu responsable des retards imputables au transporteur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">6. Droit de rétractation</h2>
          <p className="text-gray-700 mb-3">
            Conformément au Code de la consommation, le Client dispose d&apos;un délai de{' '}
            <strong>14 jours francs</strong> à compter de la réception du produit pour exercer
            son droit de rétractation, sans avoir à justifier de motif ni à payer de pénalités.
          </p>
          <p className="text-gray-700">
            Pour exercer ce droit, le Client doit notifier sa décision de manière non équivoque,
            par email à {BUSINESS_INFO.email}. Les frais de retour sont à la charge du Client,
            sauf mention contraire. Le remboursement intervient dans un délai de 14 jours à
            compter de la réception du produit retourné.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">7. Garanties</h2>
          <p className="text-gray-700">
            Les produits vendus bénéficient de la garantie légale de conformité et de la garantie
            contre les vices cachés, conformément aux articles du Code civil et du Code de la
            consommation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">8. Droit applicable et litiges</h2>
          <p className="text-gray-700">
            Les présentes CGV sont soumises au droit français. En cas de litige, une solution
            amiable sera recherchée avant toute action judiciaire.
          </p>
        </section>
      </div>
    </div>
  )
}
