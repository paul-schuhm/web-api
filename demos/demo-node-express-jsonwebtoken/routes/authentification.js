var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

/**
 * Secret conservé côté serveur pour signer les JWT
 */
const SECRET = 'mysecretkey'


/**
 * Simulation d'une base de données utilisateur
 */
const users = [
    {
        login: 'foo',
        password: 'FOO',
        role: 'admin'
    },
    {
        login: 'bar',
        password: 'BAR',
        role: 'visitor'
    }
];


/**
 * Une fonction helper pour retrouver le JWT dans l'en-tête de la requête HTTP
 * @param {*} headerValue 
 * @returns 
 */
const extractBearerToken = headerValue => {

    if (typeof headerValue !== 'string') {
        return false
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/**
 * Une fonction middleware vérifier le token. A placer sur une ressource protégée
 */
const checkTokenMiddleware = (req, res, next) => {

    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ "msg": "Vous n'êtes pas autorisé·e à accéder à cette ressource" })
    }

    // Véracité du token (token non modifié)
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ "msg": "Vous n'êtes pas autorisé·e à accéder à cette ressource" })
        } else {
            //On utilise la propriété res.locals pour passer des valeurs entre fonctions middleware
            //Voir https://expressjs.com/en/api.html#res.locals
            res.locals.decodedToken = decodedToken
            return next() //appeler la fonction middleware suivante (enregistrée dans le routeur)
        }
    })
}

/* Ressource "S'authentifier": fournit un JWT au client s'il s'authentifie*/
router.post('/login', async (req, res) => {

    // Pas de credentials
    if (!req.body.login || !req.body.password) {
        return res.status(400).json({ message: 'Impossible de vous identifier et de vous authentifier, merci de fournir un pseudo et un mot de passe valides !' })
    }

    //Identification
    const user = users.find((user) => user.login === req.body.login)

    if (user === undefined) {
        return res.status(400).json({ message: 'Impossible de vous identifier et de vous authentifier, merci de fournir un pseudo et un mot de passe valides !' })
    }


    //Authentification
    const isAuthenticated = user.password === req.body.password;

    if (!isAuthenticated) {
        return res.status(400).json({ message: 'Impossible de vous identifier et de vous authentifier, merci de fournir un pseudo et un mot de passe valides !' })
    }

    //Création d'un token JWT

    const token = jwt.sign({
        login: user.login,
        role: user.role,
    }, SECRET, { expiresIn: '2 weeks' })

    //Renvoie le token
    return res.status(201).json({
        "access_token": token
    })

});

/**
 * Une ressource accessible seulement aux utilisateurs authentifiés
 */
router.get('/protected', checkTokenMiddleware, (req, res, next) => {
    res.status(200).json({ "msg": "Bravo, vous êtes autorisé·e à consulter cette ressource !" })
})

/**
 * Une ressource accessible seulement aux utilisateurs authentifiés et administrateur
 */
router.get('/admin-only', checkTokenMiddleware, (req, res, next) => {

    const role = res.locals.decodedToken && res.locals.decodedToken.role

    if (role !== 'admin') {
        res.status(401).json({ "msg": "Vous n'êtes pas autorisé·e à accéder à cette ressource" })
    }

    res.status(200).json({ "msg": "Bravo, en tant qu'administrateur·ice du système, vous êtes autorisé·e à consulter cette ressource !" })
})

module.exports = router