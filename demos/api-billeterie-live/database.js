var bcrypt = require('bcrypt');

//Salt pour le hashage des mots de passe
const saltOrRounds = 5;

//Les Modèles de données

class Concert {
  constructor(id, artistName, date, location, description, nbSeats) {
    this.id = id;
    this.artistName = artistName;
    this.date = date;
    this.location = location;
    this.description = description;
    this.nbSeats = nbSeats;
  }
}

class Reservation {}


class User {
  constructor(pseudo, password = '', isAdmin = false){
    this.pseudo = pseudo;
    //On conserve les mots de passe hashés
    this.password = bcrypt.hashSync(password, saltOrRounds );
    this.isAdmin = isAdmin
  }
}

//La base de données
const concerts = [
  new Concert(
    1,
    "Taylor Swift",
    new Date(2024, 11, 22, 20, 0, 0),
    "Stereolux",
    "Lorem ipsum",
    1000
  ),
  new Concert(
    2,
    "Sting",
    new Date(2025, 1, 13, 21, 30, 0),
    "Stereolux",
    "Lorem ipsum",
    500
  ),
];

//On imagine que l'admin a lui même fourni les données
const users = [new User('ed', 'astrongpassword', true)];

const reservations = [];

module.exports = { concerts, users };
