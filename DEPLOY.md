# Déploiement

L'application peut être déployée sur n'importe quel serveur supportant Docker.  
Voici la procédure recommandée :

## Prérequis

- Serveur avec :
  - Docker
  - Docker Compose
- Accès SSH à la machine (si hébergement distant)
- Nom de domaine configuré (optionnel)

## Variables d’environnement (à créer dans un fichier `.env` dans `/backend/`)

```none
JWT_SECRET={your_secret_here}
DB_URL={your_secret_here}
CLOUDINARY_CLOUD_NAME={your_secret_here}
CLOUDINARY_API_KEY={your_secret_here}
CLOUDINARY_API_SECRET={your_secret_here}
```

## Déploiement avec Docker

- se connecter en ssh

```bash
ssh user@your-server
cd handiMap
```

- Lancer l’application

```bash
docker-compose up -d
```

- Vérifier que tout fonctionne

Frontend : `http://votre-domaine-ou-ip:3000`

Backend : `http://votre-domaine-ou-ip:4000`

## Mise à jour

- pour mettre a jour l'application
  
```bash
git pull
docker-compose down
docker-compose up -d --build
```

## Arrêter l’application
  
```bash
docker-compose down
```

## Journalisation

```bash
docker-compose logs -f
```
