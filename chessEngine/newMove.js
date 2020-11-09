const {getValidMoves} = require('./getValidMoves');
const {playerTurn} = require('./playerTurn');

function newMove({currentBoardState, boardStateStore, capturedPieces, gameState}, newMove) {
    
    const currentColorWhite = (gameState.currentColor === 'White')
    
    if (currentColorWhite) boardStateStore.push({White: [], Black: []});
    
    gameState.validMoves = getValidMoves(currentBoardState, gameState.currentColor, (gameState.turnCounter >= 3))

    playerTurn(newMove, gameState.currentColor, gameState.turnCounter, gameState.validMoves, currentBoardState, boardStateStore, capturedPieces);

    gameState.turnCounter = (currentColorWhite) ? gameState.turnCounter : gameState.turnCounter + 1;

    gameState.currentColor = (currentColorWhite) ? 'Black' : 'White';
 
}

module.exports = {newMove};