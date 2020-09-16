function outOfCheckValidation(validPlayerMoves, opponentCheckingPieces) {
    const newValidPlayerMoves = validPlayerMoves.map(piece => {
        let filterFunction;
        if (piece.type === 'King') filterFunction = (coordinates) => !opponentCheckingPieces.some(({moveset}) => moveset.includes(coordinates))
        else filterFunction = (playerMoveCoordinates) => opponentCheckingPieces.some(({coordinates, moveset}) => (opponentCheckingPieces.length === 1 && playerMoveCoordinates === coordinates) || moveset.includes(playerMoveCoordinates));
        return {...piece, moveset: piece.moveset.filter(filterFunction)}
    });
    return newValidPlayerMoves;
}

module.exports = {outOfCheckValidation};