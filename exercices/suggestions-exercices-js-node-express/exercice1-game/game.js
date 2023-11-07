//Node.js a différents modules compilés directement dans le binaire 'node'
//Ces modules 'coeur' peuvent être expressément demandés en les préfixant avec 'node:{nom du module}'
const fs = require('node:fs')

//Paramètres du jeu
const min = 1;
const max = 10;
const maxNumberOfTries = 10;
const gameDurationInSeconds = 10
//Fichier pour enregistrer le scoreboard
const pathToScoreBoard = 'scoreboard.txt';

//Variables d'états du jeu
let numberOfTriesLeft = maxNumberOfTries;
let gameIsOver = false;
//Le nombre entier à deviner entre max et min
let numberToGuess = Math.floor(Math.random() * (max - min) + min);
//Le timer qui sera incrémenté
let clock = 0;
const tickInSeconds = 1

/**
 * Affiche les instructions au démarrage du jeu
 */
function printStartingGameInstructions() {
    console.log('Le jeu commence');
    console.log('(Control-D pour quitter le jeu)');
    console.log(`Vous devez devinez le nombre entre ${min} et ${max} en moins de ${maxNumberOfTries} essais. Bonne chance !`);
}

process.stdin.resume(); // Start reading from stdin
process.stdin.setEncoding('utf8'); // Set the encoding to UTF-8 (optional, depending on your needs)
process.stdin.on('data', function (data) {

    if (isNaN(parseInt(data))) {
        if (data === 'y\n' || data === '\n' && gameIsOver) {
            //Reset the game
            numberToGuess = Math.ceil(Math.random() * (max - min) + min);
            numberOfTriesLeft = maxNumberOfTries;
            clock = 0;
            gameIsOver = false;
            printStartingGameInstructions();
            return;
        } else if (data === 'n\n' && gameIsOver) {
            //Quit the game
            console.log('Merci d\'avoir joué.');
            process.exit();
        } else {
            //Handle wrong input
            //On ne compte pas l'input comme un essai
            console.log(`Merci de proposer un nombre. ${numberOfTriesLeft} essais restants`);
            return;
        }
    }

    //Process the game
    if (clock > gameDurationInSeconds) {
        gameIsOver = true;
    }

    const guess = parseInt(data)

    numberOfTriesLeft--;

    let hint;

    if (guess > numberToGuess) {
        hint = `Plus petit ! Nombre d'essais restants : ${numberOfTriesLeft}`;

    } else if (guess < numberToGuess) {
        hint = `Plus grand ! Nombre d'essais restants : ${numberOfTriesLeft}`;

    } else {
        gameIsOver = true;
    }

    if (numberOfTriesLeft === 0) {
        gameIsOver = true;
    }

    if (gameIsOver) {

        const gameIsAWin = gameIsOver && guess === numberToGuess

        if (gameIsAWin) {

            console.log(`Félicitations, le nombre à trouver était bien ${numberToGuess} ! Vous avez trouvé en ${maxNumberOfTries - numberOfTriesLeft} essais et ${clock} secondes !`);

            //Save the score
            try {
                const scoreLine = `${maxNumberOfTries - numberOfTriesLeft}, ${maxNumberOfTries}, ${min}, ${max}, ${clock}, ${gameDurationInSeconds}\n`;
                fs.appendFileSync(pathToScoreBoard, scoreLine);
                console.log('Le score a été enregistré')
            } catch (err) {
                console.error("Une erreur s'est produite lors de l'écriture dans le fichier : " + err);
            }

        } else {
            console.log(`Game over !  Le nombre à trouver était ${numberToGuess}`)
        }

        console.log(`Voulez-vous rejouer une partie ? ([Y]/n)`);

    } else {
        //Continue the game with a hint
        console.log(`Il vous reste ${gameDurationInSeconds - clock} secondes`)
        console.log(hint)
    }

});


printStartingGameInstructions();

//Tick the clock (approximately) every 10 seconds
function tick() {
    clock += tickInSeconds;
    setTimeout(tick, tickInSeconds * 1000)
}

//Setup the clock
setTimeout(tick, tickInSeconds * 1000)