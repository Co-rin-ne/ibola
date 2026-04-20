export const EUR_TO_FCFA = 655
export const BASE_PRICE_EUR = 25

export const SIZES = ['XS', 'S', 'M']

export const PRODUCTS = [
  {
    id: 'yellow-tash',
    slug: 'yellow-tash',
    name_en: 'Yellow Tash',
    name_fr: 'Tash Jaune',
    color: 'yellow' as const,
    sizes: SIZES,
    images: ['/images/products/jaune1.JPG', '/images/products/jaune2.JPG', '/images/products/jaune3.JPG'],
    description_en: 'Vibrant yellow inspired by the golden sun of Gabon. Premium quality cotton blend for comfort and durability.',
    description_fr: 'Jaune vibrant inspiré par le soleil doré du Gabon. Mélange de coton de haute qualité pour le confort et la durabilité.'
  },
  {
    id: 'green-tash',
    slug: 'green-tash',
    name_en: 'Green Tash',
    name_fr: 'Tash Vert',
    color: 'green' as const,
    sizes: SIZES,
    images: ['/images/products/vert1.JPG', '/images/products/vert2.JPG', '/images/products/vert3.JPG'],
    description_en: 'Rich green representing the lush forests of Gabon. Sustainable and eco-friendly materials.',
    description_fr: 'Vert riche représentant les forêts luxuriantes du Gabon. Matériaux durables et écologiques.'
  }
]

export const LOYALTY_POINTS_PER_EUR = 1
export const FCFA_PER_POINT = 0.10

export const FOOTER_LINKS = [
  { key: 'terms', path: '#terms' },
  { key: 'conditions', path: '#conditions' },
  { key: 'privacy', path: '#privacy' },
  { key: 'cookies', path: '#cookies' },
  { key: 'legal', path: '#legal' },
  { key: 'manageCookies', path: '#manage-cookies' },
]
