const {startingPieceEnum, rankCharSet, fileCharSet} = require('./initialize/chessboardEnums');
const validateParsedMove = require('./movement/validateParsedMove');

function notationParser(validatedNotation) {

    if (validatedNotation === null) return null;

    const charOne = validatedNotation.length >= 1 && validatedNotation[0];
        
    const pieceCheck = (Object.keys(startingPieceEnum).includes(charOne));

    const charOneFileCheck = !pieceCheck && fileCharSet.includes(charOne);

    const charOneRankCheck = !charOneFileCheck && rankCharSet.includes(charOne);

    const captureFirstCharCheck = (charOne === 'x');

    const charTwo = validatedNotation.length >= 2 && validatedNotation[1];

    const captureSecondCharCheck = (charTwo === 'x');

    const charTwoFileCheck = !captureSecondCharCheck && fileCharSet.includes(charTwo);

    const charTwoRankCheck = !charTwoFileCheck && rankCharSet.includes(charTwo);

    let startingPiece, startingFile, startingRank;

    if (pieceCheck) {

        startingPiece = startingPieceEnum[charOne];
        
        console.log('Starting Piece', startingPiece);
            
        const charThree = validatedNotation.length >= 3 && validatedNotation[2];
        
        const captureThirdCharCheck = (charThree === 'x');
        
        const charThreeFileCheck = !captureThirdCharCheck && fileCharSet.includes(charThree);

        if (charTwoRankCheck) {

            startingRank = charTwo;
            return {
                piece: startingPiece,
                targetNotation: (captureThirdCharCheck) ? validatedNotation.substring(3, 5): validatedNotation.substring(2, 4),
                startingNotation: startingRank
            };

        }

        else if (charThreeFileCheck) {
            
            const charFour = validatedNotation.length >= 4 && validatedNotation[3];

            const charFourFileCheck = fileCharSet.includes(charFour);
            
            if (charFourFileCheck) {

                startingFile = charThree;
                return {
                    piece: startingPiece,
                    targetNotation: validatedNotation.substring(3, 5),
                    startingNotation: startingFile
                };            
            }

            else {

                startingFile = (!captureSecondCharCheck) ? charTwo : null;
                return {
                    piece: startingPiece,
                    targetNotation: validatedNotation.substring(2, 4),
                    startingNotation: startingFile
                }; 
            
            }
        

        }

        else {

            return {
                piece: startingPiece,
                targetNotation: validatedNotation.substring(1, 3),
                startingNotation: null
            }; 
        
        }            
    }

    else if (charOneFileCheck || charOneRankCheck || captureFirstCharCheck) {
        startingPiece = 'Pawn';
        console.log('Starting Piece', startingPiece);
        startingFile = (charOneFileCheck && (charTwoFileCheck || captureSecondCharCheck)) && charOne;
        startingRank = (charOneRankCheck && (charTwoFileCheck || captureSecondCharCheck)) && charOne;
        return {
            piece: startingPiece,
            targetNotation: (charOneFileCheck && !captureSecondCharCheck) ? validatedNotation.substring(0, 2) : (charOneRankCheck) ? validatedNotation.substring(1, 3) : (captureSecondCharCheck) ? validatedNotation.substring(2, 4) : validatedNotation,
            startingNotation: (startingFile) ? startingFile : (startingRank) ? startingRank : null
        }; 
    }
    
    return validatedNotation
}

module.exports = {notationParser};