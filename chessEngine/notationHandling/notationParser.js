const {startingPieceEnum, rankCharSet, fileCharSet} = require('../initialize/chessboardEnums');

function pawnPromotionParser(notation) {

    const notationEndIndex = notation.length - 1;

    const lastChar = notation[notationEndIndex];

    const promotionCheck = Object.keys(startingPieceEnum).includes(notation[notationEndIndex]) && notation[notationEndIndex -1] === '=';

    return (promotionCheck) ? {moveNotation: notation.substring(0, notationEndIndex - 1), pawnPromotion: startingPieceEnum[lastChar]} : {moveNotation: notation, pawnPromotion: null};

}

function notationParser(validatedNotation) {

    const {moveNotation, pawnPromotion} = pawnPromotionParser(validatedNotation)

    const charOne = moveNotation[0];
            
    const charOneFileCheck = !(charOne.toLocaleLowerCase() === 'x') && fileCharSet.includes(charOne);
    
    const charOneRankCheck = !charOneFileCheck && rankCharSet.includes(charOne);

    const pieceCheck = !charOneRankCheck && (Object.keys(startingPieceEnum).includes(charOne));

    const charTwo = moveNotation[1];

    const captureSecondCharCheck = (charTwo.toLocaleLowerCase() === 'x');

    const charTwoFileCheck = !captureSecondCharCheck && fileCharSet.includes(charTwo);

    const charTwoRankCheck = !charTwoFileCheck && rankCharSet.includes(charTwo);

    let startingPiece;

    if (pieceCheck) {

        startingPiece = startingPieceEnum[charOne];
        
        console.log('Starting Piece', startingPiece);
            
        const charThree = moveNotation[2];
        
        const captureThirdCharCheck = (charThree.toLocaleLowerCase() === 'x');
        
        const charThreeFileCheck = !captureThirdCharCheck && fileCharSet.includes(charThree);

        if (charTwoRankCheck) {
            return {
                piece: startingPiece,
                targetNotation: (captureThirdCharCheck) ? moveNotation.substring(3, 5): moveNotation.substring(2, 4),
                startingNotation: charTwo,
                pawnPromotion
            };

        }

        else if (charThreeFileCheck) {

            return {
                piece: startingPiece,
                targetNotation: moveNotation.substring(2, 4),
                startingNotation: (!captureSecondCharCheck) ? charTwo : null,
                pawnPromotion
            }; 
        }

        else {

            return {
                piece: startingPiece,
                targetNotation: moveNotation.substring(1, 3),
                startingNotation: null,
                pawnPromotion
            }; 
        
        }            
    }

    else {
        startingPiece = 'Pawn';
        console.log('Starting Piece', startingPiece);
        const startingNotationCheck = (charTwoFileCheck || captureSecondCharCheck);
        return {
            piece: startingPiece,
            targetNotation: (!startingNotationCheck) 
                ? moveNotation 
                : (captureSecondCharCheck) 
                    ? moveNotation.substring(2, 4) 
                    : moveNotation.substring(1, 3),
            startingNotation: (startingNotationCheck && charOne),
            pawnPromotion
        }; 
    }
}

module.exports = {notationParser};