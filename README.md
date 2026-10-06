# ATELIER 7S — site public

Source du site public **7-sens.fr**.

## Positionnement

ATELIER 7S transforme des workflows réellement utilisés en produits numériques spécialisés.

### Produit actuellement exposé

- **IA Art Studio**
  - page produit : `/ia-art-studio/`
  - version Free : `/ia-art-studio/free/`
  - version Pro : en préparation, self-hosted Docker

Music Desk et Job Search OS restent hors de la vitrine publique tant qu’ils ne sont pas prêts à être commercialisés.

## Publication

Le site reste compatible GitHub Pages, mais la cible commerciale est `https://7-sens.fr/` sur OVH.

Le workflow `.github/workflows/deploy-ovh.yml` publie automatiquement la vitrine après fusion sur `main` lorsque les secrets suivants sont configurés :

- `OVH_FTP_SERVER`
- `OVH_FTP_USERNAME`
- `OVH_FTP_PASSWORD`
- `OVH_FTP_TARGET`

## Structure active

- `index.html` : accueil ATELIER 7S ;
- `atelier.css` : identité spécifique de la vitrine ;
- `ia-art-studio/index.html` : page produit ;
- `ia-art-studio/free/` : application statique Free ;
- `assets/product-covers/` : visuels produits ;
- `sitemap.xml` : URLs publiques 7-sens.fr.

Les anciennes pages de démonstration restent dans le dépôt pour historique mais ne sont plus promues depuis la home.
