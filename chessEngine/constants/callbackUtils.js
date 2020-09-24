function matchCoordinates(matchingCoordinates) {
    return ({coordinates}) => matchingCoordinates === coordinates;
}

module.exports = {matchCoordinates};