var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal");
var { checkTokenMiddleware } = require("../jwt");

//Ressource protégée par authentification

//Le middleware checkTokenMiddleware est appelé avant (ordre de déclaration), 
//le middleware en charge du traitement de la requête
router.get(
  "/concerts/:id(\\d)+/reservations",
  checkTokenMiddleware,
  (req, res, next) => {
    //Récupérer les données placées par le middleware précédent
    console.log(res.locals.decodedToken)
    return res.send('À implementer !')
  }
);

module.exports = router;
