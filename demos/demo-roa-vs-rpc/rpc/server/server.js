const express = require('express');
const soap = require('soap');

//Charge le WSDL (document XML qui décrit le service, indispensable au client pour l'utiliser)
const wsdl = require('fs').readFileSync('service.wsdl', 'utf8');
//Charge le service SOAP
const service = require('./productService');

var app = express();

// Middleware pour log la méthode HTTP, les en-têtes et le corps
// Pour bien comprendre le fonctionnement de SOAP
app.use((req, res, next) => {
    console.log('--- Requête reçue ---');
    console.log('Méthode HTTP :', req.method);  
    console.log('En-têtes HTTP :', req.headers); 
    //body apparaît 'undefined' car le contenu est XML et non parsé par défaut par express
    console.log('Corps de la requête SOAP :', req.body);  
    next();
});


// Lancer le serveur HTTP et l'API de type "RPC"
app.listen(3000, () => {
    soap.listen(app, '/ProductService', service, wsdl);
    console.log('Serveur SOAP démarré sur le port 3000');
});