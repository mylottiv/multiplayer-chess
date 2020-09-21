const {chessboardEdges} = require('../chessboardEnums');
const {straightPathFinder, diagonalPathFinder, knightMovePairFinder, kingMoveFinder} = require('./pathFinders');

function pawnGenerator(index, color) {
    if ((index >= 0 && index <= 7) || (index >= 56 && index <= 63)) return "Impossible Location for Pawn"
    const colorWhite = (color === 'White');
    const pawnLine = (colorWhite ? [8, 15] : [48, 55])
    const possibleMoves = [];
    const captureLeftDiagonalIndex = (colorWhite) ? index + 7 : index - 7;
    const captureRightDiagonalIndex = (colorWhite) ? index + 9 : index - 9;
    const oneStepIndex = (colorWhite) ? index + 8 : index - 8;
    const twoStepIndex = (colorWhite) ? index + 16 : index - 16;
    const leftDiagonalEdge = (colorWhite) ? 'left' : 'right';
    const rightDiagonalEdge = (colorWhite) ? 'right' : 'left';
    possibleMoves.push(oneStepIndex);
    if (index >= pawnLine[0] && index <= pawnLine[1]) possibleMoves.push(twoStepIndex);
    if (!chessboardEdges[leftDiagonalEdge].includes(index)) possibleMoves.push(captureLeftDiagonalIndex);
    if (!chessboardEdges[rightDiagonalEdge].includes(index)) possibleMoves.push(captureRightDiagonalIndex);
    return possibleMoves;
};

function rookGenerator(index) {
    const possibleLeftIndexes = straightPathFinder(index, 'left');
    const possibleRightIndexes = straightPathFinder(index, 'right');
    const possibleTopIndexes = straightPathFinder(index, 'top');
    const possibleBottomIndexes = straightPathFinder(index, 'bottom');
    const possibleMoves = [].concat(possibleLeftIndexes, possibleRightIndexes, possibleTopIndexes, possibleBottomIndexes);
    return possibleMoves;
};

function knightGenerator(index) {
    const possibleUpIndexes = knightMovePairFinder(index, 'top');
    const possibleLeftIndexes = knightMovePairFinder(index, 'left');
    const possibleRightIndexes = knightMovePairFinder(index, 'right');
    const possibleDownIndexes = knightMovePairFinder(index, 'bottom');
    const possibleMoves = [].concat(possibleUpIndexes, possibleDownIndexes, possibleLeftIndexes, possibleRightIndexes);
    return possibleMoves;
};

function bishopGenerator(index) {
    const possibleRightUpIndexes = diagonalPathFinder(index, 'right', 'top');
    const possibleLeftUpIndexes = diagonalPathFinder(index, 'left', 'top');
    const possibleRightDownIndexes = diagonalPathFinder(index, 'right', 'bottom');
    const possibleLeftDownIndexes = diagonalPathFinder(index, 'left', 'bottom');
    const possibleMoves = [].concat(possibleRightUpIndexes, possibleLeftUpIndexes, possibleRightDownIndexes, possibleLeftDownIndexes);
    return possibleMoves;
};
function queenGenerator(index) {
    const possibleLeftIndexes = straightPathFinder(index, 'left');
    const possibleRightIndexes = straightPathFinder(index, 'right');
    const possibleUpIndexes = straightPathFinder(index, 'top');
    const possibleDownIndexes = straightPathFinder(index, 'bottom');
    const possibleLeftUpIndexes = diagonalPathFinder(index, 'left', 'top');
    const possibleLeftDownIndexes = diagonalPathFinder(index, 'left', 'bottom');
    const possibleRightUpIndexes = diagonalPathFinder(index, 'right', 'top');
    const possibleRightDownIndexes = diagonalPathFinder(index, 'right', 'bottom');
    const possibleMoves = [].concat(possibleLeftIndexes, possibleRightIndexes, possibleUpIndexes, possibleDownIndexes, possibleLeftUpIndexes, possibleLeftDownIndexes, possibleRightUpIndexes, possibleRightDownIndexes)
    return possibleMoves;
}
function kingGenerator(index) {
    const possibleMoves = [];
    const possibleDirections = ['left', 'right', 'up', 'down', 'up-left', 'down-left', 'up-right', 'down-right'];
    possibleDirections.forEach((direction) => {
        const possibleMoveIndex = kingMoveFinder(index, direction);
        if (possibleMoveIndex) possibleMoves.push(possibleMoveIndex);
    })
    return possibleMoves
};

const possibleMovesetGenerators = {
    Pawn: pawnGenerator,
    Rook: rookGenerator,
    Knight: knightGenerator,
    Bishop: bishopGenerator,
    Queen: queenGenerator,
    King: kingGenerator
}

module.exports = {possibleMovesetGenerators};