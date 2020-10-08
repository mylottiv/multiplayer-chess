const {notationParser} = require("./notationParser");
const {notationTests} = require('./notationTests');

function notationValidator(rawNotation, playerColor) {

    if (rawNotation === null || rawNotation.length < 2) return 'Invalid Notation';

    // Castling Validation AND parsing handled here
    if (['O-O', 'O-O-O'].includes(rawNotation)) {
        let targetNotation = (rawNotation === 'O-O') ? 'g' : 'c';
        targetNotation += (playerColor === 'White') ? '1' : '8';
        return {piece: 'King', targetNotation, startingNotation: (playerColor === 'White') ? '1' : '8'};
    };

    const notationEndIndex = rawNotation.length - 1;
    const {rankTest, fileTest, pieceTest, xTest, equalSignTest} = notationTests(rawNotation)

    if (!(rankTest(notationEndIndex) || pieceTest(notationEndIndex))) return 'Invalid Notation';

    if (!(fileTest(notationEndIndex - 1) || !xTest(notationEndIndex - 1))) return 'Invalid Notation';

    if (!(pieceTest(0) || fileTest(0) || rankTest(0))) return 'Invalid Notation';

    if (!(fileTest(1) || rankTest(1) || xTest(1))) return 'Invalid Notation';
    
    if (rawNotation.length > 2 && !(fileTest(2) || rankTest(2) || xTest(0) || equalSignTest(notationEndIndex - 1))) return 'Invalid Notation';

    return notationParser(rawNotation, playerColor)
}

module.exports = {notationValidator};