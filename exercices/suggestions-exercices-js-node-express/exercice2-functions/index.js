///## Exercice 2 : Javascript, écriture de fonctions
//1. Une fonction qui prend en argument une liste de nombres et retourne le nombre le plus grand.

//Pour générer la documentation en site web : npm install jsdoc, puis ./node_modules/jsdoc/jsdoc.js index.js 

/**
 * Retourne le plus grand nombre de la liste, null si la liste est vide
 * @param {number[]} numbers 
 * @returns {number|null} 
 */
function maxWithReduce(numbers) {
    if (Array.isArray(numbers) && numbers.length !== 0)
        return numbers.reduce((acc, current) => current > acc ? current : acc, 0)
    return null
}

/**
 * Retourne le plus grand nombre de la liste, null si la liste est vide
 * @param {number[]} numbers 
 * @returns {number|null}
 */
function maxClassic(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0)
        return null;
    let max = numbers[0];
    for (number of numbers) {
        max = number > max ? number : max;
    }
    return max;
}

const numbers = [1, 2, 3, 4, 5, 6];

console.log(maxWithReduce(numbers), maxClassic(numbers))

///2. Une fonction *récursive* qui effectue la somme d'une liste de nombres.

/**
 * Retourne la somme d'une liste de nombres de manière récursive
 * @param {number[]} numbers 
 * @returns {number}
 */
function sum(numbers) {
    //Condition d'arrêt
    if (numbers.length === 0)
        return 0;
    return numbers[0] + sum(numbers.slice(1));
}

console.log(sum(numbers))


//3. Une fonction sumInRange qui prend en argument une liste d'entiers et deux entiers `a` et `b`, avec `a < b`. Cette fonction doit retourner la somme des nombres de la liste compris entre `a` et `b` (inclus). Par exemple, si on fournit la liste `[1, 2, 3, 4]`, `a=1`, `b=3`, la fonction doit renvoyer la somme de liste filtrée `[1, 2, 3]`, soit `6`. 


/**
 * Retourne la somme des nombres compris entre les bornes a et b (inclus)
 * @param {number} a 
 * @param {number} b 
 * @param {number[]} numbers 
 * @returns {number}
 */
function sumOnRange(a, b, numbers) {
    if (a > b)
        throw new Error("a doit être plus petit que b");
    const filteredList = numbers.filter((number) => number >= a && number <= b);
    //On réutilise notre fonction de somme
    return sum(filteredList);
}

try {
    console.log(sumOnRange(1, 3, [1, 2, 3, 4]))
    console.log(sumOnRange(3, 1, [1, 2, 3, 4]))
} catch (e) {
    console.log(e.message)
}

// 4.On aimerait *généraliser* la fonction `sumInRange`. **Réécrire** la fonction précédente que l'on appellera `applyOnRange` de sorte à ce que l'on puisse lui *passer en argument une fonction f* afin de changer l'opération (pour l'instant *somme*) réalisée sur la liste des nombres filtrée. Tester votre fonction en lui passant en paramètre une fonction anonyme qui calcule le produit de tous les nombres, et une fonction anonyme qui calcule la somme des carrés.

/**
 * Retourne l'application de f sur les nombres compris entre les bornes a et b (inclus)
 * @param {number} a 
 * @param {number} b 
 * @param {number[]} numbers 
 * @param {f} f - La fonction f à appliquer sur la sélection de nombres
 * @returns {number}
 */
function applyOnRange(a, b, numbers, f) {
    if (a > b)
        throw new Error("a doit être plus petit que b");
    const selection = numbers.filter((number) => number >= a && number <= b);
    //On réutilise notre fonction de somme
    return selection.reduce((acc, current) => f(acc, current))
}

/**
 * Une fonction qui prend en argument deux nombres et réalise une opération qui retourne un nombre
 * @name f
 * @function
 * @param {number} nombre a
 * @param {number} nombre b
 * @return {number}
*/

//On reproduit le comportement de fonction sumOnRange
console.log('apply on range somme: ', applyOnRange(1, 3, [1, 2, 3, 4, 5, 6], (acc, current) => acc + current))
//Multiplication des nombres sélectionnés
console.log('apply on range produit: ', applyOnRange(1, 4, [1, 2, 3, 4, 5, 6], (acc, current) => acc * current))
//Somme des carrés
console.log('apply on range somme des carrés: ', applyOnRange(1, 3, [1, 2, 3, 4, 5, 6], (acc, current) => acc + current * current))


// 5. Une fonction qui prend *un nombre indéterminé d'arguments* où chaque argument est un mot. La fonction doit retourner les mots sous forme de liste où les mots sont triés par taille, du plus petit au plus grand. Tester votre fonction avec la chaine de caractères suivante : `Cat, Sunshine, Bicycle, Fish, Harmony, Dart, Pillow, Atmosphere, Whisper, Chocolate, Adventure`. **Bonus :** tout en conservant l’ordonnancement par taille, ajouter un tri alphabétique. Par exemple, `Cat` doit apparaître avant `Dog`.

/**
 * Retourne la liste d'items triés par taille. Si deux éléments ont la même taille ils sont triés par ordre alphabétique
 * @param  {...string} items 
 * @return {string[]} liste triée d'items
 */
function sortThings(...items) {
    items.sort((a, b) => {
        if (a.length === b.length) {
            return a - b;
        } else {
            return a.length - b.length
        }
    });
    return items.join('/');
}

const string = `Dog, Sunshine, Bicycle, Cat, Fish, Harmony, Javascript, Pillow, Atmosphere, Whisper, Chocolate, Adventure`
const words = string.split(', ')
const sorted = sortThings(...words);
console.log(sorted)


// 6. Une fonction qui renvoie vrai si une chaîne de caractères est un palindrome, faux sinon. Tester votre fonction avec le palindrome `"Engage le jeu que je le gagne"`.

/**
 * Retourne vrai si [string] est un palindrome, faux sinon
 * @param {string} string 
 * @returns {boolean}
 */
function isPalindrome(string) {
    const stringLowerCaseWithoutSpaces = string.toLowerCase().replaceAll(' ', '');
    return stringLowerCaseWithoutSpaces === stringLowerCaseWithoutSpaces.split('').reverse().join('');
}

const maybeAPalindrome = 'Engage le jeu que je le gagne';
console.log(isPalindrome(maybeAPalindrome) ? `"${maybeAPalindrome}" est un palindrome !` : `"${maybeAPalindrome}" n'est pas un palindrome`);



// 7. Une fonction qui calcule votre âge (en secondes) à l'instant actuel, à la seconde près. Affichage attendu `"1 303 236 963 secondes vécues"`.

/**
 * Retourne un message indiquant l'âge vécu en secondes
 * @param {Date} birthDate - La date et l'heure de naissance 
 * @return {string}
 */
function ageInSeconds(birthDateTime) {

    const now = new Date();
    const ageInMilliseconds = now - birthDateTime
    return `${ageInMilliseconds / 1000} secondes vécues`;
}

console.log(ageInSeconds(new Date(1989, 10, 9, 13, 0, 0)));

/**
 * 10. Affiche l'heure courante dans différentes villes du monde formaté au format français. Sortie attendue
 */
function printLocalTimesInDifferentCitiesAroundTheGlobe() {

    //On crée l'objet représentant la date et l'heure courantes
    const currentTime = new Date();

    //Créez des objets de fuseau horaire pour Paris, Londres et Sydney
    //On dit ici qu'on veut formater des dates au format français (fr-FR)
    //On précise ensuite la timezone et le style d'écriture avec un objet options
    //On crée pour chaque ville un formateur de dates que l'on configure (Intl.DateTimeFormat). 
    //Puis on s'en sert pour formater la date courante pour chaque ville
    const timeInParis = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', timeStyle: 'long' }).format(currentTime);
    const timeInLondon = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/London', timeStyle: 'long' }).format(currentTime);
    const timeInSydney = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Australia/Sydney', timeStyle: 'long' }).format(currentTime);

    console.log(`Heure à Paris : ${timeInParis}`);
    console.log(`Heure à Londres : ${timeInLondon}`);
    console.log(`Heure à Sydney : ${timeInSydney}`);
}

printLocalTimesInDifferentCitiesAroundTheGlobe();


// 9.  *Fizzbuzz*, avant d'être utilisé par les recruteur·euses pour faire passer des tests techniques, est un jeu pour apprendre la division aux enfants. Les règles sont simples : il faut compter jusqu'à un certain nombre *positif* qu'on se fixe à l'avance : si le nombre est divisible par 3 on le remplace par `"Fizz"`, si il est divisible par 5 par `"Buzz"`, s'il est divisible par 3 et 5, comme 15, par `"Fizz Buzz"`. Sinon on se contente de dire le nombre. **Écrire** la fonction `String fizzbuzzIterative(int n)` qui retourne la réponse du jeu sous forme de chaîne de caractère, où `n` représente la taille du jeu. Par exemple, `fizzbuzzIterative(15)` retournera `"1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 Fizz Buzz"`. **Réécrire** la fonction de manière *récursive* (sans structure de contrôle de boucle). **Écrire un test** (avec `assert`) qui permet de s'assurer que les deux fonctions renvoient bien la même réponse. Est-ce que ce test est suffisant pour avoir confiance en nos implémentations ?

/**
 * Retourne un jeu de Fizz Buzz de taille n. Implémentation itérative (avec état local et boucles)
 * @param {number} n 
 * @returns {string}
 */
function fizzBuzzIterative(n) {
    let game = '';
    for (let i = 1; i <= n; i++) {

        if (i % 3 === 0 && i % 5 === 0) game += 'Fizz Buzz'
        else if (i % 3 === 0) game += 'Fizz'
        else if (i % 5 === 0) game += 'Buzz'
        else game += i;

        if (i !== n) game += " "
    }
    return game;
}

/**
 * Retourne un jeu de Fizz Buzz de taille n. Implémentation récursive
 * @param {number} n 
 * @returns {string}
 */
function fizzBuzzRecursive(n) {
    if (n === 1)
        return '1';
    if (n % 3 === 0 && n % 5 === 0) return fizzBuzzRecursive(n - 1) + ' Fizz Buzz'
    if (n % 5 === 0) return fizzBuzzRecursive(n - 1) + ' Buzz'
    if (n % 3 === 0) return fizzBuzzRecursive(n - 1) + ' Fizz'
    return fizzBuzzRecursive(n - 1) + ` ${n}`;
}

console.log(fizzBuzzIterative(15))
console.log(fizzBuzzRecursive(15))
console.assert(fizzBuzzIterative(15) === fizzBuzzRecursive(15), 'Les deux implémentations ne retournent pas la même réponse !')


// 10. Une fonction `chooseOperation` qui prend en argument deux entiers `a` et `b`. Si `a` > `b`, la fonction doit retourner une fonction qui effectue le produit deux nombres, une fonction qui effectue la division entière de deux nombres sinon.

/**
 * Retourne une fonction opérant une multiplication si a > b, une division sinon
 * @param {*} a 
 * @param {*} b 
 * @returns {function}
 */
function chooseOperation(a, b) {
    if (a < b) {
        return (a, b) => a * b;
    } else {
        return (a, b) => Math.floor(a / b);
    }
}

console.log(chooseOperation(2, 3)(2, 3), chooseOperation(3, 2)(3, 2))


//11. Une fonction `deriv` qui retourne la *dérivée* d'une fonction `f` mathématique à une seule variable. On rappelle que la dérivée d'une fonction en un point x est définie par `(f(x+dx)-f(x)/dx)` avec `dx << 1`. On prendra `dx=0.000001`. Évaluer la fonction qui à x associe x³ en `x=2`. Évaluer sa dérivée au même point. Sortie attendue : 8 et 12

/**
 * Retourne la dérivée de la fonction f
 * @param {function} f 
 * @returns {function}
 */
function deriv(f) {
    const dx = 0.000001;
    return (x) => {
        return (f(x + dx) - f(x)) / dx;
    }
}

//La fonction cube
const f = x => x ** 3;
//On calcule sa dérivée
const derivF = deriv(f);
console.log(f(2), derivF(2));

// 12. Une fonction `addItems(list, ...elements)` qui ajoute des éléments `elements` à un tableau *sans modifier le tableau original* et retourne le résultat.

/**
 * Retourne une nouvelle liste contenant les [elements]
 * @param {any[]} list 
 * @param  {...any} elements 
 * @returns {any[]}
 */
function addItems(list, ...elements) {
    //On crée une copie pour ne pas modifier la liste originale, 
    //car les tableaux (comme les objets) sont passés par référence
    let copy = Array.from(list);
    copy.push(...elements)
    return copy;
}

const list = [1, 2, 3];
const newList = addItems(list, 4, 5, 6);
console.log(list) // [1,2,3]
console.log(newList) // [1,2,3,4,5,6]