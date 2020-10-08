const {initialValidation} = require('./initialValidation');
const {intoCheckValidation} = require('./intoCheckValidation');

function preCheckValidation(BoardState) {
    const initialValidMoves = initialValidation(BoardState);
    return {
        White: intoCheckValidation(BoardState, initialValidMoves.White, initialValidMoves.Black),
        Black: intoCheckValidation(BoardState, initialValidMoves.Black, initialValidMoves.White)
    };
}

module.exports = {preCheckValidation};