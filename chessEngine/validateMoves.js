const {preCheckValidation} = require('./preCheckValidation');
const {checkValidate, checkMateTest} = require('./checkValidation');
const {outOfCheckValidation, castlingValidation} = require('./postCheckValidation');

function getValidatedMoves(chessboard) {
    const returnedValidatedMvoves = {
        White: validateMoves(chessboard, 'White'),
        Black: validateMoves(chessboard, 'Black')
    }

    return (returnedValidatedMvoves.White === 'Checkmate') 
        ? 'White is in Checkmate!' 
        : (returnedValidatedMvoves.Black === 'Checkmate') 
            ? 'Black is in Checkmate!'
            : returnedValidatedMvoves;
}

function validateMoves(BoardState, playerColor) {

    const opponentColor = (playerColor === 'White') ? 'Black' : 'White';

    const preCheckValidatedMoves = preCheckValidation(BoardState)
    const preCheckPlayerMoves = preCheckValidatedMoves[playerColor];
    const preCheckOpponentMoves = preCheckValidatedMoves[opponentColor];

    const {inCheck, checkingPieces} = checkValidate(preCheckPlayerMoves, preCheckOpponentMoves);

    if (inCheck) console.log(playerColor, 'in check')

    const finalValidatedMoves = (inCheck) 
        ? outOfCheckValidation(preCheckPlayerMoves, checkingPieces)
        : castlingValidation(BoardState, playerColor, preCheckPlayerMoves, preCheckOpponentMoves);
    
    return (inCheck && checkMateTest(finalValidatedMoves)) ? 'Checkmate' : finalValidatedMoves
};

module.exports = {getValidatedMoves};