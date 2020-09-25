const { chessboardEdges } = require('../constants/chessboardEnums');

function adjacencyTest(baseIndex, testIndex) {

    const signedDifference = testIndex - baseIndex; 

    let edgeTests = {
        left: chessboardEdges.left.includes(baseIndex),
        right: !chessboardEdges.left.includes(baseIndex) && chessboardEdges.right.includes(baseIndex),
        up: chessboardEdges.up.includes(baseIndex),
        down: !chessboardEdges.up.includes(baseIndex) && chessboardEdges.down.includes(baseIndex),
        'up-left': chessboardEdges.up.includes(baseIndex) || chessboardEdges.left.includes(baseIndex),
        'up-right': chessboardEdges.up.includes(baseIndex) || chessboardEdges.right.includes(baseIndex),
        'down-left': chessboardEdges.down.includes(baseIndex) || chessboardEdges.left.includes(baseIndex),
        'down-right': chessboardEdges.down.includes(baseIndex) || chessboardEdges.right.includes(baseIndex),
    };

    const offBoardTests = [
        (edgeTests.left && signedDifference === -1),
        (edgeTests.right && signedDifference === 1),
        (edgeTests.up && signedDifference === 8),
        (edgeTests.down && signedDifference === -8),
        (edgeTests["up-left"] && signedDifference === 7),
        (edgeTests["up-right"] && signedDifference === 9),
        (edgeTests["down-left"] && signedDifference === -9),
        (edgeTests["down-right"] && signedDifference === -7)
    ]

    if (offBoardTests.includes(true)) return false;

    const absoluteDifference = Math.abs(signedDifference);
    const adjacentDifferences = [1, 7, 8, 9];
    return adjacentDifferences.includes(absoluteDifference);
};

function matchCoordinates(matchingCoordinates) {
    return ({coordinates}) => matchingCoordinates === coordinates;
}

module.exports = {matchCoordinates, adjacencyTest};