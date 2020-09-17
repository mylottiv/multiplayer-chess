const {chessboardNotationEnum} = require('../initialize/chessboardEnums');
const {movePiece} = require('./movePiece');

function validateParsedMove(chessboard, validMoves, piece, targetNotation, startNotation = null) {
    const allValidOptions =  validMoves.filter(({type, moveset}) => (type === piece && moveset.includes(targetNotation)));
    console.log('All Valid Options', allValidOptions);
    let selectedPieceNotation;
    if (allValidOptions.length > 1) {
        if (startNotation === null) return 'Multiple possible moves please specify file or rank of moving piece'
        else {
            // This has an error if the startNotation isn't accurate
            // Also should keep an eye as to whether it will take exact coordinate or just rank/file
            selectedPieceNotation = allValidOptions.find(({coordinates}) => (coordinates === startNotation)).coordinates;
        };
    }
    else {
        selectedPieceNotation = allValidOptions[0].coordinates;
    }
    return movePiece(chessboard, chessboardNotationEnum[selectedPieceNotation], chessboardNotationEnum[targetNotation]);
}

module.exports = {validateParsedMove};