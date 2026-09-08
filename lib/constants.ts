export const EUR_TO_FCFA = 655
export const BASE_PRICE_EUR = 25

export const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export const PRODUCTS = [
  // Retiré temporairement de la vente — conservé en commentaire pour le réactiver facilement.
  // {
  //   id: 'yellow-tash',
  //   slug: 'yellow-tash',
  //   name_en: 'Yellow Tash',
  //   name_fr: 'Tash Jaune',
  //   color: 'yellow' as const,
  //   sizes: SIZES,
  //   images: ['/images/products/jaune1.JPG', '/images/products/jaune2.JPG', '/images/products/jaune3.JPG'],
  //   description_en: 'Vibrant yellow inspired by the golden sun of Gabon. Premium quality cotton blend for comfort and durability.',
  //   description_fr: 'Jaune vibrant inspiré par le soleil doré du Gabon. Mélange de coton de haute qualité pour le confort et la durabilité.'
  // },
  {
    id: '17-aout',
    slug: '17-aout',
    name_en: 'August 17',
    name_fr: '17 Août',
    color: 'green' as const,
    sizes: SIZES,
    images: ['/images/products/vert1.PNG', '/images/products/vert2.jpeg', '/images/products/vert3.jpeg'],
    description_en: 'Rich green representing the lush forests of Gabon. Sustainable and eco-friendly materials.',
    description_fr: 'Vert riche représentant les forêts luxuriantes du Gabon. Matériaux durables et écologiques.',
    price_eur: 32,
    price_fcfa: 22000
  }
]

export const LOYALTY_POINTS_PER_EUR = 1
export const FCFA_PER_POINT = 0.10

export const FOOTER_LINKS = [
  { key: 'terms', path: '/cgv' },
  { key: 'conditions', path: '/cgv' },
  { key: 'privacy', path: '/legal' },
  { key: 'cookies', path: '/legal' },
  { key: 'legal', path: '/legal' },
  { key: 'manageCookies', path: '/legal' },
]

// À compléter dès réception de ton SIRET (démarche gratuite sur formalites.entreprises.gouv.fr).
// Utilisé sur les pages /legal et /cgv.
export const BUSINESS_INFO = {
  name: 'HURTAUX Corinne',
  status: 'Entrepreneur Individuel (EI) — micro-entrepreneur',
  siret: '92936365300015',
  address: 'Boulevard Carnot',
  email: 'ibolavibes@icloud.com',
}
