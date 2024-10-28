# Exercice 7 - Prise en main de cURL - Correction

Déclarer une variable `url`:

~~~bash
url=https://jsonplaceholder.typicode.com
~~~

puis

~~~bash
curl $url
~~~

On utilise cette variable pour écrire nos requêtes:

1. `curl $url/posts -o posts.json`. Avec les headers : `curl $url/posts -i -o result.txt`
2. `curl $url/users/{7,8,9,10}`
3. `curl -s "$url/photos?_limit=20`
4. `curl -h`, on voit qu'on peut acceder a de l'info sur les categories. `curl -h category` puis `curl -h http`
la on voit `curl -I` pour faire un `HEAD` (n'afficher que les entêtes de la réponse)
curl -w "%{http_code}" $url
6. `curl -w "%{http_code}" -X POST -d="title=Foo" $url`
7. `curl -w "%{http_code}" -X DELETE $url/8`. Le code status est `200` meme si ressource existe pas d'ailleurs. *Remarque: ÇA devrait être 204. Il ya une issue sur le dépot : https://github.com/typicode/jsonplaceholder/issues/93*
8. Avec l'option `-H`: `curl -H "Nom du header:valeur"`
9. `curl $url/users --etag-save etag` (on l'enregistre dans un fichier temporaire). `curl --etag-compare etag $url/users -w "%{http_code}`" On obtient un code 304, redirection vers le cache. La requête conditionnelle a fonctionné. Si on modifie l'`ETag` dans le fichier et refait la requête on a un 200 car la requête conditionnelle `If-None-Match` renverrait true (les `ETag` ne match plus), ce qui déclencherait la "requête complete" avec le corps, donc un code `200` avec le body (document resservi)

## Utiliser jq

Utiliser [jq](https://jqlang.github.io/jq/tutorial/) pour *requêter* le json et le *prettyfier*

~~~bash
curl $url/posts | jq '.[] | {.userId}'
~~~