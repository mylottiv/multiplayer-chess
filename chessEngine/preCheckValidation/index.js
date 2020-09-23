const {firstRoundValidation} = require('./firstRoundValidation');
const {intoCheckValidation} = require('./intoCheckValidation');

function initialValidation(BoardState) {
    const firstRoundValidMoves = firstRoundValidation(BoardState);
    const secondRoundValidMoves = {
        White: intoCheckValidation(BoardState, firstRoundValidMoves.White, firstRoundValidMoves.Black),
        Black: intoCheckValidation(BoardState, firstRoundValidMoves.Black, firstRoundValidMoves.White)
    };
    return secondRoundValidMoves;
}

module.exports = {initialValidation};