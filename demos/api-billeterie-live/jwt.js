const jsonwebtoken = require('jsonwebtoken');
const secret = "mysecret";

//Déclarer un middleware qui vérifiera le jwt retourné par le client
//Utiliser ce middleware sur toutes les routes protégées.

/**
 * Retourne un jwt signé avec une date d'expiration
 * @param {*} login 
 * @param {*} isAdmin 
 * @returns 
 */
function createJWT(login, isAdmin, expiration = '1 day') {
  return jsonwebtoken.sign(
    {
      login: login,
      isAdmin: isAdmin,
    },
    secret, {
        expiresIn: expiration
    }
  );
}

module.exports = {createJWT}
