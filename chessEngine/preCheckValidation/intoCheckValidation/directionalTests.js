const { chessboardEdges } = require('../../constants/chessboardEnums');

function directionTest(startPieceIndex, targetPieceIndex) {
    
    const signedDifference = targetPieceIndex - startPieceIndex;
    const positiveDifference = (signedDifference > 0);
    const differenceFactor = (signedDifference % 9 === 0) 
        ? '9' 
        : (signedDifference % 8 === 0) 
            ? '8' 
            : (signedDifference % 7 === 0) 
                ? '7' 
                : '1';

    const directionReference = {
        9: (positiveSign) => (positiveSign) ? 'up-right' : 'down-left',
        8: (positiveSign) => (positiveSign) ? 'up' : 'down',
        7: (positiveSign) => (positiveSign) ? 'up-left' : 'down-right',
        1: (positiveSign) => (positiveSign) ? 'right' : 'left',
    }

    return directionReference[differenceFactor](positiveDifference);
};

function adjacencyTest(baseIndex, testIndex) {

    const signedDifference = testIndex - baseIndex; 

    let edgeTests = {
        left: chessboardEdges.left.includes(baseIndex),
        right: !chessboardEdges.left.includes(baseIndex) && chessboardEdges.right.includes(baseIndex),
        up: chessboardEdges.up.includes(baseIndex),
        down: !chessboardEdges.up.includes(baseIndex) && chessboardEdges.down.includes(baseIndex)
    };

    const offBoardTests = [
        (edgeTests.left && signedDifference === -1),
        (edgeTests.right && signedDifference === 1),
        (edgeTests.up && signedDifference === 8),
        (edgeTests.down && signedDifference === -8)
    ]

    if (offBoardTests.includes(true)) return false;

    const absoluteDifference = Math.abs(signedDifference);
    const adjacentDifferences = [1, 7, 8, 9];
    return adjacentDifferences.includes(absoluteDifference);
};

module.exports = {directionTest, adjacencyTest};