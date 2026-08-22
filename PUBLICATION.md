# Publication GitHub Pages

Le portail est publié depuis le dépôt public `Etorrent-Org/Etorrent-Org.github.io`.

## Source de publication

- branche publiée : `main` ;
- site : <https://etorrent-org.github.io/> ;
- publication : GitHub Pages ;
- traitement Jekyll désactivé via `.nojekyll`.

## Mettre à jour le portail

Depuis Windows :

```powershell
Set-Location C:\h9-workspace\etorrent-org.github.io

git fetch origin
git switch main
git pull --ff-only
```

Créer ensuite une branche dédiée, modifier uniquement les fichiers concernés et vérifier le rendu avant fusion.

Pour une page produit, contrôler au minimum :

- les versions affichées ;
- les liens vers le dépôt et la dernière release ;
- les visuels et chemins relatifs ;
- les métadonnées de la page ;
- la date `lastmod` correspondante dans `sitemap.xml`.

Après fusion dans `main`, GitHub Pages publie la nouvelle version du site.

## Vérification

Contrôler après publication :

- la page d’accueil ;
- la ou les pages modifiées ;
- les liens GitHub et Release ;
- les images ;
- <https://etorrent-org.github.io/sitemap.xml>.

Ne jamais stocker de secret, token, fichier `.env`, clé privée ou donnée client dans ce dépôt public.
