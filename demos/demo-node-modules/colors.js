///fichier colors.js

//Color n'est pas exposé : privé au module
class Color {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}

///randomColor est exposée : public
function randomColor() {
    // Generate random values for red, green, and blue components
    const r = Math.floor(Math.random() * 256); // 0 to 255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Convert the values to hexadecimal and format the color
    const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    return color;
}

//allColors est exposé : public
const allColors = [
    new Color('brightred', '#E74C3C'),
    new Color('soothingpurple', '#9B59B6'),
    new Color('skyblue', '#5DADE2'),
    new Color('leafygreen', '#48C9B0'),
    new Color('sunkissedyellow', '#F4D03F'),
    new Color('groovygray', '#D7DBDD'),
];
//On exporte une constante, la classe et une fonction
module.exports = { allColors, randomColor }