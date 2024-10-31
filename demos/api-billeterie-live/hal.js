/**
 * Export des fonctions helpers pour la spécification HAL
 * Voir la spécification HAL : https://stateless.group/hal_specification.html
 * Voir la spécification HAL (RFC, source) : https://datatracker.ietf.org/doc/html/draft-kelly-json-hal
 */

/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url 
 * @param {*} type 
 * @param {*} name 
 * @param {*} templated 
 * @param {*} deprecation 
 * @returns 
 */
function halLinkObject(path, type = '', name = '', templated = false, deprecation = false) {

    return {
        "href": path,
        "templated": templated,
        ...(type && { "type": type }),
        ...(name && { "name": name }),
        ...(deprecation && { "deprecation": deprecation })
    }
}


function mapConcertListToResourceObject(concerts) {

    //Préparer les concerts "embarqués" comme ressource
    //par la ressource "La liste des concerts à venir"

    const embedded = concerts.map(concert => mapConcertToResourceObject(concert))

    //La liste des concerts à venir
    return {

        "_links": {
            "self": halLinkObject('/concerts')
        },

        "_embedded": {
            "concerts": embedded
        }
    }

}


/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} concertData Données brutes d'un concert
 * @returns un Ressource Object Concert (spec HAL)
 */
function mapConcertToResourceObject(concertData) {
    return {
        "_links": {
            "self": halLinkObject(`/concerts/${concertData.id}`),
            "concerts": halLinkObject('/concerts'),
            'book': halLinkObject(`/concerts/${concertData.id}/reservations`)
        },
        //Données du concert:
        artist: concertData.artistName,
        location: concertData.location,
        description: concertData.description,
        date: concertData.date,
    }
}


module.exports = { halLinkObject, mapConcertToResourceObject, mapConcertListToResourceObject };
