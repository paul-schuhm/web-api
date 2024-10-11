//this est une référence mise à disposition du moteur de JS
//qui peut prendre différentes valeurs en fonction de son contexte
//d'appel. Notamment dans le cas de fonctions fléchées.
//Lire la doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this

const test = {
    prop: 42,
    func: function () {
        //A quoi fait référence this dans ce contexte ? A l'objet sur lequel est défini la fonction
        return this.prop;
    },
};

//Objet global dans une application Node : module.exports
//Object global dans le navigateur : Window

module.exports.prop = 'foobar';

const test2 = {
    prop: 42,
    //Notation fléchée
    //this
    func: () => {
        //A quoi fait référence this dans ce contexte ? a l'objet global (module.exports)
        return this.prop; //module.exports
    },
};

console.log(test.func());
console.log(test2.func());
