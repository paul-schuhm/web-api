# API RESTful de billeterie de concerts

- [API RESTful de billeterie de concerts](#api-restful-de-billeterie-de-concerts)
  - [Lancer le projet](#lancer-le-projet)
  - [Tester](#tester)


## Lancer le projet

Générer un secret pour signer les *acces token*

~~~bash
node genkey.js
~~~

Installer les dépendances et lancer le serveur:

~~~bash
npm install
npm run start
~~~

## Tester

~~~bash
baseURL=localhost:3000
curl baseURL/concerts
~~~

S'authentifier avec l'administrateur (login `ed` et password `astrongpassword`)

~~~bash
baseURL=localhost:3000
curl -X POST $baseURL/login \
-d "pseudo=ed&password=astrongpassword"
~~~ 

Récupérer l'*acces token* (sous la clef `jwt`) et accéder à la ressource protégée "La liste des réservations confirmées pour un concert" :

~~~bash
jwt=<le token récupéré après authentification>
#Accéder à une ressource protégée
curl -X GET $baseURL/concerts/1/reservations \
-H "Authorization: Berar $jwt"
~~~