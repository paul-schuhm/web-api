<?php

//Implémentation minimaliste d'un service web RESTful en vanilla PHP
//Le service expose deux ressources :
// - Lister les utilisateurs (GET /users)
// - Ajouter un utilisateur (POST /users)

//Lancer le projet : php -S localhost/5001 service.php


//Déclaration de nos routes (sous forme de constante)
define('ROUTES', [
    'GET' => [
        '/users' => 'list_users'
    ],
    'POST' => [
        '/users' => 'add_user' //contrôleur/middleware
    ]
]);

/**
 * Ajoute un utilisateur à la collection
 */
function add_user()
{
    //Traitement de formulaire: est ce que mes champs sont tous présents ? Au bon format ?

    //Vérifier que tous les champs sont présents
    if (!isset($_POST['first_name'], $_POST['last_name'], $_POST['birth_date'], $_POST['role'])) {
        return [
            'code' => 404,
            'content' => 'Il manque tel et tel valeurs...'
        ];
    }

    //Toutes les données sont présentes
    //Validation de la date de naissance et le role

    //Validation du role
    $roles = ['admin', 'user'];
    if (!in_array($_POST['role'], $roles)) {
        return [
            'code' => 404,
            'content' => 'Le role est invalide'
        ];
    }
    //Validation de la date de naissance (Laissé en exercice)

    //Toutes les étapes de validation sont passées, je peux créer un nouvel utilisateur
    $new_user = [
        'id' => 3, //généré à partir du dernier id, incrémenter de 1
        'firstName' => $_POST['first_name'],
        'lastName' => $_POST['last_name'],
        'birthDate' => $_POST['birth_date'],
        'role' => $_POST['role']
    ];

    $users[] = $new_user; //en mémoire

    //Enregistrer dans ma collection... Laissé en exercice.

    //Remarque : cela commence à ressembler à un modèle de Réponse HTTP...
    return [
        'code' => 201,
        'content' => 'Utilisateur crée avec succès.'
    ];
}

/**
 * Controleur: Retourne la liste des utilisateur
 */
function list_users(): array
{
    //Chercher les users
    //Jeu de données sur les users
    // A remplacer plus tard par de vraies données à aller récupérer
    // dans un fichier, une base de données, auprès d'un autre service web.
    return [
        'code' => 200,

        //Spécification HAL : @see https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-06

        //Réponse
        'content' => [

            '_links' => [
                "home" => '/',
                "self" => '/users'
            ],

            '_embedded' => [

                "users" => [

                    [
                        "_links" => [
                            'self' => '/users/1'
                        ],
                        'id' => 1,
                        'firstName' => 'John',
                        'lastName' => 'Doe',
                        'birthDate' => '01/01/1977',
                        'role' => 'user'
                    ],
                    [
                        "_links" => [
                            'self' => '/users/2'
                        ],
                        'id' => 2,
                        'firstName' => 'Jane',
                        'lastName' => 'Doe',
                        'birthDate' => '05/05/1976',
                        'role' => 'user'
                    ]
                ]
            ],

            //Données propres à la liste (état de la liste)
            'total' => 2,
        ]
    ];
}


//Récupération des données de la requete
$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

//Est ce que je peux répondre à cette requete ?
if (isset(ROUTES[$method][$uri])) {
    //Route est implémentée, je traite la requete

    //Récupère le controleur associée à la route
    $controler = ROUTES[$method][$uri];
    //Execute => produit une réponse
    $response = $controler();
    //Ecrire des headers
    header('Content-Type: application/json');
    //Ecrire le code HTTP
    http_response_code($response['code']);
    //Ecrire le body de la réponse (= écrire sur la sortie standard)
    echo json_encode($response['content']);
    die;
} else {
    //Route non implémentée, erreur coté client
    //Le service n'expose pas cette ressource (ou n'implemente pas la méthode HTTP demandée sur cette ressource)
    //Erreur côté client, requête mal formulée => 404
    http_response_code(404);
    exit;
}
