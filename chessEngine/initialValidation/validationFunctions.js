const {chessboardArrayEnum, chessboardNotationEnum} = require('../constants/chessboardEnums');
const {stepperOperations} = require('../constants/stepperOperations');

function axisTest(direction) {
    if (!direction.includes('-')) return (direction === 'up' || direction === 'down') ? 'vertical' : 'horizontal';
    else return (direction === 'down-left' || direction === 'up-right') ? 'diagLeftRight' : 'diagRightLeft';
}

function validMovesStepper(boardState, validMoves, canCapture, moveset, pieceColor) {

    return (stepIndex, operation, direction) => {
        let containsPiece;
        while (moveset.includes(stepIndex)) {
            containsPiece = (boardState[stepIndex].Piece !== null)
            if (!containsPiece) {
                validMoves.push(chessboardArrayEnum[stepIndex]);
            }
            else {
                if (boardState[stepIndex].Piece.color !== pieceColor) {
                    // console.log('Capture piece?', direction, axisTest(direction), pieceColor, {
                    //     coordinates: chessboardArrayEnum[stepIndex],
                    //     axis: axisTest(direction),
                    //     direction
                    // });
                    validMoves.push(chessboardArrayEnum[stepIndex]);
                    canCapture.push({
                        coordinates: chessboardArrayEnum[stepIndex],
                        axis: axisTest(direction),
                        direction
                    });
                };
                break;
            }
            stepIndex = operation(stepIndex);
        };
    };
};

const validMovesetFunctions = {
    Pawn: (boardState, {numericalIndex, possibleMoveset}, color) => {   
        const colorWhite = (color === 'White');
        const validMovesTests = {
            capture: (testIndex, direction) => {
                const adjacencyOperand = (direction === 'left' && colorWhite) ? -1 : (direction === 'right' && colorWhite) ? 1 : (direction === 'left' && !colorWhite) ? 1 : -1;
                const enPassantTestPiece = boardState[testIndex + adjacencyOperand].Piece;
                const validEnPassantCapture = (enPassantTestPiece !== null && enPassantTestPiece.type === 'Pawn' && enPassantTestPiece.color !== color && enPassantTestPiece.enPassant);
                return ((boardState[testIndex].Piece !== null && boardState[testIndex].Piece.color !== color) || (boardState[testIndex].Piece === null && validEnPassantCapture));
            },
            step: (testIndex) => (boardState[testIndex].Piece === null)
        };
        const validMovesNumerical = possibleMoveset.filter((moveIndex) => {
            return ((Math.abs(moveIndex - numericalIndex) % 8 === 0) && validMovesTests.step(moveIndex)) ? true :
                (validMovesTests.capture(moveIndex, 'left')) ? true :
                    (validMovesTests.capture(moveIndex, 'right')) ? true : false;
        });
        const moveset = validMovesNumerical.map(index => chessboardArrayEnum[index]);
        return {moveset, canCapture: null};
    },
    Rook: (boardState, {numericalIndex, possibleMoveset}, color) => {
        
        const validMoves = [];
        const canCapture = [];

        const upMovesStepIndex = stepperOperations['up'](numericalIndex);
        const downMovesStepIndex = stepperOperations['down'](numericalIndex);
        const leftMovesStepIndex = stepperOperations['left'](numericalIndex);
        const rightMovesStepIndex = stepperOperations['right'](numericalIndex);
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upMovesStepIndex, stepperOperations['up'], 'up');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downMovesStepIndex, stepperOperations['down'], 'down');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(leftMovesStepIndex, stepperOperations['left'], 'left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(rightMovesStepIndex, stepperOperations['right'], 'right');
        return {moveset: validMoves, canCapture};
    },
    Knight: (boardState, {possibleMoveset}, color) => {
        const validMoves = possibleMoveset.filter((moveIndex) => (boardState[moveIndex].Piece === null || boardState[moveIndex].Piece.color !== color));
        const moveset = validMoves.map((moveIndex) => chessboardArrayEnum[moveIndex]);
        return {moveset, canCapture: null};
    
    },
    Bishop: (boardState, {numericalIndex, possibleMoveset}, color) => {
        
        const validMoves = [];
        const canCapture = []; 

        const upRightMovesStepIndex = stepperOperations['up-right'](numericalIndex);
        const downRightMovesStepIndex = stepperOperations['down-right'](numericalIndex);
        const upLeftMovesStepIndex = stepperOperations['up-left'](numericalIndex);
        const downLeftMovesStepIndex = stepperOperations['down-left'](numericalIndex);
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upRightMovesStepIndex, stepperOperations['up-right'], 'up-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downRightMovesStepIndex, stepperOperations['down-right'], 'down-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upLeftMovesStepIndex, stepperOperations['up-left'], 'up-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downLeftMovesStepIndex, stepperOperations['down-left'], 'down-left');
        return {moveset: validMoves, canCapture};
    
    },
    Queen: (boardState, {numericalIndex, possibleMoveset}, color) => {
        
        const validMoves = [];
        const canCapture = [];

        const upMovesStepIndex = stepperOperations['up'](numericalIndex);
        const downMovesStepIndex = stepperOperations['down'](numericalIndex);
        const leftMovesStepIndex = stepperOperations['left'](numericalIndex);
        const rightMovesStepIndex = stepperOperations['right'](numericalIndex);
        const upRightMovesStepIndex = stepperOperations['up-right'](numericalIndex);
        const downRightMovesStepIndex = stepperOperations['down-right'](numericalIndex);
        const upLeftMovesStepIndex = stepperOperations['up-left'](numericalIndex);
        const downLeftMovesStepIndex = stepperOperations['down-left'](numericalIndex);
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upMovesStepIndex, stepperOperations['up'], 'up');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downMovesStepIndex, stepperOperations['down'], 'down');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(leftMovesStepIndex, stepperOperations['left'], 'left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(rightMovesStepIndex, stepperOperations['right'], 'right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upRightMovesStepIndex, stepperOperations['up-right'], 'up-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downRightMovesStepIndex, stepperOperations['down-right'], 'down-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upLeftMovesStepIndex, stepperOperations['up-left'], 'up-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downLeftMovesStepIndex, stepperOperations['down-left'], 'down-left');
        return {moveset: validMoves, canCapture};
    
    },
    // As of now, strict duplicate of Queen function. This will probably change as check mechanics develop more
    King: (boardState, {numericalIndex, possibleMoveset}, color) => {
        
        const validMoves = [];
        const canCapture = [];

        const upMovesStepIndex = stepperOperations['up'](numericalIndex);
        const downMovesStepIndex = stepperOperations['down'](numericalIndex);
        const leftMovesStepIndex = stepperOperations['left'](numericalIndex);
        const rightMovesStepIndex = stepperOperations['right'](numericalIndex);
        const upRightMovesStepIndex = stepperOperations['up-right'](numericalIndex);
        const downRightMovesStepIndex = stepperOperations['down-right'](numericalIndex);
        const upLeftMovesStepIndex = stepperOperations['up-left'](numericalIndex);
        const downLeftMovesStepIndex = stepperOperations['down-left'](numericalIndex);
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upMovesStepIndex, stepperOperations['up'], 'up');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downMovesStepIndex, stepperOperations['down'], 'down');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(leftMovesStepIndex, stepperOperations['left'], 'left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(rightMovesStepIndex, stepperOperations['right'], 'right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upRightMovesStepIndex, stepperOperations['up-right'], 'up-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downRightMovesStepIndex, stepperOperations['down-right'], 'down-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upLeftMovesStepIndex, stepperOperations['up-left'], 'up-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downLeftMovesStepIndex, stepperOperations['down-left'], 'down-left');
        return {moveset: validMoves, canCapture};
    
    },
}

module.exports = {validMovesetFunctions};