Modern e-commerce platform for IBOLA, a Gabon-inspired fashion brand.

## Features

- ✨ Bilingual support (English & French)
- 🛍️ Product catalog with image gallery
- 🛒 Shopping cart with local storage
- 💳 Checkout with multiple payment options
- 👤 User accounts (coming soon)
- 🎁 Loyalty points system
- 💱 Currency conversion (EUR ↔ FCFA)
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Internationalization**: next-intl
- **Database**: Supabase PostgreSQL (setup required)
- **Authentication**: Supabase Auth (coming soon)
- **Payment**: PayPal integration (coming soon)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Create a Supabase account and project:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your Project URL and Anon Key
   
   Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── [locale]/            # Localized routes (en, fr)
│   │   ├── page.tsx         # Home page
│   │   ├── products/        # Products listing & detail
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   ├── account/         # User account (coming soon)
│   │   ├── about/           # About page
│   │   └── order/           # Order confirmation
│   └── layout.tsx           # Root layout
├── components/              # Reusable React components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions & constants
├── types/                   # TypeScript type definitions
├── messages/                # i18n translation files
├── public/                  # Static assets (images, etc.)
└── i18n/                    # i18n configuration
```

## Configuration & Customization

### Adding/Editing Products

Edit `lib/constants.ts` to modify products:

```typescript
export const PRODUCTS = [
  {
    id: 'product-id',
    slug: 'product-slug',
    name_en: 'English Name',
    name_fr: 'French Name',
    color: 'yellow' | 'green',
    sizes: ['XS', 'S', 'M'],
    images: ['/images/products/image1.jpg', ...],
    description_en: '...',
    description_fr: '...',
  }
]
```

### Editing Translations

Update `messages/en.json` and `messages/fr.json` to change text content.

### Customizing Styles

Tailwind CSS is configured in `tailwind.config.ts`. Modify colors, fonts, and theme there.

### Currency Conversion

Default rate: 1 EUR = 655 FCFA (can be adjusted in `lib/constants.ts`):

```typescript
export const EUR_TO_FCFA = 655
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

## Features Coming Soon

- User authentication & accounts
- PayPal payment integration
- Email order confirmations
- Admin panel for product management
- Order tracking
- Loyalty points redemption

## Support

For issues or feature requests, please contact the development team.

## License

© 2026 IBOLA. All rights reserved.
>>>>>>> 94fe646 (Initial commit - IBOLA ecommerce site)
