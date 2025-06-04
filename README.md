# Handi'Map

Application web avec serveur frontend React et serveur backend en node et express

## 🚀 Fonctionnalités principales

- Interface utilisateur avec React et Vite
- API REST avec Node.js & Express
- Connexion à une base de données PostgreSQL
- Intégration avec Cloudinary pour la gestion des médias

## Configuration requise

- git
- node et npm, ou Docker
- Une base de donnée postgreSQL
- Un espace cloudinary

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
CLOUDINARY_CLOUD_NAME={your_secret_here}
CLOUDINARY_API_KEY={your_secret_here}
CLOUDINARY_API_SECRET={your_secret_here}
```

- dans le répertoire projectn lance le service : `docker-compose up`

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
  CLOUDINARY_CLOUD_NAME={your_secret_here}
  CLOUDINARY_API_KEY={your_secret_here}
  CLOUDINARY_API_SECRET={your_secret_here}
```

- Installer et lancer le backend :

```bash
  cd ../backend
  npm install
  npm run dev
```

- Installer et lancer le frontend :

```bash
  cd ../front-end
  npm install
  npm run start
```

## Adresse

- backend : `http://localhost:4000`

- frontend : `http://localhost:3000`

## Auteur

- Vivien PARSIS
