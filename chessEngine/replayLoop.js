const {getValidMoves} = require('./getValidMoves');
const {playerTurn} = require('./playerTurn');

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