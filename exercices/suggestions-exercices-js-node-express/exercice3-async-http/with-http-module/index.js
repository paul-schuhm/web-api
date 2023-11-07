const http = require("http")

const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80
};

/**
 * Un wrapper du module http pour faire de la programmation asynchrone
 * utilisant l'API des promesses
 * @param {Object} options 
 * @returns 
 */
async function makeHTTPRequest(options) {
    //On retourne une promesse, qui sera résolue ou non
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {

            let data = '';

            //quand la réponse contient des données (requête réussie)
            res.on('data', (chunk) => {
                data += chunk;
            });

            //A la fin du traitement de la réponse
            res.on('end', () => {
                resolve(data);
            });

            //En cas d'erreur (code status HTTP de la réponse)
            res.on('error', () => {
                reject(data);
            });
        })

        //En cas d'erreur de la formulation de la requête HTTP
        req.on('error', (error) => {
            reject(error);
        });

        //Fin du traitement de la requête
        req.end();
    })
}

//Question 1
makeHTTPRequest({ ...options, path: '/posts/1/comments' }).then((res) => {
    const emails = JSON.parse(res).map(item => item.email);
    console.log(emails)
})

//Question 2

/**
 * Retourne la liste des posts d'un user
 * @param {number} userId L'identifiant de l'utilisateur 
 */
async function findPostsOf(userId) {

    try {
        const res = await makeHTTPRequest({ ...options, path: `/users/${userId}/posts` })
        const posts = JSON.parse(res)
        console.log(`L'utilisateur ${userId} a publié  ${posts.length} posts.`)
    } catch (error) {
        console.log(error)
    }

}

findPostsOf(1)

//Question 3: fails gracefully
makeHTTPRequest({ ...options, path: '/comment' })
    .then()
    .catch(console.log('La ressource n\'existe pas'))

console.log('Fetching data... Please wait a moment.')
