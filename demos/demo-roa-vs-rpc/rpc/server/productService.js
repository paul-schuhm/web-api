

const products = require('./db/products');

//Définition de notre service ProductService suivant le protocole SOAP
//On utilise le paquet Node soap.js pour faciliter l'implémentation
//@see https://www.npmjs.com/package/soap

const productService = {
    ProductService: {
        ProductServiceSoap: {
            //Les fonctions (ou procédures) proposées par le services
            getProductList: function(args, callback) {
                // Retourne la liste des produits sous forme d'un objet
                return {
                    products: {
                        product: products
                    }
                };
            },
            getProductByBarcode: function(args) {
                const product = products.find(p => p.barcode === args.barcode);
                if (product) {
                    return { product };
                } else {
                    throw new Error('Product not found');
                }
            }
        }
    }
};
  
  module.exports = productService;