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

    const {playerCheck: inCheck, checkingPieces} = checkValidate(preCheckPlayerMoves, preCheckOpponentMoves);
    if (inCheck) console.log(playerColor, 'in check');
    if (inCheck) {
        const finalValidatedMoves = outOfCheckValidation(preCheckPlayerMoves, checkingPieces);
        return (checkMateTest(finalValidatedMoves)) ? 'Checkmate' : finalValidatedMoves;
    }
    else {
        const finalValidatedMoves = castlingValidation(BoardState, playerColor, preCheckPlayerMoves, preCheckOpponentMoves);
        return finalValidatedMoves
    }
};

module.exports = {validateMoves};