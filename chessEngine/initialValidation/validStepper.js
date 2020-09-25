const {chessboardArrayEnum} = require('../constants/chessboardEnums');
const {stepperOperations} = require('../constants/stepperOperations');
const {adjacencyTest} = require('../preCheckValidation/intoCheckValidation/directionalTests');

function movesStepperHandler(pieceIndex, boardState, possibleMoves, pieceColor, movesIndexes) {
    const validMoves = [];
    const canCapture = [];

    for (const [direction, moveIndex] of Object.entries(movesIndexes)) {
        if (adjacencyTest(pieceIndex, moveIndex)) validMovesStepper(direction, moveIndex);
    };

    return {validMoves, canCapture};

    function validMovesStepper(direction, initialIndex) {
        if (initialIndex < 0 || initialIndex > 63) return;
        const operation = stepperOperations[direction];
        let stepIndex = initialIndex
        let currentPiece = boardState[initialIndex].Piece;
        while (possibleMoves.includes(stepIndex) && (currentPiece === null)) {
            validMoves.push(chessboardArrayEnum[stepIndex]);
            stepIndex = operation(stepIndex);
            currentPiece = (possibleMoves.includes(stepIndex)) ? boardState[stepIndex].Piece : null;
        };
        if (currentPiece !== null && currentPiece.color !== pieceColor) {
            validMoves.push(chessboardArrayEnum[stepIndex]);
            canCapture.push({
                coordinates: chessboardArrayEnum[stepIndex],
                direction
            });
        }
    };
};

module.exports = {movesStepperHandler};