# Démo Node.js/Express.js et générateur de projets

Utiliser le générateur d'applications Express pour créer rapidement un squelette d'application standardisé.

- [Démo Node.js/Express.js et générateur de projets](#démo-nodejsexpressjs-et-générateur-de-projets)
  - [Installer Express](#installer-express)
  - [Utiliser le générateur d'Express](#utiliser-le-générateur-dexpress)
  - [Lancer le projet](#lancer-le-projet)
  - [Watcher les sources](#watcher-les-sources)
  - [Références utiles](#références-utiles)


## Installer Express

~~~bash
#localement
npm install express
#globalement
npm install -g express
~~~

## Utiliser le générateur d'Express

Générer un projet express d'API avec `express`

~~~bash
express --no-view
~~~

## Lancer le projet

~~~bash
npm install
node --watch ./bin/www
#ou
npm start
~~~

## Watcher les sources

Dans `package.json`, penser à modifier le script `start` en remplaçant `node ./bin/www` par `node --watch ./bin/www`. L'application Node.js se relancera automatiquement au changement des sources

~~~json
"scripts": {
    //"start": "node ./bin/www"
    "start": "node --watch ./bin/www"
  },
~~~

## Références utiles

- [Express](https://expressjs.com/fr/), le site officiel d'Express.js
- [Générateur d’applications Express](https://expressjs.com/fr/starter/generator.html)