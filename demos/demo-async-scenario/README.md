# Démo sur le traitement asynchrone en JavaScript, dans l'environnement Node.js 

- [Démo sur le traitement asynchrone en JavaScript, dans l'environnement Node.js](#démo-sur-le-traitement-asynchrone-en-javascript-dans-lenvironnement-nodejs)
  - [Objectifs](#objectifs)
  - [Démonstration](#démonstration)
  - [Option 1: Déléguer via une callback](#option-1-déléguer-via-une-callback)
  - [Option 2: Utiliser les promesses](#option-2-utiliser-les-promesses)
    - [Exercice](#exercice)
    - [Solution](#solution)
  - [Option 3 : utiliser `async/await`](#option-3--utiliser-asyncawait)
    - [1ere solution : placer tout le code dans une fonction async](#1ere-solution--placer-tout-le-code-dans-une-fonction-async)
    - [2eme solution : faire du code un module ES](#2eme-solution--faire-du-code-un-module-es)
  - [Conclusion](#conclusion)


## Objectifs

Objectif : Créer un programme avec des **traitements non bloquants**.

Comment faire ?

On a vu que pour faire un traitement asynchrone, il faut trois ingrédients:

1. Une **Event-loop**;
2. **Initialiser le traitement** (*quand* il démarre, avec quelle données elle travaille);
3. Dire *quoi* faire **lorsqu'il se termine** (traitement à executer, fonction à appeler, appelée *callback*)

L'**event-loop** est un **processus qui remet sur la pile d'appel des fonctions à executer**, fourni par l'environnement Node.js. 

Illustrons cela avec un exemple.

## Démonstration

Prenons l'exemple d'un jeté de pièce, on joue à pile ou face pour savoir où on part en vacances l'année prochaine avec un·e proche:

- si c'est pile, on part aux USA;
- si c'est face, on part en Australie.

C'est le proche qui lance la pièce. Pendant qu'il lance la pièce (temps de lancer, retombée, dévoilement de la valeur), je veux pouvoir *faire autre chose*. 

Pour simuler le lancer de pièce et sa durée, utilisons `setTimeout`:

~~~js
//Fonction exécutée de manière asynchrone (temps de trouver et lancer la piece et qu'elle se stabilise)
function toss() {
    //Simulation d'un traitement long
    console.log('Lancement de la pièce...')
    setTimeout(function () {
        const coin = Math.random();
        if (coin < 0.5) {
            console.log('head');
            return 'head';
        }
        else {
            console.log('tail')
            return 'tail';
        }
    }, 2 * 1000);
}

toss();
console.log("Suite du programme, je fais d'autres choses..")
~~~

**Remarquer la sortie**. `console.log('Suite du programme..')` est exécutée mais pourtant le programme ne termine pas son exécution. Il attend l'execution de `toss`, délayée par `setTimeout`. On voit ici l'*event-loop* de l'environnement de Node en action !

> Ici on se sert de `setTimeout` pour **simuler un traitement long** qui aurait lieu sur un autre thread. Lorsque la fonction à exécuter arrive sur la stack, on fait "comme si" on récupérait la réponse de ce traitement long. Pour éventuellement réaliser un vrai traitement sur un autre thread, il faut utiliser des web workers dans le contexte du Navigateur, [un worker thread](https://nodejs.org/api/worker_threads.html) dans le contexte de Node.js:


**Nous n'abordons pas ici comment une tache est effectuée en parallèle** (multi-threading). Dans nos projets, nous utiliserons des modules qui le font, comme `mysql2`. Ici on s'intéresse à comment *on travaille avec*.

Nous avons 2 ingrédients sur les trois: 

- L'event-loop : **check**, fourni par Node
- Initialiser le traitement : **check**, appel à `toss`.

Quoi faire lorsque le traitement finit ? Comment travailler avec le résultat de `toss` ? Comment prendre une décision basée sur la valeur de mon lancer de pièce ?

Écrivons une fonction `decide` qui prend en entrée le résultat du lancer de pièce et fais quelque chose (prend une décision). Mais on ne répond pas tout de suite, on va le faire de manière asynchrone aussi. Pour simuler ce traitement "long", on va réutiliser `setTimeOut`.

Ajouter cette fonction au script:

~~~js
//Fonction exécutée de manière asynchrone 
function decide(coin) {
    console.log("Lecture de la pièce et annonce...")
    //Simulation d'un traitement long (temps de réflexion)
    setTimeout(function () {
        if (coin === 'head') {
            console.log("Let's go to the USA !")
            return "Let's go to the USA !"
        }
        else if (coin === 'tail') {
            console.log("Let's go to Australia")
            return "Let's go to Australia !"
        }
        else
            return "It is impossible ! Toss again please !"
    }, 1 * 1000);
}
~~~


Comment je peux utiliser cette fonction `decide` pour travailler avec le résultat de `toss`? Où placer l'appel à la fonction ?

~~~js
toss();
console.log("Suite du programme, je fais d'autres choses..")
//Comment travailler avec le résultat de toss ? Où appeler decide ?
~~~

Comme on n'a perdu la main sur le flot de contrôle (tout est déjà exécuté quand le résultat arrive), il faut employer l'une de ces stratégies:

1. **Déléguer** à la tâche initiale (appels imbriqués);
2. Utiliser les **promesses** (ES6, 2015)
3. Utiliser les promesses avec le sucre syntaxique **async/await**(ES8, 2017)

En vérité, il n'y en a que 2, la 3eme est juste du "sucre syntaxique", elle est basée sur la même solution que la 2.

## Option 1: Déléguer via une callback

Dire à `toss` d'appeler `decide`.

Réécrire la fonction `toss`:
~~~js
function toss() {
    setTimeout(function () {
        const coin = Math.random() < 0.5 ? 'head' : 'tail';
        //Quand toss a fini...
        decide(coin)
    }, 2 * 1000);
}
~~~

C'est ce qu'on appelle le début du *call-back hell*. Imaginer il faut ajouter un autre traitement après `decide`, `toss` doit connaître `decide`, etc.

Voilà à quoi ça ressemble si on *déplie* `decide`:

~~~js
function toss() {
    console.log('Lancement de la pièce')
    setTimeout(function () {
        const coin = Math.random() < 0.5 ? 'head' : 'tail';
        //Quand toss a fini, prendre la décision
        setTimeout(function () {
            if (coin === 'head') {
                console.log("Let's go to the USA !")
                return "Let's go to the USA !"
            }
            else if (coin === 'tail') {
                console.log("Let's go to Australia !")
                return "Let's go to Australia !"
            }
            else
                return "It is impossible ! Toss again please !"
        }, 1 * 1000);
        //Ajouter un autre traitement ici au besoin.
    }, 2 * 1000);
}
~~~

**On couple chaque traitement au traitement suivant**. Chaque traitement est responsable d'appeler le traitement suivant, **les appels sont imbriqués**, ce que montrent les indentations.**On pert tout le pouvoir de composition des fonctions** et des responsabilités uniques (une fonction => une tâche).

**Très difficile à maintenir** (lire, comprendre et modifier)

## Option 2: Utiliser les promesses

Pour palier au callback hell, [les promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises) ont été introduites en ECMASCRIPT 2015 (ES6).

**Une fonction qui fait un traitement asynchrone retourne immédiatement une promesse** : dit au programme je te promets, dans le futur, tu auras un résultat.

Modifier la fonction `toss`:

~~~js
function toss() {
    console.log('Lancement de la pièce...')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const coin = Math.random() < 0.5 ? 'head' : 'tail';
            resolve(coin);
        }, 2 * 1000);
    });
}
~~~

Essayer:
~~~js
console.log(toss()) //Affiche Promise{<pending>}
~~~

Cela affiche un objet `Promise` avec le statut `pending`. La promesse attend d'être résolue ou rejetée.

La promesse prend en argument une *fonction* (le traitement !) qui prend elle même en argument deux fonctions: `resolve` et `reject`. Ces deux fonctions sont fournies au traitement asynchrone pour qu'il prévienne la promesse quand il a terminé son travail. **Une seule des deux fonctions sera appelée à la fin du traitement**: 

- `resolve` si le traitement réussit;
- `reject` si le traitement échoue (gestion des erreurs).

> Ces noms sont arbitraires, ce qui compte c'est le positionnement : callback de résolution en premier argument, d'échec en deuxième.

On dit dans le premier cas que la promesse a été **tenue**, dans le second que la promesse a été **rejetée**.

Lorsque le traitement asynchrone est terminé, la *callback* passée en argument à `setTimeout` (le jeter de pièce) revient sur la pile, est exécutée et **notifie la promesse** (via l'appel de `resolve`). 

Nous pouvons alors interroger la promesse pour savoir comment notre traitement s’est passé. Pour cela, la promesse nous met à disposition deux méthodes : `then()` et `catch()`.

- La méthode `then` est mappée à la fonction `resolve` passée au constructeur de la promesse. Si la promesse est tenue (resolve) on tombera dans then. La promesse est dans l'état *tenue* (*fulfilled*);
- a méthode `catch` est mappée à la fonction `reject` passée au constructeur de la promesse. Si la promesse est rejetée (reject) alors on tombera dans le `catch`, la promesse est dans l'état *rejetée* (*rejected*). 

La méthode `then()` **renvoie un nouvel objet Promise**, ce qui permet d'enchaîner les appels aux méthodes des promesses. **Si la valeur de retour n'est pas une promesse, elle est implicitement convertie en un objet Promise résolue**.

Exemple issu de la doc:

~~~js
const p2 = new Promise((resoudre, rejeter) => {
  resoudre(1);
});

p2.then((valeur) => {
  console.log(valeur); // 1
  return valeur + 1; // Convertie en promesse tenu
}).then((valeur) => {
  console.log(valeur); // 2 - une valeur synchrone fonctionne (wrap dans une promesse par then)
});

p2.then((valeur) => {
  console.log(valeur); // 1
});
~~~


RéÉcrire l'appel de `toss` avec le traitement de la promesse:
~~~js
toss()
    .then((coin) => {
        console.log(coin)
        //Ensuite?
    })
    .catch((error) => {
        console.log(error);
    });

console.log("Suite du programme, je fais d'autres choses..")
~~~

On passe de l'imbrication (callback hell) *à la chaîne de promesses*. Remarquez, chaque traitement est bien découplé, autonome. `toss` ne se soucie plus d'appeler `decide`.

Comment on travaille avec le résultat à présent, comment on le passe à `decide` ?

On emballe aussi decide dans une promesse:

~~~js
function decide(coin) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (coin === 'head')
                resolve("Let's go to the USA !")
            else if (coin === 'tail')
                resolve("Let's go to Australia !")
            else
                reject("It is impossible ! Toss again please !")
        }, 1 * 1000);
    });
}
~~~

A présent on peut utiliser les blocs `then` et `catch` pour chaîner nos traitements asynchrones:

~~~js
//Enchaîner
toss().then((coin) => {
    return decide(coin);
    //Ajouter un traitement = Ajouter un bloc à la suite
}).then((decision) => {
    console.log(decision)
})
    .catch((error) => {
        //Traiter les erreurs s'il promesse rejetée
    })
console.log("Suite du programme, je fais d'autres choses..")
~~~

De l'imbrication (callback hell) à la chaîne de promesses. On peut **enchaîner les traitements**, et chaque fonction rempli son rôle sans se soucier des autres. 

Cela se remarque dans **l'indentation du code (1 seul niveau)**

Ce sont *les promesses qui se chargent de lier les traitements asynchrones entre eux*, plus les fonctions elle-mêmes.

### Exercice

Ajouter les traitements suivants au programme:

1. Si la pièce fait pile (`head`), **écrire sur la sortie** `"Pile, j'en étais sûr !"`;
2. Si la pièce fait pile (`tail`), on va ouvrir la page du site web de l'office de tourisme des USA `office-tourisme-usa.com`, sinon `australia.com`. Le chargement de la page *prend du temps*. **Écrire la fonction asynchrone** `loadwebsite()` : elle prend 1 seconde à afficher la page d'accueil du site correspondant (On affichera l'url du site web sur la sortie pour simuler l'affichage de la page d'accueil).

Voici la sortie attendue en cas de *pile*:

~~~bash
Lancement de la pièce...
Suite du programme, je fais d'autres choses..
Pile, j'en étais sûr!
Préparation de l'annonce...
Let's go to the USA !
Chargement du site web...
Bienvenue sur office-tourisme-usa.com
~~~

### Solution

1. Il suffit d'ajouter un `if` dans le bloc `then` de `toss`
2. On place ce traitement **après la prise de décision**. On ouvre le site web une fois que l'on est certain d'où l'on va.

~~~js
//Affiche la page d'accueil du site de l'OT du pays de destination
//au bout d'1 seconde
function loadWebsite(coin) {
    console.log('Chargement du site web...')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if ('head' === coin) {
                resolve('office-tourisme-usa.com')
            } else {
                resolve('australia.com')
            }
        }, 1 * 1000);
    });
}

toss().then((coin) => {
    if ('head' === coin) {
        console.log("Pile, j'en étais sûr!");
    }
    //1. decide retourne une promesse
    //2. quand elle est résolue (apres timeout), le then accolé execute la fonction
    //qui retourne un objet {coin, decision}
    //3. le return retourne une promesse (then retourne toujours une promesse) embarquant l'objet dans sa résolution,
    //4. dans le then suivant, on déstructure l'objet reçu en argument.
    //Voir "Destructuring" https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#d%C3%A9composer_un_objet
    //Cette technique permet de passer 'coin' de then en then
    //Sinon, il faudrait juste ici que decide retourne un objet conservant la valeur de coin, ou faire un map entre decision et coin quelque part
    return decide(coin).then((decision) => ({ coin, decision }));
}).then(({ coin, decision }) => {
    console.log(decision);
    return loadWebsite(coin);
}).then((url) => {
    console.log('Bienvenue sur ' + url);
});
~~~

## Option 3 : utiliser `async/await`

Nous avons vu, comment en principe, nous pouvons sortir de l’enfer des callbacks à l’aide des promesses et écrire du code plus lisible. Néanmoins, on l’a vu, la syntaxe est encore un peu lourde. 

L’enchaînement des `then` et des valeurs de retours passant d’un `then` à l’autre peut rapidement devenir illisible.

En 2017, la norme ECMAScript8 arrive avec deux nouveaux mots clés : `async` et `await`. 

Contrairement au passage de l’utilisation des callbacks à celle des promesses dans la gestion de l’asynchrone, **cette nouvelle norme n’introduit aucune nouvelle feature, sinon du sucre syntaxique**. Sous le capot, le moteur *reste* celui des promesses.

Cette syntaxe a pour but de faire que du traitement asynchrone **se lise comme du traitement synchrone**. L'idée c'est de masquer les enchaînements des `then` qui peuvent être difficiles à maintenir.

Voici les règles de la syntaxe:

- Une fonction qui retourne une promesse doit être déclarée `async`;
- Si une fonction utilise `async` ou `await` dans son corps, **elle doit** être déclarée `async`;
- Une fonction déclarée `async` retourne automatiquement une promesse;
- On place `await` devant des **fonctions `async` (qui retournent des promesses)**;
- Si la promesse est tenue, la ligne suivante est exécutée.

On va réécrire cette partie

~~~js
toss().then((coin) => {
return decideWhatToDo(coin);
//Ajouter un traitement = Ajouter un bloc à la suite
}).then((toDo) => {
console.log(toDo)
})
~~~

comme ceci 

~~~js
let coin = await toss();
//Exécuté uniquement si promesse précédente a été "tenue"
let decision = await decide(coin);
//Exécuté uniquement si promesse précédente a été "tenue"
console.log(decision)
~~~

Même execution, même résultat.

Pour cela, il suffit de:

- placer `async` devant la définition de `toss` et `decide`;
- placer le tout dans un `try/catch` pour gérer les erreurs éventuelles (`reject`) et *échouer avec grâce*

~~~js
async function toss() {...}
async function await() {...}
~~~

Remplacer le bloc de `then/catch` par `async/await`:

~~~js
async function toss() {...}
async function await() {...}

//On écrit comme du synchrone
console.log("Suite du programme, je fais d'autres choses..")
try{
    let coin = await toss();
    //Exécuté que si promesse précédente tenue
    let decision = await decide(coin);
    //Exécuté que si promesse précédente tenue
    console.log(decision)
}catch(e){
    console.log('Erreur:' + e);
}
~~~

Executer : Erreur ! `await is only valid in async functions and the top level bodies of modules` !!

Pourquoi diable ?

L'utilisation de `await` est **uniquement valide dans les fonctions marquées comme `async` ou au niveau supérieur d'un module ES**. Si votre code est dans un fichier ou une fonction qui ne répond pas à ces critères, vous obtiendrez cette erreur. Déclarer une fonction comme async, on l'a vu, fait que cette fonction retourne une promesse. Cela permet à de passer aux instructions suivantes.

Deux solutions:

- placer tout le code dans une fonction `async`
- spécifier que notre code est un module;

### 1ere solution : placer tout le code dans une fonction async

~~~js
async function main() {
    try {
        console.log("Suite du programme, je fais d'autres choses..")
        let coin = await toss();
        let decision = await decide(coin);
        console.log(decision)
    } catch (e) {
        console.log('Erreur:' + e);
    }
    
}
main()
~~~

### 2eme solution : faire du code un module ES

Initialiser un projet `npm init -y`.

Éditer le fichier `package.json` du projet:

~~~json
{
  "name": "node",
  "version": "1.0.0",
  "description": "Une démonstration du traitement asynchrone",
  "main": "async.js",
  "type": "module", // <= ICI
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
~~~

Directement dans `main.js`:

~~~js
try {
    console.log("Suite du programme, je fais d'autres choses..")
    let coin = await toss();
    let decision = await decide(coin);
    console.log(decision)
} catch (e) {
    console.log('Erreur:' + e);
}    
~~~

## Conclusion

Vous savez tout pour **gérer des traitements asynchrones**. La plupart du temps **vous vous contenterez de** **gérer des fonctions qui retournent des promesses**, non écrire vous-même de telles fonctions.


- [Utiliser les promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises), de la MDN;
- [async function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function), de la MDN, sur l'usage d'`async` et d'`await`
- [Un guide illustré pour comprendre les promesses en JavaScript](https://frank.taillandier.me/2017/03/23/comprendre-les-promesses-en-javascript/), de Frank Taillandier. Si vous aimez les métaphores
- [Callback Hell](http://callbackhell.com/), A guide to writing asynchronous JavaScript programs 