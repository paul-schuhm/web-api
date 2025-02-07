<?php

//index.php

/**
 * On déclare un gestionnaire global d'exception. L'exception sera traitée en dernier recours par ce gestionnaire, si aucun bloc try/catch ne l'a gérée avant dans le code.
 * @see https://www.php.net/manual/fr/function.set-exception-handler.php
 */
set_exception_handler(function (Throwable $e) {
    //Venir logger dans un fichier l'exception.
    // dd($e);
    die($e->getMessage());
});

/**
 * Composant Kernel de l'application (composant que l'on retrouve généralement dans un pattern MVC). Point d'entrée de l'application (charge les ressources, config, etc.)
 */
require 'vendor/autoload.php';

use API\Router;

$router = new Router();

//Route qui a été demandée (Méthode HTTP + URL), on veut récupérer le contrôleur associé à la route s'il existe, sinon une lève une Exception.
try {

    //Récupérer le contrôleur (classe+méthode)
    [$controller, $method] = $router->getController();

    //Le contrôleur est exécuté
    $response = call_user_func_array([$controller, $method], []);

    //Retourner la réponse HTTP avec un code status
    http_response_code($response->code);
    header('Content-Type: application/hal+json');
    echo $response->body;
} catch (Exception $e) {
    //Traitement spécifique si la route n'est pas trouvée: retourne une 404
    http_response_code(404);
    echo $e->getMessage();
}

// src/Router.php

<?php

/**
 * Le système de routage de l'application. 
 */

namespace API;

/**
 * Classe en charge du routage dans l'application. 
 * Déclare les routes de l'application et les contrôleurs associés.
 */
class Router
{

    //Déclaration des routes de mon application (Méthode HTTP + URL => Classe Contrôleur + méthode)

    /** @var ROUTES */
    public const ROUTES = [
        'GET' => [
            '/users/{id}' => ['API\\Controller\\UserController', 'single'],
            '/users' => ['API\\Controller\\UserController', 'list'],
        ],
        'POST' => [
            '/users' => ['API\\Controller\\UserController', 'add'],
        ]
    ];

    /**
     * Retourne une instance de la classe contrôleur associée à la route demandée
     * @throws Exception - Si la route n'existe pas, si le contrôleur n'existe pas.
     */
    public function getController(): array
    {
        //Décortiquer l'URL demandée
        $parts = parse_url($_SERVER['REQUEST_URI']);
        //J'ai ma route dans $parts['path']
        $args = array();
        if (isset($parts['query']))
            parse_str($parts['query'], $args['query']);
        //J'ai les arguments de l'url dans $args (sous forme de clé/valeur)

        //Vérifier que la route existe dans l'application

        //Récupérer la ressource (URL) du client

        // $resource = $_SERVER['REQUEST_URI'];
        $resource = $parts['path'];

        //Récupérer la méthode HTTP du client

        $httpMethod = $_SERVER['REQUEST_METHOD'];

        foreach (Router::ROUTES[$httpMethod] as $route => [$controller, $method]) {

            //Regex explication :
            /** 
             * \{([^\/]+)\} :
             * - \{ et \} matchent les {} autour du paramètre.
             * - ([^\/]+) tout sauf '/' (donc un segment d'URL)
             * Regex : [abc] un groupe, ^: sauf
             * */

            //Construire un pattern regex valide à partir de la route définie (/users/{id})
            // (?P<$1>[^\/]+) : (?P<name>...) capturer un groupe nommé 'name' (ici id) composé de tout sauf de / (un segment)
            $pattern = preg_replace('/\{([^\/]+)\}/', '(?P<$1>[^\/]+)', $route);
            $pattern = "#^" . $pattern . "$#";
            //Mon pattern, par ex "#^/users/(?P<id>[^\/]+)$#" (route configurée)

            //Check si le pattern (route) match quelque chose dans la ressource demandée
            //Si match sera placé dans matches
            if (preg_match($pattern, $resource, $matches)) {

                //Récupérer le paramètre d'URL matché
                $param = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                //L'ajouter à args (ou à l'objet Request a terme)
                $args['param'] = $param;

                //Aller chercher el contrôleur
                if (! (class_exists($controller) && method_exists($controller, $method)))
                    throw new \Exception("Aucun contrôleur valide n'est associé à cette route."); //Erreur 500

                //Retourner une instance du contrôleur
                return [new $controller($args), $method];
            }
        }

        throw new \Exception("Aucun contrôleur valide n'est associé à cette route."); //Erreur 500
    }
}

// src/Http/Response.php

<?php


namespace API\Http;

readonly class Response
{
    public function __construct(public string $body = "", public int $code = 200) {}
}

// src/Controller/User.php

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

// src/Hal/Hal.php

<?php

/**
 * Produit des documents au format HAL
 */

namespace API\Hal;

class Hal
{

    /**
     * Retourne un HAL Link Object, conforme à la spécification HAL
     */
    static public function halLinkObject(string $path, string $type = '', bool $templated = false, bool $deprecation = false): array
    {

        return array_merge(
            ['href' => $path],
            ['templated' => $templated],
            $type ? ['type' => $type] : [],
            $deprecation ? ['deprecation' => $deprecation] : [],
        );
    }
}
