// Démo : map, filter, reduce, copies

//Filter les nombres dans un tableau

//Méthode procédurale

// const numbers = [];

// for(let i = 0 ; i !== data.length ; i++){
//     if(typeof data[i] === 'number'){
//         numbers.push(data[i]);
//     }
// }

//Méthode 'fonctionnelle' : Utiliser filter

//Array

// /**
//  * Retourne vrai si c'est un nombre, faux sinon
//  * @param {*} n 
//  * @returns 
//  */
// const filterNumber = (n) => {
//     return typeof n === 'number'
// }

// function filterNumber(n){
//     return typeof item === 'number';
// }

// const numbers2 = data.filter(filterNumber);

// const data = [1, 2, 3, 'foo bar', {}];

// //Argument : fonction qui renvoie vrai ou faux. Si c'est vrai
// const numbers2 = data.filter((item) => {
//     return typeof item === 'number'
// });


// -- Map : association un a un (transformer un élément en un autre)

// //Multiplier par 2 chaque nombre
// const numbersMulitpliedBy2 = numbers2.map((item) => {
//     return item * 2;
// });

// //De manière procédurale
// let result = [];
// for(number of numbers2){
//     result.push(number * 2);
// }
// console.log(result)
// console.log(numbers2, numbersMulitpliedBy2)

// -- Reduce : réduire une collection à un résultat (permet de faire beaucoup de choses)
// Voir la doc : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

const numbers = [1, 2, 3, 4, 5];

//Procédurale (avec des états locaux qui changent)
let sum = 0;
for(let i = 0 ; i !== numbers.length; i++){
    sum += numbers[i];
}
console.log(sum)

//Approche fonctionnelle
//Filter ? Non
//Map ? Non
//Reduce : Oui ! 

// const numbers = [1, 2, 3, 4, 5];

const sumWithReduce = numbers.reduce((accumulateur, item, currentIndex, array) => {
    console.log(accumulateur, currentIndex)
    return accumulateur + item;
}, 0 );

// Que se passe t il ?
//1er element : accumulateur = 0, item = 1, accumulateur = 0 + 1 = 1
//2eme element : accumulateur = 1, item = 2, accumulateur = 1 + 2 = 3
//3eme element : accumulateur = 3, item = 3, accumulateur = 3 + 3 = 3

console.log(sumWithReduce)










