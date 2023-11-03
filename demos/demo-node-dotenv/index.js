//Charger les variables d'environnement
require('dotenv').config()
//Utilisation du paquet http
const http = require('http')

const hostname = '127.0.0.1'
const port = parseInt(process.env.PORT) || 3000;

console.log(process.env.PORT)
console.log(process.env.DEFAULT_MESSAGE)
console.log(process.env.NODE_ENV)
module.exports.foo = 'bar'
console.log(this)

//Déclaration du serveur
const server = http.createServer((req, res) => {
    //L'objet res sera utilisé pour construire la réponse HTTP
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${process.env.DEFAULT_MESSAGE}\n`)
})
//Lancement du serveur (écoute sur le port indiqué)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})