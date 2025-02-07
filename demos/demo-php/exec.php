<?php

//Executer une commande du SHELL/programme externe
//Attention, le programme doit être présent sur le PATH !
//A utiliser avec parcimonie (environnement contrôlé)

//@see : https://www.php.net/manual/fr/function.exec.php

//Recuperer la liste des processus
//Le resultat est stocké dans $output.
exec("ps -ax", $output, $code);

var_dump($output);
