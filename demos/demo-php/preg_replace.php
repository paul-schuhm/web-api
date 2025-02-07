<?php

//Une démo simple pour illustrer comment matcher des URL avec un pattern custom

//URL à matcher
$url = "/users/100";

//Déclaration de ma route avec un pattern custom ({id})
$route="/users/{id}";

//Remplacer mon expression custom par un pattern regex valide
//@see : https://www.php.net/manual/en/function.preg-replace.php
$pattern = preg_replace('/\{([^\/]+)\}/', '(?P<$1>[^\/]+)', $route);

//Bien délimiter le pattern
$pattern = "#^" . $pattern . "$#";

var_dump($pattern);

//Si il y'a match (url correspond à notre route, la ressource demandée peut être servie)
if (preg_match($pattern, $url, $matches)) {
  var_dump($matches);
  //Recuperer le paramètre d'URL (id et sa valeur)
  //@see : https://www.php.net/manual/en/function.preg-match.php
  $param = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
  var_dump($param);
  echo "La ressource demandée {$url} est matchée par notre route {$route}" . PHP_EOL;
}

