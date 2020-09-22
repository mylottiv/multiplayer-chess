const { allPossibleMoves } = require('../possibleMovesets');
const { stepperOperations } = require('../constants/stepperOperations');
const { chessboardNotationEnum, chessboardEdges } = require('../constants/chessboardEnums');

function directionTest(startPieceIndex, targetPieceIndex) {

    // Shouldn't need an edge test, since has validated through other checks
    
    // Find difference between target and start
    const indexDifference = targetPieceIndex - startPieceIndex;

    // Check for the sign
    const positiveDifference = !(indexDifference <= -1);

    // Check for the factor (7, 8, 9, 1)
    const differenceFactor = (indexDifference % 9 === 0) ? '9' : (indexDifference % 8 === 0) ? '8' : (indexDifference % 7 === 0) ? '7' : '1';

    const directionReference = {
        9: (positiveSign) => (positiveSign) ? 'up-right' : 'down-left',
        8: (positiveSign) => (positiveSign) ? 'up' : 'down',
        7: (positiveSign) => (positiveSign) ? 'up-left' : 'down-right',
        1: (positiveSign) => (positiveSign) ? 'right' : 'left',
    }

    return directionReference[differenceFactor](positiveDifference);
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
            
            let threatenDirection;

            const capturingPieces = opponentMoves.filter(({canCapture}) => (canCapture !== null && canCapture.some(({coordinates: targetCoordinates}) => targetCoordinates === playerPiece.coordinates)));
                        
            const threateningPiece = capturingPieces.find(opponentPiece => {
            
                if (opponentPiece.type !== 'King' || opponentPiece.type !== 'Pawn' || opponentPiece.type !== 'Knight') {
                
                    if (allPossibleMoves[opponentPiece.type][chessboardNotationEnum[opponentPiece.coordinates]].possibleMoveset.includes(playerKingIndex)) {
                        const matchingCanCapture = opponentPiece.canCapture.find(({coordinates: testCoordinates}) => testCoordinates === playerPiece.coordinates)
                        const captureDirection = directionTest(chessboardNotationEnum[opponentPiece.coordinates], playerKingIndex);

                        if (captureDirection === matchingCanCapture.direction) {
                            threatenDirection = captureDirection;
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

            // If not, then create a reference of possible moves along given direction to filter piece moves by

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