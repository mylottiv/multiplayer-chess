const { validMovesetFunctions } = require('./movesetValidators');
const { allPossibleMoves } = require("../possibleMovesets");
const {chessboardArrayEnum} = require('../../../constants/chessboardEnums');

function getInitialValidMoveset(chessboardState, piece, index, color) {
    const pieceReference = (piece === 'Pawn') ? color + piece : piece;
    const possibleMoves = allPossibleMoves[pieceReference];
    return validMovesetFunctions[piece](chessboardState, possibleMoves[index], color)
};

function initialValidation(chessboard) {
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

module.exports = {initialValidation};