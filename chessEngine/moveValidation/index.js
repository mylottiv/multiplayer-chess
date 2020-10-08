const {preCheckValidation} = require('./preCheckValidation');
const {checkValidate, checkMateTest} = require('./checkValidation');
const {outOfCheckValidation, castlingValidation} = require('./postCheckValidation');
const {chessboardNotationEnum} = require('../constants/chessboardEnums');

function enPassantClear(chessboard, validatedMoves) {
    const playerPawns = validatedMoves.filter(({type}) => type === 'Pawn').map(({coordinates}) => coordinates);
    playerPawns.forEach(coordinates => chessboard[chessboardNotationEnum[coordinates]].Piece.enPassant = false);
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

function getValidMoves(chessboard, currentPlayerColor = null, enPassantClearFlag = false) {
    const returnedValidatedMoves = {
        White: validateMoves(chessboard, 'White'),
        Black: validateMoves(chessboard, 'Black')
    }

    const currentPlayerMoves = currentPlayerColor && returnedValidatedMoves[currentPlayerColor];

    if (enPassantClearFlag && currentPlayerMoves && currentPlayerMoves !== 'Checkmate') {
        enPassantClear(chessboard, returnedValidatedMoves[currentPlayerColor]);
    }

    return (returnedValidatedMoves.White === 'Checkmate') 
        ? 'White is in Checkmate!' 
        : (returnedValidatedMoves.Black === 'Checkmate') 
            ? 'Black is in Checkmate!'
            : returnedValidatedMoves;
}


module.exports = {getValidMoves};