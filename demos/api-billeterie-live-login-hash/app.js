var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Importe mon routeur de concerts
var routerConcerts = require('./routes/concerts');
var routerLogin = require ('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Enregistrer le routeur des concerts

app.use(routerConcerts) ;
app.use(routerLogin) ;

module.exports = app;
