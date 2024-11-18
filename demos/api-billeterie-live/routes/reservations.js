var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal");
var { checkTokenMiddleware } = require("../jwt");

//Ressource protégée par authentification
router.get("/concerts/:id(\\d)+/reservations", (req, res, next) => {
  //Vérifier le jwt avant de poursuivre.
});

module.exports = router;
