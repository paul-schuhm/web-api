//J'importe le code dans le module 'user.js' (dépendance)
//require retourne un objet Javascript
const user = require('./user');

//Inspecter le module
console.log(typeof user);
console.log(user.isAdult);

//Je travaille avec le contenu du module
const users = user.users;
const adults = users.filter(user.isAdult);