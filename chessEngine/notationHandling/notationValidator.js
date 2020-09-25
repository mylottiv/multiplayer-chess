const {notationParser} = require("./notationParser");
const {startingPieceEnum, rankCharSet, fileCharSet} = require('../constants/notationEnums');

function notationValidator(rawNotation, playerColor) {

    if (rawNotation === null || rawNotation.length < 2) return 'Invalid Notation';

    const notationEndIndex = rawNotation.length - 1;

    if (['O-O', 'O-O-O'].includes(rawNotation)) {
        let targetNotation = (rawNotation === 'O-O') ? 'g' : 'c';
        targetNotation += (playerColor === 'White') ? '1' : '8';
        return {piece: 'King', targetNotation, startingNotation: (playerColor === 'White') ? '1' : '8'};
    };

    // Might need to step through from the end if a piece and/or '=' are detected
    // console.log('firstTest', (!rankCharSet.includes(rawNotation[notationEndIndex]) && ! !Object.keys(startingPieceEnum).includes(rawNotation[notationEndIndex])));
    if (!rankCharSet.includes(rawNotation[notationEndIndex]) && !Object.keys(startingPieceEnum).includes(rawNotation[notationEndIndex])) return 'Invalid Notation';

    // console.log('secondTest', rawNotation, (!fileCharSet.includes(rawNotation[notationEndIndex - 1]) && rawNotation[notationEndIndex - 1] !== '='));
    if (!fileCharSet.includes(rawNotation[notationEndIndex - 1]) && rawNotation[notationEndIndex - 1] !== '=') return 'Invalid Notation';

    // console.log('thirdTest', rawNotation, (!(Object.keys(startingPieceEnum).includes(rawNotation[0]) || fileCharSet.includes(rawNotation[0]) || rankCharSet.includes(rawNotation[0]))));
    if (!(Object.keys(startingPieceEnum).includes(rawNotation[0]) || fileCharSet.includes(rawNotation[0]) || rankCharSet.includes(rawNotation[0]))) return 'Invalid Notation';

    // console.log('fourthTest', rawNotation, (!(fileCharSet.includes(rawNotation[1]) || rankCharSet.includes(rawNotation[1]) || rawNotation[1].toLocaleLowerCase() === 'x')))
    if (!(fileCharSet.includes(rawNotation[1]) || rankCharSet.includes(rawNotation[1]) || rawNotation[1].toLocaleLowerCase() === 'x')) return 'Invalid Notation';
    
    // console.log('fifthTest', rawNotation, (rawNotation.length > 2 && !(fileCharSet.includes(rawNotation[2]) || rankCharSet.includes(rawNotation[2]) || (rawNotation[0].toLocaleLowerCase() === 'x') || rawNotation[notationEndIndex - 1] === '=')))
    if (rawNotation.length > 2 && !(fileCharSet.includes(rawNotation[2]) || rankCharSet.includes(rawNotation[2]) || (rawNotation[0].toLocaleLowerCase() === 'x') || rawNotation[notationEndIndex - 1] === '=')) return 'Invalid Notation';

    return notationParser(rawNotation, playerColor)
}

module.exports = {notationValidator};