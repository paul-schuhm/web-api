# Suggestion pour l'exercice 1

## Lancer le jeu

~~~
npm install
npm run start-game
~~~

## Réponses aux questions

## 1. Implémenter le jeu

Voir le [code source commenté](./game.js)

### 2. A quoi sert `node --watch` ?

`node --watch` permet d'*observer* les sources, si une source *change* (édition du code source), node relance l’exécution du script automatiquement. Très utile en développement. Avec cette option, il n'est pas nécessaire d'utiliser nodemon pour développer.

### 3. A quoi sert `node --check` ?

`node --check` permet de valider *la syntaxe* de votre script (parenthèse manquante, guillemet en trop, etc.) Utile pour faire une vérification de syntaxe rapidement avant de tester le code.

> Pour vois toutes les options de node, exécuter la commande `node --help` et [consulter la documentation officielle consacrée à l'API de la ligne de commande de node](https://nodejs.org/api/cli.html#command-line-api)