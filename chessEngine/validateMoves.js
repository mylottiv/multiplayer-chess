const {preCheckValidation} = require('./preCheckValidation');
const {checkValidate} = require('./finalValidation/checkValidate');
const {outOfCheckValidation} = require('./finalValidation/outOfCheckValidation');
const {castlingValidation} = require('./finalValidation/castlingValidation');
const {checkMateTest} = require('./finalValidation/checkMateTest');

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

module.exports = {validateMoves};