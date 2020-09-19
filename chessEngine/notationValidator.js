const {notationParser} = require("./notationParser");
const {startingPieceEnum, rankCharSet, fileCharSet} = require('./initialize/chessboardEnums');

function notationValidator(rawNotation, playerColor) {

    if (rawNotation === null) return 'Invalid Notation';

    const notationEndIndex = rawNotation.length - 1;

    if (['O-O', 'O-O-O'].includes(rawNotation)) {
        let targetNotation = (rawNotation === 'O-O') ? 'g' : 'c';
        targetNotation += (playerColor === 'White') ? '1' : '8';
        return {piece: 'King', targetNotation, startingNotation: (playerColor === 'White') ? '1' : '8'};
    };

    if (!rankCharSet.includes(rawNotation[notationEndIndex]) || !fileCharSet.includes(rawNotation[notationEndIndex - 1])) return 'Invalid Notation';

    if (!(Object.keys(startingPieceEnum).includes(rawNotation[0]) || fileCharSet.includes(rawNotation[0]) || rankCharSet.includes(rawNotation[0]) || rawNotation[0] !== 'X')) return 'Invalid Notation';

    if (rawNotation.length > 1 && !(fileCharSet.includes(rawNotation[1]) || rankCharSet.includes(rawNotation[1]) || rawNotation[1] !== 'X')) return 'Invalid Notation';
    
    if (rawNotation.length > 2 && !(fileCharSet.includes(rawNotation[0]) || rankCharSet.includes(rawNotation[0]) || rawNotation[0] !== 'X')) return 'Invalid Notation';

    return notationParser(rawNotation, playerColor)
}

module.exports = {notationValidator};