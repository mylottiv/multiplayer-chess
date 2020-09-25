const {startingPieceEnum} = require('../constants/notationEnums');
const {notationTests} = require('./notationTests');

function pawnPromotionParser(notation) {

    const {pieceTest, equalSignTest} = notationTests(notation)

    const notationEndIndex = notation.length - 1;
    const lastChar = notation[notationEndIndex];
    const promotionCheck = pieceTest(notationEndIndex) && equalSignTest(notationEndIndex -1);

    return (promotionCheck) 
        ? {moveNotation: notation.substring(0, notationEndIndex - 1), pawnPromotion: startingPieceEnum[lastChar]} 
        : {moveNotation: notation, pawnPromotion: null};

}

function notationParser(validatedNotation) {

    const {moveNotation, pawnPromotion} = pawnPromotionParser(validatedNotation)
    const {rankTest, fileTest, pieceTest, xTest, equalSignTest} = notationTests(moveNotation)

    const charOne = moveNotation[0];
    const charOneFileCheck = !equalSignTest(0) && fileTest(0);
    const charOneRankCheck = !charOneFileCheck && rankTest(0);
    const pieceCheck = !charOneRankCheck && pieceTest(0);

    const charTwo = moveNotation[1];
    const captureSecondCharCheck = xTest(1);
    const charTwoFileCheck = !captureSecondCharCheck && fileTest(1);
    const charTwoRankCheck = !charTwoFileCheck && rankTest(1);

    let startingPiece;

    if (pieceCheck) {

        startingPiece = startingPieceEnum[charOne];
        
        console.log('Starting Piece', startingPiece);
                    
        const captureThirdCharCheck = xTest(2);
        const charThreeFileCheck = !captureThirdCharCheck && fileTest(2);

        if (charTwoRankCheck) return{
            piece: startingPiece,
            targetNotation: (captureThirdCharCheck) ? moveNotation.substring(3, 5): moveNotation.substring(2, 4),
            startingNotation: charTwo,
            pawnPromotion
        }

        else if (charThreeFileCheck) return {
            piece: startingPiece,
            targetNotation: moveNotation.substring(2, 4),
            startingNotation: (!captureSecondCharCheck) ? charTwo : null,
            pawnPromotion
        }

        else return {
            piece: startingPiece,
            targetNotation: moveNotation.substring(1, 3),
            startingNotation: null,
            pawnPromotion
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