const {initialValidation} = require('./preCheckValidation');
const {checkValidate} = require('./finalValidation/checkValidate');
const {outOfCheckValidation} = require('./finalValidation/outOfCheckValidation');
const {castlingValidation} = require('./finalValidation/castlingValidation');
const {checkMateTest} = require('./finalValidation/checkMateTest');

function validateMoves(BoardState, playerColor) {

    const opponentColor = (playerColor === 'White') ? 'Black' : 'White';

    const initialValidatedMoves = initialValidation(BoardState)
    const initialPlayerMoves = initialValidatedMoves[playerColor];
    const initialOpponentMoves = initialValidatedMoves[opponentColor];

    const {playerCheck: inCheck, checkingPieces} = checkValidate(initialPlayerMoves, initialOpponentMoves);
    if (inCheck) console.log(playerColor, 'in check');
    if (inCheck) {
        const finalValidatedMoves = outOfCheckValidation(initialPlayerMoves, checkingPieces);
        return (checkMateTest(finalValidatedMoves)) ? 'Checkmate' : finalValidatedMoves;
    }
    else {
        const finalValidatedMoves = castlingValidation(BoardState, playerColor, initialPlayerMoves, initialOpponentMoves);
        return finalValidatedMoves
    }
};

module.exports = {validateMoves};