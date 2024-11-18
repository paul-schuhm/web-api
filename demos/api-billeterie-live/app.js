var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//Importe mon routeur de concerts
var routerConcerts = require("./routes/concerts");
//Importe mon router de login
var routerLogin = require("./routes/login");
//Importe mon router des réservations
var routerReservations = require("./routes/reservations");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Enregistrer le routeur des concerts
app.use(routerConcerts, routerLogin, routerReservations);

module.exports = app;
