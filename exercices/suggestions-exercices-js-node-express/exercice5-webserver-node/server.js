// Importez le module HTTP intégré de Node.js
const http = require('http');
const querystring = require('querystring');
const fs = require('fs')

// Choisissez un port pour votre serveur
const port = 3000;

// Créez le serveur HTTP
const server = http.createServer((req, res) => {
    // Vérifiez la méthode de la requête
    if (req.method === 'GET' && req.url === '/') {

        // Répondez avec un statut 200 (OK) et un message de bienvenue
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.end('Bienvenue sur mon serveur web !\n');
        //On charge une page
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erreur interne du serveur');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        })
    } else if (req.method === 'POST' && req.url === '/messages') {
        // Gérez une requête POST en lisant le corps de la requête
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            //Inspecter le body
            const bodyParams = querystring.parse(body);
            console.log(bodyParams)
            //Si la requête ne contient pas la représentation de la ressource d'un message
            //dans son corps (message=foo par exemple), requête mal formée
            if (!bodyParams['message']) {
                res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`Requête mal formée\n`);
                return
            }
            // Répondez avec un statut 200 (OK) et affichez le contenu de la requête POST
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Voici ce que nous avons reçu : ${body}\n`);
        });
    } else {
        // Pour toutes les autres requêtes, répondez avec un statut 404 (Non trouvé)
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Désolé, la ressource n\'exsite pas\n');
    }
});

// Écoutez sur le port spécifié
server.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
});
