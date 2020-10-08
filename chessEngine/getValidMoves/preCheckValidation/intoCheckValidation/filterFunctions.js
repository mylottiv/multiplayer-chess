const { allPossibleMoves } = require('../possibleMovesets');
const { chessboardNotationEnum } = require('../../../constants/chessboardEnums');
const {adjacencyTest} = require('../../../constants/utilFunctions');

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

module.exports = {riskyCapturesFilter};