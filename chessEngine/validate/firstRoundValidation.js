const {getValidMoveset} = require('./getValidMoveset');
const {chessboardArrayEnum} = require('../initialize/chessboardEnums');

function firstRoundValidation(chessboard) {
    const validWhiteMovesets = [];
    const validBlackMovesets = [];
    chessboard.forEach(({Piece}, index) => {
        if (Piece !== null) {
            const {moveset, canCapture} = getValidMoveset(chessboard, Piece.type, index, Piece.color)
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
    return {validWhiteMovesets, validBlackMovesets}
}

module.exports = {firstRoundValidation};