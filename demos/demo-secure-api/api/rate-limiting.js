//@See: https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#minimal-protection-against-password-brute-force
const Redis = require('ioredis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
require('dotenv').config()

//Création du client Redis, utilisé par les limiteurs
//pour stocker les données liées aux tentatives de connexions par user (map)
//L'avantage d'utiliser redis au lieu de la mémoire du processus Node.js est
//de conserver les données en cas de crash du processus et de pouvoir les persister
//sur disque à intervalles réguliers pour audit.
const redisClient = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: "redis", // Redis host (nom du service sur le projet compose)
});

const MAX_CONSECUTIVE_FAILS_BY_PSEUDO = process.env.MAX_CONSECUTIVE_FAILS_BY_PSEUDO;
const DURATION_IN_HOURS_SINCE_FIRST_TRY = process.env.DURATION_IN_HOURS_SINCE_FIRST_TRY;
const BLOCK_DURATION_IN_MINUTES = process.env.BLOCK_DURATION_IN_MINUTES;

//Limiter de tentatives d'authentification successives pour un user (Username = pseudo)
const limiterConsecutiveFailsByPseudo = new RateLimiterRedis({
    storeClient: redisClient, // la référence vers un client redis pour communiquer avec le serveur redis
    keyPrefix: 'login_fail_consecutive_username', //prefix de la clef dans la base de redis
    points: MAX_CONSECUTIVE_FAILS_BY_PSEUDO, // Nombre de tentatives d'authentification maximales avant blocage
    duration: 60 * 60 * DURATION_IN_HOURS_SINCE_FIRST_TRY, // Durée sur laquelle monitorer les tentatives d'authentificationé successives échouées
    blockDuration: 60 * BLOCK_DURATION_IN_MINUTES, //Durée durant laquelle l'user ne peut s'authentifier
});

module.exports = {limiterConsecutiveFailsByPseudo, MAX_CONSECUTIVE_FAILS_BY_PSEUDO}