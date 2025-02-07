<?php

//Démo d'utilisation d'arguments fournis à un script PHP.

//$argv permet de récupérer les arguments du script (passés via la stdin)

//Fonction de debug : var_dump
//var_dump($argv);

//Erreur: j'oublie de passer un argument à mon script
//Tester l'existence d'un item dans la collection
if(! isset($argv[1])){
	//Arrête l'execution ici et retourner un code different de 0 (erreur)
	exit(-1);
}

//Récuperer tous les arguments (un argument => un fichier)
$files = [];

//Ajoute à ma collection de fichier à créer
foreach($argv as $index => $arg){
	//Ignorer le nom du script (placé toujours en 1er argument)
	if($index != 0)
		$files[] = $arg;
}


foreach($files as $file){
	//Formatte le nom du fichier en minuscules
	$fileName = mb_strtolower($file);

	//Créer un fichier nommé $file et l'intialiser (un contenu dedans)
	$fhandle = fopen($fileName, 'w');

	//Ecrire dans le fichier
	fwrite($fhandle,"# $fileName");

	//Fermer le stream
	fclose($fhandle);
}

//Terminé avec succès
exit(0);

