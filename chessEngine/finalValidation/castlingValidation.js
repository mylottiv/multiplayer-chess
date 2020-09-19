const { chessboardArrayEnum } = require("../initialize/chessboardEnums");

/* 

The castling must be kingside or queenside. [x]
Neither the king nor the chosen rook has previously moved. [x]
There are no pieces between the king and the chosen rook. [x]
The king is not currently in check. [x] (if in check, run outOfCheckValidation, else run castlingValidation)
The king does not pass through a square that is attacked by an enemy piece. [x]
The king does not end up in check. (True of any legal move.) [x]

*/

function castlingValidation(chessboard, playerColor, validPlayerMoves, validOpponentMoves) {
    const bottomRankIndexes = (playerColor === 'White') ? [0, 4, 7] : [56, 60, 63];
    const queenSideRook = (chessboard[bottomRankIndexes[0]].Piece !== null && chessboard[bottomRankIndexes[0]].Piece.type === 'Rook');
    const kingStart = (chessboard[bottomRankIndexes[1]].Piece !== null && chessboard[bottomRankIndexes[1]].Piece.type === 'King');
    const kingSideRook = (chessboard[bottomRankIndexes[2]].Piece !== null && chessboard[bottomRankIndexes[2]].Piece.type === 'Rook');
    const queenSideRookCheck = (queenSideRook && chessboard[bottomRankIndexes[0]].Piece.canCastle);
    const kingCheck = (kingStart  && chessboard[bottomRankIndexes[1]].Piece.canCastle);
    const kingSideRookCheck = (kingSideRook && chessboard[bottomRankIndexes[2]].Piece.canCastle);
    let queenSideCastleValid, kingSideCastleValid;
    if (kingCheck) {
        if (queenSideRookCheck) {
            let noBlockingPieces = true;
            let noPotentialCheck = true;
            let kingTargetIndex = bottomRankIndexes[1] - 2;
            for (let stepIndex = bottomRankIndexes[0] + 1; stepIndex < bottomRankIndexes[1]; stepIndex++) {
                noBlockingPieces = (chessboard[stepIndex].Piece === null);
                if (!noBlockingPieces) break;
                if (stepIndex >= kingTargetIndex) noPotentialCheck = !validOpponentMoves.some(({moveset}) => moveset.includes(chessboardArrayEnum[stepIndex]));
                if (!noPotentialCheck) break;
            }
            queenSideCastleValid = (noBlockingPieces && noPotentialCheck);
        }
        if (kingSideRookCheck) {
            let noBlockingPieces = true;
            let noPotentialCheck = true;
            let kingTargetIndex = bottomRankIndexes[1] + 2;
            for (let stepIndex = bottomRankIndexes[2] - 1; stepIndex > bottomRankIndexes[1]; stepIndex--) {
                noBlockingPieces = (chessboard[stepIndex].Piece === null);
                if (!noBlockingPieces) break;
                if (stepIndex <= kingTargetIndex) noPotentialCheck = !validOpponentMoves.some(({moveset}) => moveset.includes(chessboardArrayEnum[stepIndex]));
                if (!noPotentialCheck) break;
            }
            kingSideCastleValid = (noBlockingPieces && noPotentialCheck);
        }
    }
    const castlingValidPlayerMoves = validPlayerMoves.map(playerPiece => {
        if (playerPiece.type === 'King' && playerPiece.coordinates === chessboardArrayEnum[bottomRankIndexes[1]]) {
            const newMoveset = playerPiece.moveset;
            if (queenSideCastleValid) newMoveset.push(chessboardArrayEnum[bottomRankIndexes[1] - 2]);
            if (kingSideCastleValid) newMoveset.push(chessboardArrayEnum[bottomRankIndexes[1] + 2]);
            return {...playerPiece, moveset: newMoveset};
        }
        else return playerPiece;
    });

    return castlingValidPlayerMoves;
}

module.exports = {castlingValidation};