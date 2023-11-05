var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/middlewares',
  (req, res, next) => {
    res.locals.data = 'Premier middleware';
    next();
  },
  (req, res, next) => {
    res.send(res.locals.data + ' Second middleware')
  })

module.exports = router;
