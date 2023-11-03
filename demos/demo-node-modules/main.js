///Importer le module
const colors = require('./colors')
//Afficher le contenu du module
console.log(colors);
//Appeler une fonction exposée du module
console.log(colors.randomColor());
//Erreur : la classe Color est privée au module
// let color = new colors.Color('black', '#000000');
// console.log(color)