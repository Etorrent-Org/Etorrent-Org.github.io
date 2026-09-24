# Etorrent-Org — déploiement OVH

Branche dédiée au site statique publié sur 7-sens.fr via l'intégration Git d'OVH.

## Branche

- `main` : portail GitHub Pages historique
- `ovh-7-sens` : portfolio OVH 7-sens.fr

## Runtime

Aucun runtime serveur n'est nécessaire : HTML/CSS uniquement.

Fichiers principaux :
- `index.html`
- `styles.css`
- `.htaccess`
- `robots.txt`

## Sécurité

Le fichier `.htaccess` force HTTPS, désactive l'indexation des répertoires et ajoute des en-têtes de sécurité.

Aucun secret, token ou fichier `.env` ne doit être ajouté à cette branche.
