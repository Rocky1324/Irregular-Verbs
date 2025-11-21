# English Irregular Verbs - Application d'apprentissage

Application web interactive pour apprendre et pratiquer les verbes irréguliers anglais.

🌐 **Version en ligne** : [Voir l'application sur GitHub Pages](https://rocky1324.github.io/Irregular-Verbs/)

---

## 🚀 Fonctionnalités

- 📚 **Navigation par catégories** : 6 catégories de verbes irréguliers organisés logiquement
- 🔍 **Recherche** : Recherche rapide de verbes dans toutes les catégories
- 📊 **Tri** : Tri des colonnes du tableau (Base Form, Simple Past, Past Participle)
- 🎯 **Exercices interactifs** : Quiz chronométré pour pratiquer les verbes
- 🔊 **Audio** : Prononciation des verbes avec l'API Web Speech
- 📖 **Détails des verbes** : Exemples de phrases et explications pour chaque verbe
- 📄 **Export PDF** : Téléchargement d'un PDF avec tous les verbes organisés par catégories
- 🌓 **Thème clair/sombre** : Interface adaptative avec mode sombre
- 💾 **Stockage local** : Sauvegarde des préférences et progression dans le navigateur

## 📋 Prérequis

- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Un serveur HTTP local (Python, Node.js, PHP, ou autre)

## 🛠️ Installation et démarrage

### Méthode 1 : Script de démarrage (recommandé)

```bash
./start.sh
```

Ou avec un port personnalisé :
```bash
./start.sh 8080
```

### Méthode 2 : Serveur Python

```bash
python3 -m http.server 8000
```

Puis ouvrez votre navigateur à : `http://localhost:8000/index.html`

### Méthode 3 : Serveur Node.js

```bash
npx http-server -p 8000
```

### Méthode 4 : Serveur PHP

```bash
php -S localhost:8000
```

**Important** : Vous ne pouvez pas simplement ouvrir `index.html` directement dans le navigateur car l'application utilise des modules ES6 qui nécessitent un serveur HTTP.

## 📁 Structure du projet

```
irregular_verbs/
├── index.html          # Page principale
├── app.js              # Logique principale de l'application
├── data.js             # Données des verbes irréguliers
├── auth.js             # Gestion de l'authentification
├── db.js               # Gestion du stockage local
├── exercises.js        # Gestion des exercices
├── styles.css          # Styles CSS
├── start.sh            # Script de démarrage
└── README.md           # Documentation
```

## 🎓 Catégories de verbes

1. **No Change** : Verbes qui restent identiques dans toutes les formes
2. **Vowel Changes** : Verbes avec changements de voyelles
3. **Same Past & Past Participle** : Verbes où le passé simple = participe passé
4. **Only Past Participle Changes** : Verbes où seule la forme participe passé change
5. **Past Participle ending in "en"** : Verbes avec participe passé en "-en"
6. **Ending in "ght"** : Verbes avec passé/participe passé en "-ght"

## 💡 Utilisation

1. **Navigation** : Utilisez le menu latéral pour naviguer entre les catégories
2. **Recherche** : Tapez dans la barre de recherche pour trouver un verbe spécifique
3. **Tri** : Cliquez sur les en-têtes de colonnes pour trier les verbes
4. **Détails** : Cliquez sur une ligne de verbe pour voir les détails, exemples et explications
5. **Audio** : Cliquez sur l'icône 🔊 pour entendre la prononciation
6. **Exercices** : Cliquez sur "Commencer un exercice" pour pratiquer
7. **PDF** : Cliquez sur "Télécharger le PDF" pour obtenir une version imprimable

## 🛠️ Technologies utilisées

- **HTML5** : Structure de l'application
- **CSS3** : Styles et thème sombre
- **JavaScript (ES6+)** : Logique de l'application
- **Web Speech API** : Prononciation des verbes
- **jsPDF** : Génération de PDFs
- **LocalStorage** : Stockage local des données

## 📝 Notes

- Les données sont stockées localement dans le navigateur (localStorage)
- Aucune connexion Internet n'est requise après le chargement initial
- L'application fonctionne entièrement côté client
- Compatible avec tous les navigateurs modernes

## 📄 Licence

Ce projet est libre d'utilisation pour l'apprentissage.

## 👤 Auteur

Créé pour faciliter l'apprentissage des verbes irréguliers anglais.

---

**Bon apprentissage ! 📚✨**

