var express = require('express');
var router = express.Router();
const { limiterConsecutiveFailsByPseudo, MAX_CONSECUTIVE_FAILS_BY_USERNAME } = require('../rate-limiting');
const database = require('../db');

//Ressource exposée pour se logger, protégée par une politique de rate-limiting
router.post('/login', async (req, res) => {
    try {
        //Service de login
        await logAdmin(req, res);
    } catch (err) {
        res.status(500).end();
    }
});

function authenticate(pseudo, password) {

    const isLoggedIn = pseudo === database.admin.pseudo && password === database.admin.password;

    return {
        pseudo: pseudo,
        isLoggedIn: isLoggedIn
    };
}

//Service en charge du logging
async function logAdmin(req, res) {

    //Récupérer les credentials (pseudo et password)
    const pseudo = req.body.pseudo;
    const password = req.body.password;

    const userActivity = await limiterConsecutiveFailsByPseudo.get(pseudo);

    // console.log(userActivity)

    //Si le nombre de tentatives infructueuses
    if (userActivity !== null && userActivity.consumedPoints > MAX_CONSECUTIVE_FAILS_BY_USERNAME) {
        const retryInSeconds = Math.round(userActivity.msBeforeNext / 1000) || 1;
        res.set('Retry-After', String(retryInSeconds));
        res.status(429).send('Too Many Requests !');
    } else {

        const user = authenticate(pseudo, password);

        if (!user.isLoggedIn) {
            try {
                //A consommé 1 tentative
                await limiterConsecutiveFailsByPseudo.consume(pseudo);
                res.status(400).end('Vos identifiants sont invalides !');
            } catch (rlRejected) {
                if (rlRejected instanceof Error) {
                    throw rlRejected;
                } else {
                    //Indiquer dans le header le nombre de secondes avant de pouvoir faire une prochaine tentative
                    res.set('Retry-After', String(Math.round(rlRejected.msBeforeNext / 1000)) || 1);
                    res.status(429).send('Too Many Requests !');
                }
            }
        }

        if (user.isLoggedIn) {
            //Réinitialise le compteur de tentatives de connexions infructueuses
            if (userActivity !== null && userActivity.consumedPoints > 0) {
                await limiterConsecutiveFailsByPseudo.delete(pseudo);
            }

            res.end(`Authentification réussie, bienvenue ${database.admin.pseudo} !`);
        }
    }
}

module.exports = router;