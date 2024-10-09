# Démo API ROA (RESTful) vs API RPC

- [Démo API ROA (RESTful) vs API RPC](#démo-api-roa-restful-vs-api-rpc)
  - [Spécifications](#spécifications)
  - [Implémentation via l'architecture ROA (service RESTful)](#implémentation-via-larchitecture-roa-service-restful)
    - [Lancer la démo](#lancer-la-démo)
    - [Utiliser le service RESTful](#utiliser-le-service-restful)
      - [Formater la réponse avec jq](#formater-la-réponse-avec-jq)
  - [Implémentation via l'architecture RPC](#implémentation-via-larchitecture-rpc)
    - [Lancer la démo](#lancer-la-démo-1)
    - [Utiliser le service RPC](#utiliser-le-service-rpc)
  - [Exercice](#exercice)
  - [Correction](#correction)
  - [Ressources utiles](#ressources-utiles)


> Cette démo sert à illustrer les *différences conceptuelles fondamentales* entre les architectures **ROA** et **RPC** sur un projet minimaliste, dans un cadre pédagogique. 

## Spécifications

Nous devons créer un *service web* qui répond aux spécifications suivantes: 

- Un produit est défini par un nom, un code barre et un prix;
- Le système permet d'accéder à *la liste de tous les produits*; 
- Le système permet d'accéder au détail d'un produit *par code barre*.

Il existe plusieurs manières de concevoir et d'implémenter ce service. Deux conceptions différentes sont proposées ici :

- Une implémentation suivant l'architecture *Ressource Oriented Architecture* ou *RESTful*;
- Une implémentation suivant l'architecture *Remote Procedure Call*, via le protocole SOAP

## Implémentation via l'architecture ROA (service RESTful)

### Lancer la démo

Démarrer la démo

~~~
cd roa
npm install
npm run start
~~~

### Utiliser le service RESTful

- Accéder à la liste des produits:

~~~bash
curl localhost:3000/products
~~~

- Accéder à un produit par code-barre (ici `123456789`):

~~~bash
curl localhost:3000/products/123456789
~~~

#### Formater la réponse avec jq

Pour *beautifier* et formater la réponse JSON dans le shell, on peut utiliser [le programme `jq`](https://jqlang.github.io/jq/):

~~~bash
curl localhost:3000/products | jq
#Uniquement le premier élément du tableau (premier produit)
curl localhost:3000/products | jq '.[0]'
#Uniquement les champs qui nous intéressent (par ex barcode)
curl localhost:3000/products | jq '.[] | {barcode: .barcode}'
~~~

> [Voir le manuel de jq](https://jqlang.github.io/jq/manual/) pour la syntaxe à utiliser dans le terminal Windows (notamment les séquences d'échappement)

## Implémentation via l'architecture RPC

### Lancer la démo

Démarrer le serveur SOAP:

~~~
cd rpc/server
npm install
npm run start
~~~

Le service RPC est exposé sur l'URL `localhost:3000/ProductService`

### Utiliser le service RPC

La requête `GET localhost:3000/ProductService?wsdl` permet d'afficher la description du service exposé (wsdl). Par exemple avec `cURL` :

~~~
curl localhost:3000/ProductService?wsdl
~~~

Interroger le service avec le client soap :

~~~
cd client
npm install
node client.js
~~~

Dans `client.js` :

- `getProductList()` permet d'accéder à la liste des produits;
- `getProductByBarcode(barcode)` permet d'accéder à un produit par code-barre.

## Exercice

1. Inspecter l'API exposée par chacune de ces implémentations. Quelles différences *notables* observez-vous ? 

<!-- 
Usage des URI : une uri par ressource/une uri par service, enveloppe HTTP vs enveloppe SOAP(XML), détails d'impl exposée, navigabilité (ressources connexes vs wsdl)
 -->

## Correction

## Ressources utiles

- [RESTful Web Services](https://learning.oreilly.com/library/view/restful-web-services/9780596529260/), de Leonard Richardson, Sam Ruby, O'Reilly, 2007 **S'il y a un livre à lire/étudier/feuilleter/avoir c'est celui-ci, must have**. Ce livre est passé sous licence Creative Commons dans le cadre du projet [O'Reilly Open Books](https://www.oreilly.com/openbook/). [Accéder à la version en ligne/PDF gratuite](http://restfulwebapis.org/rws.html). Voir chapitres 1 (Section *Technologies du web programmable*), 8 et 10.
- [soap](https://www.npmjs.com/package/soap), package Node.js pour créer des clients et des services implémentant le protocole SOAP