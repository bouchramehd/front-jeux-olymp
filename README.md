# Olympic AI — Frontend (React)

Interface web du projet Olympic AI, développée en React, permettant de visualiser des statistiques olympiques et d’interagir avec un modèle d’intelligence artificielle via une API FastAPI.

---

## 🎯 Objectif du frontend

- Afficher les statistiques olympiques par pays
- Visualiser les médailles (or, argent, bronze, total)
- Présenter un classement des pays les plus médaillés
- Afficher des graphiques statistiques (Top 10 pays)
- Permettre la prédiction de médailles via un modèle IA

---

##  Technologies utilisées

- React (Vite ou Create React App)
- JavaScript (ES6)
- Chart.js (visualisation des statistiques)
- CSS (thème bleu olympique)
- Fetch API
- Backend FastAPI (API REST)

---

## Structure du projet

olympic-ai-front/
├── src/
│   ├── assets/              Images (anneaux olympiques, etc.)
│   ├── Components/          Composants réutilisables (MedalIcon, etc.)
│   ├── App.jsx              Composant principal
│   ├── index.css            Styles globaux
│   └── main.jsx             Point d’entrée React
├── public/
├── package.json
└── README.md

---

##  Prérequis

- Node.js version 18 ou plus
- npm ou yarn installé
- Backend FastAPI lancé sur :
  http://127.0.0.1:8000

---

## ▶Installation

1. Installer les dépendances :
   npm install

2. Lancer l’application :
   npm run dev

3. Ouvrir dans le navigateur :
   http://localhost:5173
   (ou http://localhost:3000 selon la configuration)

---

##  Connexion au backend

Le frontend communique avec l’API via l’URL suivante :

const API = "http://127.0.0.1:8000"

---

### Endpoints utilisés

- GET /countries  
  Récupère la liste des pays

- GET /medals/summary  
  Récupère les statistiques globales des médailles par pays

- POST /predict  
  Envoie un pays et une année pour obtenir une prédiction IA

---

##  Fonctionnalités principales

### Statistiques
- Tableau des médailles par pays
- Tableau volontairement limité (Top pays) pour une meilleure lisibilité
- Graphique “Top 10 pays par total de médailles”

### Prédiction IA
- Sélection d’un pays
- Sélection d’une année
- Résultat : nombre de médailles d’or, d’argent, de bronze et total

---

##  Interface utilisateur

- Design moderne inspiré des Jeux Olympiques
- Thème bleu
- Cartes statistiques (cards)
- Graphiques lisibles et esthétiques
- Interface responsive

---

##  Remarques importantes

- Aucune donnée mockée n’est utilisée
- Toutes les données proviennent du backend FastAPI
- Si l’interface ne s’affiche pas correctement :
  - Vérifier que le backend est bien lancé
  - Vérifier le port 8000
  - Vérifier la console du navigateur (F12)

---

##  Auteur

Projet académique : Olympic AI  
Frontend : React  
Backend : FastAPI + RandomForest

---

##  Statut du projet

Frontend fonctionnel et connecté au backend.