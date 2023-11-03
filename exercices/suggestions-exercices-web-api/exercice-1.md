### Manipuler le cache HTTP

1. Sur l'URL `/`, on récupère le document `index.html` dans la réponse HTTP avec le status code `200`. Sur l'URL `/foo`, on ne récupère rien car il n'y a aucune ressource déclarée à cette URL sur notre serveur. La réponse HTTP nous l'indique avec un code status une `404` Ressource Introuvable. Si on requête à nouveau `/`, on obtient une réponse HTTP avec cette fois ci le code status `304`. C'est le code statut d'une redirection. Le serveur nous indique que la ressource existe mais trouvable ailleurs, ici elle nous redirige vers le cache de notre navigateur. Le contenu de la réponse (la page index.html) est donc ici servie par le cache.

2. Le cache est un espace de stockage temporaire de données consultées régulièrement pour éviter de retourner à la source rechercher des informations. Cela permet de réduire les temps d'attente et d'améliorer les performances d'un système comme une application web. Le cache HTTP est un système de cache où les réponses HTTP (et donc leurs contenus !) sont enregistrées temporairement et localement sur une machine. Par exemple, chez le client le cache est géré par le navigateur web. Dans le cache, les réponses HTTP sont associées à l'URL requêtée. C'est une petite base de données clé/valeur où l'url est la clé et la valeur est la réponse HTTP associée. Ainsi, lorsqu'une requête est émise vers `foo.com`, si une réponse HTTP est trouvée dans le cache pour cette URL, la réponse pourra être resservie depuis le cache sans ré émettre de requête vers le serveur. 


3. Petite synthèse sur le cache après un travail de veille sur la documentation

- **Où peut-on trouver du cache sur le web ?** Le cache peut se trouver sur toute la chaîne d'une requête HTTP : chez le client, sur un serveur, sur un [proxy](https://fr.wikipedia.org/wiki/Proxy), un [reverse proxy](https://fr.wikipedia.org/wiki/Proxy_inverse) ou entre les deux ([CDN](https://fr.wikipedia.org/wiki/R%C3%A9seau_de_diffusion_de_contenu) par exemple)


- **À quoi servent les headers (En-tête HTTP) `Date`, `Last-modified`, `Cache-control` ?**
  - `Date` : date à laquelle la réponse HTTP a été générée par le serveur
  - `Last-Modified` : date à laquelle le serveur pense que la ressource a été modifiée pour la dernière fois. Dans le cas où le serveur sert un fichier il peut la définir sans ambiguité à partir de la date de modification du fichier. Dans le cas de ressources plus abstraites, résultant de calcul ou de requêtes à une base, cette date peut-être moins aisée à définir.
  - `Cache-Control` : header mis à disposition pour définir la politique de cache de manière explicite. En l'absence de ce header, le navigateur va appliquer sa propre politique de manière empirique ([heuristique](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#heuristic_caching)). Il permet notamment de définir max-age.


- Le cache peut être dans deux états : "frais" (*fresh*) ou "vicié/périmé/rassi" (*stale*). Pour définir la fraîcheur d'un cache il faut lui assigner une date de péremption (mesure absolue). C'est ce que l'on faisait avec le header `Expires`. Aujourd'hui ce header est déprécié, et on préfère utiliser `Cache-Control: max-age` qui définit une période de fraîcheur en secondes (mesure relative). Par exemple, si le serveur veut indiquer que le client peut mettre en cache pendant une semaine sa réponse il le fera ainsi : `Cache-Control: max-age=604800`. L'âge du cache est calculé comme suit : `age = date à laquelle la requête HTTP est faite - Date de la réponse en cache`. Si `age < max-age`, le cache est frais, vicié sinon.
- **Qu'est ce que la validation ou revalidation du cache ?** Lorsque le cache est périmé, il n'est pas automatiquement remis à jour en effectuant une nouvelle requête complète. Le client va d'abord demander au serveur si le cache peut encore être utilisé, s'il est encore valide, ou non. Pour cela, il va envoyer une *requête conditionnelle*. C'est ce qu'on appelle la revalidation du cache. Une requête conditionnelle est une requête HTTP comme les autres à la différence que la réponse HTTP associée ne contient aucun contenu, ce sont seulement des requêtes qui portent des headers. Une requête conditionnelle se caractérise par la présence des headers `If-Modified-Since` et/ou `If-None-Match` (noter le *if* qui indique qu'on pose une question au serveur). Ainsi, il n'y a pas de transfert inutile de données si le cache est revalidé par le serveur.
-  **Est ce qu'une réponse "viciée/périmée" (*stale*) est forcément *invalide* (nécessite une nouvelle requête pour être mise à jour) ?** Non, une réponse périmée peut être revalidée par la serveur.
-  **Quelles sont les deux manières de revalider le cache ?** Il est possible de revalider le cache soit *par la dernière date de modification* avec le couple de headers `If-Modified-Since/Last-Modified` ou *par changement de valeur* avec le couple `If-None-Match/ETag`. Le header `ETag` contient une chaîne de caractères qui représente "la valeur de la réponse". Lorsque la réponse change, cette valeur change aussi.


4. On voit tout d'abord que le code status est `304`, donc le contenu est resservi *depuis* le cache. On voit en effet un header `Cache-Control: max-age=0` sur la réponse HTTP émise par le serveur. Cela signifie que la réponse en cache est *toujours* périmée et doit être revalidée à chaque fois. Pour cela une requête conditionnelle est envoyée. Si le contenu de la réponse n'a pas changé et/ou la dernière date de modification n'a pas changé, le cache est mis à jour (header `Date` de la réponse en cache) et la page est resservie depuis le cache. Ce `Cache-Control` est défini par défaut par Express.


5. Comme le fichier a été modifié et `Cache-Control:max-age=0` (voir le header `Last-modified`), le cache est vicié, une requête conditionnelle est envoyée avec le header `If-Modified-Since`. Comme la condition est vraie, une nouvelle requête complète est faite (code 200). Express a mis à jour `Last Modified` en se basant sur la date de modification du fichier tout simplement.


6. Le *hard reload* permet d'effectuer une requête en *ignorant* le cache, comme si on faisait la requête sur l'URL pour la première fois.


7. `If-Modified-Since` et `If-None-Match`. Oui, il est théoriquement toujours possible de revalider le cache car meême si If-Modified-Since ne peut plus être utilisé dans la requête (car Last-Modified absent), il reste toujours If-None-Match et ETag qui peuvent travailler pour valider le cache

8.

~~~js
app.use(express.static('public', {
    index: 'index.html', maxAge: 20000, etag: false, lastModified: false
}))
~~~

On s'attend à ce que la réponse en cache soit valable 20 secondes (20 000 millisecondes). Imaginons que l'on serve la page index.html. Elle est mise en cache avec un `max-age` de 20 secondes. Donc pendant 20 secondes, la page devrait être resservie depuis le cache sans qu'aucune requête ne soit émise ! Or, si on modifie rapidement la page index.html et qu'on recharge l'onglet (Ctr+R) le contenu modifié est servi ! On dirait que le navigateur ignore le cache car il se permet de revalider la requête bien que le cache soit encore frais. Pourquoi (diable) ? C'est le navigateur ici qui ajoute sa propre règle : un reload dans le même onglet effectue une requête de validation par défaut. C'est un comportement implémenté par les navigateurs basé sur une heuristique : on s'attend à ce qu'une personne qui recharge son onglet cherche à avoir des informations à jour. Donc l'âge du cache est ignoré et le navigateur effectue lui même une revalidation. Pour contourner ce problème, et utiliser le cache, il faut copier/coller l'URL dans un *nouvel* onglet.

9. Dans cette configuration 

~~~js
app.use(express.static('public', {
    index: 'index.html', setHeaders: function (res, path, stat) {
        res.set('Cache-Control', 'no-store')}
}))
~~~

le serveur définit une politique de cache avec la valeur `no-store`. Cela indique au client "ne met rien en cache, n'utilise pas le cache". C'est une configuration pratique dans un environnement de développement pour éviter des problèmes de cache intempestifs lorsque l'on modifie des assets (css, js)



10. *Un caching pattern* utile pour servir au client des ressources toujours à jour et qui donc peuvent changer régulièrement (ex: page de liste d'actualités) est `Cache-Control : no-cache`. no-cache, contrairement à ce que son nom pourrait penser, dit de toujours valider le cache même si le cache est considéré comme frais. Si le cache est revalidé, il n'y aura pas de transfert inutile de données. C'est un bon compromis.


11.  Une fonction middleware Express est une fonction qui peut être appelée sur le chemin du traitement d'une requête. Elle permet d'accrocher des traitements à une requête avant ou après que celle-ci ne soit traitée. Ici on créee une fonction middleware qui log sur la sortie standard (côté serveur) le type de la requête reçue : requête "normale" ou requête conditionnelle.

~~~js
//On attache une fonction middleware à l'application express
//avec la méthode use. Cette fonction anonyme sera exécutée à chaque
//traitement d'une requête HTTP par l'application
app.use((req, res, next) => {
    // Test la présence du header "If-Modified-Since"
    const ifModifiedSince = req.get('If-Modified-Since');
    
    // Test la présence du header "If-None-Match"
    const ifNoneMatch = req.get('If-None-Match');
    
    if (ifModifiedSince || ifNoneMatch) {
        // Si l'un des deux est présent, c'est une requête conditionnelle
        //dont le but est de valider ou invalider le cache coté client
        console.log('Conditional request received.');
    }else{
        //En l'absence de ces headers, c'est une requête normale
        //qui va contenir la page html
        console.log('Normal request')
    }
    //On appelle next() pour passer à la fonction middleware suivante
    next();
});
~~~


12.  

~~~js
///Retourne l'heure courante dans un format hh:mm:ss
function currentTimeFormatted() {
    const now = new Date();
    const hoursClock = now.getHours().toString().padStart(2, '0');
    const minutesClock = now.getMinutes().toString().padStart(2, '0');
    const secondsClock = now.getSeconds().toString().padStart(2, '0');
    return `${hoursClock}:${minutesClock}:${secondsClock}`;
}
//Tout simplement, penser à copier coller l'url dans un autre onglet pour utiliser le cache. Cf question 8.
//Pour tester: hot reload sur /funny-clock, puis copier/coller url dans un autre tab
app.get('/funny-clock', (req, res) => {
    res.set('Cache-Control', 'max-age=20');
    res.send(currentTimeFormatted())
})
~~~