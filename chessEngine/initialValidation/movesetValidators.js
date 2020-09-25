const {chessboardArrayEnum} = require('../constants/chessboardEnums');
const {stepperOperations} = require('../constants/stepperOperations');
const {movesStepperHandler} = require('./validStepper');

function pawnValidator(boardState, {numericalIndex, possibleMoveset}, color) {   
    const colorWhite = (color === 'White');
    const validMovesTests = {
        capture: (testIndex, direction) => {
            const testCapturePiece = boardState[testIndex].Piece;
            const adjacencyOperand = (direction === 'left' && colorWhite) ? -1 : (direction === 'right' && colorWhite) ? 1 : (direction === 'left' && !colorWhite) ? 1 : -1;
            const enPassantTestPiece = boardState[numericalIndex + adjacencyOperand].Piece;
            const validEnPassantCapture = (enPassantTestPiece !== null && enPassantTestPiece.type === 'Pawn' && enPassantTestPiece.color !== color && enPassantTestPiece.enPassant);
            return ((testCapturePiece !== null && testCapturePiece.color !== color) || (testCapturePiece === null && validEnPassantCapture));
        },
        step: (testIndex) => (boardState[testIndex].Piece === null)
    };
    const validMovesIndexes = possibleMoveset.filter((moveIndex) => {
        const indexDifference = Math.abs(moveIndex - numericalIndex);
        const captureDifferences = {
            7: (colorWhite) ? 'left' : 'right',
            9: (colorWhite) ? 'right' : 'left'
        };
        if ([8, 16].includes(indexDifference)) return validMovesTests.step(moveIndex);
        else return validMovesTests.capture(moveIndex, captureDifferences[`${indexDifference}`]);
    });
    const moveset = validMovesIndexes.map(index => chessboardArrayEnum[index]);
    return {moveset, canCapture: null};
};

function rookValidator(boardState, {numericalIndex, possibleMoveset}, color) {    
    const movesStepIndexes = {
        up: stepperOperations['up'](numericalIndex),
        down: stepperOperations['down'](numericalIndex),
        left: stepperOperations['left'](numericalIndex),
        right: stepperOperations['right'](numericalIndex)
    }
    const {validMoves, canCapture} = movesStepperHandler(numericalIndex, boardState, possibleMoveset, color, movesStepIndexes);
    return {moveset: validMoves, canCapture};
};

function knightValidator(boardState, {possibleMoveset}, color) {
    const validMoves = possibleMoveset.filter((moveIndex) => (boardState[moveIndex].Piece === null || boardState[moveIndex].Piece.color !== color));
    const moveset = validMoves.map((moveIndex) => chessboardArrayEnum[moveIndex]);
    return {moveset, canCapture: null};
};

function bishopValidator(boardState, {numericalIndex, possibleMoveset}, color) {

    const movesStepIndexes = {
        'up-right': stepperOperations['up-right'](numericalIndex),
        'down-right': stepperOperations['down-right'](numericalIndex),
        'up-left': stepperOperations['up-left'](numericalIndex),
        'down-left': stepperOperations['down-left'](numericalIndex)
    }
    const {validMoves, canCapture} = movesStepperHandler(numericalIndex, boardState, possibleMoveset, color, movesStepIndexes);
    return {moveset: validMoves, canCapture};
};

function queenValidator(boardState, {numericalIndex, possibleMoveset}, color) {
    
    const movesStepIndexes = {
        up: stepperOperations['up'](numericalIndex),
        down: stepperOperations['down'](numericalIndex),
        left: stepperOperations['left'](numericalIndex),
        right: stepperOperations['right'](numericalIndex),
        'up-right': stepperOperations['up-right'](numericalIndex),
        'down-right': stepperOperations['down-right'](numericalIndex),
        'up-left': stepperOperations['up-left'](numericalIndex),
        'down-left': stepperOperations['down-left'](numericalIndex),
    }
    const {validMoves, canCapture} = movesStepperHandler(numericalIndex, boardState, possibleMoveset, color, movesStepIndexes);
    return {moveset: validMoves, canCapture};
};

// As of now, strict duplicate of Queen function. This will probably change as check mechanics develop more
function kingValidator(boardState, {numericalIndex, possibleMoveset}, color) {
    
    const movesStepIndexes = {
        up: stepperOperations['up'](numericalIndex),
        down: stepperOperations['down'](numericalIndex),
        left: stepperOperations['left'](numericalIndex),
        right: stepperOperations['right'](numericalIndex),
        'up-right': stepperOperations['up-right'](numericalIndex),
        'down-right': stepperOperations['down-right'](numericalIndex),
        'up-left': stepperOperations['up-left'](numericalIndex),
        'down-left': stepperOperations['down-left'](numericalIndex),
    }
    const {validMoves, canCapture} = movesStepperHandler(numericalIndex, boardState, possibleMoveset, color, movesStepIndexes);
    return {moveset: validMoves, canCapture};
};

const validMovesetFunctions = {
    Pawn: pawnValidator,
    Rook: rookValidator,
    Knight: knightValidator,
    Bishop: bishopValidator,
    Queen: queenValidator,
    King: kingValidator
};

module.exports = {validMovesetFunctions};