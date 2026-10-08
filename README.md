# ATELIER 7S — site public

Source du site public **7-sens.fr**.

## Positionnement

ATELIER 7S transforme des usages réellement vécus en outils numériques simples, visuels et autonomes.

### Produits actuellement exposés

- **IA Art Studio**
  - page produit : `/ia-art-studio/`
  - version Free : `https://ia-art.7-sens.fr/`
  - version Pro : en préparation, auto-hébergée avec Docker
- **Music Desk**
  - présenté comme prochain produit
  - publication complète après validation du template Notion et de l’Automation Pack n8n

Job Search OS reste hors de la vitrine publique tant que sa productisation n’est pas prioritaire.

## Publication

La cible commerciale est `https://7-sens.fr/` sur OVH.

Le workflow `.github/workflows/deploy-ovh.yml` publie automatiquement la vitrine après fusion sur `main` lorsque les secrets suivants sont configurés :

- `OVH_FTP_SERVER`
- `OVH_FTP_USERNAME`
- `OVH_FTP_PASSWORD`
- `OVH_FTP_TARGET`

## Structure active

- `index.html` : accueil ATELIER 7S ;
- `atelier-2026-v3.css` : identité de la vitrine ;
- `ia-art-studio/index.html` : page produit ;
- `ia-art-studio/free/index.html` : redirection historique vers `ia-art.7-sens.fr` ;
- `assets/atelier7s/` : visuels de la vitrine ;
- `sitemap.xml` : URLs publiques de `7-sens.fr`.

Les anciennes pages de démonstration restent dans le dépôt pour historique mais ne sont plus promues depuis l’accueil.
