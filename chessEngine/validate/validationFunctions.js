const {chessboardArrayEnum} = require('../initialize/chessboardEnums');

function validMovesStepper(boardState, validMoves, moveset, color) {
    return (stepIndex, operation) => {
        let containsPiece;
        while (moveset.includes(stepIndex)) {
            containsPiece = (boardState[stepIndex].Piece !== null)
            if (!containsPiece) {
                validMoves.push(chessboardArrayEnum[stepIndex]);
            }
            else {
                if (boardState[stepIndex].Piece.color !== color) validMoves.push(chessboardArrayEnum[stepIndex]);
                break;
            }
            stepIndex = operation(stepIndex);
        };
    };
};

const stepperOperations = {
    vertOperation: (val, direction) => (direction === 'up') ? val + 8 : val - 8,
    horizOperation: (val, direction) => (direction === 'right') ? val + 1 : val - 1,
    diagLeftOperation: (val, direction) => (direction === 'up') ? val + 7 : val - 9,
    diagRightOperation: (val, direction) => (direction === 'up') ? val + 9 : val - 7
};

const validMovesetFunctions = {
    Pawn: (boardState, {numericalIndex, moveset}, color) => {   
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
        const validMovesNumerical = moveset.filter((moveIndex) => {
            return (validMovesTests.step(moveIndex, 'one')) ?  true :
                (validMovesTests.capture(moveIndex, 'left')) ? true :
                    (validMovesTests.capture(moveIndex, 'right')) ? true :
                        (validMovesTests.step(moveIndex, 'two')) ? true : false;
        });
        return validMovesNumerical.map(index => chessboardArrayEnum[index])
    },
    Rook: (boardState, {numericalIndex, moveset}, color) => {
        
        const validMoves = [];
        const {vertOperation, horizOperation} = stepperOperations;
        const upMovesStepIndex = vertOperation(numericalIndex, 'up');
        const downMovesStepIndex = vertOperation(numericalIndex, 'down');
        const leftMovesStepIndex = horizOperation(numericalIndex, 'left');
        const rightMovesStepIndex = horizOperation(numericalIndex, 'right');
        validMovesStepper(boardState, validMoves, moveset, color)(upMovesStepIndex, (val) => vertOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downMovesStepIndex, (val) => vertOperation(val, 'down'));
        validMovesStepper(boardState, validMoves, moveset, color)(leftMovesStepIndex, (val) => horizOperation(val, 'left'));
        validMovesStepper(boardState, validMoves, moveset, color)(rightMovesStepIndex, (val) => horizOperation(val, 'right'));
        return validMoves;
    },
    Knight: (boardState, {moveset}, color) => {
        const validMoves = moveset.filter((moveIndex) => (boardState[moveIndex].Piece === null || boardState[moveIndex].Piece.color !== color));
        return validMoves.map((moveIndex) => chessboardArrayEnum[moveIndex]);
    },
    Bishop: (boardState, {numericalIndex, moveset}, color) => {
        
        const validMoves = [];
        const {diagLeftOperation, diagRightOperation} = stepperOperations;
        const upRightMovesStepIndex = diagRightOperation(numericalIndex, 'up');
        const downRightMovesStepIndex = diagRightOperation(numericalIndex, 'down');
        const upLeftMovesStepIndex = diagLeftOperation(numericalIndex, 'up');
        const downLeftMovesStepIndex = diagLeftOperation(numericalIndex, 'down');
        validMovesStepper(boardState, validMoves, moveset, color)(upRightMovesStepIndex, (val) => diagRightOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downRightMovesStepIndex, (val) => diagRightOperation(val, 'down'));
        validMovesStepper(boardState, validMoves, moveset, color)(upLeftMovesStepIndex, (val) => diagLeftOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downLeftMovesStepIndex, (val) => diagLeftOperation(val, 'down'));
        return validMoves;
    },
    Queen: (boardState, {numericalIndex, moveset}, color) => {
        
        const validMoves = [];
        const {vertOperation, horizOperation, diagRightOperation, diagLeftOperation} = stepperOperations;
        const upMovesStepIndex = vertOperation(numericalIndex, 'up');
        const downMovesStepIndex = vertOperation(numericalIndex, 'down');
        const leftMovesStepIndex = horizOperation(numericalIndex, 'left');
        const rightMovesStepIndex = horizOperation(numericalIndex, 'right');
        const upRightMovesStepIndex = diagRightOperation(numericalIndex, 'up');
        const downRightMovesStepIndex = diagRightOperation(numericalIndex, 'down');
        const upLeftMovesStepIndex = diagLeftOperation(numericalIndex, 'up');
        const downLeftMovesStepIndex = diagLeftOperation(numericalIndex, 'down');
        validMovesStepper(boardState, validMoves, moveset, color)(upMovesStepIndex, (val) => vertOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downMovesStepIndex, (val) => vertOperation(val, 'down'));
        validMovesStepper(boardState, validMoves, moveset, color)(leftMovesStepIndex, (val) => horizOperation(val, 'left'));
        validMovesStepper(boardState, validMoves, moveset, color)(rightMovesStepIndex, (val) => horizOperation(val, 'right'));
        validMovesStepper(boardState, validMoves, moveset, color)(upRightMovesStepIndex, (val) => diagRightOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downRightMovesStepIndex, (val) => diagRightOperation(val, 'down'));
        validMovesStepper(boardState, validMoves, moveset, color)(upLeftMovesStepIndex, (val) => diagLeftOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downLeftMovesStepIndex, (val) => diagLeftOperation(val, 'down'));
        return validMoves;
    },
    // As of now, strict duplicate of Queen function. This will probably change as check mechanics develop more
    King: (boardState, {numericalIndex, moveset}, color) => {
        
        const validMoves = [];
        const {vertOperation, horizOperation, diagRightOperation, diagLeftOperation} = stepperOperations;
        const upMovesStepIndex = vertOperation(numericalIndex, 'up');
        const downMovesStepIndex = vertOperation(numericalIndex, 'down');
        const leftMovesStepIndex = horizOperation(numericalIndex, 'left');
        const rightMovesStepIndex = horizOperation(numericalIndex, 'right');
        const upRightMovesStepIndex = diagRightOperation(numericalIndex, 'up');
        const downRightMovesStepIndex = diagRightOperation(numericalIndex, 'down');
        const upLeftMovesStepIndex = diagLeftOperation(numericalIndex, 'up');
        const downLeftMovesStepIndex = diagLeftOperation(numericalIndex, 'down');
        validMovesStepper(boardState, validMoves, moveset, color)(upMovesStepIndex, (val) => vertOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downMovesStepIndex, (val) => vertOperation(val, 'down'));
        validMovesStepper(boardState, validMoves, moveset, color)(leftMovesStepIndex, (val) => horizOperation(val, 'left'));
        validMovesStepper(boardState, validMoves, moveset, color)(rightMovesStepIndex, (val) => horizOperation(val, 'right'));
        validMovesStepper(boardState, validMoves, moveset, color)(upRightMovesStepIndex, (val) => diagRightOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downRightMovesStepIndex, (val) => diagRightOperation(val, 'down'));
        validMovesStepper(boardState, validMoves, moveset, color)(upLeftMovesStepIndex, (val) => diagLeftOperation(val, 'up'));
        validMovesStepper(boardState, validMoves, moveset, color)(downLeftMovesStepIndex, (val) => diagLeftOperation(val, 'down'));
        return validMoves;
    },
}

module.exports = {validMovesetFunctions};