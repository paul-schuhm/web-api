//Recursive vs Procédurale
//
//Trouver le nombre max dans la collection suivante:

let numbers = [1, 3, 100, -10, 250, 110];

//Procédurale
function max(numbers){

	let max = numbers[0];

	for(let item of numbers)
	{
		if(item > max)
			max = item
	}

	return max;
}

console.log(max(numbers));

//Recursive
function maxrec(numbers, length){
	//Base condition (condition d'arrêt)
	if(length === 1)
		return numbers[0];
	return Math.max(numbers[length-1], maxrec(numbers, length - 1))
}
console.log(maxrec(numbers, numbers.length));

//Functional style avec reduce
function maxred(numbers){
	return numbers.reduce((acc, current) => current > acc ? current : acc, numbers[0]);
}
console.log(maxred(numbers))

