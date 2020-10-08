const {newBoard} = require('./newBoard');

function newGame() {
    return {
        currentChessBoard: newBoard(),
        boardStateStore: [{StartingBoard: newBoard()}],
        capturedPieces: {White: [], Black: []}
    }
}

module.exports = {newGame};