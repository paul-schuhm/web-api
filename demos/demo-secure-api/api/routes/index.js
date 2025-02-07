var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', async function (req, res, next) {

  // #swagger.summary = "Page d'accueil"

  const conn = await db.mysql.createConnection(db.dsn);


  try {
    
    const [rows] = await conn.execute('SELECT * FROM User');

    const users = rows.map(element => {
      return {
        firstName: element.first_name
      }
    });
    res.render('index', { title: "Kit de développement RESTful Web API", 'users': users });

  } catch (error) {
    console.error('Error connecting: ' + error.stack);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });

  }
});

module.exports = router;
