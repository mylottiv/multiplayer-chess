const { chessboardArrayEnum } = require("../../constants/chessboardEnums");

function castlingPathTest(chessboard, opponentMoves,  bottomIndexes, boardSide) {
    const rookIndex = (boardSide === 'Queen') ? bottomIndexes[0] : bottomIndexes[2];
    const kingIndex = bottomIndexes[1];
    const kingTargetIndex = (boardSide === 'Queen') ? kingIndex - 2 : kingIndex + 2;
    const stepIndexOperation = (val) => (boardSide === 'Queen') ? () => val + 1 : () => val - 1
    
    let noBlockingPieces = true;
    let noPotentialCheck = true;
    for (let stepIndex = stepIndexOperation(rookIndex)(); stepIndex !== kingIndex; stepIndex = stepIndexOperation(stepIndex)()) {
        noBlockingPieces = (chessboard[stepIndex].Piece === null);
        if (!noBlockingPieces) break;
        noPotentialCheck = (Math.abs(stepIndex - kingIndex) >= Math.abs(stepIndex - kingTargetIndex))
            && !opponentMoves.some(({moveset}) => moveset.includes(chessboardArrayEnum[stepIndex]));
        if (!noPotentialCheck) break;
    }
    return (noBlockingPieces && noPotentialCheck);
};

function castlingValidation(chessboard, playerColor, validPlayerMoves, validOpponentMoves) {
    
    const bottomRankIndexes = (playerColor === 'White') ? [0, 4, 7] : [56, 60, 63];
    const kingStartIndex = bottomRankIndexes[1];
    const kingStartCoordinates = chessboardArrayEnum[kingStartIndex];

    const castlingPieces = bottomRankIndexes.map((boardIndex, arrIndex) => {
        const piece = chessboard[boardIndex].Piece;
        const testType = (arrIndex === 1) ? 'King' : 'Rook';
        return (piece === null) 
            ? null 
            : (piece.type === testType && piece.canCastle) 
                ? piece 
                : null;
    });
    
    const queenSideRookTest = castlingPieces[0];
    const kingTest = castlingPieces[1];
    const kingSideRookTest = castlingPieces[2];
    
    const queenSideCastleValid = (kingTest && queenSideRookTest) 
        && castlingPathTest(chessboard, validOpponentMoves, bottomRankIndexes, 'Queen');
    const kingSideCastleValid = (kingTest && kingSideRookTest)
        && castlingPathTest(chessboard, validOpponentMoves, bottomRankIndexes, 'King');
    
    const castlingValidPlayerMoves = validPlayerMoves.map(playerPiece => {
        if (playerPiece.type === 'King' && (playerPiece.coordinates === kingStartCoordinates)) {
            const newMoveset = [...playerPiece.moveset];
            if (queenSideCastleValid) newMoveset.push(chessboardArrayEnum[kingStartIndex - 2]);
            if (kingSideCastleValid) newMoveset.push(chessboardArrayEnum[kingStartIndex + 2]);
            return {...playerPiece, moveset: newMoveset};
        }
        else return playerPiece;
    });

    return castlingValidPlayerMoves;
}

module.exports = {castlingValidation};