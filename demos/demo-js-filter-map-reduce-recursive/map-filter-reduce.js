const items = [1, true, 2, 100, -5.2, 'a', {a:1, b:2}]

//On a une liste de données. On ne veut récupérer que les nombres,
//les multiplier par 2, et faire la somme.


//filter: Filtrer les items qui sont des nombres
const numbers = items.filter((item) => typeof item === 'number')

//Mapper : transformer un à un. Multiplier les nombres par 2

const numbersMultipliedBy2 = items
	.filter((item) => typeof item === 'number')
	.map((number) => number * 2)

console.log(numbersMultipliedBy2);

//Faire la somme de tous les nombres multipliés par 2

const sum = items
	.filter((item) => typeof item === 'number')
	.map((number) => number * 2)
	.reduce((acc, current) => acc + current)

console.log(sum)
