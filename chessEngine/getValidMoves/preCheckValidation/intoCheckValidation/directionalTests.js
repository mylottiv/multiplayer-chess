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

module.exports = {directionTest};