var express = require("express");
const router = express.Router();
const db = require("../database");
var bcrypt = require('bcrypt');


function authenticate(login, password) {
  const user = db.users.find((user) => {
    return user.login === login && bcrypt.compare(password, user.password);
  });
  return user ? true : false
}

router.post("/login", (req, res, next) => {
  const login = req.body.pseudo;
  const password = req.body.password;
  console.log(authenticate(login, password))
  res.end();
});

module.exports = router;
