<?php

/**
 * Un client HTTP pour consommer des services web
 * 
 */

//Requêtons notre service web
$baseURL = "localhost:5001/users";

// create curl resource
$ch = curl_init();

// REQUETE GET

// set url
curl_setopt($ch, CURLOPT_URL, $baseURL);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Récupère la réponse sous forme de string (plutôt que de l'afficher directement).
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Suivre les redirections
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // Timeout de 10 secondes

$response = curl_exec($ch); // Envoyer la requête
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); //  Récupère le code HTTP de la réponse.

if (curl_errno($ch)) {
    echo "Erreur cURL : " . curl_error($ch);
} else {
    echo "Code HTTP : " . $httpCode . "\n";
    echo "Réponse : " . $response;
}

//Travailler avec la réponse : fournir à un autre service web, imprimer, construire un rapport, traitement avec des données custom,e tc.

$response = json_decode($response);
var_dump($response);


// REQUETE POST


$data = [
    "name" => "Foo bar",
];

$ch = curl_init($baseURL);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_POST, true); //définir la méthode à POST
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); //Ajouter les données
//Définir les headers, notamment le contenu du body de la requete
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo "Erreur cURL : " . curl_error($ch);
} else {
    echo "Code HTTP : " . $httpCode . "\n";
    echo "Réponse : " . $response;
}


//Fermer la ressource curl
curl_close($ch);



