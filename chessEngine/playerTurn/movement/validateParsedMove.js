const {chessboardNotationEnum, fileRangeEnum, rankRangeEnum} = require('../../constants/chessboardEnums');
const {fileCharSet, rankCharSet} = require('../../constants/notationEnums');
const {movePiece} = require('./movePiece');

function validateParsedMove(chessboard, validMoves, {piece, targetNotation, startingNotation, pawnPromotion}) {
    
    const allValidOptions =  validMoves.filter(({type, moveset}) => (type === piece && moveset.includes(targetNotation)));
    // console.log('All Valid Options', allValidOptions);
    let selectedPieceNotation;
    
    if (allValidOptions.length > 1) {
    
        if (startingNotation === null) return 'Multiple possible moves please specify file or rank of moving piece';
        
        else {
            const startFileOrRank = (fileCharSet.includes(startingNotation)) 
                ? 'File' 
                : (rankCharSet.includes(startingNotationRange)) 
                    ? 'Rank' 
                    : 'None';
            const startingRangeRef = {
                File: (notation) => fileRangeEnum[notation],
                Rank: (notation) => rankRangeEnum[notation],
                None: () => 'None'
            }
            const startingNotationRange = startingRangeRef[startFileOrRank](startingNotation);
            selectedPieceNotation = allValidOptions.find(({type, coordinates}) => {
                const coordinateIndex = chessboardNotationEnum[coordinates];
                const differenceRef = {
                    File: (diff) => (diff % 8 === 0),
                    Rank: (diff) => (diff <= 7),
                    None: 'None'
                };
                const differenceTest = differenceRef[startFileOrRank];
                const inRange = (differenceTest !== 'None') 
                    ? startingNotationRange.every(rangeIndex => differenceTest(Math.abs(coordinateIndex - rangeIndex)))
                    : 'None';
                return (type === piece) && (inRange || inRange === 'None'); 
            }).coordinates;
        
        };
    
    }

    else selectedPieceNotation = allValidOptions[0].coordinates;

    return movePiece(chessboard, chessboardNotationEnum[selectedPieceNotation], chessboardNotationEnum[targetNotation], pawnPromotion);
}

module.exports = {validateParsedMove};