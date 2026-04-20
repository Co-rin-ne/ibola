# IBOLA - Plateforme E-Commerce

Plateforme e-commerce moderne pour IBOLA, une marque de mode inspirée du Gabon.

## Fonctionnalités

- ✨ Support bilingue (Anglais & Français)
- 🛍️ Catalogue de produits avec galerie d'images
- 🛒 Panier avec stockage local
- 💳 Commande avec plusieurs options de paiement
- 👤 Comptes utilisateurs (bientôt disponible)
- 🎁 Système de points de fidélité
- 💱 Conversion de devises (EUR ↔ FCFA)
- 📱 Design complètement responsive

## Stack Technologique

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Internationalisation**: next-intl
- **Base de données**: Supabase PostgreSQL (configuration requise)
- **Authentification**: Supabase Auth (bientôt disponible)
- **Paiement**: Intégration PayPal (bientôt disponible)
- **Hébergement**: Vercel

## Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase (tier gratuit disponible)

### Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   
   Créer un compte Supabase et un projet:
   - Aller sur [supabase.com](https://supabase.com)
   - Créer un nouveau projet
   - Copier votre URL de Projet et votre Clé Anon
   
   Mettre à jour `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=votre-url-projet
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

   Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du Projet

```
├── app/                      # Répertoire app Next.js
│   ├── [locale]/            # Routes localisées (en, fr)
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── products/        # Liste et détail des produits
│   │   ├── cart/            # Panier d'achat
│   │   ├── checkout/        # Flux de commande
│   │   ├── account/         # Compte utilisateur (bientôt)
│   │   ├── about/           # Page À propos
│   │   └── order/           # Confirmation de commande
│   └── layout.tsx           # Layout racine
├── components/              # Composants React réutilisables
├── hooks/                   # Hooks React personnalisés
├── lib/                     # Fonctions utilitaires et constantes
├── types/                   # Définitions de types TypeScript
├── messages/                # Fichiers de traduction i18n
├── public/                  # Ressources statiques (images, etc.)
└── i18n/                    # Configuration i18n
```

## Configuration et Personnalisation

### Ajouter/Modifier les Produits

Modifier `lib/constants.ts` pour modifier les produits:

```typescript
export const PRODUCTS = [
  {
    id: 'id-produit',
    slug: 'slug-produit',
    name_en: 'Nom Anglais',
    name_fr: 'Nom Français',
    color: 'yellow' | 'green',
    sizes: ['XS', 'S', 'M'],
    images: ['/images/products/image1.jpg', ...],
    description_en: '...',
    description_fr: '...',
  }
]
```

### Modifier les Traductions

Mettre à jour `messages/en.json` et `messages/fr.json` pour changer le contenu texte.

### Personnaliser les Styles

Tailwind CSS est configuré dans `tailwind.config.ts`. Modifier les couleurs, polices et thème là-bas.

### Conversion de Devises

Taux par défaut: 1 EUR = 655 FCFA (peut être ajusté dans `lib/constants.ts`):

```typescript
export const EUR_TO_FCFA = 655
```

## Déploiement

### Déployer sur Vercel

1. **Pousser vers GitHub**
   ```bash
   git init
   git add .
   git commit -m "Commit initial"
   ```

2. **Connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "New Project"
   - Sélectionner votre dépôt GitHub
   - Ajouter les variables d'environnement:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Cliquer sur "Deploy"

## Fonctionnalités à Venir

- Authentification utilisateur et comptes
- Intégration de paiement PayPal
- Confirmations de commande par email
- Panneau d'administration pour la gestion des produits
- Suivi des commandes
- Rachat de points de fidélité

## Support

Pour les problèmes ou les demandes de fonctionnalités, veuillez contacter l'équipe de développement.

## Licence

© 2026 IBOLA. Tous droits réservés.
