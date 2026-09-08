# IBOLA Vibes — Notes de passation (session Cowork du 19-25 août 2026)

Ce fichier résume l'état du projet et les décisions prises pendant une session de travail avec Claude (Cowork), pour reprendre le développement dans Claude Code sans perdre le contexte. La propriétaire du projet est Marie-Claude (marque "Ibola Vibes" / "IBOLA", mode inspirée du Gabon).

## Contexte général

Le site existait déjà (scaffold Next.js) avant cette session, mais plusieurs fonctionnalités étaient factices ou cassées (paiement non fonctionnel, commandes non enregistrées, bugs de routing i18n). Cette session a corrigé ces problèmes et démarré la préparation au lancement. Un plan initial "site WordPress + admin séparé" a été abandonné une fois ce projet Next.js redécouvert dans le dossier connecté — ne pas revenir dessus sauf si Marie-Claude le demande explicitement.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- next-intl pour l'i18n (fr/en)
- Supabase (base de données Postgres) — un projet existe déjà, credentials dans `.env.local`
- Stripe Checkout pour le paiement carte (redirection vers page Stripe hébergée, aucune donnée bancaire ne transite par le site)
- Déploiement prévu sur Vercel

## Décisions produit importantes

- **Un seul produit en vente actuellement** : `17-aout` (nom affiché "17 Août" / "August 17"), dans `lib/constants.ts` → `PRODUCTS`. Anciennement nommé "Tash Vert"/"green-tash", renommé à la demande de Marie-Claude.
- Un deuxième produit ("Yellow Tash"/"Tash Jaune") existe **en commentaire** dans `lib/constants.ts` — retiré de la vente, facile à réactiver en décommentant.
- Tailles disponibles : `SIZES = ['XS', 'S', 'M', 'L', 'XL']`.
- Marie-Claude devait ajouter des photos supplémentaires dans `public/images/products/` — vérifier si c'est fait et les intégrer au produit si besoin (actuellement `vert1.JPG`, `vert2.JPG`, `vert3.JPG`).

## Paiement (Stripe)

- `lib/stripe.ts` : client serveur, nécessite `STRIPE_SECRET_KEY` dans les variables d'environnement.
- `app/api/create-checkout-session/route.ts` : crée une session Stripe Checkout à partir du panier (prix calculés à la volée, pas de catalogue Stripe pré-créé nécessaire).
- `app/api/confirm-payment/route.ts` : vérifie côté serveur qu'une session Stripe est bien payée, puis marque la commande `paid` dans Supabase via `lib/supabase-admin.ts` (nécessite `SUPABASE_SERVICE_ROLE_KEY`).
- Mode de paiement "cash" (paiement à la livraison) toujours disponible en option dans le checkout.
- **À vérifier** : Marie-Claude était en train de créer son compte Stripe et de récupérer sa clé secrète au moment de la fin de session — vérifier si `STRIPE_SECRET_KEY` et `SUPABASE_SERVICE_ROLE_KEY` sont bien renseignés dans `.env.local` avant de considérer le paiement carte comme opérationnel.
- Le SDK PayPal (`@paypal/checkout-server-sdk`) est présent dans `package.json` mais **non utilisé** — reliquat du scaffold d'origine, ignorer sauf demande explicite.

## Commandes (Supabase)

- Table `orders` à créer via le fichier `supabase-orders-table.sql` (fourni dans les livrables Cowork, pas dans le repo — à recréer si besoin, structure : `id, created_at, customer_name, customer_email, address, city, zip_code, country, items (jsonb), total_eur, total_fcfa, payment_method, status`).
- RLS activé : le public peut uniquement **insérer** une commande (checkout), personne ne peut lire les commandes sauf Marie-Claude via le Table Editor Supabase (son admin de facto — pas de panneau admin custom construit).
- **À vérifier** : cette table a-t-elle bien été créée côté Supabase ?

## i18n — points sensibles déjà corrigés, ne pas régresser

- Locale par défaut : **français, sans préfixe d'URL** (`/about`, pas `/fr/about`). Anglais préfixé (`/en/about`). Config dans `middleware.ts` (`defaultLocale: 'fr'`, `localePrefix: 'as-needed'`).
- **Bug corrigé** : le `matcher` du middleware ne couvrait à l'origine que `/` et `/en|fr/...`, donc toutes les pages françaises non préfixées (`/about`, `/products`, etc.) tombaient en 404. Corrigé avec `matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']` — ne pas revenir à l'ancien pattern.
- **Bug corrigé** : `app/layout.tsx` (layout racine) affichait Header/Footer directement, en dehors du `NextIntlClientProvider` (qui vit dans `app/[locale]/layout.tsx`), causant un crash `useTranslations` à chaque page. Le layout racine ne doit contenir que `<html>/<body>{children}</body></html>`, rien d'autre.
- Le sélecteur de langue dans `components/Header.tsx` construit désormais les URLs correctement pour ce schéma (jamais de `/fr/...` explicite, ajoute/retire uniquement le préfixe `/en`).

## Palette de couleurs (thème Gabon)

Définie dans `tailwind.config.ts` sous `theme.extend.colors.brand` :
- `brand-green` (#009E60) et `brand-green-dark` (#00784A) — vert du drapeau gabonais, couleur principale (boutons, liens)
- `brand-yellow` (#FCD116) — jaune du drapeau
- `brand-blue` (#3A75C4) — bleu du drapeau, accent secondaire
- `brand-heliconia` (#E8471E) — orange-rouge inspiré de l'héliconia (fleur du perroquet) et du badamier, utilisé pour les touches vives/dégradés
- `brand-cream` (#F2F2E4) — fond neutre clair

Ne pas réintroduire les couleurs Tailwind génériques (`green-600`, `yellow-300`, etc.) — tout a été migré vers cette palette. La police n'a volontairement pas été touchée.

## Logo

`public/images/logo-cropped.png` — logo fourni par Marie-Claude, recadré (l'original avait beaucoup de marge transparente autour du motif). Utilisé dans `components/Header.tsx`.

## Pages légales

- `/legal` (mentions légales) et `/cgv` (conditions générales de vente) créées, contenu piloté par `BUSINESS_INFO` dans `lib/constants.ts` — **actuellement rempli de placeholders `[TON NOM]`, `[TON SIRET]`, etc., à compléter dès que Marie-Claude a son SIRET.**
- Marie-Claude est auto-entrepreneure, en cours de récupération/vérification de son SIRET au moment de la fin de session (elle pensait n'avoir déposé que la marque à l'INPI, mais a confirmé avoir bien un statut micro-entrepreneur donc un SIRET existant à retrouver).
- Des documents de référence plus complets (mentions légales, CGV, registre RGPD simplifié) ont été rédigés séparément et remis à Marie-Claude en dehors du repo — pas critiques pour le code, mais mentionnés ici au cas où elle les partage.

## Livraison

Pas d'intégration technique d'étiquettes d'expédition. Recommandation donnée à Marie-Claude : Boxtal (saisie manuelle par commande, pas d'automatisation prévue à ce stade). Expédition depuis la France.

## Déploiement — état à la fin de la session

Pas encore déployé sur Vercel à la fin de cette session. Étapes restantes côté Marie-Claude :
1. Créer la table `orders` dans Supabase (si pas déjà fait)
2. Renseigner `STRIPE_SECRET_KEY` et `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local`
3. Compléter `BUSINESS_INFO` dans `lib/constants.ts`
4. Pousser sur GitHub
5. Déployer sur Vercel avec les 4 variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`)
6. Connecter un nom de domaine personnalisé

## Environnement local — point d'attention

Le dossier projet est sur `/Users/corinnehurtaux/marque/ibola` (pas de "Desktop" dans le chemin, malgré une confusion à un moment de la session précédente). Un ralentissement important du premier `npm run dev` (plusieurs minutes) a été observé, probablement lié à la synchronisation iCloud "Bureau et Documents" — si le problème revient, suggérer de désactiver cette synchronisation ou de déplacer le projet hors d'un dossier synchronisé iCloud.

## Ce que Marie-Claude préfère

Communication en français, réponses concises. Elle n'est pas développeuse — expliquer simplement où se trouve quoi (ex: texte du site → `messages/fr.json` et `messages/en.json` ; structure/mise en page → fichiers `.tsx` ; couleurs → `tailwind.config.ts` ; produits → `lib/constants.ts`) plutôt que de la renvoyer directement à du code sans repères.
