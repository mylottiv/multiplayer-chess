const { allPossibleMoves } = require('../possibleMovesets');
const { stepperOperations } = require('../constants/stepperOperations');
const { chessboardNotationEnum, chessboardEdges } = require('../constants/chessboardEnums');

function directionTest(startPieceIndex, targetPieceIndex) {
    
    const signedDifference = targetPieceIndex - startPieceIndex;
    const positiveDifference = (signedDifference > 0);
    const differenceFactor = (signedDifference % 9 === 0) 
        ? '9' 
        : (signedDifference % 8 === 0) 
            ? '8' 
            : (signedDifference % 7 === 0) 
                ? '7' 
                : '1';

    const directionReference = {
        9: (positiveSign) => (positiveSign) ? 'up-right' : 'down-left',
        8: (positiveSign) => (positiveSign) ? 'up' : 'down',
        7: (positiveSign) => (positiveSign) ? 'up-left' : 'down-right',
        1: (positiveSign) => (positiveSign) ? 'right' : 'left',
    }

    return directionReference[differenceFactor](positiveDifference);
};

function adjacencyTest(baseIndex, testIndex) {

    const signedDifference = testIndex - baseIndex; 

    let edgeTests = {
        left: chessboardEdges.left.includes(baseIndex),
        right: !chessboardEdges.left.includes(baseIndex) && chessboardEdges.right.includes(baseIndex),
        up: chessboardEdges.up.includes(baseIndex),
        down: !chessboardEdges.up.includes(baseIndex) && chessboardEdges.down.includes(baseIndex)
    };

    const offBoardTests = [
        (edgeTests.left && signedDifference === -1),
        (edgeTests.right && signedDifference === 1),
        (edgeTests.up && signedDifference === 8),
        (edgeTests.down && signedDifference === -8)
    ]

    if (offBoardTests.includes(true)) return false;

    const absoluteDifference = Math.abs(signedDifference);
    const adjacentDifferences = [1, 7, 8, 9];
    return adjacentDifferences.includes(absoluteDifference);
};

function riskyCapturesFilter(color, opponentMoves) {

    return (targetedPiece) => {
    
        const targetedPieceIndex = chessboardNotationEnum[targetedPiece.coordinates];

        return opponentMoves.some(riskyPiece => {
            
            const riskyPieceIndex = chessboardNotationEnum[riskyPiece.coordinates];
            
            const riskyPieceRef = (riskyPiece.type === 'Pawn') ? color + riskyPiece.type : riskyPiece.type;

            const possibleOpponentMoves = allPossibleMoves[riskyPieceRef][riskyPieceIndex].possibleMoveset;
            
            if (possibleOpponentMoves.includes(targetedPieceIndex)) {
                const riskyTests = {
                    Pawn: () => [7, 9].includes(Math.abs(riskyPieceIndex - targetedPieceIndex)),
                    Knight: () => true,
                }
                if (!Object.keys(riskyTests).includes(riskyPiece.type)) return riskyTests[riskyPiece.type];
                else {
                    const adjacentIndexes = adjacencyTest(targetedPieceIndex, riskyPieceIndex);
                    const adjacentMovesTest = ({validMove}) => adjacencyTest(targetedPieceIndex, chessboardNotationEnum[validMove]);
                    const adjacentRiskyMoves = riskyPiece.moveset.some(adjacentMovesTest);
                    const nextToMoveOrPiece = (adjacentIndexes || adjacentRiskyMoves);
                    return (nextToMoveOrPiece);
                }
            };
            return false;
        })
    }
}

function matchCoordinates(matchingCoordinates) {
    return ({coordinates}) => matchingCoordinates === coordinates;
}


function intoCheckValidation(chessboard, playerMoves, opponentMoves) {

    const playerKingIndex = chessboardNotationEnum[playerMoves.find(({type}) => type === 'King').coordinates]

    // Validated moves determined by testing each player piece
    return playerMoves.map(playerPiece => {

        const playerCoordinates = playerPiece.coordinates;
        let filterFunction;

        // Filter moves that would put King into opponent Valid Moveset
        if (playerPiece.type === 'King') {

            const kingCanCapture = playerPiece.canCapture;       
            const opponentColor = (chessboard[playerKingIndex].Piece.color === 'White') ? 'Black' : 'White';
            const riskyCaptures = kingCanCapture.filter(riskyCapturesFilter(opponentColor, opponentMoves));
            
            // If opponentColor piece can be captured by King, is in an opponent piece's possible moveset, and is adjacent to a valid move or said piece, then filter out
            filterFunction = (moveCoordinates) => {
                const inOpponentMoveset = opponentMoves.some(({type, coordinates: opponentCoordinates, moveset}) => {
                    const moveInMoveset =  moveset.includes(moveCoordinates);
                    if (type === 'Pawn') {
                        const pieceIndex = chessboardNotationEnum[opponentCoordinates];
                        const moveIndex = chessboardNotationEnum[moveCoordinates];
                        return (moveInMoveset && ![8, 16].includes(Math.abs(pieceIndex - moveIndex)));
                    };
                    return moveInMoveset;
                })
                if (inOpponentMoveset) return false;
                else return !riskyCaptures.some(matchCoordinates(moveCoordinates))
            };
            
        }    
        
        // Filter moves that would result in a check by player's piece being removed
        else {
            
            let threatenDirection;

            const capturingPieces = opponentMoves.filter(({canCapture}) => 
                {
                    return (canCapture !== null && canCapture.some(matchCoordinates(playerCoordinates)))
                });
                        
            const threateningPiece = capturingPieces.find(opponentPiece => {
            
                if (['King', 'Pawn', 'Knight'].includes(opponentPiece.type)) return false
                
                else {

                    const opponentType = opponentPiece.type;
                    const opponentIndex = chessboardNotationEnum[opponentPiece.coordinates];
                    const opponentPossibleMoves = allPossibleMoves[opponentType][opponentIndex].possibleMoveset;

                    if (opponentPossibleMoves.includes(playerKingIndex)) {
                        const matchingCanCapture = opponentPiece.canCapture.find(matchCoordinates(playerCoordinates));
                        const captureDirection = directionTest(opponentIndex, playerKingIndex);

                        if (captureDirection === matchingCanCapture.direction) {
                            threatenDirection = captureDirection;
                            return true;
                        }
                        else return false;
                    };
                
                };
            
            });
            
            if (threateningPiece) {

                // Check if there are any pieces of any color between the playerPiece and the player king on relevant axis
                
                let pieceBlockingCheck = true;
                
                let stepIndex = stepperOperations[threatenDirection](chessboardNotationEnum[playerCoordinates]);

                while (stepIndex !== playerKingIndex) {

                    if (chessboard[stepIndex].Piece !== null) {
                                                
                        pieceBlockingCheck = false;
                        break;
                    }
                    
                    stepIndex = stepperOperations[threatenDirection](stepIndex);
                }

                // If so, then create a reference of possible moves along given direction to filter piece moves by
    
                if (pieceBlockingCheck) {
    
                    let stepIndex = chessboardNotationEnum[threateningPiece.coordinates];
    
                    const onlyValidPlayerMoves = [stepIndex];
    
                    while (stepIndex !== playerKingIndex) {
                        
                        stepIndex = stepperOperations[threatenDirection](stepIndex);
    
                        onlyValidPlayerMoves.push(stepIndex);
    
                    }
    
                    filterFunction = (moveCoordinates) => onlyValidPlayerMoves.includes(chessboardNotationEnum[moveCoordinates]);
    
                }
            };

        };

        return (filterFunction) 
            ? {...playerPiece, moveset: playerPiece.moveset.filter(filterFunction)} 
            : {...playerPiece};

    })
};

module.exports = {intoCheckValidation};