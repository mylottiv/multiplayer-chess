const {chessboardEdges} = require('../chessboardEnums');

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

function knightMovePairFinder(index, directionOne) {
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

function kingMoveFinder(index, direction) {
    const topEdgeTest = chessboardEdges.top.includes(index);
    const bottomEdgeTest = chessboardEdges.bottom.includes(index);
    const leftEdgeTest = chessboardEdges.left.includes(index);
    const rightEdgeTest = chessboardEdges.right.includes(index);
    const upLeftEdgeTest = (leftEdgeTest || topEdgeTest);
    const downLeftEdgeTest = (leftEdgeTest || bottomEdgeTest);
    const upRightEdgeTest = (rightEdgeTest || topEdgeTest);
    const downRightEdgeTest = (rightEdgeTest || bottomEdgeTest);
    const indexTests = {
        left: (index) => !leftEdgeTest && index - 1,
        right: (index) => !rightEdgeTest && index + 1,
        up: (index) => !topEdgeTest && index + 8,
        down: (index) => !bottomEdgeTest && index - 8,
        'up-left': (index) => !upLeftEdgeTest && index + 7,
        'down-left': (index) => !downLeftEdgeTest && index - 9,
        'up-right': (index) => !upRightEdgeTest && index + 9,
        'down-right': (index) => !downRightEdgeTest && index - 7,
    };
    return indexTests[direction](index)
}

module.exports = {straightPathFinder, diagonalPathFinder, knightMovePairFinder, kingMoveFinder};