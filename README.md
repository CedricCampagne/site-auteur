# Site-auteur de Katia Campagne

## Présentation courte

Ce projet est un site d’auteur complet, développé pour démontrer mes compétences en développement full‑stack moderne.  
Il combine une API Express typée en TypeScript, un frontend SvelteKit performant, une base PostgreSQL structurée avec Sequelize, et un dashboard d’administration complet.

L’objectif est double :
- présenter un projet concret, propre et structuré, comme en conditions professionnelles  
- continuer à progresser en architecture backend, sécurité, UX et bonnes pratiques TypeScript

## Table des matières

- [Présentation courte](#présentation-courte)
- [Présentation du projet](#présentation-du-projet)
- [Stack technique](#stack-technique)
  - [Frontend (client)](#frontend-client)
  - [Backend (api)](#backend-api)
- [Fonctionnalités – Version 1](#fonctionnalités--version-1)
  - [Site public](#site-public)
  - [Espace utilisateur](#espace-utilisateur)
  - [Dashboard Admin](#dashboard-admin)
  - [Authentification & sécurité](#authentification--sécurité)
  - [Backend](#backend)
- [Instructions d’installation](#instructions-dinstallation)
  - [Prérequis](#prérequis)
  - [Cloner le projet](#cloner-le-projet)
  - [Installation du backend](#installation-du-backend-api)
  - [Installation du frontend](#installation-du-frontend-client)
  - [Scripts utiles](#scripts-utiles)
- [Variables d’environnement](#variables-denvironnement)
  - [Backend](#backend--apienv)
  - [Frontend](#frontend--clientenv)
- [Commandes](#commandes)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [Screenshots](#screenshots)
- [Démo en ligne](#démo-en-ligne)
- [Roadmap](#roadmap)


## Présentation du projet
Ce projet est un site d’auteur complet permettant de présenter des livres, publier des chroniques,  
gérer des commentaires et administrer l’ensemble via un dashboard sécurisé.  

Il a été conçu comme une application full‑stack moderne, avec pour objectifs :
- proposer une plateforme claire et agréable pour découvrir les ouvrages d’un auteur
- offrir un espace d’administration complet (livres, chroniques, commentaires, utilisateurs)
- mettre en pratique une architecture backend propre et typée
- approfondir l’utilisation de SvelteKit, Express, TypeScript et PostgreSQL dans un contexte réel

L’ensemble du projet sert à la fois de démonstration technique et de terrain d’apprentissage structuré.

## Stack technique

Ce projet repose sur une stack full‑stack moderne, entièrement écrite en **TypeScript**, et organisée en deux applications distinctes :
- un backend **Express**
- un frontend **SvelteKit**.

### **Frontend (client)**

#### Framework & Langage
- **SvelteKit** (v2) : Framework full‑stack moderne et performant
- **TypeScript** : Typage statique pour un code plus robuste
- **Vite** : Dev server ultra rapide

#### UI & Styling
**TailwindCSS** : Styling utilitaire
**@tailwindcss/typography** : Styles optimisés pour le contenu riche
**Iconify** : Icônes vectorielles
**Prettier + ESLint** : Formatage et linting

#### Fonctionnalités front
- **EasyMDE** : Éditeur Markdown pour les chroniques
- **Marked** : Rendu Markdown côté client
- **Fetch API** : Communication avec l’API backend
- **Svelte stores** : Gestion légère de l’état (flash messages, user, etc.)

#### Scripts utiles
- ``npm run dev`` : Lancer le front en mode développement
- ``npm run build`` : Build de production
- ``npm run preview`` : Prévisualisation du build
- ``npm run check`` : Vérification TS + Svelte
- ``npm run lint`` : Linting
- ``npm run format`` : Formatage automatique

### **Backend (api)**

#### Framework & Langage
- **Node.js + Express** : API REST modulaire
- **TypeScript** : Typage strict sur controllers, services, middlewares
- **ts-node-dev** : Reload automatique en développement

#### Base de données
**PostgreSQL** : Base relationnelle
**Sequelize + sequelize-typescript** : ORM avec décorateurs
**pg / pg-hstore** : Drivers PostgreSQL utilisés par Sequelize pour gérer la connexion à la base et la sérialisation du type HSTORE.

#### Sécurité & Auth
- ``JWT (jsonwebtoken)`` : Authentification
- ``argon2`` : Hash des mots de passe
- ``helmet`` : Sécurisation des headers HTTP
- ``cookie-parser`` : Gestion des cookies
- ``cors`` : Configuration CORS

#### Validation & Sanitation
- **Joi** : Validation des schémas (body, params, query)
- **sanitize-html** : Nettoyage des entrées utilisateur

#### Architecture backend
- Controllers / Services / Models
- Middlewares dédiés (authGuard, isAdmin, validate, sanitize, errorHandler)
- Gestion centralisée des erreurs via ``HttpError``
- Réponses API unifiées via ``sendResponse``
- Seeds pour initialiser la base ``npm run seed``

#### Tests
- **Jest + ts-jest** — Tests unitaires
- Exemple : test de la fonction ``slugify``

#### Scripts utiles
- ``npm run dev`` — Lancer l’API en mode développement
- ``npm run seed`` — Exécuter les seeds
- ``npm test`` — Lancer les tests Jest

## Fonctionnalités – Version 1
Cette première version du projet propose un ensemble complet de fonctionnalités côté public, utilisateur connecté et administration.  
L’objectif est de couvrir tous les besoins d’un site d’auteur moderne, tout en offrant une architecture claire et évolutive.

#### Site public
- Accueil
    - Section Hero avec image de fond, texte d’accroche et boutons d’accès rapide
    - Affichage du dernier livre publié
    - Bibliographie complète sous forme de cartes
    - Dernières chroniques (3 plus récentes)
    - Section “À propos” avec aperçu de l’auteur
    - Formulaire d’inscription à la newsletter (Brevo)

- Livres
    - Page listant tous les livres sous forme de timeline
    - Cartes détaillées pour chaque livre
    - Page de détails d’un livre (résumé, informations, extrait)

- Chroniques
    - Page listant toutes les chroniques
    - Cartes détaillées avec résumé
    - Page de détails d’une chronique
    - Section commentaires :
        - affichage des commentaires
        - ajout d’un commentaire via popup (UX fluide, sans rechargement)

- À propos
    - Présentation de l’auteur
    - Photo + texte descriptif

- Contact
    - Formulaire de contact simple (intégration Formspree prévue en production)

#### Espace utilisateur
- Connexion / déconnexion
- Affichage du nom dans le header une fois connecté
- Menu utilisateur avec bouton de déconnexion
- Accès réservé à l’administration si rôle admin

#### Dashboard Admin
- Gestion des livres
    - Liste des livres sous forme de cartes
    - Activation / désactivation d’un livre en un clic
    - Édition des informations d’un livre
    - Suppression d’un livre
    - **Ajout d’un livre (prévu)** : un formulaire complet est prévu, incluant un éditeur Markdown **(EasyMDE)** pour gérer le résumé, l’extrait et les textes longs.  
    Pour le moment, les livres sont ajoutés directement dans les données de développement, car l’auteur publie un ouvrage environ tous les 1,5 à 2 ans.

- Gestion des chroniques
    - Liste des chroniques
    - Ajout / édition via **EasyMDE** (éditeur Markdown)
    - Suppression
    - Activation / désactivation

- Gestion des commentaires
    - Liste des commentaires
    - Activation / désactivation
    - Suppression
    - Édition d’un commentaire

- Gestion des utilisateurs
    - Liste des utilisateurs
    - Activation / désactivation
    - Suppression
    - Édition des informations utilisateur

#### Authentification & sécurité
- Authentification JWT
- Cookies sécurisés
- Rôles (admin / utilisateur)
- Middlewares de protection des routes
- Validation des données (Joi)
- Sanitation HTML

#### Backend
- API REST complète
- Réponses unifiées via ``sendResponse``
- Architecture Controllers / Services / Models
- Gestion centralisée des erreurs
- Seeds pour initialiser la base en développement

## Instructions d’installation
Cette section explique comment installer et lancer le projet en local, aussi bien pour le backend (API) que pour le frontend (client).

1. #### Prérequis
Avant de commencer, assure‑toi d’avoir installé :
- **Node.js** (version 18+ recommandée)
- **npm** (fourni avec Node)
- **PostgreSQL** (local, Docker ou service cloud)
- **Git**

2. #### Cloner le projet

```bash
git clone https://github.com/<ton-repo>.git
cd <nom-du-repo>
```

3. #### Installation du backend (API)

```bash
cd api
npm install
```

- Créer le fichier ``.env``
Dans le dossier ``/api``, crée un fichier ``.env`` :

```bash
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/nom_de_ta_bdd
JWT_SECRET=ton_secret_jwt
COOKIE_SECRET=ton_secret_cookie (optionnel)
NODE_ENV=development
```

- Détails importants
- JWT_SECRET : clé secrète utilisée pour signer les tokens JWT
- COOKIE_SECRET (optionnel) : clé utilisée pour signer les cookies si tu actives cette fonctionnalité plus tard
    - tu ne l’utilises pas encore, mais l’évolution est prévue
    - valeur recommandée : une chaîne aléatoire générée via :

    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

-Initialiser la base de données
Assure‑toi que PostgreSQL tourne, puis exécute :

```bash
npm run seed
```
Cela crée les tables et insère les données de développement.

- Lancer l’API

```bash
npm run dev
```

L’API est accessible sur :

```bash
http://localhost:3000
```

4. #### Installation du frontend (client)

```bash
cd client
npm install
```

- Créer le fichier ``.env``
Dans ``/client``, crée un fichier ``.env`` :

```bash
VITE_API_URL=http://localhost:3000/api
PUBLIC_API_URL=http://localhost:3000/api
```

- Lancer le front

```bash
npm run dev
```

Le site est accessible sur :

```bash
http://localhost:5173
```

5. #### Scripts utiles

- Backend

| Commande       | Description                               |
|----------------|-------------------------------------------|
| `npm run dev`  | Lance l’API en mode développement          |
| `npm run seed` | Initialise la base avec les données de dev |
| `npm test`     | Lance les tests Jest                       |


- Frontend

| Commande         | Description                           |
|------------------|---------------------------------------|
| `npm run dev`    | Lance le front en mode développement  |
| `npm run build`  | Build de production                   |
| `npm run preview`| Prévisualisation du build             |
| `npm run check`  | Vérification TS + Svelte              |
| `npm run lint`   | Linting                               |
| `npm run format` | Formatage automatique                 |


## Variables d’environnement

Le projet utilise des variables d’environnement pour configurer l’API, la base de données, l’authentification et la communication entre le frontend et le backend.
Ces fichiers doivent être créés manuellement dans les dossiers **/api** et **/client**.

- #### Backend : ``/api/.env``

Voici la configuration actuellement utilisée dans le projet :

```bash
PORT=3000
DB_HOST=localhost
DB_NAME=db_name
DB_USER=db_user
DB_PASSWORD=db_password
DB_DIALECT=postgres
JWT_SECRET=ton_JWT_secret
COOKIE_SECRET=ton_cookie_secret (optionnel)
NODE_ENV=development
```

- Détails des variables

| Variable       | Description                                                     |
|----------------|-----------------------------------------------------------------|
| `PORT`         | Port sur lequel l’API Express écoute                            |
| `DB_HOST`      | Hôte PostgreSQL                                                 |
| `DB_NAME`      | Nom de la base de données                                       |
| `DB_USER`      | Utilisateur PostgreSQL                                          |
| `DB_PASSWORD`  | Mot de passe PostgreSQL                                         |
| `DB_DIALECT`   | Type de base (PostgreSQL ici)                                   |
| `JWT_SECRET`   | Clé secrète utilisée pour signer les tokens JWT                 |
| `COOKIE_SECRET`| (Optionnel) Clé destinée à la signature des cookies ultérieurement |
| `NODE_ENV`     | Environnement d’exécution                                       |


- À propos de ``COOKIE_SECRET``
``COOKIE_SECRET`` n’est pas encore utilisé dans le projet actuel, mais il est prévu pour une évolution future.  
Il servira à **signer les cookies** via ``cookie-parser``, afin de garantir leur intégrité et d’empêcher toute modification côté client.  
La valeur recommandée est une chaîne aléatoire générée à l’aide de la commande suivante :

    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

- #### Frontend : ``/client/.env``
Voici les variables réellement utilisées dans le projet :

    ```bash
    VITE_API_URL=http://localhost:3000/api
    PUBLIC_API_URL=http://localhost:3000/api
    ```

- Pourquoi deux variables ?

| Variable         | Description                                                         |
|------------------|---------------------------------------------------------------------|
| `VITE_API_URL`   | Utilisée côté serveur dans SvelteKit (+page.server.ts, endpoints, hooks) |
| `PUBLIC_API_URL` | Utilisée côté client (+page.ts, composants .svelte)                 |

Les deux pointent vers la même API, mais SvelteKit sépare les variables pour éviter d’exposer des valeurs sensibles côté client.  
Aucune autre variable n’est nécessaire pour le moment.

## Commandes

Cette section regroupe l’ensemble des commandes disponibles pour le backend (API) et le frontend (client) du projet.

- #### Backend

| Commande         | Description                               |
|------------------|-------------------------------------------|
| `npm run dev`    | Lance l’API en mode développement          |
| `npm run seed`   | Initialise la base avec les données de dev |
| `npm test`       | Lance les tests Jest                       |

- #### Frontend

| Commande          | Description                           |
|-------------------|---------------------------------------|
| `npm run dev`     | Lance le front en mode développement  |
| `npm run build`   | Build de production                   |
| `npm run preview` | Prévisualisation du build             |
| `npm run check`   | Vérification TS + Svelte              |
| `npm run lint`    | Linting                               |
| `npm run format`  | Formatage automatique                 |

## Screenshots

### 🏠 Accueil

#### Header + Hero + Dernier livre
![Header, hero section et dernier livre](./screenshots/home-header-hero-lastBook.png)

#### Bibliographie + Dernières chroniques
![Bibliographie et dernières chroniques](./screenshots/home-bibliography-lastChronicles.png)

#### À propos + Footer
*(screenshot ici)*


### Page Livre
*(à venir)*

### Page Chronique
*(à venir)*

### Dashboard Admin
*(à venir)*

## Démo en ligne

Cette section sera activée lorsque le projet sera déployé (Railway, Render, Vercel, etc.).

```bash
La démo sera disponible ici une fois le projet déployé :

https://ton-site-en-ligne.com (à venir)
```

## Roadmap

### Version 1 : Fonctionnalités actuelles
- Site public complet (livres, chroniques, commentaires, à propos, contact)
- Authentification JWT + cookies sécurisés
- Dashboard admin (livres, chroniques, commentaires, utilisateurs)
- Éditeur Markdown (EasyMDE)
- Architecture backend propre (controllers / services / models)
- Validation (Joi) + sanitation (sanitize-html)
- Tests unitaires (Jest)
- Seeds de développement

---

### Version 1.1 : Améliorations UX & contenu
- Ajout d’un loader global
- Amélioration des messages d’erreur front
- Optimisation du rendu Markdown
- Amélioration du responsive mobile
- Ajout de transitions Svelte

---

### Version 2 : Fonctionnalités avancées
- Ajout d’un formulaire complet pour créer un livre depuis le dashboard  
  (résumé, extrait, image, statut, etc.)
- Upload d’images (Cloudinary ou UploadThing)
- Système de tags pour les chroniques
- Pagination sur les listes (livres, chroniques, commentaires)

---

### Version 3 : Déploiement & production
- Déploiement API (Railway / Render)
- Déploiement frontend (Vercel / Netlify)
- Configuration CORS + cookies en production
- Intégration Formspree pour le formulaire de contact
- Activation du formulaire Brevo en production

---

### Version 4 : Fonctionnalités premium
- Recherche full‑text (livres + chroniques)
- Système de brouillons pour les chroniques
- Statistiques admin (lectures, commentaires, activité)
- Mode sombre





