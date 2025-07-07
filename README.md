# Handi'Map

Application web avec serveur frontend React et serveur backend en node et express

## Fonctionnalités principales

- Interface utilisateur avec React et Vite
- API REST avec Node.js & Express
- Connexion à une base de données PostgreSQL externe
- Intégration avec Cloudinary pour la gestion des médias

## Configuration requise

- git
- node (>=22) et npm, ou Docker
- Base de données postgresql externe (un fichier schema.sql est trouvable dans le repo pour initialisé les tables et relations)
- Un espace cloudinary. [Tutoriel pour le config et avoir les variables d'env](https://cloudinary.com/documentation/getting_started_with_cloudinary_node_tutorial)

## Instruction d'installation

### Option 1 : Avec Docker (recommandé)

- cloner le dépot :

```bash
   git clone https://github.com/Vivien-Parsis/handiMap
   cd handiMap
```

- creer un fichier .env dans le backend :

```none
JWT_SECRET={your_secret_here}
DB_URL={your_secret_here}
HOST={your_secret_here}
FRONT_URL={your_secret_here}
CLOUDINARY_CLOUD_NAME={your_secret_here}
CLOUDINARY_API_KEY={your_secret_here}
CLOUDINARY_API_SECRET={your_secret_here}
NODE_ENV={"DEV" OR "TEST" OR "PROD"}
```

- creer un fichier .env dans le frontend :

```none
VITE_API_URL={backend url}
```

- Dans votre base de données PostegreSQL externe, utiliser le fichier `schema.sql` pour creer les tables et relations

- dans le répertoire lancez depuis la racine du projet le service : `docker compose up -d`

### Option 2 : En local avec Node.js

- cloner le dépot :

```bash
   git clone https://github.com/Vivien-Parsis/handiMap
   cd handiMap
```

- creer un fichier .env dans le backend :

```none
JWT_SECRET={your_secret_here}
DB_URL={your_secret_here}
HOST={your_secret_here}
FRONT_URL={your_secret_here}
CLOUDINARY_CLOUD_NAME={your_secret_here}
CLOUDINARY_API_KEY={your_secret_here}
CLOUDINARY_API_SECRET={your_secret_here}
NODE_ENV={"DEV" OR "TEST" OR "PROD"}
```

- creer un fichier .env dans le frontend :

```none
VITE_API_URL={backend url}
```

- Installer et lancer le backend :

```bash
  cd backend
  npm install
  npm run start
```

- Installer et lancer le frontend :

```bash
  cd front-end
  npm install
  npm run preview
```

## Adresse

Frontend : `http://votre-domaine-ou-ip`

Backend : `http://votre-domaine-ou-ip:4000`

## Déploiement

L'application peut être déployée sur n'importe quel serveur supportant Docker.  
Voici la procédure recommandée :

### Prérequis

- Serveur avec :
  - Docker
  - Docker Compose
  - git
- Accès SSH à la machine (si hébergement distant)
- Nom de domaine configuré (optionnel)
- Base de données postgresql externe (un fichier schema.sql est trouvable dans le repo pour initialisé les tables et relations)
- Un espace cloudinary. [Tutoriel pour le config et avoir les variables d'env](https://cloudinary.com/documentation/getting_started_with_cloudinary_node_tutorial)

### Déploiement avec Docker

- se connecter en ssh

```bash
ssh user@your-server
```

- cloner le dépot :

```bash
   git clone https://github.com/Vivien-Parsis/handiMap
   cd handiMap
```

- Variables d’environnement (à créer dans un fichier `.env` dans `handimap/backend/`)

```none
JWT_SECRET={your_secret_here}
DB_URL={your_secret_here}
CLOUDINARY_CLOUD_NAME={your_secret_here}
CLOUDINARY_API_KEY={your_secret_here}
CLOUDINARY_API_SECRET={your_secret_here}
NODE_ENV={"DEV" OR "TEST" OR "PROD"}
```

- creer un fichier .env dans le frontend :

```none
VITE_API_URL={backend url}
```

- Lancer l’application

```bash
docker compose up -d
```

- Vérifier que tout fonctionne

Frontend : `http://votre-domaine-ou-ip`

Backend : `http://votre-domaine-ou-ip:4000`

### Mise à jour

- pour mettre a jour l'application
  
```bash
git pull
docker compose down
docker compose up -d --build
```

### Arrêter l’application
  
```bash
docker compose down
```

### Journalisation

```bash
docker compose logs -f
```

## Auteur

- Vivien PARSIS
