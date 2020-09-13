const {chessboardNotationEnum} = require('../initialize/chessboardEnums');
const {movePiece} = require('./movePiece');

function validateMove(chessboard, validMoves, piece, targetNotation, startNotation = null) {
    const allValidOptions =  validMoves.filter(({type, moveset}) => (type === piece && moveset.includes(targetNotation)));
    console.log('All Valid Options', allValidOptions);
    let selectedPieceNotation;
    if (allValidOptions.length > 1) {
        if (startNotation === null) return 'Multiple possible moves please specify file or rank of moving piece'
        else {
            selectedPieceNotation = allValidOptions.find(({coordinates}) => (coordinates === startNotation)).coordinates;
        };
    }
    else {
        selectedPieceNotation = allValidOptions[0].coordinates;
    }
    return movePiece(chessboard, chessboardNotationEnum[selectedPieceNotation], chessboardNotationEnum[targetNotation]);
}

module.exports = {validateMove};