const axios = require('axios')

/**
 * On initialise un client HTTP avec axios
 */
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

//Question 1

instance.get('/posts/1/comments')
    .then((response) => {
        //Les données du body de la réponse HTTP sont sous la clef 'data' de la réponse
        const emails = response.data.map(comment => comment.email)
        //Affiche la liste des emails des personnes qui ont commenté sur le post
        console.log(emails)
    })
    .catch((error) => console.log(error));

//Question 2

/**
 * Affiche le nombre de posts publiés par l'utilisateur
 * @param {number} userId 
 * @param {} instance Client http
 * @returns {array}
 */
async function findPostsOf(userId, clientHTTP) {
    const response = await instance.get(`/users/${userId}/posts`)
    const posts = response.data
    console.log(`L'utilisateur ${userId} a publié  ${posts.length} posts.`)
}

findPostsOf(1, instance);

//Question 3

instance.get('/comment')
    .then(response => console.log(response))
    .catch(error => console.log('Une erreur est survenue'));

console.log('Fetching data... Please wait a moment.')
