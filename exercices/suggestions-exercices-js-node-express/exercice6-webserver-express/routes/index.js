var express = require('express');
var router = express.Router();

var count = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.post('/messages', function (req, res, next) {
  if (req.body && req.body.message) {
    res.status(200).send(`Voici ce que nous avons reçu : ${req.body.message}\n`);
  } else {
    res.status(400).send("Champ 'message' du formulaire manquant.\n");
  }
});

router.post('/increment', function (req, res, next) {
  count++;
  res.status(201).send(`${count}`)
});

router.get('/even-numbers', function (req, res, next) {

  ///Traitement des paramètres d'URL
  const orderValues = ['desc', 'asc'];
  const quantity = req.query.hasOwnProperty('quantity') ? parseInt(req.query['quantity']) : 100;
  const startAt = req.query.hasOwnProperty('start-at') ? parseInt(req.query['start-at']) : 0;
  const order = req.query.hasOwnProperty('order') ? req.query['order'] : 'asc';

  if (isNaN(quantity) || quantity < 0) {
    res.status(400).send('Paramètre quantity doit être un nombre positif');
    return;
  }

  if (isNaN(startAt) || startAt < 0 || startAt % 2 !== 0) {
    res.status(400).send('Paramètre start-at doit être un nombre positif pair');
    return;
  }

  if (!orderValues.includes(order)) {
    res.status(400).send(`Paramètre order peut avoir les valeurs suivantes : ${orderValues.join(',')}`);
    return;
  }

  ///Génération de la représentation de la ressource au format JSON
  let evenNumbers = [];
  let evenNumber = startAt;
  do {
    evenNumbers.push(evenNumber);
    evenNumber += 2;
  } while (evenNumbers.length !== quantity)

  if (order === 'desc') {
    evenNumbers.reverse();
  }

  //Préparation de la réponse HTTP
  res.format({
    'application/json': function () {
      res.send(evenNumbers)
    }
  }).status(200);
})

//Base de données utilisateurs
const users = [
  { pseudo: 'john', firstName: 'John', lastName: 'Doe', city: 'Cincinnati' },
  { pseudo: 'jane', firstName: 'Jane', lastName: 'Doe', city: 'Angers' },
]

//Fonction middleware qui vérifie que l'utilisateur existe
router.use('/users/:pseudo', (req, res, next) => {
  console.log('Checking user exists:', req.method)
  const pseudo = req.params.pseudo;
  const user = users.filter(user => user.pseudo === pseudo).shift()
  if (!user) {
    res.status(404).end('Cette ressource n\'existe pas');
  }else{
    next()
  }
})


router.get('/users/:pseudo', (req, res, next) => {

  const pseudo = req.params.pseudo;

  const user = users.filter(user => user.pseudo === pseudo).shift()

  if (user) {
    res.format({
      'application/json': function () {
        res.send(user)
      }
    }).status(200);

  } else {
    // Si l'utilisateur n'existe pas, renvoyez une page d'erreur
    res.status(404).send('Cette ressource n\'existe pas');
  }

  console.log('Réponse envoyée au client')
  next()
});

router.use('/users/:pseudo', (req, res, next) => {
  console.log(`Réponse envoyée : ${res.statusCode}`);
  console.log(`Faire quelque-chose après l'envoi de la réponse`);
  next();
});

module.exports = router;
