const {getInitialValidMoveset} = require('../initialValidation');
const {chessboardArrayEnum} = require('../constants/chessboardEnums');

function firstRoundValidation(chessboard) {
    const validWhiteMovesets = [];
    const validBlackMovesets = [];
    chessboard.forEach(({Piece}, index) => {
        if (Piece !== null) {
            const {moveset, canCapture} = getInitialValidMoveset(chessboard, Piece.type, index, Piece.color)
            const movesetInfo = {
                type: Piece.type, 
                coordinates: chessboardArrayEnum[index],
                moveset,
                canCapture
            };
            if (Piece.color === 'White') validWhiteMovesets.push(movesetInfo)
            else validBlackMovesets.push(movesetInfo);
        }
    });
    return {White: validWhiteMovesets, Black: validBlackMovesets}
}

module.exports = {firstRoundValidation};