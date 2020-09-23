const {stepperOperations} = require('../constants/stepperOperations');
const { chessboardNotationEnum, chessboardArrayEnum } = require('../constants/chessboardEnums');

function checkPathStepper(kingCoordinates, checkingCoordinates, moveCoordinates, direction) {
    let nextIndex = stepperOperations[direction](chessboardNotationEnum[checkingCoordinates]);
    let nextCoordinates = chessboardArrayEnum[nextIndex]
    while (kingCoordinates !== nextCoordinates) {
        if (moveCoordinates === nextCoordinates) return true;
        nextIndex = stepperOperations[direction](nextIndex);
        nextCoordinates = chessboardArrayEnum[nextIndex];
    }
    return false;
}

function outOfCheckValidation(validPlayerMoves, opponentCheckingPieces) {

    const playerKingCoordinates = validPlayerMoves.find(piece => piece.type === 'King').coordinates; 

    const newValidPlayerMoves = validPlayerMoves.map((piece) => {
        let filterFunction;
        if (piece.type === 'King') filterFunction = (kingMoveCoordinates) => {
            let moveInOpponentMoves, moveInOpponentCheckRange, pawnStepMove = false;
            opponentCheckingPieces.forEach(({type, coordinates: checkingOpponentCoordinates, moveset, canCapture}) => {
                moveInOpponentMoves = moveset.includes(kingMoveCoordinates);
                if (moveInOpponentMoves && type === 'Pawn') {
                    const kingMoveIndex = chessboardNotationEnum[kingMoveCoordinates];
                    const checkingPawnCoordinates = chessboardNotationEnum[checkingOpponentCoordinates];
                    pawnStepMove = ([8, 16].includes(Math.abs(kingMoveIndex - checkingPawnCoordinates)));
                }
                else if (!moveInOpponentMoves && ['Queen', 'Bishop', 'Rook'].includes(type)) {
                    const checkThreat = canCapture.find(({coordinates: captureCordinates}) => captureCordinates === playerKingCoordinates);
                    if (!checkThreat) return;
                    const nextPossibleCheckIndex = stepperOperations[checkThreat.direction](chessboardNotationEnum[playerKingCoordinates]);
                    const nextPossibleCheckCoordinates = chessboardArrayEnum[nextPossibleCheckIndex];
                    moveInOpponentCheckRange = (nextPossibleCheckCoordinates === kingMoveCoordinates);
                }
            })
            return ((!moveInOpponentMoves && !moveInOpponentCheckRange) || (pawnStepMove));
        }
        else filterFunction = (playerMoveCoordinates) => {
            return opponentCheckingPieces.some(({type: testType, coordinates: checkingPieceCoordinates, moveset, canCapture}) => {
                // Yes this is a duplicate in need of refactoring
                const checkThreatDirection = canCapture && canCapture.find(({coordinates: captureCordinates}) => captureCordinates === playerKingCoordinates).direction;
                const moveWouldBlockCheckPath = checkThreatDirection && moveset.includes(playerMoveCoordinates) && checkPathStepper(playerKingCoordinates, checkingPieceCoordinates, playerMoveCoordinates, checkThreatDirection);
                return (opponentCheckingPieces.length === 1 && (playerMoveCoordinates === checkingPieceCoordinates || moveWouldBlockCheckPath))
            })
        }
        return {...piece, moveset: piece.moveset.filter(filterFunction)}
    });
    return newValidPlayerMoves;
}

module.exports = {outOfCheckValidation};