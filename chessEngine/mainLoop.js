const {getValidatedMoves} = require('./validateMoves');
const {notationValidator} = require('./notationHandling/notationValidator');
const {validateParsedMove} = require('./movement/validateParsedMove');
const { chessboardNotationEnum } = require('./constants/chessboardEnums');

function enPassantClear(chessboard, validatedMoves) {
    const playerPawns = validatedMoves.filter(({type}) => type === 'Pawn').map(({coordinates}) => coordinates);
    console.log('player pawn coordinates', playerPawns);
    playerPawns.forEach(coordinates => chessboard[chessboardNotationEnum[coordinates]].Piece.enPassant = false);
}

function mainLoop(chessBoardStateStore, capturedPieces, currentBoardState) {

    let validatedMoves, turnCounter;

    return ([whiteMove, blackMove], turnIndex) => {
    
        turnCounter = turnIndex + 1;
    
        chessBoardStateStore.push({WhiteTurn: [], BlackTurn: []});
    
        validatedMoves = getValidatedMoves(currentBoardState);
    
        if (typeof validatedMoves === 'string') console.log(validatedMoves);
    
        else if (turnCounter >= 3) enPassantClear(currentBoardState, validatedMoves.White);
    
        const parsedWhiteNotation = notationValidator(whiteMove, 'White');
        console.log('White Move Turn:', turnCounter, whiteMove, parsedWhiteNotation);
        const capturedByWhite = (parsedWhiteNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.White, parsedWhiteNotation);
        if (capturedByWhite) capturedPieces.White.push(capturedByWhite);
        chessBoardStateStore[turnCounter].WhiteTurn = currentBoardState.map(square => {return {...square}});
    
        validatedMoves = getValidatedMoves(currentBoardState);
    
        if (typeof validatedMoves === 'string') console.log(validatedMoves);
    
        else if (turnCounter >= 3) enPassantClear(currentBoardState, validatedMoves.Black);
    
        const parsedBlackNotation = notationValidator(blackMove, 'Black'); 
        console.log('Black Move Turn:', turnCounter, blackMove, parsedBlackNotation);
        const capturedByBlack = (parsedBlackNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.Black, parsedBlackNotation);
        if (capturedByBlack) capturedPieces.Black.push(capturedByBlack);
        chessBoardStateStore[turnCounter].BlackTurn = currentBoardState.map(square => {return {...square}});
    
    }
}

module.exports = {mainLoop};