# Tetris Game

## Description
Ce projet est une implémentation simple du jeu classique Tetris, développée en HTML, CSS et JavaScript. Il inclut des fonctionnalités de base comme le déplacement, la rotation des pièces, la gestion du score, l'affichage de la prochaine pièce, et des effets sonores pour les actions du jeu. L'arrière-plan utilise une image personnalisée, et le jeu est stylisé avec une esthétique rétro.

## Fonctionnalités
- **Grille de jeu** : Grille 12x20 pour empiler les pièces Tetris.
- **Pièces Tetris** : 7 pièces classiques (I, L, J, O, T, S, Z) avec des couleurs distinctes.
- **Contrôles** :
  - Flèche gauche : Déplacer la pièce à gauche.
  - Flèche droite : Déplacer la pièce à droite.
  - Flèche bas : Accélérer la chute.
  - Flèche haut : Faire pivoter la pièce.
  - Bouton "Démarrer/Pause" : Lancer ou mettre en pause le jeu.
- **Score** : 10 points par ligne complétée, avec un multiplicateur pour plusieurs lignes consécutives.
- **Prochaine pièce** : Affiche la prochaine pièce dans un canvas séparé.
- **Sons** : Effets sonores pour le déplacement, la rotation, la suppression de lignes et la fin de partie.
- **Arrière-plan personnalisé** : Utilise une image de fond (`images/background.jpg`).

## Prérequis
- Un navigateur web moderne (Chrome, Firefox, etc.).
- Un serveur local pour exécuter le jeu (par exemple, `python -m http.server`) afin d'éviter les erreurs CORS lors du chargement des fichiers MP3 et de l'image de fond.
- Quatre fichiers MP3 pour les effets sonores (disponibles sur des sites comme freesound.org) :
  - `move.mp3` : Son pour le déplacement latéral.
  - `rotate.mp3` : Son pour la rotation.
  - `line.mp3` : Son pour la suppression d'une ligne.
  - `gameover.mp3` : Son pour la fin de partie.
- Une image de fond (ex. : `background.jpg`) placée dans le dossier `images/`.

## Installation
1. Clonez ou téléchargez ce projet dans un dossier local.
2. Assurez-vous que la structure des fichiers est la suivante :
   ```
   tetris/
   ├── index.html
   ├── style.css
   ├── tetris.js
   ├── images/
   │   └── background.jpg
   ├── sounds/
   │   ├── move.mp3
   │   ├── rotate.mp3
   │   ├── line.mp3
   │   └── gameover.mp3
   └── README.md
   ```
3. Placez votre image de fond dans `images/background.jpg`. Si vous utilisez un nom ou un chemin différent, mettez à jour `style.css` (propriété `background-image`).
4. Placez les fichiers MP3 dans le dossier `sounds/`. Assurez-vous que les noms correspondent à ceux utilisés dans `tetris.js`.
5. Lancez un serveur local pour tester le jeu :
   ```bash
   python -m http.server 8000
   ```
6. Ouvrez votre navigateur et accédez à `http://localhost:8000`.

## Utilisation
1. Ouvrez `index.html` dans un navigateur via le serveur local.
2. Cliquez sur le bouton **Démarrer/Pause** pour lancer le jeu.
3. Utilisez les touches fléchées pour contrôler les pièces :
   - **Flèche gauche** : Déplacer à gauche.
   - **Flèche droite** : Déplacer à droite.
   - **Flèche bas** : Accélérer la chute.
   - **Flèche haut** : Faire pivoter la pièce.
4. Complétez des lignes horizontales pour augmenter votre score. Le jeu se termine si les pièces atteignent le haut de la grille.

## Structure des fichiers
- `index.html` : Structure HTML avec le canvas principal, le canvas pour la prochaine pièce, et l'interface utilisateur.
- `style.css` : Styles pour l'arrière