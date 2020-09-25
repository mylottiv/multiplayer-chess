const {startingPieceEnum, rankCharSet, fileCharSet} = require('../constants/notationEnums');

function notationTests(testNotation) {
    return {
        rankTest: (index) => rankCharSet.includes(testNotation[index]),
        fileTest: (index) => fileCharSet.includes(testNotation[index]),
        pieceTest: (index) => Object.keys(startingPieceEnum).includes(testNotation[index]),
        xTest: (index) => testNotation[index].toLocaleLowerCase() === 'x',
        equalSignTest: (index) => testNotation[index] === '=',
    }
}

module.exports = {notationTests}