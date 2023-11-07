/**
 * Module 'user'
 */

//Public au module
const users = [{ name: 'Jane', age: 12, nbPosts: 12 }, { name: 'John', age: 28, nbPosts: 0 }, { name: 'Derek', age: 18, nbPosts: 3 }, { name: 'Andrea', age: 35, nbPosts: 6 }];

/**
 * Retourne vrai si user est majeur, faux sinon
 * @param {*} user 
 * @returns {boolean}
 */
const isAdult = (user) => {
    return user.age >= 18;
}

//Exporter la liste des users, la fonction isAdult
module.exports = { users, isAdult };

