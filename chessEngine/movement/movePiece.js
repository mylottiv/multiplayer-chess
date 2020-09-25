function movePiece(chessboard, startingIndex, targetIndex, promotionPiece) {

    const startingPiece = chessboard[startingIndex].Piece;
    let capturedPiece = chessboard[targetIndex].Piece;
    chessboard[startingIndex].Piece = null;
    chessboard[targetIndex].Piece = startingPiece;

    const absoluteDifference = Math.abs(targetIndex - startingIndex);

    // Castling flag setter
    if (startingPiece.type === 'King' || startingPiece.type === 'Rook') {

        chessboard[targetIndex].Piece.canCastle = false;

    }

    // Castling move test
    if ((startingPiece.type === 'King') && (Math.abs(targetIndex - startingIndex) === 2)) {

        const rookIndexes = {
            58: [56, 59],
            62: [63, 61],
            6: [7, 5],
            2: [0, 3]
        };
        const [rookStartIndex, rookTargetIndex] = rookIndexes[`${targetIndex}`];
        movePiece(chessboard, rookStartIndex, rookTargetIndex);

    }

    // En Passant flag test
    else if ((startingPiece.type === 'Pawn') && (absoluteDifference === 16)) {

        const enPassantRankRange = (startingPiece.color === 'White') ? [24, 31] : [32, 39];

        const leftPiece = (targetIndex !== enPassantRankRange[0]) ? chessboard[targetIndex - 1].Piece : null; 
        const rightPiece = (targetIndex !== enPassantRankRange[1]) ? chessboard[targetIndex + 1].Piece : null;
        const leftPieceCheck = (leftPiece && leftPiece.type === 'Pawn' && leftPiece.color !== startingPiece.color);
        const rightPieceCheck = (rightPiece && rightPiece.type === 'Pawn' && rightPiece.color !== startingPiece.color);

        chessboard[targetIndex].Piece.enPassant = (leftPieceCheck || rightPieceCheck);

    }
    
    // En Passant capture test
    else if ((startingPiece.type === 'Pawn') && ([7, 9].includes(absoluteDifference)) && (!capturedPiece)) {

        const capturedEnPassantPawnIndex = (startingPiece.color === 'White') ? targetIndex - 8 : targetIndex + 8;
        capturedPiece = chessboard[capturedEnPassantPawnIndex];
        chessboard[capturedEnPassantPawnIndex].Piece = null;

    }

    // Pawn Promotion test
    else if (startingPiece.type === 'Pawn' && promotionPiece !== null) {

        chessboard[targetIndex].Piece = {type: promotionPiece, color: startingPiece.color};
        if (promotionPiece === 'Rook') chessboard[targetIndex].Piece.canCastle = false;

    }

    return capturedPiece;
};

module.exports = {movePiece};