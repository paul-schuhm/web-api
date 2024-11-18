const fs = require("fs");
const jsonwebtoken = require("jsonwebtoken");

//Paramètres du JWT
const SECRET = fs.readFileSync("private.key");
const EXPIRATION = "1 day";

/**
 * Retourne le jwt s'il est présent dans le header d'authorization
 * @param {*} headervalue 
 * @returns 
 */
const extractBearerToken = (headervalue) => {
  if (typeof headervalue !== "string") {
    return false;
  }
  const matches = headervalue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};


/**
 * Middleware de 'guard', vérifie le token s'il est présent
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const checkTokenMiddleware = (req, res, next) => {
  //Le JWT est placé dans le header Authorization
  //Recupere le jwt envoyé par le client
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  //Si pas de jwt
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Vous n'êtes pas autorisé-e à accéder à cette ressource." });
  }

  //Vérification du jwt
  jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {
    //La vérification a échoué
    if (err) {
      res
        .status(401)
        .json({
          msg: "Vous n'êtes pas autorisé-e à accéder à cette ressource.",
        });
        return;
    }

    //partager des données entre middlewares (utiliser propriété res.locals)
    res.locals.decodedToken = decodedToken
    //Passer au middleware suivant
    next();
  });
};

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
