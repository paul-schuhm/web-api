# Démo RESTful API en *vanilla* PHP

## Prérequis

- Installer [PHP8+](https://www.php.net/downloads.php);
- Installer le gestionnaire de dépendances [Composer](https://getcomposer.org/);
- Client : [installer le module curl](https://www.php.net/manual/fr/curl.installation.php) (Sous Debian/Ubuntu: `apt install php[MAJ.MIN]-curl`)

## Lancer le service web

~~~bash
composer install
php -S localhost:5001
~~~

## Utiliser le client PHP

~~~bash
php client.php
~~~