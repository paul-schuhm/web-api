# Démo - Mise en place d'un service web (plus) sécurisé

Cette démo illustre quelques bonnes pratiques de sécurité pour déployer un service web avec Node.js.

> Cette démo est incomplète ! Ne pas oublier également que sécuriser une application est une lutte permanente.

- [Démo - Mise en place d'un service web (plus) sécurisé](#démo---mise-en-place-dun-service-web-plus-sécurisé)
  - [Lancer la démo](#lancer-la-démo)
  - [Arrêter la démo](#arrêter-la-démo)
  - [Utiliser la démo](#utiliser-la-démo)
    - [Inspecter Redis](#inspecter-redis)
    - [Protection contre le *password brute-force* (limiter les tentatives d'authentification)](#protection-contre-le-password-brute-force-limiter-les-tentatives-dauthentification)
    - [Rate-limiting, fixer des limites sur le débit (nombre de requêtes par unité de temps)](#rate-limiting-fixer-des-limites-sur-le-débit-nombre-de-requêtes-par-unité-de-temps)
    - [Implémenter votre propre politique de sécurité](#implémenter-votre-propre-politique-de-sécurité)
    - [Utiliser un gestionnaire de processus Node](#utiliser-un-gestionnaire-de-processus-node)
  - [Références utiles](#références-utiles)


## Lancer la démo

~~~bash
docker compose watch
~~~

## Arrêter la démo

~~~bash
docker compose down
~~~

## Utiliser la démo

### Inspecter Redis

Ouvrir un client redis sur le serveur redis:

~~~bash
docker exec -it demo-rest-api-redis redis-cli
~~~

Inspecter les clefs

~~~bash
KEYS '*'
GET <key>
~~~

> [Consulter la documentation et les guides de redis](https://redis.io/docs/latest/develop/get-started/)

### Protection contre le *password brute-force* (limiter les tentatives d'authentification)

L'URL d'authentification `/login` est protégée contre *le brute-force*. Cette protection permet de bloquer un compte utilisateur après un certain nombre de tentatives d'authentification échouées sur une période donnée, indiquant une activité malveillante.

Dans cette démo, la base de données est *mockée*. L'administrateur du site peut se connecter sur l'URL `/login` avec ses credentials : 

- pseudo: `ed`;
- password: `astrongpassword`;

S'authentifier:

~~~bash
curl -X POST localhost:5001 -d "pseudo=ed&password=astrongpassword"
~~~

La protection anti *brute-force* dispose des paramètres suivants, définis dans le fichier d'environnement (`.env`) :

- `MAX_CONSECUTIVE_FAILS_BY_USERNAME`;
- `DURATION_IN_HOURS_SINCE_FIRST_TRY`;
- `BLOCK_DURATION_IN_MINUTES`;

Simuler une attaque brute-force avec cURL :

~~~bash
#Envoi 50 requêtes d'affilée sur l'url /login
for i in {1..50}; do curl -X POST localhost:5001 -d "pseudo=ed&password=astrongpassword"; done
~~~

### Rate-limiting, fixer des limites sur le débit (nombre de requêtes par unité de temps)

En plus du *brute-force*, il faut imposer **un taux de requêtes limité par client** (identifiée par une adresse IP).

> [Voir un exemple d'implémentation avec Express](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection)

> À venir..;

### Implémenter votre propre politique de sécurité

> À venir...

### Utiliser un gestionnaire de processus Node

Utiliser le gestionnaire de processus Node , comme [pm2](https://github.com/Unitech/pm2). Cet outil permet de :

- Redémarrer l'application Node en cas de crash;
- Reload l'application sans *downtime* ;
- Créer un *pool* de processus Node (*cluster*) pour traiter les requêtes HTTP entrantes en parallèles avec un load balancer intégré;
- Monitorer les processus et générer des logs;


~~~bash
pm2-runtine ./bin/www --name webapi -i 4
~~~

> Ici on utilise [pm2-runtime](https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/), binaire adapté pour exécution dans un conteneur Docker.

Monitorer les processus Node :

~~~bash
#Monitoring dans la console des processus
docker exec -it demo-rest-api-api node_modules/pm2/bin/pm2 monit
#Lister les processus gérés par pm2
docker exec -it demo-rest-api-api node_modules/pm2/bin/pm2 list
~~~

## Références utiles

- [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Production best practices: performance and reliability](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Health Checks and Graceful Shutdown](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html)
- [node-rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible), paquet pour la gestion du rate-limiting (utilise redis);
- [Express middleware rate limiting](https://github.com/animir/node-rate-limiter-flexible/wiki/Express-Middleware), déplacer la logique de rate-limiting dans un middleware pour le réutiliser sur plusieurs routes;
- [Redis Docker Image](https://hub.docker.com/_/redis), image Docker redis pour stocker des données en mémoire (rate-limiting), indépendemment du processus Node (mémoire conservée si le processus crashe ou redémarre)
- [ioredis](https://github.com/redis/ioredis), client redis utilisé dans l'application Node.js
- [Dépôt sur la sécurité des applications web](https://github.com/paul-schuhm/securite-applications-web), bibliographie et démos commentées sur quelques attaques;