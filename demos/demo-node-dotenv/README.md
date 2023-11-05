# Démo Node.js sur les variables d'environnement

Utiliser les variables d'environnement de Node.js avec `process.env` et les fichiers `.env`

## Personnaliser les variables d'environnement

Créer un fichier .env

~~~INI
PORT=5009
DEFAULT_MESSAGE='Hello World'
~~~

Installer le module dotenv pour charger le fichier automatiquement

~~~bash
npm install dotenv
~~~

Dans vos sources, charger le paquet et appeler la fonction `config()`

~~~js
//Charger le fichier .env
require('dotenv').config()
~~~

## Lancer le projet

~~~bash
npm install
node --watch index.js #ou npm start
curl localhost:5009 #Affiche 'Hello World!'
~~~

## Autres méthodes pour charger ou modifier les variables d'environnement

~~~bash
# Charger le fichier sans importer le module
node -r dotenv/config index.js
# Déclarer/Surcharger une variable d'environnement avant l’exécution de l'application
NODE_ENV=production node --watch index.js
# Déclarer/Surcharger une variable d'environnement avant l’exécution de l'application
PORT 5009 node index.js
~~~

## Conseils sur les fichiers de variable d'environnement

- Placer y les credentials et informations sensibles (ex: clé API), jamais *directement* dans votre code : 
  - Si le code est sur un dépôt, ces informations privées seront visibles par tout le monde
  - Si vous voulez modifier une variable d'environnement vous devez recompiler le code et relancer l'application
- Ajouter le fichier `.env` au `.gitignore`, *vous ne devez pas le tracker*. Tracker plutôt un fichier `.env.dist` si vous voulez guider l'utilisateur ou placer des informations par défaut. Au clonage du dépôt, en faire une copie `cp .env.dist .env`. Ainsi, chaque utilisateur aura sa config locale de l'environnement sans embêter les autres ni partager des informations sensibles
- Le fichier `.env` *ne doit pas être accessible sur le serveur web* (exposé comme une ressource). Placer le *en dehors* du dossier pointé par le programme serveur/virtual host, dans un endroit sécurisé. Configurer les droits (UNIX) en lecture/écriture sur le fichier pour restreindre l'accès

## Ressources utiles

- [dotenv](https://www.npmjs.com/package/dotenv), le paquet dotenv
- [How to read environment variables from Node.js](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs), documentation officielle
