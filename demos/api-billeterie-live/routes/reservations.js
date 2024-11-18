var express = require('express');
var router = express.Router();
var db = require('../database');
var hal = require('../hal');

//Ressource protégée par authentification
router.get('/concerts/:id(\\d)+/reservations', (req, res, next) => {

});


module.exports = router;
