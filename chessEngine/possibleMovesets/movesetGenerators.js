const {chessboardEdges, rankRangeEnum} = require('../chessboardEnums');
const {straightPathFinder, diagonalPathFinder, knightMovePairFinder, kingMoveFinder} = require('./pathFinders');

function pawnGenerator(index, color) {

    if (index <= rankRangeEnum['1'][1] || index >= rankRangeEnum['8'][0]) return "Impossible Location for Pawn";
    
    const colorWhite = (color === 'White');
    const pawnStartingRank = (colorWhite) ? rankRangeEnum['2'] : rankRangeEnum['7'];

    const captureLeftDiagonalIndex = (colorWhite) ? index + 7 : index - 7;
    const captureRightDiagonalIndex = (colorWhite) ? index + 9 : index - 9;
    const oneStepIndex = (colorWhite) ? index + 8 : index - 8;
    const twoStepIndex = (colorWhite) ? index + 16 : index - 16;
    const possibleMoves = [oneStepIndex];

    const leftDiagonalEdge = (colorWhite) ? 'left' : 'right';
    const rightDiagonalEdge = (colorWhite) ? 'right' : 'left';

    if (index >= pawnStartingRank[0] && index <= pawnStartingRank[1]) possibleMoves.push(twoStepIndex);
    if (!chessboardEdges[leftDiagonalEdge].includes(index)) possibleMoves.push(captureLeftDiagonalIndex);
    if (!chessboardEdges[rightDiagonalEdge].includes(index)) possibleMoves.push(captureRightDiagonalIndex);
    return possibleMoves;
};

function rookGenerator(index) {
    const possibleIndexes = {
        left: straightPathFinder(index, 'left'),
        right: straightPathFinder(index, 'right'),
        up: straightPathFinder(index, 'up'),
        down: straightPathFinder(index, 'down'),
    }
    const possibleMoves = [].concat(Object.values(possibleIndexes).flat());
    return possibleMoves;
};

function knightGenerator(index) {
    const possibleIndexes = {
        left: knightMovePairFinder(index, 'left'),
        right: knightMovePairFinder(index, 'right'),
        up: knightMovePairFinder(index, 'up'),
        down: knightMovePairFinder(index, 'down'),
    }
    const possibleMoves = [].concat(Object.values(possibleIndexes).flat());
    return possibleMoves;
};

function bishopGenerator(index) {
    const possibleIndexes = {
        'up-left': diagonalPathFinder(index, 'up', 'left'),
        'down-left': diagonalPathFinder(index, 'down', 'left'),
        'up-right': diagonalPathFinder(index, 'up', 'right'),
        'down-right': diagonalPathFinder(index, 'down', 'right')
    };
    const possibleMoves = [].concat(Object.values(possibleIndexes).flat());
    return possibleMoves;
};
function queenGenerator(index) {
    const possibleIndexes = {
        left: straightPathFinder(index, 'left'),
        right: straightPathFinder(index, 'right'),
        up: straightPathFinder(index, 'up'),
        down: straightPathFinder(index, 'down'),
        'up-left': diagonalPathFinder(index, 'up', 'left'),
        'down-left': diagonalPathFinder(index, 'down', 'left'),
        'up-right': diagonalPathFinder(index, 'up', 'right'),
        'down-right': diagonalPathFinder(index, 'down', 'right')
    }
    const possibleMoves = [].concat(Object.values(possibleIndexes).flat())
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