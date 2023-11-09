## Exercice 2

## 1. Déterminer l'ensemble des données

Commençons par un [dictionnaire des données](https://www.univ-constantine2.dz/CoursOnLine/Benelhadj-Mohamed/co/grain3_2.html)

Légende:

- AN : alphanumérique
- N: numérique
- A: alphabétique
- D: Date (et datetime)
- B: Booléen


|  Code 	| Désignation  	| Type  	|  Taille (nombre de caractères ou de *bytes* (octets)) 	| Remarque  	| Obligatoire |
|---	|---	|---	|---	|---	|---	|
|   `pseudo`	|  L'identifiant d’un utilisateur 	|   AN	|   12	|    Identifie de manière *unique* l’utilisateur	| Oui |
|   `description`	|  Un texte court qui décrit le concert, son contexte 	|   AN	|   1000	|   	| Non |
|   `artist_name`	|   Le nom de l'artiste qui se produit lors du concert	|   AN	|  50 	|   	|Oui |
|   `music_style`	|   Style musical de l'artiste	|   AN	|  50 	|  Ne peut prendre qu'un ensemble fini de valeurs (Rock, Rap, Classique, Jazz, Pop)	|Oui |
|   `date_start`	|   Date et horaire du concert	|  D 	|   20	|  Au format `YYYY-mm-dd HH:mm:ss` (et TimeZone)	|Oui |
|   `date_booking`	|   Date à laquelle l’utilisateur réserve sa place	|  D 	|   20	|   Attention, ce n'est pas la date à laquelle iel confirme la réservation.	|Oui |
|   `location`	|  Lieu, salle où se déroule le concert  	|   AN	|   120	|   	|Oui |
|   `nb_seats`	|  Le nombre de places disponibles à la réservation pour un concert  	|   N	| 	| Doit être positif  	|Oui |
|   `statut`*	|  État d’une réservation. 3 valeurs possibles : `À confirmer`, `Confirmée` ou `Annulée`  	|   N	|   14	|  Lorsqu’une réservation est créée, elle a par défaut le statut `to_confirm`. Elle doit ensuite être confirmée par l'utilisateur. Un utilisateur qui a confirmé sa réservation ne peut plus l’annuler ! 	|Oui |
|   `to_confirm`	|  Statut d’une réservation en attente de confirmation, valeur `À confirmer`  	|   A	|   14	|   Ce statut peut passer à `to_confirm` ou `canceled`	|Oui |
|   `confirmed`	|  Statut d’une réservation confirmée, valeur `Confirmée`  	|   A	|   14	|   Ne peut s’appliquer que sur un statut dans l’état `to_confirm`. Cet état ne peut plus changer par la suite	|Oui |
|   `canceled`	|  Statut d’une réservation annulée , valeur `Annulée` 	|   A	|   14	|   Ce statut ne peut plus changer par la suite	|Oui |
|   `is_admin`	| Détermine si l'utilisateur du système est administrateur (gestionnaire)  	|   B	|   14	|   Vrai si l'utilisateur est l'administrateur, faux sinon. Le gestionnaire a un rôle administrateur du système (et non de la base de données !)	|Oui |
|   `id_concert`	|  L'identifiant d’un concert 	|   N	|  Entier encodé sur 64 bits 	|    Identifie de manière *unique* un concert	| Oui |
|   `id_reservation`	|  L'identifiant d’une réservation 	|   N	|  Entier encodé sur 64 bits 	|    Identifie de manière *unique* une réservation	| Oui |


>* le mot *status* est un mot-clef réservé par MySQL. On utilise donc le mot français *statut* ici.

## 2. **Décomposer** l'ensemble de données en ressources

Décomposons ces données en ressources :

- *Les liste des concerts à venir* 
- *Les informations sur un concert* 
- *La réservation d'une place de concert*
- *La liste des réservations pour un concert*

> Ces ressources nous permettront de créer le schéma de la base de données également. Les utilisateurs **ne sont pas** une ressource, ce ne sont pas des informations exposées par le système !

## 3. **Nommer** les ressources avec des URI

- *Les liste des concerts à venir* : `/concerts`, avec la variation `/concerts?order-by=date&sort=desc,asc` pour ordonner la liste par date (bonus car non demandé)
- *Les informations sur un concert*  : `/concerts/{id-concert}`
- *La réservation d'une place de concert* : `/concerts/{id-concert}/reservations/{id-reservation}`
- *La liste des réservations pour un concert* : `/concerts/{id-concert}/reservations`

### 4. **Implémenter** un sous-ensemble de l'interface uniforme (`GET`, `POST`, `DELETE`, `PUT`) pour chaque ressource


- *Les liste des concerts à venir* : GET
- *Les informations sur un concert*  : GET
- *La réservation d'une place de concert* : GET, DELETE, PUT
- *La liste des réservations pour un concert* : POST, GET (authentifié)

> `GET /concerts/{id}/reservations` est protégée, seul le gestionnaire du site pourra lister les réservations effectuées pour un concert (et donc la liste des pseudos des utilisateurs).

### Récapitulatif

| Ressource  | URL  | Méthodes HTTP  | Paramètres d'URL (variations)  | Commentaires  |
|---|---|---|---|---|
| *Les liste des concerts à venir*  | `/concerts`  | GET  |  `order-by=date&sort=desc,asc` | Seuls les concerts *à venir* sont affichés, complets ou non  |
| *Les informations sur un concert* | `/concerts/{id-concert}`  |  GET | X  |   |
| *La réservation d'une place de concert*  | `/concerts/{id-concert}/reservations/{id-reservation}`  | GET, DELETE, PUT  | X  | Ne doit être accessible qu’au propriétaire de la réservation |
| *La liste des réservations pour un concert*  | `/concerts/{id-concert}/reservations`  | POST, GET  | X  | GET est réservé au gestionnaire du site  |


## 8. Envisager la progression typique des évènements

Scénario nominal (où tout se passe bien)

- Un utilisateur accède à la liste des concerts
- L'utilisateur repère un concert qui l'intéresse, accède aux détails sur le concert
- L'utilisateur décide de réserver le concert
- L'utilisateur confirme sa réservation

## 9. Envisager les cas d'erreurs

> Beaucoup de cas à envisager, en ai-je oublié ?

- L'utilisateur essaie d'effectuer une réservation pour un concert alors qu'il en a déjà une (confirmée) : le système doit rejeter la demande
- L'utilisateur essaie d'effectuer une réservation pour un concert alors qu'il en a déjà une (annulée) : le système doit autoriser la demande, il peut avoir changé d'avis
- Il n'y a plus de places disponibles pour le concert : le système doit rejeter toute demande de réservation tant qu'une réservation n'est pas annulée
- Un utilisateur essaie d'effectuer une réservation pour un concert déjà passé : le système doit rejeter la demande
- Un utilisateur essaie d'annuler une réservation confirmée : le système doit rejeter la demande (voir specs)
- Un utilisateur essaie de confirmer une réservation annulée : le système doit rejeter la demande (voir specs)


> Évidemment, nous n'abordons pas ici les points liés à la sécurité, étant donné qu'il n'y a pas de système d'authentification et donc d'autorisations sur le système ! (hormis pour le gestionnaire de site).

Prévoir ces cas permet notamment de s'assurer de l'idempotence des requête `POST` qui ne sont ni sûres ni idempotentes.