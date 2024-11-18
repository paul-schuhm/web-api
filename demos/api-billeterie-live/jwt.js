const jsonwebtoken = require("jsonwebtoken");
const SECRET = "mysecret";
const EXPIRATION = "1 day";

//Déclarer un middleware qui vérifiera le jwt retourné par le client
//Utiliser ce middleware sur toutes les routes protégées.

/**
 * Retourne un jwt signé avec une date d'expiration
 * @param {*} login L'identifiant de l'utilisateur
 * @param {*} isAdmin
 * @returns
 */
function createJWT(login, isAdmin, expiration = EXPIRATION) {
  //Mettre le payload (données utiles à échanger entre client et serveufr)
  //Pas de données confidentielles dans le payload ! Le JWT n'est pas chiffré !
  return jsonwebtoken.sign(
    {
      login: login,
      isAdmin: isAdmin,
    },
    SECRET,
    {
      expiresIn: expiration,
    }
  );
}

module.exports = { createJWT };
