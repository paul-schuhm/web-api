<?php

//Obtenir la liste des utilisateurs de plus de 40 ans.

$baseURL = "http://localhost:5001";

//Intialiser cURL
$cr = curl_init();

//Définir la requete (Méthode GET par défaut + URL);
curl_setopt($cr, CURLOPT_URL, $baseURL . '/users');
curl_setopt($cr, option: CURLOPT_RETURNTRANSFER, value: true); // Récuperer la réponse sous forme de chaine de caracter (return);
curl_setopt($cr, CURLOPT_FOLLOWLOCATION, true); //Suivre les redirections de notre requête HTTP;
curl_setopt($cr, CURLOPT_TIMEOUT, 2); //Timeout de 2s

//Executer notre requete
$response=curl_exec($cr);
$http_code = curl_getinfo($cr, CURLINFO_HTTP_CODE);

//Traitement d'erreur

$users_raw = json_decode($response);

//json_decode crée par défaut des objets de type StdClass (objets génériques)
$users = $users_raw->_embedded->users;
//Traitement: recuperer les users de plus de 40 ans
var_dump($users);

$admins = array_filter($users, function($user) {
		return $user->role === 'admin';
});

var_dump($admins);


