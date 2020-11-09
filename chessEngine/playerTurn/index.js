const {notationValidator} = require('./notationValidation');
const {validateParsedMove} = require('./movement/validateParsedMove');

function playerTurn(playerMove, color, turn, validMoves, currentBoardState, boardStateStore, capturedPieces) {
        
    if (typeof validMoves === 'string') console.log(validMoves);
    
    const parsedNotation = notationValidator(playerMove, color);
    console.log(color, 'Move Turn:', turn, playerMove, parsedNotation);

    const capturedPiece = (parsedNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validMoves[color], parsedNotation);
    if (capturedPiece) capturedPieces.White.push(capturedPiece);
    
    const currentPlayerTurn = (color === 'White') ? 'White' : 'Black'
    boardStateStore[turn][currentPlayerTurn] = currentBoardState.map(square => {return {...square}});
}

module.exports = {playerTurn};