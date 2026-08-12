# Publication sous Windows

Le contenu de cette archive doit être extrait dans :

```text
C:\h9-workspace\etorrent-org.github.io
```

Avant de créer le dossier, vérifier qu’il n’existe pas déjà.

## Initialiser et publier le dépôt

Dans PowerShell :

```powershell
Set-Location C:\h9-workspace\etorrent-org.github.io

git init -b main
git add .
git status --short
git commit -m "Initialiser le portail public Etorrent-Org"

gh repo create Etorrent-Org/Etorrent-Org.github.io `
  --public `
  --description "Portail public des projets Etorrent-Org" `
  --source . `
  --remote origin `
  --push
```

## Activer GitHub Pages

```powershell
gh api --method POST `
  repos/Etorrent-Org/Etorrent-Org.github.io/pages `
  -f "source[branch]=main" `
  -f "source[path]=/"
```

## Vérifier

```powershell
gh api repos/Etorrent-Org/Etorrent-Org.github.io/pages `
  --jq '{status: .status, url: .html_url}'
```

Adresse attendue : <https://etorrent-org.github.io/>.
