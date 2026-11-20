# GlobAlly Study

**The peer support network for international students in France.**

Plateforme d'entraide et de guides pratiques (administratif, logement, études & AST) pour les étudiants internationaux en France. Bilingue FR / EN, 100 % statique, déployable gratuitement sur Vercel.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # vérification TypeScript + ESLint + build de production
```

## Configurer le formulaire

Ouvrez `components/join/JoinForm.tsx` et remplacez la constante `FORMSPREE_ENDPOINT` par l'URL de votre formulaire Formspree (ou d'un webhook acceptant un POST JSON).

## Documentation

Stack, direction artistique, architecture et règles i18n : voir [`CLAUDE.md`](./CLAUDE.md).
