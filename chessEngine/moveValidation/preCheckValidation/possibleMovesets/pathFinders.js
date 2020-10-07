const {chessboardEdges} = require('../../../constants/chessboardEnums');
const {stepperOperations} = require('../../../constants/stepperOperations');

function straightPathFinder(index, direction) {
    if (chessboardEdges[direction].includes(index)) return [];
    let indexCounter = stepperOperations[direction](index);
    const possibleIndexes = [];
    while (!chessboardEdges[direction].includes(indexCounter)) {
        possibleIndexes.push(indexCounter);
        indexCounter = stepperOperations[direction](indexCounter);
    };
    // Add the edge index after while loop has been exited
    possibleIndexes.push(indexCounter)
    return possibleIndexes;
};

function diagonalPathFinder(index, vertical, horizontal) {
    if (chessboardEdges[horizontal].includes(index) || chessboardEdges[vertical].includes(index)) return [];
    const diagonalDirection = vertical + '-' + horizontal;
    let indexCounter = stepperOperations[diagonalDirection](index);
    const possibleIndexes = [];
    while (!chessboardEdges[horizontal].includes(indexCounter) && !chessboardEdges[vertical].includes(indexCounter)) {
        possibleIndexes.push(indexCounter);
        indexCounter = stepperOperations[diagonalDirection](indexCounter);
    };
    // Add the edge index after while loop has been exited
    possibleIndexes.push(indexCounter);
    return possibleIndexes;
};

function knightMovePairFinder(index, directionOne) {
    const directionTwoPair = (['left', 'right'].includes(directionOne)) ? ['up', 'down'] : ['left', 'right'];
    if (chessboardEdges[directionOne].includes(index)) return [];
    let stepIndex = stepperOperations[directionOne](index);
    if (chessboardEdges[directionOne].includes(stepIndex)) return [];
    stepIndex = stepperOperations[directionOne](stepIndex);
    const pairArray = [];
    let moveIndexOne = stepperOperations[directionTwoPair[0]](stepIndex);
    if (!chessboardEdges[directionTwoPair[0]].includes(stepIndex)) pairArray.push(moveIndexOne);
    let moveIndexTwo = stepperOperations[directionTwoPair[1]](stepIndex);
    if (!chessboardEdges[directionTwoPair[1]].includes(stepIndex)) pairArray.push(moveIndexTwo);
    return pairArray;
};

function kingMoveFinder(index, direction) {
    const topEdgeTest = chessboardEdges.up.includes(index);
    const bottomEdgeTest = chessboardEdges.down.includes(index);
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