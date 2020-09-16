const {chessboardArrayEnum} = require('../initialize/chessboardEnums');
const {stepperOperations} = require('./stepperOperations');

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
                    console.log('Capture piece?', direction, axisTest(direction), pieceColor, {
                        coordinates: chessboardArrayEnum[stepIndex],
                        axis: axisTest(direction),
                        direction
                    });
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
        const colorWhite = (color === 'White') ? true : false;
        const validMovesTests = {
            capture: (testIndex, direction) => {
                const operand = (direction === 'left') ? 7 : 9
                const comparisonIndex = colorWhite ? numericalIndex + operand : numericalIndex - operand;
                return (comparisonIndex === testIndex && (boardState[testIndex].Piece !== null && boardState[testIndex].Piece.color !== color));
            },
            step: (testIndex, step) => {
                const operand = (step === 'one') ? 8 : 16
                const comparisonIndex = colorWhite ? numericalIndex + operand : numericalIndex - operand;
                return (comparisonIndex === testIndex && boardState[testIndex].Piece === null);
            }
        }
        const validMovesNumerical = possibleMoveset.filter((moveIndex) => {
            return (validMovesTests.step(moveIndex, 'one')) ?  true :
                (validMovesTests.capture(moveIndex, 'left')) ? true :
                    (validMovesTests.capture(moveIndex, 'right')) ? true :
                        (validMovesTests.step(moveIndex, 'two')) ? true : false;
        });
        const moveset = validMovesNumerical.map(index => chessboardArrayEnum[index]);
        return {moveset, canCapture: null};
    },
    Rook: (boardState, {numericalIndex, possibleMoveset}, color) => {
        
        const validMoves = [];
        const canCapture = [];
        const {vertical: vertOperation, horizontal: horizOperation} = stepperOperations;
        const upMovesStepIndex = vertOperation(numericalIndex, 'up');
        const downMovesStepIndex = vertOperation(numericalIndex, 'down');
        const leftMovesStepIndex = horizOperation(numericalIndex, 'left');
        const rightMovesStepIndex = horizOperation(numericalIndex, 'right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upMovesStepIndex, (val) => vertOperation(val, 'up'), 'up');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downMovesStepIndex, (val) => vertOperation(val, 'down'), 'down');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(leftMovesStepIndex, (val) => horizOperation(val, 'left'), 'left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(rightMovesStepIndex, (val) => horizOperation(val, 'right'), 'right');
        return {moveset: validMoves, canCapture};
    },
    Knight: (boardState, {possibleMoveset}, color) => {
        const validMoves = possibleMoveset.filter((moveIndex) => (boardState[moveIndex].Piece === null || boardState[moveIndex].Piece.color !== color));
        const moveset = validMoves.map((moveIndex) => chessboardArrayEnum[moveIndex])
        return {moveset, canCapture: null};
    },
    Bishop: (boardState, {numericalIndex, possibleMoveset}, color) => {
        
        const validMoves = [];
        const canCapture = [];
        const {diagRightLeft: diagRightLeftOperation, diagLeftRight: diagLeftRightOperation} = stepperOperations;
        const upRightMovesStepIndex = diagLeftRightOperation(numericalIndex, 'up-right');
        const downRightMovesStepIndex = diagRightLeftOperation(numericalIndex, 'down-right');
        const upLeftMovesStepIndex = diagRightLeftOperation(numericalIndex, 'up-left');
        const downLeftMovesStepIndex = diagLeftRightOperation(numericalIndex, 'down-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upRightMovesStepIndex, (val) => diagLeftRightOperation(val, 'up-right'), 'up-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downRightMovesStepIndex, (val) => diagRightLeftOperation(val, 'down-right'), 'down-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upLeftMovesStepIndex, (val) => diagRightLeftOperation(val, 'up-left'), 'up-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downLeftMovesStepIndex, (val) => diagLeftRightOperation(val, 'down-left'), 'down-left');
        return {moveset: validMoves, canCapture};
    },
    Queen: (boardState, {numericalIndex, possibleMoveset}, color) => {
        
        const validMoves = [];
        const canCapture = [];
        const {vertical: vertOperation, horizontal: horizOperation, diagLeftRight: diagLeftRightOperation, diagRightLeft: diagRightLeftOperation} = stepperOperations;
        const upMovesStepIndex = vertOperation(numericalIndex, 'up');
        const downMovesStepIndex = vertOperation(numericalIndex, 'down');
        const leftMovesStepIndex = horizOperation(numericalIndex, 'left');
        const rightMovesStepIndex = horizOperation(numericalIndex, 'right');
        const upRightMovesStepIndex = diagLeftRightOperation(numericalIndex, 'up-right');
        const downRightMovesStepIndex = diagRightLeftOperation(numericalIndex, 'down-right');
        const upLeftMovesStepIndex = diagRightLeftOperation(numericalIndex, 'up-left');
        const downLeftMovesStepIndex = diagLeftRightOperation(numericalIndex, 'down-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upMovesStepIndex, (val) => vertOperation(val, 'up'), 'up');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downMovesStepIndex, (val) => vertOperation(val, 'down'), 'down');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(leftMovesStepIndex, (val) => horizOperation(val, 'left'), 'left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(rightMovesStepIndex, (val) => horizOperation(val, 'right'), 'right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upRightMovesStepIndex, (val) => diagLeftRightOperation(val, 'up-right'), 'up-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downRightMovesStepIndex, (val) => diagRightLeftOperation(val, 'down-right'), 'down-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upLeftMovesStepIndex, (val) => diagRightLeftOperation(val, 'up-left'), 'up-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downLeftMovesStepIndex, (val) => diagLeftRightOperation(val, 'down-left'), 'down-left');
        return {moveset: validMoves, canCapture};
    },
    // As of now, strict duplicate of Queen function. This will probably change as check mechanics develop more
    King: (boardState, {numericalIndex, possibleMoveset}, color) => {
        
        const validMoves = [];
        const canCapture = [];
        const {vertical: vertOperation, horizontal: horizOperation, diagLeftRight: diagLeftRightOperation, diagRightLeft: diagRightLeftOperation} = stepperOperations;
        const upMovesStepIndex = vertOperation(numericalIndex, 'up');
        const downMovesStepIndex = vertOperation(numericalIndex, 'down');
        const leftMovesStepIndex = horizOperation(numericalIndex, 'left');
        const rightMovesStepIndex = horizOperation(numericalIndex, 'right');
        const upRightMovesStepIndex = diagLeftRightOperation(numericalIndex, 'up-right');
        const downRightMovesStepIndex = diagRightLeftOperation(numericalIndex, 'down-right');
        const upLeftMovesStepIndex = diagRightLeftOperation(numericalIndex, 'up-left');
        const downLeftMovesStepIndex = diagLeftRightOperation(numericalIndex, 'down-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upMovesStepIndex, (val) => vertOperation(val, 'up'), 'up');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downMovesStepIndex, (val) => vertOperation(val, 'down'), 'down');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(leftMovesStepIndex, (val) => horizOperation(val, 'left'), 'left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(rightMovesStepIndex, (val) => horizOperation(val, 'right'), 'right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upRightMovesStepIndex, (val) => diagLeftRightOperation(val, 'up-right'), 'up-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downRightMovesStepIndex, (val) => diagRightLeftOperation(val, 'down-right'), 'down-right');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(upLeftMovesStepIndex, (val) => diagRightLeftOperation(val, 'up-left'), 'up-left');
        validMovesStepper(boardState, validMoves, canCapture, possibleMoveset, color)(downLeftMovesStepIndex, (val) => diagLeftRightOperation(val, 'down-left'), 'down-left');
        return {moveset: validMoves, canCapture};
    },
}

module.exports = {validMovesetFunctions};