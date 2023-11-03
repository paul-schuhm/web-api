# Démo application Node.js/Express.js avec connexion à une base de données relationnelle avec mysql2

Une simple démo d'application Node.js/Express.js connectée à une base de données MySQL avec le module [mysql2](https://www.npmjs.com/package/mysql2)

- [Démo application Node.js/Express.js avec connexion à une base de données relationnelle avec mysql2](#démo-application-nodejsexpressjs-avec-connexion-à-une-base-de-données-relationnelle-avec-mysql2)
  - [Pré-requis](#pré-requis)
  - [Lancer le projet](#lancer-le-projet)
  - [Références utiles](#références-utiles)


## Pré-requis

Cloner et installer le dépôt [starterpack](https://github.com/paul-schuhm/starterpack-api-nodejs), en suivant les instructions. 

> Alternativement, [installer MySQL](https://dev.mysql.com/downloads/installer/) sur votre machine.

## Lancer le projet

Lancer le conteneur MySQL du starter

> Alternativement, utiliser le serveur MySQL installé sur votre machine en changeant l’hôte, le port et la base de données

~~~
docker-compose up -d
~~~

> Cela lancera les autres conteneurs également mais ce n'est pas un problème. 

Lancer l'application Node.js/Express.js sur votre machine hôte

~~~bash
npm install
node --watch ./bin/www
#ou
npm start
~~~

Tester

~~~bash
curl localhost:3000/test
~~~

## Références utiles

- [Le starter pack API](https://github.com/paul-schuhm/starterpack-api-nodejs) (Node.js/Express.js, MySQL et Adminer)
- [mysql2](https://www.npmjs.com/package/mysql2), le module client mysql qui implémente l'API des promesses
- [Adminer](https://www.adminer.org/), le site officiel d'Adminer, un outil de gestion de base de données graphique qui tient dans un seul fichier PHP