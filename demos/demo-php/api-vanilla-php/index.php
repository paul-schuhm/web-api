<?php

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
