async function toss() {
    console.log('Lancement de la pièce...')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const coin = Math.random() < 0.5 ? 'head' : 'tail';
            resolve(coin);
        }, 2500);
    });
}

//Fonction exécutée de manière asynchrone (temps de reflexion)
async function decide(coin) {
    console.log("Préparation de l'annonce...")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (coin === 'head')
                resolve("Let's go to the USA !")
            else if (coin === 'tail')
                resolve("Let's go to Australia !")
            else
                resolve("It is impossible ! Toss again please !")
        }, 3000);
    });
}


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

//Enchaîner
toss().then((coin) => {
    if ('head' === coin) {
        console.log("Pile, j'en étais sûr!");
    }
    return decide(coin).then((decision) => ({ coin, decision }));
}).then(({ coin, decision }) => {
    console.log(decision);
    return loadWebsite(coin);
}).then((url) => {
    console.log('Bienvenue sur ' + url);
});

console.log("Suite du programme, je fais d'autres choses..")