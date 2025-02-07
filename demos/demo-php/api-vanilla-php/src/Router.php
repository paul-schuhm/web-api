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
