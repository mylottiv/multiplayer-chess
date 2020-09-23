const { validMovesetFunctions } = require('./movesetValidators');
const { allPossibleMoves } = require("../possibleMovesets");

function getValidMoveset(chessboardState, piece, index, color) {
    const pieceReference = (piece === 'Pawn') ? color + piece : piece;
    const possibleMoves = allPossibleMoves[pieceReference];
    return validMovesetFunctions[piece](chessboardState, possibleMoves[index], color)
};

module.exports = {getValidMoveset};