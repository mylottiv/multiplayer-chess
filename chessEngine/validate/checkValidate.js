function checkValidate(validPlayerMoves, validOpponentMoves) {
    const playerKing = validPlayerMoves.find(({type}) => type === 'King');
    const checkingPieces = validOpponentMoves.filter(({moveset}) => moveset.includes(playerKing.coordinates));
    const playerCheck = (checkingPieces.length > 0);
    return (playerCheck) ? {playerCheck, checkingPieces} : playerCheck;
}

module.exports = {checkValidate};