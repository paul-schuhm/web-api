# Démo Authentification et Autorisation par JWT, dans une application Node.js/Express.js

Dans cette démo nous allons utiliser le module jsonwebtoken.

> C'est un bon exercice d'essayer de vous passer du module et de produire, signer et vérifier le JWT *vous-même*. Cela vous permettra de bien comprendre ce qu'est et *ce que n'est pas* un JWT !

## Implémentation

Voir le code source du fichier [authentification.js](./routes/authentification.js)

## Lancer le projet

~~~
npm install
npm run start
~~~

## Requêtes HTTP pour tester l'API

~~~bash
#Une requête qui échoue
curl -X POST -d"login=foo&password=foo" localhost:3000/login
#Une requête qui réussit, récupération d'un access token (dans $token)
curl -X POST -d"login=foo&password=FOO" localhost:3000/login
#Ok
curl -H "Authorization: Bearer $token" localhost:3000/protected
#Ok
curl -H "Authorization: Bearer $token" localhost:3000/admin-only
#Une requête qui réussit, récupération d'un access token (dans $token)
curl -X POST -d"login=bar&password=BAR" localhost:3000/login
#Accès refusé (401), bar n'est pas admin
curl -H "Authorization: Bearer $token" localhost:3000/admin-only
~~~

## Références

- [Introduction to JSON Web Tokens](https://jwt.io/introduction), une introduction aux JWT en douceur
- [JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519), le standard Json Web Token (JWT)
- [RFC 9068: JWT Profile for OAuth 2.0 Access Tokens](https://oauth.net/2/jwt-access-tokens/),le standard Json Web Token (JWT) pour faire des access token (token d'authentification)
- [Décoder le JWT](https://jwt.io/), un site web pour décoder un JWT
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), implémentation en JS du standard JWT
- [Express : res.locals](https://expressjs.com/en/api.html#res.locals), propriété pour passer des valeurs dans un cycle requete-reponse entre fonctions middleware
