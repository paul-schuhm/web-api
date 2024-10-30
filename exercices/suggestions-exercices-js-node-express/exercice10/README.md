# Exercice 10 - Correction

Lancer le programme:


~~~bash
npm i
npm run start
~~~

Tester le service:

~~~bash
$url=localhost:3000

curl $url/posts/3
curl localhost:3000/posts -X POST -d"message=hello, world"
curl $url/posts
~~~