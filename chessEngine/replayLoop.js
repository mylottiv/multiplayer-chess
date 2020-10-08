const {getValidMoves} = require('./moveValidation');
const {notationValidator} = require('./notationHandling/notationValidator');
const {validateParsedMove} = require('./movement/validateParsedMove');

function playerTurn(playerMove, color, turn, validMoves, currentBoardState, boardStateStore, capturedPieces) {
        
    if (typeof validMoves === 'string') console.log(validMoves);
    
    const parsedNotation = notationValidator(playerMove, color);
    console.log(color, 'Move Turn:', turn, playerMove, parsedNotation);

    const capturedPiece = (parsedNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validMoves[color], parsedNotation);
    if (capturedPiece) capturedPieces.White.push(capturedPiece);
    
    const currentPlayerTurn = (color === 'White') ? 'WhiteTurn' : 'BlackTurn'
    boardStateStore[turn][currentPlayerTurn] = currentBoardState.map(square => {return {...square}});
}

function replayLoop({currentBoardState, boardStateStore, capturedPieces, gameState}) {

    return ([whiteMove, blackMove], turnIndex) => {
    
        gameState.turnCounter = turnIndex + 1;
    
        boardStateStore.push({WhiteTurn: {chessboard: []}, BlackTurn: []});

        gameState.currentColor = 'White';

        gameState.validMoves = getValidMoves(currentBoardState, gameState.currentColor, (gameState.turnCounter >=3))

        playerTurn(whiteMove, 'White', gameState.turnCounter, gameState.validMoves, currentBoardState, boardStateStore, capturedPieces);
        
        gameState.currentColor = 'Black';

        gameState.validMoves = getValidMoves(currentBoardState, gameState.currentColor, (gameState.turnCounter >=3))
        
        playerTurn(blackMove, 'Black', gameState.turnCounter, gameState.validMoves, currentBoardState, boardStateStore, capturedPieces);
    
    }
}

module.exports = {replayLoop};