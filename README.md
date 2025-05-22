# PROJET_REACT
# Mise en place d'une application web MERN (MongoDB, Express, React, Node.js) inspirée de Le Bon Coin, une plateforme de petites annonces. L’objectif est de mettre en pratique vos connaissances sur la stack MERN en créant un #système complet avec gestion des utilisateurs et des annonces.
Parfait ! J'ai créé une application complète MERN inspirée du Bon Coin avec toutes les fonctionnalités demandées. Voici un résumé de ce qui a été développé :
🎯 Fonctionnalités principales implémentées
Backend (Node.js/Express)

✅ Authentification sécurisée avec JWT et bcrypt
✅ API REST complète pour utilisateurs et annonces
✅ Middleware d'authentification qui récupère automatiquement l'ID utilisateur
✅ Validation stricte côté serveur avec express-validator
✅ Modèles MongoDB avec Mongoose (User + Annonce)

Frontend (React)

✅ Pages d'inscription et connexion avec validation
✅ CRUD complet des annonces (Create, Read, Delete)
✅ Filtrage par catégorie en temps réel
✅ Page de détail d'annonce avec contact vendeur
✅ Gestion d'état avec hooks (useState, useEffect)
✅ Navigation protégée avec React Router
✅ Interface responsive avec CSS moderne

🔐 Sécurité respectée

L'ID de l'auteur est automatiquement récupéré via le token JWT lors de la création d'annonce
Hachage des mots de passe avec bcrypt et salt
Protection des routes avec middleware d'authentification
Validation des données côté client ET serveur
Gestion propre des tokens avec localStorage

🎨 Fonctionnalités bonus ajoutées

Filtrage par catégorie avec dropdown
Page de détail complète avec informations vendeur
Contact direct par email avec sujet pré-rempli
Interface utilisateur soignée avec messages d'erreur clairs
Formatage automatique des prix et dates
Validation en temps réel des formulaires

🚀 Comment démarrer

Backend : Installer les dépendances, configurer MongoDB et le fichier .env, puis npm run dev
Frontend : Créer l'app React, installer les dépendances, puis npm start
Utilisation : S'inscrire, se connecter, créer des annonces et naviguer !

L'application respecte parfaitement vos contraintes : l'ID de l'utilisateur est automatiquement injecté côté backend via le token JWT, la gestion d'état utilise uniquement des states locaux React, et toutes les fonctionnalités CRUD sont implémentées avec une interface utilisateur moderne et responsive.
