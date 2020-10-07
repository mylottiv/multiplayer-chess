const {getValidatedMoves} = require('./moveValidation');
const {notationValidator} = require('./notationHandling/notationValidator');
const {validateParsedMove} = require('./movement/validateParsedMove');
const { chessboardNotationEnum } = require('./constants/chessboardEnums');

function replayLoop(chessBoardStateStore, capturedPieces, currentBoardState) {

    let validatedMoves, turnCounter;

    return ([whiteMove, blackMove], turnIndex) => {
    
        turnCounter = turnIndex + 1;
    
        chessBoardStateStore.push({WhiteTurn: [], BlackTurn: []});
    
        validatedMoves = getValidatedMoves(currentBoardState, 'White', (turnCounter >= 3));
    
        if (typeof validatedMoves === 'string') console.log(validatedMoves);
        
        const parsedWhiteNotation = notationValidator(whiteMove, 'White');
        console.log('White Move Turn:', turnCounter, whiteMove, parsedWhiteNotation);
        const capturedByWhite = (parsedWhiteNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.White, parsedWhiteNotation);
        if (capturedByWhite) capturedPieces.White.push(capturedByWhite);
        chessBoardStateStore[turnCounter].WhiteTurn = currentBoardState.map(square => {return {...square}});
    
        validatedMoves = getValidatedMoves(currentBoardState, 'Black', (turnCounter >= 3));
    
        if (typeof validatedMoves === 'string') console.log(validatedMoves);
        
        const parsedBlackNotation = notationValidator(blackMove, 'Black'); 
        console.log('Black Move Turn:', turnCounter, blackMove, parsedBlackNotation);
        const capturedByBlack = (parsedBlackNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.Black, parsedBlackNotation);
        if (capturedByBlack) capturedPieces.Black.push(capturedByBlack);
        chessBoardStateStore[turnCounter].BlackTurn = currentBoardState.map(square => {return {...square}});
    
    }
}

module.exports = {replayLoop};