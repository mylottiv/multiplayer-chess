const {chessboardNotationEnum, fileCharSet, fileRangeEnum, rankRangeEnum} = require('../initialize/chessboardEnums');
const {movePiece} = require('./movePiece');

function validateParsedMove(chessboard, validMoves, {piece, targetNotation, startingNotation}) {
    const allValidOptions =  validMoves.filter(({type, moveset}) => (type === piece && moveset.includes(targetNotation)));
    // console.log('All Valid Options', allValidOptions);
    let selectedPieceNotation;
    if (allValidOptions.length > 1) {
        if (startingNotation === null) return 'Multiple possible moves please specify file or rank of moving piece'
        else {
            const startFileCheck = (fileCharSet.includes(startingNotation));
            const startingNotationRange = startFileCheck ? fileRangeEnum[startingNotation] : rankRangeEnum[startingNotation];
            selectedPieceNotation = allValidOptions.find(({type, coordinates}) => {
                const coordinateIndex = chessboardNotationEnum[coordinates];
                const test = (startFileCheck) ? (diff) => diff % 8 === 0 : (diff) => diff <= 7
                const inRange = startingNotationRange.every(rangeIndex => test(Math.abs(coordinateIndex - rangeIndex)))
                return (type === piece) && inRange; 
            }).coordinates;
        };
    }
    else {
        selectedPieceNotation = allValidOptions[0].coordinates;
    }
    return movePiece(chessboard, chessboardNotationEnum[selectedPieceNotation], chessboardNotationEnum[targetNotation]);
}

module.exports = {validateParsedMove};