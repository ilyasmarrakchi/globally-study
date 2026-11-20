@AGENTS.md

# GlobAlly Study — référence projet

> **Baseline :** « The peer support network for international students in France »

GlobAlly Study est une plateforme d'entraide entre pairs et de ressources pratiques (administratif, logement, études & orientation post-bac / post-licence) pour les étudiants internationaux en France. Ce fichier est la référence permanente du projet : toute contribution doit le respecter.

---

## 1. Stack technique

| Élément | Choix | Remarques |
|---|---|---|
| Framework | **Next.js 16 (App Router)** | Lire `node_modules/next/dist/docs/` avant d'utiliser une API (cf. `AGENTS.md`). `cacheComponents` est activé. |
| Langage | **TypeScript strict** | Aucun `any`. Les types du dictionnaire sont inférés depuis `locales/fr.json`. |
| Styles | **Tailwind CSS v4** | Tokens déclarés dans `app/globals.css` via `@theme`. Pas de fichier `tailwind.config`. |
| Polices | `next/font/google` | Nunito (logo et titres), Inter (texte). Auto-hébergées au build, sans CDN. |
| Icônes | SVG inline | Dans `components/ui/Icons.tsx`. Aucune librairie d'icônes. |
| Formulaire | Formspree / Tally via `fetch` | Constante `FORMSPREE_ENDPOINT` en haut de `components/join/JoinForm.tsx`. |
| Hébergement | **Vercel (offre gratuite)** | 100 % statique : aucune base de données, aucune variable d'environnement obligatoire. |

**Dépendances interdites :** librairies i18n (next-intl, i18next…), librairies UI lourdes (MUI, Chakra…), librairies d'animation, ORM et bases de données. Toute nouvelle dépendance doit être justifiée.

### Commandes

```bash
npm run dev     # serveur de développement (http://localhost:3000)
npm run lint    # ESLint (doit passer sans erreur)
npm run build   # build de production (doit passer sans erreur TS/ESLint)
```

---

## 2. Direction artistique

Style **startup éducative moderne** : chaleureux, direct, dynamique et rassurant. On s'éloigne du ton corporate / administratif : beaucoup d'espace, une typographie forte, des sections rythmées et des aplats de couleur francs.

### Couleurs (tirées du logo, tokens Tailwind dans `app/globals.css`)

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0F1B3D` | Bleu marine profond : texte principal, titres, éléments forts, blocs sombres |
| `royal` | `#1E4FD6` | Bleu royal vif : accent principal, liens, éléments interactifs, boutons principaux, progression des checklists |
| `royal-dark` | `#1740B0` | Survol des éléments `royal` |
| `royal-soft` | `#EEF3FF` | Fonds de mise en avant bleus (sections, pastilles, badges) |
| `raspberry` | `#C4123F` | Rouge framboise : accent secondaire, call-to-action, éléments à mettre en avant, erreurs |
| `raspberry-dark` | `#A30E34` | Survol des éléments `raspberry` |
| `raspberry-soft` | `#FDEEF2` | Fonds de mise en avant rouges (pièges à éviter, sur-titres) |
| `paper` | `#FBFCFE` | Fond général, blanc très légèrement bleuté |
| `slate-*` (Tailwind) | — | Gris neutres : textes secondaires (`slate-500/600`), bordures (`ring-ink/5`) |

**Interdits :** l'ancien vert émeraude, tout autre bleu que ceux ci-dessus, et **tout dégradé** (en particulier bleu-vert). Uniquement des aplats.

### Logo

Logo **texte seul**, sans symbole (`components/layout/Logo.tsx`), en Nunito Black :
« Glob » et « lly » en `ink`, le « A » central en `royal`, « Study » en `raspberry`.

### Typographie

- **Titres et logo :** Nunito (`font-display`), sans-serif ronde, graisse 800–900, `tracking-tight`, grandes tailles (hero jusqu'à ~68 px, titres de section ~44 px).
- **Texte :** Inter (`font-sans`), 16–18 px, interlignage confortable (`leading-relaxed`).
- Sur-titres : pastille ronde `raspberry` + texte gras `raspberry` (composant `SectionHeading`).

### Principes UI

- **Mobile-first** : on écrit d'abord le style mobile, puis `sm:`, `md:` et `lg:`.
- **Espace** : sections en `py-24 sm:py-32`, grands écarts entre les blocs.
- **Rayons cohérents** : `rounded-card` (1,5 rem) pour les cartes, `rounded-block` (2 rem) pour les grands blocs colorés, `rounded-2xl` pour les petites tuiles et `rounded-full` pour les boutons et pastilles.
- **Ombres douces** : `shadow-soft` au repos, `shadow-lift` au survol et pour les éléments mis en avant. Cartes blanches avec `ring-1 ring-ink/5`.
- **Boutons pleins** (`components/ui/ButtonLink.tsx`) : `primary` (royal), `cta` (raspberry), `secondary` (blanc bordé), `light` (blanc sur fond coloré).
- **Rythme** : hero généreux, blocs alternés fond clair / zone colorée pleine largeur (`royal-soft`, `royal`, `raspberry-soft`).
- Visuels uniquement construits avec de vrais contenus et des formes simples : **aucune fausse photo, aucun faux témoignage**.
- Largeur de contenu max `max-w-6xl` ; colonne de lecture des guides `max-w-3xl`.
- Accessibilité : contrastes AA, `focus-visible` visibles, labels sur tous les champs, `aria-*` sur les contrôles interactifs (filtres, menu, sélecteur de langue).

---

## 3. Architecture

```
app/
  layout.tsx              Polices, LanguageProvider, Header, Footer
  page.tsx                Accueil (/)
  guides/page.tsx         Bibliothèque de guides (/guides)
  guides/[slug]/page.tsx  Vue de lecture d'un guide (statique via generateStaticParams)
  checklist/page.tsx      Checklist personnelle (/checklist)
  join/page.tsx           Rejoindre le réseau / contact (/join)
  not-found.tsx           Page 404
components/
  providers/              LanguageProvider (Context i18n)
  layout/                 Header, Footer, Logo, LanguageSwitcher
  home/                   Hero, StepsSection, FeaturedGuides
  guides/                 GuideCard, GuideLibrary (filtres), GuideReader, Checklist
  checklist/              ChecklistBoard (page /checklist), ChecklistItems (liste partagée)
  join/                   JoinForm
  ui/                     Icons, petits composants réutilisables
lib/
  guides.ts               Métadonnées des guides (slug, catégorie) + temps de lecture
  i18n.ts                 Types Locale / Dictionary, dictionnaires
  checklist-store.ts      Progression des checklists dans localStorage (une clé par guide, partagée guides ↔ /checklist)
locales/
  fr.json                 100 % des textes en français
  en.json                 100 % des textes en anglais (même structure)
```

### Règles

1. **Composants modulaires** : un composant par fichier, export nommé, props typées.
2. **Server Components par défaut** ; `"use client"` seulement si nécessaire (texte traduit, état, événements). Les pages sont des Server Components minces qui assemblent des composants clients.
3. **Pas de backend** : pas de route API, pas de base de données. Les contenus vivent dans `locales/*.json`.
4. **Code propre** : pas de code mort, pas de `console.log`, pas de commentaires évidents.
5. **Zéro texte factice** : Lorem ipsum strictement interdit. Tout texte affiché est réel et utile.

---

## 4. Internationalisation (FR / EN, maison)

- **Aucune chaîne en dur dans les composants** : tout passe par `useTranslation()` → `t.section.key`.
- `locales/fr.json` est la **source de vérité de la structure** : le type `Dictionary` en est inféré, et `en.json` est typé contre lui (une clé manquante casse le build).
- `LanguageProvider` (`components/providers/LanguageProvider.tsx`) :
  - au premier chargement, il lit `localStorage["globally-locale"]` ; à défaut, il lit `navigator.language` : `fr*` → français, sinon **anglais par défaut** ;
  - le rendu serveur se fait en anglais, puis le client applique la langue détectée juste après l'hydratation (via `useSyncExternalStore`, sans erreur d'hydratation) ;
  - le choix manuel (bouton **FR | EN**) est sauvegardé dans `localStorage` et appliqué instantanément sans rechargement ;
  - `<html lang>` est synchronisé avec la langue active ;
  - le titre de l'onglet suit la langue grâce au composant `DocumentTitle` (`components/layout/DocumentTitle.tsx`). Les métadonnées serveur (`metadata`) restent en anglais par défaut et sont lues depuis `locales/en.json`, jamais écrites en dur.
- La baseline vit dans `common.baseline` (FR : « Le réseau d’entraide des étudiants internationaux en France »). Les mots soulignés dans le hero sont définis par `home.hero.baselineHighlight`.
- Seules exceptions autorisées en dur : le nom de marque « GlobAlly Study », les noms propres des sites officiels et « 404 ».

### Règle éditoriale pour l'anglais (cruciale)

Un anglais fluide et naturel, **en conservant systématiquement les termes administratifs officiels français entre parenthèses**. Exemples :

- housing guarantee (garantie Visale)
- residence permit validation (validation VLS-TS sur l'ANEF)
- parallel admissions (Admissions Sur Titre - AST)
- housing benefit (aide au logement - APL, via la CAF)
- health insurance (Assurance Maladie / Ameli)

### Ajouter un texte ou un guide

1. Ajouter la clé dans `locales/fr.json`, puis la même clé dans `locales/en.json`.
2. Pour un guide : ajouter l'entrée dans `guides.items` des deux fichiers, puis déclarer son slug et sa catégorie dans `lib/guides.ts`. La page est générée automatiquement.
3. Lancer `npm run build` pour vérifier.

---

## 5. Contenu

- Les informations administratives (montants, délais, plafonds) changent régulièrement : chaque guide affiche une date de mise à jour et des liens vers les sources officielles (service-public.fr, administration-etrangers-en-france.interieur.gouv.fr, visale.fr, ameli.fr, caf.fr, campusfrance.org).
- Ton : bienveillant, direct, de pair à pair (tutoiement interdit en FR, on vouvoie ; en EN, « you »).
