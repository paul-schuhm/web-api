## Exercice 6

## Spécifications du système 

## 1. Déterminer l'ensemble des données

Commençons par un [dictionnaire des données](https://www.univ-constantine2.dz/CoursOnLine/Benelhadj-Mohamed/co/grain3_2.html)

Légende:

- AN : alphanumérique
- N: numérique
- A: alphabétique
- D: Date (et datetime)
- B: Booléen


|  Code 	| Désignation  	| Type  	 	| Remarques/Contraintes 	| Obligatoire |
|---	|---	|---	|---	|---	|
|   `id_user`	|  L'identifiant d’un utilisateur 	|   N	|    Identifie de manière *unique* l’utilisateur	|  Oui 	| 
|   `first_name`	|  Le prénom d'un contact 	|   A	|    	|  Oui 	| 
|   `last_name`	|  Le prénom d'un contact 	|   A	|  Utilisé pour filtrer les contacts  	|  Oui 	| 
|   `gender`	|  Le genre d'un contact 	|   A	|  	|  Non 	| 
|   `tel`	|  Le numéro de téléphone d'un contact 	|   A	|  	|  Non 	| 
|   `address`*	|  L'adresse d'un contact 	|   A	|  	|  Non 	| 
|   `id_group`	|  L'identifiant d'un groupe de contacts crée par l'utilisateur 	|   N	| Identifie de manière *unique* un groupe 	|  Oui 	| 
|   `group`	|  Le nom d'un groupe de contacts crée par l'utilisateur 	|   AN	|  	|  Oui 	| 


> * La gestion de l'adresse est simplifiée ici, l'adresse n'étant pas une donnée atomique (elle peut être subdivisée en plusieurs données) et peut être complexe à représenter de manière standardisée. [Voir par exemple la Norme Postale AFNOR NF Z 10-011](https://www.rnvp-internationale.com/norme-postale/NF-Z-10-011.php) qui définit les règles d'écriture de l'adresse postale française. Si votre système doit manipuler [des adresses internationales](https://fr.wikipedia.org/wiki/Adresse_postale), cela se complique encore un peu.

## 2. **Décomposer** l'ensemble de données en ressources

Décomposons ces données en ressources. Ces ressources sont définies pour un utilisateur du système :

- *La liste des cartes de visite*
- *La liste des groupes de cartes de visite*
- *Le détail d'une carte de visite*
- *Le détail d'un groupe de cartes de visite*
- *Les cartes de visite d'un groupe*
- *Le détail d'une carte de visite d'un groupe*


## 3. **Nommer** les ressources avec des URI

- *La liste des cartes de visite* : `/users/{id}/cards`
- *La liste des groupes de cartes de visite* : `/users/{id}/groups`
- *Le détail d'une carte de visite* : `/users/{id}/cards/{id}`
- *Le détail d'un groupe de cartes de visite* : `/users/{id}/groups/{id}`
- *Les cartes de visite d'un groupe* : `/users/{id}/groups/{id}/cards`
- *Le détail d'une carte de visite d'un groupe* : `/users/{id}/groups/{id}/cards/{id}`. Cette ressource peut avoir la même représentation que la ressource *Le détail d'une carte de visite* ou non. Une carte appartenant à un groupe peut référencer l'URL de la fiche complète de la carte de visite et contenir d'autres méta-données.
- *La liste des cartes de visite filtrée par nom de famille* : `/users/{id}/cards?last_name`. On crée ici une *variation* de la ressource *La liste des cartes de visite* avec un paramètre d'URL

> Un segment templaté `{id}` fait toujours référence au segment qui le précède 

> On remarque que sur toutes ces URL, chaque segment de l'URL (délimité par '/') pointe bien sur une ressource.

### 4. **Implémenter** un sous-ensemble de l'interface uniforme (`GET`, `POST`, `DELETE`, `PUT`) pour chaque ressource


- *La liste des cartes de visite* : GET, POST
- *La liste des groupes de cartes de visite* : GET, POST
- *Le détail d'une carte de visite* : GET, DELETE
- *Le détail d'un groupe de cartes de visite* : GET, DELETE
- *Les cartes de visite d'un groupe* : GET, POST
- *Le détail d'une carte de visite d'un groupe* : DELETE
- *La liste des cartes de visite filtrée par nom de famille* : GET

> Toutes les ressources implémentent en plus les méthodes HTTP `HEAD` et `OPTIONS`

### Récapitulatif


| Ressource  | URL  | Méthodes HTTP  | Paramètres d'URL (variations)  | Commentaires  |
|---|---|---|---|---|
| *La liste des cartes de visite*, *La liste des cartes de visite filtrée par nom de famille* | `/users/{id}/cards` | GET, POST  | `last_name` pour filtrer les cartes par nom de famille. Exemple: `/users/1/cards?last_name=doe`  | Cette ressource possède une variation  |
| *Le détail d'une carte de visite*| `/users/{id}/cards/{id}` | GET, DELETE  |  |  Supprimer une carte de visite. Doit supprimer ses références dans chaque groupe auquel elle appartient |
| *La liste des groupes de cartes de visite* | `/users/{id}/groups` | GET, POST  |  | Ajouter un nouveau groupe  |
| *Le détail d'un groupe de cartes de visite*| `/users/{id}/groups/{id}` | GET, DELETE  |  | Supprimer un groupe  |
| *Les cartes de visite d'un groupe*| `/users/{id}/groups/{id}/cards` | GET, POST  |  | Ajouter une carte existante à un groupe  |
| *Le détail d'une carte de visite d'un groupe*| `/users/{id}/groups/{id}/cards/{id}` | GET, DELETE  |  | Supprimer la carte d'un groupe  |