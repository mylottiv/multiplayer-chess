const { allPossibleMoves } = require('../constants/possibleMovesets');
const { stepperOperations } = require('../constants/stepperOperations');
const { chessboardNotationEnum, chessboardEdges } = require('../constants/chessboardEnums');

function axisDirectionTest(startPieceIndex, targetPieceIndex) {

    // Shouldn't need an edge test, since has validated through other checks
    
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
};

function adjacencyTest(baseIndex, testIndex) {
    const onLeftEdge = chessboardEdges.left.includes(baseIndex);
    const onRightEdge = !onLeftEdge && chessboardEdges.right.includes(baseIndex);
    if (onLeftEdge || onRightEdge) {
        const signedDifference = testIndex - baseIndex;
        if ((onLeftEdge && signedDifference === -1) || (onRightEdge && signedDifference === 1)) return false;
    };
    const absoluteDifference = Math.abs(testIndex - baseIndex);
    const adjacentDifferences = [1, 7, 8, 9];
    return adjacentDifferences.includes(absoluteDifference);
}



function intoCheckValidation(chessboard, playerMoves, opponentMoves) {

    // Find Player King Index
    const playerKingIndex = chessboardNotationEnum[playerMoves.find(({type}) => type === 'King').coordinates]

    // For each player piece
    const validatedplayerMoves = playerMoves.map(playerPiece => {

        let filterFunction;

        // Filter moves that would put King into opponent Valid Moveset
        if (playerPiece.type === 'King') {

            const playerColor = chessboard[playerKingIndex].Piece.color;

            const opponentColor = (playerColor === 'White') ? 'Black' : 'White';
            
            const kingCanCapture = playerPiece.canCapture;
            
            // If opponentColor piece can be captured by King, is in an opponent piece's possible moveset, and is adjacent to a valid move or said piece, then filter out
            
            const riskyCaptures = kingCanCapture.filter(targetedPiece => {

                const targetedPieceIndex = chessboardNotationEnum[targetedPiece.coordinates];

                return opponentMoves.some(riskyOpponentPiece => {
                    
                    const riskyOpponentPieceIndex = chessboardNotationEnum[riskyOpponentPiece.coordinates];
                    
                    const opponentPieceTypeRef = (riskyOpponentPiece.type === 'Pawn') ? opponentColor + riskyOpponentPiece.type : riskyOpponentPiece.type

                    const possibleOpponentMoves = allPossibleMoves[opponentPieceTypeRef][riskyOpponentPieceIndex].possibleMoveset;
                    
                    if (possibleOpponentMoves.includes(chessboardNotationEnum[targetedPiece.coordinates])) {
                        if (riskyOpponentPiece.type === 'Pawn') {
                            const diagonals = [7, 9];
                            const riskyPawnCanCapture = diagonals.includes(Math.abs(riskyOpponentPieceIndex - targetedPieceIndex));
                            return (riskyPawnCanCapture);
                        }
                        else if (riskyOpponentPiece.type !== 'Knight') {
                            const nextToMoveOrPiece = (adjacencyTest(targetedPieceIndex, riskyOpponentPieceIndex) || riskyOpponentPiece.moveset.some(({validMove}) => adjacencyTest(targetedPieceIndex, chessboardNotationEnum[validMove])));
                            return (nextToMoveOrPiece);
                        }
                        // If canCapture piece is in Knight's possible moveset, then capturing said piece would place King in check by Knight
                        else return (riskyOpponentPiece.type === 'Knight');
                    }
                })
            })
            
            filterFunction = (moveCoordinates) => {
                const notInOpponentMoveset = (!opponentMoves.some(({moveset}) => moveset.includes(moveCoordinates)))
                const notRiskyCapture = (!riskyCaptures.some(({coordinates: captureCoordinates}) => captureCoordinates === moveCoordinates))
                return (notInOpponentMoveset && notRiskyCapture);
            };
            
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
                
                let stepIndex = stepperOperations[threatenDirection](chessboardNotationEnum[playerPiece.coordinates]);

                while (stepIndex !== playerKingIndex) {

                    if (chessboard[stepIndex].Piece !== null) {
                                                
                        pieceBlockingCheck = false;
                        break;
                    }
                    
                    stepIndex = stepperOperations[threatenDirection](stepIndex);
                }
            };

            // If not, then create a reference of possible moves along given axis and direction to filter piece moves by

            if (pieceBlockingCheck) {

                let stepIndex = chessboardNotationEnum[threateningPiece.coordinates];

                const onlyValidPlayerMoves = [stepIndex]

                while (stepIndex !== playerKingIndex) {
                    
                    stepIndex = stepperOperations[threatenDirection](stepIndex);

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