const constants = {
    PI: 4 * Math.atan(1.0), // Set to the value of π
    _2PI: 2 * 4 * Math.atan(1.0), // Set to 2 times the value of π, which is 2π
};

/**
 * Retourne le périmètre d'un cercle de center [radius]
 * @param {*} radius 
 * @returns {number}
 */
function perimeterOfCircle(radius) {
    return constants._2PI * radius;
}

/**
 * Retourne la surface d'un cercle de rayon [radius]
 * @param {*} radius 
 * @returns {number}
 */
function surfaceOfCircle(radius) {
    return constants.PI * radius * radius;
}

/**
 * Retourne le volume d'une sphère de rayon [radius]
 * @param {*} radius 
 * @returns {number}
 */
function volumeOfSphere(radius) {
    return (4 / 3) * constants.PI * radius * radius * radius;
}

/**
 * Retourne la distance entre deux points 1 et 2
 * @param {number} x1 Coordonnée horizontale du point 1 
 * @param {number} y1 Coordonnée verticale du point 1 
 * @param {number} x2 Coordonnée horizontale du point 2
 * @param {number} y2 Coordonnée verticale du point 2 
 * @returns {number}
 */
function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Retourne vrai si deux cercles de rayon radius1 et radius2 se chevauchent, faux sinon
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} radius1 
 * @param {*} x2 
 * @param {*} y2 
 * @param {*} radius2 
 * @returns 
 */
function areOverlapping(x1, y1, radius1, x2, y2, radius2) {
    const d = distance(x1, y1, radius1, x2, y2, radius2);
    return d < radius1 + radius2;
}

module.exports = { perimeterOfCircle, surfaceOfCircle, volumeOfSphere, areOverlapping };