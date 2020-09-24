const { chessboardNotationEnum } = require("../constants/chessboardEnums");

function checkValidate(validPlayerMoves, validOpponentMoves) {
    const playerKing = validPlayerMoves.find(({type}) => type === 'King');
    const checkingPieces = validOpponentMoves.filter(({type, coordinates, moveset}) => {
        const kingInMoveset = moveset.includes(playerKing.coordinates);
        if (kingInMoveset && type === 'Pawn') {
            const playerKingIndex = chessboardNotationEnum[playerKing.coordinates];
            const pawnIndex = chessboardNotationEnum[coordinates];
            return (![8, 16].includes(Math.abs(playerKingIndex - pawnIndex)))
        }
        else return kingInMoveset
    });
    const playerCheck = (checkingPieces.length > 0);
    return (playerCheck) ? {inCheck: playerCheck, checkingPieces} : {inCheck: playerCheck, checkingPieces: []};
}

module.exports = {checkValidate};