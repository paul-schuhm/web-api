<?php

/**
 * Contrôleur qui gère les requêtes sur les routes concernant les articles
 */

namespace API\Controller; //équivalent fichier: src/Controller

use API\Http\Request;
use API\Http\Response;
use API\Model\User;
use API\Hal\Hal;

class UserController
{

    /**
     * Liste des paramètres d'URL
     */
    public readonly array $args;

    public function __construct(array $args)
    {
        $this->args = $args;
    }


    public function list(Request $request = NULL): Response
    {

        //Simule des données
        $data = [new User(1, 'john doe'), new User(2, 'jane doe')];

        //Réponse au format application/hal+json
        $res = [
            '_links' => [
                'self' => Hal::halLinkObject('/users')
            ],
            '_embedded' => $data
        ];

        return new Response(json_encode($res));
    }

    public function single(Request $request = NULL): Response
    {

        //Simule des données
        $data = [new User(1, 'john doe'), new User(2, 'jane doe')];

        $id = $this->args['param']['id'];

        $user = array_find($data, fn($user) => $user->id == $id);

        return new Response(json_encode([$user]));
    }

    public function add(Request $request= NULL): Response
    {
        return new Response(json_encode(['user added']));
    }
}
