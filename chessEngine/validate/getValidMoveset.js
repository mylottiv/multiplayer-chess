const { chessboardState } = require('../initialize/defaultBoardState');
const { validMovesetFunctions } = require('./firstValidation');
const { allPossibleMoves } = require("../initialize/possibleMovesets");

function getValidMoveset(piece, index, color='White') {
    const pieceReference = (piece === 'Pawn') ? color + piece : piece;
    const possibleMoves = allPossibleMoves[pieceReference];
    return validMovesetFunctions[piece](chessboardState, possibleMoves[index], color)
};

module.exports = {getValidMoveset};