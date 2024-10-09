const express = require('express');
const port = 3000;
const app = express();

//Simule la base de données
const products = require('./db/products');

//Crée un router
const router = express.Router();

//URL de "La liste des produits"
router.get('/products', (req, res, next) => {
    res.json(products);
});

//URL de "Le détail d'un produit", identifié par son code barre unique
router.get('/products/:barcode', (req, res, next) => {
    const product  = products.filter((p) => p.barcode === req.params.barcode);
    //Le pattern de la route match le segment d'url ':barcode' et est accessible dans req.params
    console.log('Paramètres d\'url: ', req.params) ;
    res.json(product);
});

// Middleware pour log les détails de la requête HTTP entrante
// Remarque : sans path, le middleware est exécuté sur toutes les requêtes http entrantes
app.use((req, res, next) => {
    console.log('--- Requête reçue ---');
    console.log('Méthode HTTP :', req.method);  
    console.log('En-têtes HTTP :', req.headers); 
    console.log('Corps de la requête :', req.body);  
    console.log('Path url :', req.url); 
    console.log('Paramètres de requête d\'url: ', req.query) ;
    next();
});

app.use(router);

//Crée et lancer le serveur http:
app.listen(port);