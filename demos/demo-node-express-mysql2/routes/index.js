var express = require('express');
var router = express.Router();
const mysql  = require('mysql2')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//Ouvrir une connexion
const connection = mysql.createConnection({
  host: '127.0.0.1',
  database: 'mydb',
  user: 'user',
  password: 'password',
  port: 5002
})
connection.connect()

router.get('/test', function (req, res, next) {
  //Tester
  connection.query('SELECT * FROM User', (err, rows, fields) => {
    if (err) throw err
    res.send(rows);
  })
})

module.exports = router;
