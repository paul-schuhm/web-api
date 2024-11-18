const fs = require('fs');

const jsonwebtoken = require("jsonwebtoken");

const SECRET = fs.readFileSync('private.key');

const EXPIRATION = "1 day";

//Déclarer un middleware qui vérifiera le jwt retourné par le client
//Utiliser ce middleware sur toutes les routes protégées.


const extractBearerToken = headervalue => {
    if(typeof headervalue !== 'string'){
        return false;
    }
    const matches = headervalue.match('/(bearer)\s+(\S+)/i');
    return matches && matches[2];
}


const checkTokenMiddleware = (req, res, next) => {

    //Recupere le jwt envoyé par le client




    //Le JWT est placé dans le header Authorization
    // const token = req.headers.authorization;
    // console.log(token);
    // return;
    console.log('Vérifier le jwt');
    next();
}


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

module.exports = { createJWT, checkTokenMiddleware };
