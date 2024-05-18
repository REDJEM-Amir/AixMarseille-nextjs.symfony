# Documentation:

## Installer les dépendances

``` bash
composer install
```

## Mettre a jour les dépendances

``` bash
composer update
```

## Lancer le serveur

``` bash
symfony server:start --port=5601
```

## Création d'une nouvelle entité 

``` bash
php bin/console make:entity
```

## Migration de la base de donnée

``` bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

## Vérifier la connexion a la base de donnée 

``` bash
php bin/console doctrine:query:sql "SELECT * FROM Account"
```