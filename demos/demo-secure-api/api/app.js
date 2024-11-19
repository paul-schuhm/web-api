require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

var app = express();

//Enleve le header indiquant que le service est implémenté avec Express
app.disable('x-powered-by')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Enregistrement d'un middleware actif uniquement en env de dev
//Si on veut autoriser une application web à lire la réponse,
//il faut moduler la SOP avec une politique CORS plus permissive.
//Autoriser les requêtes Cross Origin (CORS Policy)
if (process.env && process.env.ENV == 'dev') {
  app.use((req, res, next) => {
    //En production, on n'autorisera pas l'accès aux autres sites web à notre API ainsi, sans aucune restriction
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
}

/**
 * Enregistrement des routes
 */

//Versionner l'API

app.use('/', indexRouter, loginRouter);
app.use('/api/v1', indexRouter, loginRouter);
app.use('/api/v2', indexRouter, loginRouter);


/**
 * Configuration Swagger, exposition de l'OpenAPI Specification Document (OAD) générée sur la route /doc
 */
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Error');
});

module.exports = app;
