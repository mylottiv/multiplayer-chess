const {stepperOperations} = require('../constants/stepperOperations');
const { chessboardNotationEnum } = require('../constants/chessboardEnums');
const {matchCoordinates} =  require('../constants/callbackUtils');

function checkPathStepper(kingIndex, checkingPieceIndex, moveIndex, direction) {
    const stepOperation = direction && stepperOperations[direction];
    let nextIndex = stepOperation(checkingPieceIndex);
    while (kingIndex !== nextIndex) {
        if (moveIndex === nextIndex) return true;
        nextIndex = stepOperation(nextIndex);
    }
    return false;
};

function checkBlockTest({coordinates: checkingOpponentCoordinates, moveset, canCapture}, kingCoordinates, moveCoordinates) {
    // No edge test for Pawn, but since Pawn check threat is only diagonal, that should be ok?
    const kingIndex = chessboardNotationEnum[kingCoordinates];
    const moveIndex = chessboardNotationEnum[moveCoordinates];
    const checkingOpponentIndex = chessboardNotationEnum[checkingOpponentCoordinates];
    const checkThreatDirection = canCapture && canCapture.find(matchCoordinates(kingCoordinates)).direction;
    const moveWouldBlockCheckPath = (!checkThreatDirection || !moveset.includes(moveCoordinates))
        ? false
        : checkPathStepper(kingIndex, checkingOpponentIndex, moveIndex, checkThreatDirection);
    return ((moveCoordinates === checkingOpponentCoordinates) || moveWouldBlockCheckPath);
};

function outOfCheckValidation(validPlayerMoves, opponentCheckingPieces) {
    
    const playerKingCoordinates = validPlayerMoves.find(({type}) => type === 'King').coordinates; 

    const newValidPlayerMoves = validPlayerMoves.map((piece) => {

        const filterFunction = (piece.type === 'King') 
            ? (kingMoveCoordinates) => {
                const kingMoveIndex = chessboardNotationEnum[kingMoveCoordinates];
                let moveInOpponentMoves, moveInOpponentCheckRange, pawnStepMove = false;

                opponentCheckingPieces.forEach(({type, coordinates: checkingOpponentCoordinates, moveset, canCapture}) => {
                    moveInOpponentMoves = moveset.includes(kingMoveCoordinates);
                    if (moveInOpponentMoves && type === 'Pawn') {
                        const checkingPawnIndex = chessboardNotationEnum[checkingOpponentCoordinates];
                        pawnStepMove = ([8, 16].includes(Math.abs(kingMoveIndex - checkingPawnIndex)));
                    }
                    else if (!moveInOpponentMoves && ['Queen', 'Bishop', 'Rook'].includes(type)) {
                        const playerKingIndex = chessboardNotationEnum[playerKingCoordinates];
                        const checkThreatDirection = canCapture.find(matchCoordinates(playerKingCoordinates)).direction;
                        const stillInCheckIndex = stepperOperations[checkThreatDirection](playerKingIndex);
                        moveInOpponentCheckRange = (stillInCheckIndex === kingMoveIndex);
                    }
                })
                return ((!moveInOpponentMoves && !moveInOpponentCheckRange) || (pawnStepMove))
            }
            : (playerMoveCoordinates) => {
                const playerMoveIndex = chessboardNotationEnum[playerMoveCoordinates];
                return (opponentCheckingPieces.length !== 1) 
                    ? false
                    : checkBlockTest(opponentCheckingPieces[0], playerKingCoordinates, playerMoveCoordinates)
            }
        
        return {...piece, moveset: piece.moveset.filter(filterFunction)}
    });
    return newValidPlayerMoves;
}

module.exports = {outOfCheckValidation};