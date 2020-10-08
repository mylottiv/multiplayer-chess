const {newBoard} = require('./newBoard');

function newGame() {
    return {
        currentBoardState: newBoard(),
        boardStateStore: [{StartingBoard: newBoard()}],
        capturedPieces: {White: [], Black: []},
        gameState: {
            turnCounter: 1,
            currentColor: 'White',
            validMoves: {}
        }
    }
}

module.exports = {newGame};