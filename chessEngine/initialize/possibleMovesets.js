const {chessboardNotationEnum, chessboardArrayEnum} = require('./chessboardEnums');

const {chessboardEdges} = require('./chessboardEdges');

function straightPathFinder(index, direction) {
    if (chessboardEdges[direction].includes(index)) return [];
    const indexOperations = {
        left: (val) => val - 1,
        right: (val) => val + 1,
        top: (val) => val + 8,
        bottom: (val) => val - 8,
    };
    let indexCounter = indexOperations[direction](index);
    const possibleIndexes = [];
    while (!chessboardEdges[direction].includes(indexCounter)) {
        possibleIndexes.push(indexCounter);
        indexCounter = indexOperations[direction](indexCounter);
    };
    // Add the edge index after while loop has been exited
    possibleIndexes.push(indexCounter)
    return possibleIndexes;
};

function diagonalPathFinder(index, horizontal, vertical) {
    if (chessboardEdges[horizontal].includes(index) || chessboardEdges[vertical].includes(index)) return [];
    const indexStepper = {
        left: (val, vertical) => {
            const vert = {
                top: val + 7,
                bottom: val - 9,
            }
            return vert[vertical]
        },
        right: (val, vertical) => {
            const vert = {
                top: val + 9,
                bottom: val - 7
            }
            return vert[vertical]
        }
    };
    let indexCounter = indexStepper[horizontal](index, vertical);
    const possibleIndexes = [];
    while (!chessboardEdges[horizontal].includes(indexCounter) && !chessboardEdges[vertical].includes(indexCounter)) {
        possibleIndexes.push(indexCounter);
        indexCounter = indexStepper[horizontal](indexCounter, vertical);
    };
    // Add the edge index after while loop has been exited
    possibleIndexes.push(indexCounter);
    return possibleIndexes;
};

const knightMovePairFinder = (index, directionOne) => {
    const edgeChecker = (val, direction) => {
        return chessboardEdges[direction].includes(val);
    };
    const directionStepReference = {
        left: (val) => val - 1,
        right: (val) => val + 1,
        top: (val) => val + 8,
        bottom: (val) => val - 8
    };
    const directionTwoPair = (directionOne === 'left' || directionOne === 'right') ? ['top', 'bottom'] : ['left', 'right'];
    if (edgeChecker(index, directionOne)) return [];
    let stepIndex = directionStepReference[directionOne](index);
    if (edgeChecker(stepIndex, directionOne)) return [];
    stepIndex = directionStepReference[directionOne](stepIndex);
    const pairArray = [];
    let moveIndexOne = directionStepReference[directionTwoPair[0]](stepIndex);
    if (!edgeChecker(stepIndex, directionTwoPair[0])) pairArray.push(moveIndexOne);
    let moveIndexTwo = directionStepReference[directionTwoPair[1]](stepIndex);
    if (!edgeChecker(stepIndex, directionTwoPair[1])) pairArray.push(moveIndexTwo);
    return pairArray;
};

const possibleMovesetFunctions = {
    Pawn: (index, color) => {
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
    },
    Rook: (index) => {
        const possibleLeftIndexes = straightPathFinder(index, 'left');
        const possibleRightIndexes = straightPathFinder(index, 'right');
        const possibleTopIndexes = straightPathFinder(index, 'top');
        const possibleBottomIndexes = straightPathFinder(index, 'bottom');
        const possibleMoves = [].concat(possibleLeftIndexes, possibleRightIndexes, possibleTopIndexes, possibleBottomIndexes);
        return possibleMoves;
    },
    Knight: (index) => {
        const possibleUpIndexes = knightMovePairFinder(index, 'top');
        const possibleLeftIndexes = knightMovePairFinder(index, 'left');
        const possibleRightIndexes = knightMovePairFinder(index, 'right');
        const possibleDownIndexes = knightMovePairFinder(index, 'bottom');
        const possibleMoves = [].concat(possibleUpIndexes, possibleDownIndexes, possibleLeftIndexes, possibleRightIndexes);
        return possibleMoves;
    },
    Bishop: (index) => {
        const possibleRightUpIndexes = diagonalPathFinder(index, 'right', 'top');
        const possibleLeftUpIndexes = diagonalPathFinder(index, 'left', 'top');
        const possibleRightDownIndexes = diagonalPathFinder(index, 'right', 'bottom');
        const possibleLeftDownIndexes = diagonalPathFinder(index, 'left', 'bottom');
        const possibleMoves = [].concat(possibleRightUpIndexes, possibleLeftUpIndexes, possibleRightDownIndexes, possibleLeftDownIndexes);
        return possibleMoves;
    },
    Queen: (index) => {
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
    },
    King: (index) => {
        const possibleMoves = [];
        const horizontalLeftIndex = index - 1;
        const horizontalRightIndex = index + 1;
        const verticalUpIndex = index + 8;
        const verticalDownIndex = index - 8;
        const diagonalUpLeftIndex = index + 7;
        const diagonalUpRightIndex = index + 9;
        const diagonalDownLeftIndex = index - 9;
        const diagonalDownRightIndex = index - 7;
        const topEdgeTest = chessboardEdges.top.includes(index);
        const bottomEdgeTest = chessboardEdges.bottom.includes(index);
        const leftEdgeTest = chessboardEdges.left.includes(index);
        const rightEdgeTest = chessboardEdges.right.includes(index);
        if (!leftEdgeTest) possibleMoves.push(horizontalLeftIndex);
        if (!rightEdgeTest) possibleMoves.push(horizontalRightIndex);
        if (!topEdgeTest) possibleMoves.push(verticalUpIndex);
        if (!bottomEdgeTest) possibleMoves.push(verticalDownIndex);
        if (!leftEdgeTest && !topEdgeTest) possibleMoves.push(diagonalUpLeftIndex);
        if (!leftEdgeTest && !bottomEdgeTest) possibleMoves.push(diagonalDownLeftIndex);
        if (!rightEdgeTest && !topEdgeTest) possibleMoves.push(diagonalUpRightIndex);
        if (!rightEdgeTest && !bottomEdgeTest) possibleMoves.push(diagonalDownRightIndex);
        return possibleMoves
    },
}

function getPossibleMoveset(piece, coordinateIndex, color = 'White') {
    return possibleMovesetFunctions[piece](coordinateIndex, color)
}

const allPossibleMoves = {
    WhitePawn: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: getPossibleMoveset('Pawn', index)}}),
    BlackPawn: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: getPossibleMoveset('Pawn', index, 'Black')}}),
    Rook: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: getPossibleMoveset('Rook', index)}}),
    Knight: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: getPossibleMoveset('Knight', index)}}),
    Bishop: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: getPossibleMoveset('Bishop', index)}}),
    Queen: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: getPossibleMoveset('Queen', index)}}),
    King: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: getPossibleMoveset('King', index)}})
}

module.exports = {allPossibleMoves};