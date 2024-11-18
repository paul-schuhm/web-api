var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal");
var { checkTokenMiddleware } = require("../jwt");

//Ressource protégée par authentification
//Le middleware checkTokenMiddleware est appelé, puis celui qui est déclaré si next()
router.get(
  "/concerts/:id(\\d)+/reservations",
  checkTokenMiddleware,
  (req, res, next) => {
    console.log("traitement de la requête");
    res.send('A implementer...')
  }
);

module.exports = router;
