# Développement API (web API/RESTful API)

- [Développement API (web API/RESTful API)](#développement-api-web-apirestful-api)
  - [Démos](#démos)
    - [Démo *youtypeitwepostit*](#démo-youtypeitwepostit)
  - [Bibliographie](#bibliographie)
    - [Livres](#livres)
    - [REST et RESTful API](#rest-et-restful-api)
    - [Conception de base de données](#conception-de-base-de-données)


## Démos

Liste des démos (mini projets pour présenter un ou plusieurs concepts)

### Démo *youtypeitwepostit*

Disponible sur [ce dépôt](https://github.com/RESTful-Web-APIs/example-code).

- [Télécharger le code source](https://github.com/RESTful-Web-APIs/example-code/tree/master/YouTypeIt)
- Lancer la démo : 

~~~bash
#A la racine du projet
node server/app.js
~~~

## Bibliographie

### Livres

- [RESTful Web APIs](https://learning.oreilly.com/library/view/restful-web-apis/9781449359713/), de Leonard Richardson, Mike Amundsen, Sam Ruby, O'Reilly, 2013. **S'il y a un livre à lire/étudier/feuilleter/avoir c'est celui-ci, un must have**
- [REST API Design Rulebook](https://learning.oreilly.com/library/view/rest-api-design/9781449317904/), de Mark Masse, O'Reilly, 2011
- [RESTful Web Services](https://learning.oreilly.com/library/view/restful-web-services/9780596529260/), de Leonard Richardson, Sam Ruby, O'Reilly, 2007
- [REST API Development with Node.js : Manage and Understand the Full Capabilities of Successful REST Development, 2nd Edition](https://learning.oreilly.com/library/view/rest-api-development/9781484237151/), de Fernando Doglio, Apress, 2018
- [Bien architecturer une application REST](https://www.eyrolles.com/Informatique/Livre/bien-architecturer-une-application-rest-9782212850154/), par Olivier Gutknecht, avec la contribution de Jean Zundel, Eyrolles, 2009

### REST et RESTful API

- [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching), une synthèse sur l'implémentation du cache du protocole HTTP. Attention, [tous les navigateurs n'implémentent pas le standard au même point](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility).
- [Un tutoriel sur la mise en cache du protocole HTTP](https://www.mnot.net/cache_docs/), un très bon tutoriel en français sur la mise en cache du protocole HTTP
- [REST](https://gayerie.dev/epsi-poe-201703/web-services/07_rest.html), une synthèse de David Gayerie sur REST de grande qualité, avec une bibliographie utile
- [Welcome to the REST CookBook](https://restcookbook.com/), portail sur différents aspects de REST
- [RFC3986: Uniform Resource Identifier (URI): Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.txt), T. Berners-Lee (W3C/MIT), R. Fielding (Day Software), L. Masinter (Adobe Systems)
- [RESTful Web APIs: examples](https://github.com/RESTful-Web-APIs/example-code), Node.js code for the clients and servers used as examples in O'Reilly's "RESTful Web APIs".
- [Same-origin policy: The core of web security @ OWASP Wellington](https://www.youtube.com/watch?v=zul8TtVS-64&list=PLS3XEhTy6-Ale8Et6pxRR2I3LYNt8-rX3&index=19&t=2632s), excellente présentation de Kirk Jackson de la Same Origin Policy avec démonstrations à l'appui. **À regarder**.
- [REST APIs must be hypertext-driven](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven), billet de blog de Roy T. Fiedling très intéressant sur le fait qu'une API RESTful doit être orientée *hypertexte* (ou de manière générale par les *hypermédia*)
- [JSON Hypertext Application Language draft-kelly-json-hal-08](https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-08#section-8.1), HAL representation pour les modèles de données. Une proposition de standard
- [API RESTful, spécification des schémas de données *HAL*](http://amundsen.com/hypermedia/), les différents types d'hypermédia définis pour le protocole HTTP et pour construire des API plus robustes. Le livre de l'auteur [Building Hypermedia APIs with HTML5 and Node](https://learning.oreilly.com/library/view/building-hypermedia-apis/9781449309497/), Amundsen, a l'air très intéressant
- [API RESTful, spécification des schémas de données *JSON-LD 1.1*, *A JSON-based Serialization for Linked Data*](https://www.w3.org/TR/json-ld/), une autre spécification des données renvoyées par une API, soutenue et recommandée par le W3C
- [Schema.org](https://schema.org/), *Schema.org is a collaborative, community activity with a mission to create, maintain, and promote schemas for *structured data* on the Internet*. Propose une liste de schémas à suivre pour différents modèles de données.
- [Microformats wiki](http://microformats.org/wiki/Main_Page), un wiki qui décrit des spécifications de structure de données interopérables 
- [Hydra](http://www.markus-lanthaler.com/hydra/), Hydra is an effort to simplify the development of interoperable, hypermedia-driven Web APIs. The two fundamental building blocks of Hydra are JSON‑LD and the Hydra Core Vocabulary.
- [Zalando RESTful API and Event Guidelines](https://opensource.zalando.com/restful-api-guidelines/#)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html), *The OpenAPI Specification (OAS)* defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. C'est la spécification que suit l'outil [Swagger](https://swagger.io/)
- [W3C: Cool URIs don't change](https://www.w3.org/Provider/Style/URI.html), par Tim Berners-Lee
- [W3C: Architecture of the World Wide Web, Volume One](https://www.w3.org/TR/2004/REC-webarch-20041215/), écrit par le *W3C Technical Architecture Group*: Tim Berners-Lee (co-Chair, W3C), Tim Bray (Antarctica Systems), Dan Connolly (W3C), Paul Cotton (Microsoft Corporation), Roy Fielding (Day Software), Mario Jeckle (Daimler Chrysler), Chris Lilley (W3C), Noah Mendelsohn (IBM), David Orchard (BEA Systems), Norman Walsh (Sun Microsystems), and Stuart Williams (co-Chair, Hewlett-Packard). Une *bible* sur l'architecture du web.

### Conception de base de données

- [Initiation à la conception de bases de données relationnelles avec MERISE](https://ineumann.developpez.com/tutoriels/merise/initiation-merise/)
- [Petit guide d'analyse des données à l'aide de la méthode MERISE](https://sqlpro.developpez.com/cours/modelisation/merise/), par Frédéric Brouard
- [Le Dictionnaire de Données](https://www.univ-constantine2.dz/CoursOnLine/Benelhadj-Mohamed/co/grain3_2.html), article utile 
- [AnalyseSI](https://launchpad.net/analysesi), un outil open-source *distraction-free* basé sur Merise 1 pour modéliser une base de données (MCD) et produire un MPD et scripts SQL
- [Oracle SQL Developer Data Modeler](https://www.oracle.com/database/sqldeveloper/technologies/sql-data-modeler/), outil graphique complet et plus complexe pour la conception de base de données, proposé par Oracle. La documentation accessible depuis le logiciel est de bonne qualité, [le blog d'helifromfinland](https://helifromfinland.blog/) est rempli d'articles utiles sur l'outil