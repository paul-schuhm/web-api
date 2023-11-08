# Exercice 6 : serveur web avec Express.js

## Lancer le projet

`npm start`

> J'ai ajouté l'option `--watch` pour reload automatiquement au changement de code source.

## Réponses aux questions

2. `PUT` n'est pas idempotente ici, une deuxième requête PUT modifie l'état du compteur. PUT ne devrait pas incrémenter une valeur *de manière relative*, mais *de manière absolue* (Par exemple `PUT /increment value=5` pour mettre une valeur à 5.). Si on veut rester en accord avec l'interface commune/uniforme, il faut remplacer PUT par POST qui n'est pas sensée être idempotente.


7. Il faut le charger *après* le traitement de la requête et appeler `next()` dans le traitement de la requête.

~~~js
router.get('/users/:pseudo', (req, res, next) => {
  ///...
  next()
});

router.use('/users/:pseudo', (req, res, next) => {
  console.log(`Réponse envoyée : ${res.statusCode}`);
  console.log(`Faire quelque-chose après l'envoi de la réponse`);
  next();
});
~~~

## Requêtes cURL

~~~bash
# L'URL de base qu'on stocke dans une variable
baseURL=http://localhost:3000
# Requête OPTIONS sur /messages
curl -X OPTIONS -w "%{http_code}" $baseURL/messages
# Soumission formulaire sans message (erreur 400)
curl -X POST $baseURL/messages
# Soumission formulaire avec message (200)
curl -d"message=Un bien joli message" $baseURL/messages
# Requete HEAD
curl -I $baseURL/increment
# Requete OPTIONS
curl -X OPTIONS $baseURL/increment
# Requete liste des nombres pairs
curl "$baseURL/even-numbers?start-at=2&quantity=10&order=desc"
# Requete détail d'un utilisateur
curl "$baseURL/users/john"
curl "$baseURL/users/jane"
curl "$baseURL/users/foo"
~~~