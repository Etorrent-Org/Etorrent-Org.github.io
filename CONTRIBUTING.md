# Contributing

Le portail est volontairement simple : HTML statique, CSS et assets publiés par GitHub Pages.

## Avant une modification

- partir de `main` à jour ;
- créer une branche dédiée ;
- modifier uniquement les fichiers nécessaires ;
- respecter `COMMIT_CONVENTION.md` ;
- ne jamais ajouter de secret ou donnée privée.

## Pour une page produit

Vérifier :

- le nom et la version affichés ;
- les liens GitHub et Release ;
- les textes d’installation ;
- les images et leurs chemins ;
- le rendu desktop et mobile ;
- la date `lastmod` correspondante dans `sitemap.xml` si le contenu public change.

## Validation

Avant fusion, contrôler le diff complet et ouvrir les pages modifiées localement ou via la prévisualisation disponible.

Le dépôt ne nécessite ni build applicatif ni Docker pour publier le portail.
