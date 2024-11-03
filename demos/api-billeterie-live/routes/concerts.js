var express = require('express');
var router = express.Router();
var db = require('../database');
var hal = require('../hal');


router.get('/concerts', (req, res, next) => {
    const resourceObject = hal.mapConcertListToResourceObject(db.concerts);
    res.status(200).json(resourceObject);
});

router.get('/concerts/:id(\\d+)', (req, res, next) => {

    //Recuperer l'id renseigné dans le path
    const id = req.params.id;
    //Trouver le concert avec l'id demandé dans la base

    const concert = db.concerts.find((concert) => concert.id == id);

    if(concert === undefined){
        res.status(404).json({})
    }

    const concertResourceObject = hal.mapConcertToResourceObject(concert);

    res.status(200).json(concertResourceObject);
})

module.exports = router