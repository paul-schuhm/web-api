/**
 * Données test
 */

const users = [{ name: 'Jane', age: 12, nbPosts: 12 }, { name: 'John', age: 28, nbPosts: 0 }, { name: 'Derek', age: 18, nbPosts: 3 }, { name: 'Andrea', age: 35, nbPosts: 6 }];

/**
 * En utilisant UNIQUEMENT filter, map ou reduce:
 *  - retourner les users dont le nom commence par la lettre J (insensible à la casse)
 *  - retourner les users qui sont majeurs (>= 18 ans)
 *  - retourner chaque user avec une nouvelle clef 'selected' et la valeur "yes" s'ils sont majeurs
 *  - retourner le nombre total de posts publiés par les utilisateurs sélectionnés
 *  - Bonus: retourner les users dont le nom commence par la lettre D (insensible à la casse). Que constatez vous ? Fabriquer une fonction qui retourne un filtre
 */



const usersWithNameStartingWithJ = users.filter((user) => {
    return user.hasOwnProperty('name') && user.name.toLowerCase().charAt(0) == 'j'
})

console.log('Utilisateurs dont le nom commence par J:', usersWithNameStartingWithJ)

const usersWhoAre18OrAbove = users.filter((user) => {
    return user.hasOwnProperty('age') && user.age > 18;
});

const selectedUsers = usersWhoAre18OrAbove.map((user) => {
    return { ...user, "selected": "yes" };
})

console.log('selected users: ', selectedUsers)

const nbTotalOfPosts = selectedUsers.reduce((acc, user) => {
    return acc + user.nbPosts
}, 0);

console.log('Nombre total de posts publiés par des users sélectionnés', nbTotalOfPosts)

//Filtres

const filterUserAboveOrEqual18 = (user) => {
    return user.age >= 18;
}

//Mapper

const mapToSelectedUser = (user) => {
    return { ...user, "selected": "yes" };
}

/**
 * Ok, mais je constate que je ne peux pas réutiliser mon filtre précédent sur la lettre J, je dois réécrire le même code. Pas terrible. Je ne peux pas passer la lettre en paramètre à ma callback (donc je dois la définir en dehors quelque part)
 */
const usersWithNameStartingWithD = users.filter((user) => {
    return user.hasOwnProperty('name') && user.name.toLowerCase().charAt(0) == 'd'
})

//2 options pour remédier à ça :

//1ere option : on pourrait faire ça :

/**
 * Retourne la liste filtrée d'user dont le nom commence par la lettre [letter]
 * @param {array} users 
 * @param {string} letter 
 * @returns array
 */
function filterByNameStartingWithRes(users, letter) {
    //Mais... vous ne pouvez pas réutiliser ce filtre ailleurs dans votre code !
    //Et qui me garantit sans regarder ce code que cette fonction ne fait pas d'autres trucs que filtrer ? Rien.
    return users.filter((user) => user.name.toLocaleLowerCase().charAt(0) === letter);
}

/**
 * Mais : 
 * - On ne peut pas réutiliser le filtre ! (pour l'appliquer sur autre chose que users par exemple)
 * - L'interface de la fonction est plus complexe (on passe users et la lettre)
 * - On n'est pas garantit que la fonction ne fasse pas "autre chose" en plus du filtre sans regarder son code source (charge mentale en plus)
 * (elle pourrait modifier users, ou faire une autre action sur autre chose, etc.)
 */

//2eme option : une fonction qui retourne un filtre pour une lettre donnée

/**
 * Retourne un filtre sur les noms commençant par la lettre {letter}
 * @param {string} letter 
 * @returns {function}
 */
function filterByNameStartingWith(letter) {
    return (user) => {
        return user.hasOwnProperty('name') && user.name.toLowerCase().charAt(0) == letter
    }
}

// Avantages : 
// - Ici on sait que chaque fonction passée dans filter est un filtre (retourne
//  vrai ou faux) et ne fait rien d'autre, interface est claire, pas d'embrouille. Si bien nommé, je n'ai pas besoin de regarder son code
// - On peut réutiliser le filtre au besoin
// - Le filtre n'a pas à connaître users

console.log(
    users.filter(filterByNameStartingWith('j')),
    users.filter(filterByNameStartingWith('d')),
);


