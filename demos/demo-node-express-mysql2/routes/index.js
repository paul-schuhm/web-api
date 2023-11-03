var express = require('express');
var router = express.Router();
//Module mysql2 sans l'api des promesses (avec callback)
const mysqlCallback = require('mysql2');
//Module mysql2 avec l'api des promesses
const mysql = require('mysql2/promise');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Informations de connexion à la base (DSN)
 */
const dsn = {
  host: '127.0.0.1',
  database: 'mydb',
  user: 'user',
  password: 'password',
  port: 5002
};

// Une connexion à la base de données qui n'utilise pas l'API des promesses
const connectionUsingCallBack = mysqlCallback.createConnection(dsn);

/**
 * Un simple test sans l'API des promesses
 */
router.get('/test-without-promises-api', async function (req, res, next) {
  //Requête avec une callback
  connectionUsingCallBack.execute(
    'SELECT * FROM `User`',
    function (err, results, fields) {
      res.send(results)
    }
  );
})

/**
 * Un simple test avec l'API des promesses de mysql2
 */
router.get('/test-with-promises-api', async function (req, res, next) {
  //Requête avec une promesse
  const connection = await mysql.createConnection(dsn);
  const [result] = await connection.execute('SELECT * FROM User')
  res.send(result)
})

/**
 * Test des requêtes préparées
 */
router.get('/test-prepared-statement', function (req, res, next) {
  //Requête préparée avec une callback
  connectionUsingCallBack.execute(
    //Données remplacées par un placeholder '?', puis données ensuite dans un tableau (même ordre)
    'SELECT * FROM `User` WHERE `first_name` = ? OR `first_name` = ?',
    ['John', 'Eve; DROP TABLE users'], //tentative d'injection SQL écartée
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
      res.send(results)
    }
  );
})

/**
 * Enchaîner des requêtes (attendre le resultat de la précédente pour effectuer la suivante sans bloquer l'application)
 * avec l'API des promesses (éviter le callback hell de mysqlCallBack)
 */
router.get('/test-chaining-sql-requests', async function (req, res, next) {
  //Requêtes préparées et enchainées avec les promesses (sans callback hell)
  const connection = await mysql.createConnection(dsn);
  const [rows1, fields1] = await connection.execute('SELECT * FROM `User` WHERE `first_name` = ?', ['John']);
  const [rows2, fields2] = await connection.execute('SELECT * FROM `User` WHERE `first_name` = ?', ['Eve']);
  console.log(rows1)
  res.send([rows1, rows2])
})

module.exports = router;
