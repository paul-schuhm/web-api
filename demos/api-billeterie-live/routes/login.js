var express = require("express");
var router = express.Router();
var database = require("../database");
var hal = require("../hal");
var bcrypt = require("bcrypt");
var jsonwebtoken = require("jsonwebtoken");


/**
 * Retourne vrai si l'user est authentifié par le système, faux sinon
 * @param {} login
 * @param {*} password
 * @returnsbcrypt
 */
function authenticate(login, password) {
  const user = database.users.find((user) => {
    //compareSync(password en clair, password hashé en base)
    return user.pseudo === login && bcrypt.compareSync(password, user.password);
  });

  if (user === undefined) return false;

  return true;
}

function findUserByPseudo(pseudo) {
  return users.find((user) => user.pseudo === pseudo);
}

/**
 * Retourne vrai si l'user est admin, faux sinon
 * @param {} pseudo
 * @returns
 */
function isAdmin(pseudo) {
  const user = findUserByPseudo(pseudo);
  return user && user.isAdmin;
}

router.post("/login", (req, res, next) => {
  const login = req.body.pseudo;
  const password = req.body.password;

  if (authenticate(login, password)) {
    if (!isAdmin(login, password)) {
      //A completer avec une reponse propre
      res.status(401).send("Go away !");
      return;
    }

    //User est authentifié et admin

    //Génération d'un JSON Web Token
   

    //Si réussi, on va fournir un hypermédia JSON HAL (lien vers reservations pour un concert + access token)
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/login"),
        //Indiquer au client les URL /concerts/1/reservations, /concerts/2/reservations, etc.
        reservations: hal.halLinkObject(
          "/concerts/{id}/reservations",
          "string",
          "",
          true
        ),
      },
      jwt: "json web token à implémenter",
      message: `Bienvenue ${login} !`,
    };

    res.status(200).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  } else {
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/login"),
      },
      message: "Vos identifiants sont invalides. Merci de rééssayer.",
    };
    //Sinon, on retourne un message d'erreur
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }
});

module.exports = router;
