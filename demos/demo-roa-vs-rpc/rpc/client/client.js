/**
 * Un client SOAP pour consommer le service web de type RPC "ProductService"
 */

const soap = require('soap');

/**
 * URL du service WSDL 
 * Endpoint unique (Meme URL + méthode POST) pour toutes 
 * les ressources/fonctions exposées par ce service
*/

const url = 'http://localhost:3000/ProductService?wsdl';

//On crée un client soap et on appelle la méthode getProductList du service ProductService
function getProductList() {
    soap.createClient(url, (err, client) => {
        if (err) {
            console.error('Erreur de création du client SOAP :', err);
            return;
        }

        client.getProductList({}, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'appel à getProductList :', err);
                return;
            }

            console.log('Liste des produits :', JSON.stringify(result, null, 2));

            // Affiche la requête SOAP envoyée
            console.log('Log: Requête SOAP envoyée :\n', client.lastRequest);
        });


    });
}

//On crée un client soap et on appelle la méthode getProductByBarcode du service ProductService
function getProductByBarcode(barcode) {
    soap.createClient(url, (err, client) => {
        if (err) {
            console.error('Erreur de création du client SOAP :', err);
            return;
        }

        const args = { barcode };

        client.getProductByBarcode(args, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'appel à getProductByBarcode :', err);
                return;
            }


            console.log(`Produit pour le code-barres ${barcode} :`, JSON.stringify(result, null, 2));

            // Affiche la requête SOAP envoyée (pour mieux comprendre)
            console.log('Log: Requête SOAP envoyée :\n', client.lastRequest);
        });
    });
}

//Trouver la liste des produits
getProductList();
//Trouver le produit par code barre
getProductByBarcode('123456789');