const { allPossibleMoves } = require('../initialize/possibleMovesets');
const { stepperOperations } = require('../validate/stepperOperations');
const { chessboardNotationEnum } = require('../initialize/chessboardEnums');

function axisDirectionTest(startPieceIndex, targetPieceIndex) {
    
    // Find difference between target and start
    const indexDifference = targetPieceIndex - startPieceIndex;

    // Check for the sign
    const positiveDifference = !(indexDifference <= -1);

    // Check for the factor (7, 8, 9, 1)
    const differenceFactor = (indexDifference % 9 === 0) ? '9' : (indexDifference % 8 === 0) ? '8' : (indexDifference % 7 === 0) ? '7' : '1';

    const axisReference = {
        9: (positiveSign) => (positiveSign) ? {axis: 'diagLeftRight', direction:'up-right'} : {axis: 'diagLeftRight', direction:'down-left'},
        8: (positiveSign) => (positiveSign) ? {axis: 'vertical', direction:'up'} : {axis: 'vertical', direction:'down'},
        7: (positiveSign) => (positiveSign) ? {axis: 'diagRightLeft', direction:'up-left'} : {axis: 'diagRightLeft', direction:'down-right'},
        1: (positiveSign) => (positiveSign) ? {axis: 'horizontal', direction:'right'} : {axis: 'horizontal', direction:'left'},
    }

    return axisReference[differenceFactor](positiveDifference);
}

function intoCheckValidation(chessboard, playerKingIndex, playerMoves, opponentMoves) {

    // For each player piece
    const validatedplayerMoves = playerMoves.map(playerPiece => {

        let filterFunction;

        // Filter moves that would put King into opponent Valid Moveset
        if (playerPiece.type === 'King') {
            
            filterFunction = (moveCoordinates) => !opponentMoves.some(({moveset}) => moveset.includes(moveCoordinates));
            
            // Filter moves that would result in a check by opponent's piece being removed
            // TODO
        }    

        // Filter moves that would result in a check by player's piece being removed
        else {
            
            let threatenAxis, threatenDirection;

            const capturingPieces = opponentMoves.filter(({canCapture}) => (canCapture !== null && canCapture.some(({coordinates: targetCoordinates}) => targetCoordinates === playerPiece.coordinates)));
                        
            const threateningPiece = capturingPieces.find(opponentPiece => {
            
                if (opponentPiece.type !== 'King' || opponentPiece.type !== 'Pawn' || opponentPiece.type !== 'Knight') {
                
                    if (allPossibleMoves[opponentPiece.type][chessboardNotationEnum[opponentPiece.coordinates]].possibleMoveset.includes(playerKingIndex)) {
                        const matchingCanCapture = opponentPiece.canCapture.find(({coordinates: testCoordinates}) => testCoordinates === playerPiece.coordinates)
                        const captureAxisDirection = axisDirectionTest(chessboardNotationEnum[opponentPiece.coordinates], playerKingIndex);

                        if (captureAxisDirection.axis === matchingCanCapture.axis && captureAxisDirection.direction === matchingCanCapture.direction) {
                            threatenAxis = captureAxisDirection.axis;
                            threatenDirection = captureAxisDirection.direction;
                            return true;
                        }
                        else return false;
                    }
                
                }
                
                else return false;
            
            });

            // Check if there are any pieces of any color between the playerPiece and the player king on relevant axis

            let pieceBlockingCheck;

            if (threateningPiece) {

                pieceBlockingCheck = true;
                
                let stepIndex = stepperOperations[threatenAxis](chessboardNotationEnum[playerPiece.coordinates], threatenDirection);

                while (stepIndex !== playerKingIndex) {

                    if (chessboard[stepIndex].Piece !== null) {
                                                
                        pieceBlockingCheck = false;
                        break;
                    }
                    
                    stepIndex = stepperOperations[threatenAxis](stepIndex, threatenDirection);
                }
            };

            // If not, then create a reference of possible moves along given axis and direction to filter piece moves by

            if (pieceBlockingCheck) {

                let stepIndex = chessboardNotationEnum[threateningPiece.coordinates];

                const onlyValidPlayerMoves = [stepIndex]

                while (stepIndex !== playerKingIndex) {
                    
                    stepIndex = stepperOperations[threatenAxis](stepIndex, threatenDirection);

                    onlyValidPlayerMoves.push(stepIndex);

                }

                filterFunction = (moveCoordinates) => onlyValidPlayerMoves.includes(chessboardNotationEnum[moveCoordinates]);

            }
        };

        return (filterFunction) ? {...playerPiece, moveset: playerPiece.moveset.filter(filterFunction)} : {...playerPiece};

    })

    return validatedplayerMoves;

};

module.exports = {intoCheckValidation};