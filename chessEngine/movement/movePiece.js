function movePiece(chessboard, startingIndex, targetIndex, promotionPiece) {
    // console.log('movePiece', startingIndex, targetIndex);
    const startingPiece = chessboard[startingIndex].Piece;
    let capturedPiece = chessboard[targetIndex].Piece;
    chessboard[startingIndex].Piece = null;
    chessboard[targetIndex].Piece = startingPiece;

    // Castling flag test
    if (startingPiece.type === 'King' || startingPiece.type === 'Rook') {
        chessboard[targetIndex].Piece.canCastle = false;
    }

    // Castling move test
    if ((startingPiece.type === 'King') && (Math.abs(targetIndex - startingIndex) === 2)) {
        const rookStartIndex = (targetIndex === 58) ? 56 : (targetIndex === 62) ? 63 : (targetIndex === 6) ? 7 : 0;
        const rookTargetIndex = (rookStartIndex === 56) ? 59 : (rookStartIndex === 63) ? 61 : (rookStartIndex === 0) ? 3 : 5
        movePiece(chessboard, rookStartIndex, rookTargetIndex);
    }

    // En Passant flag test
    if ((startingPiece.type === 'Pawn') && (Math.abs(targetIndex - startingIndex) === 16)) {
        const enPassantRank = (startingPiece.color === 'White') ? [24, 31] : [32, 39];
        const leftPiece = (targetIndex !== enPassantRank[0]) ? chessboard[targetIndex - 1].Piece : null; 
        const rightPiece = (targetIndex !== enPassantRank[1]) ? chessboard[targetIndex + 1].Piece : null;
        const leftPieceCheck = (leftPiece && leftPiece.type === 'Pawn' && leftPiece.color !== startingPiece.color);
        const rightPieceCheck = (rightPiece && rightPiece.type === 'Pawn' && rightPiece.color !== startingPiece.color);
        chessboard[targetIndex].Piece.enPassant = (leftPieceCheck || rightPieceCheck);
    }
    
    // En Passant capture test
    if ((startingPiece.type === 'Pawn') && ([7, 9].includes(Math.abs(targetIndex - startingIndex))) && (!capturedPiece)) {
        const capturedEnPassantPawnIndex = (startingPiece.color === 'White') ? targetIndex - 8 : targetIndex + 8;
        capturedPiece = chessboard[capturedEnPassantPawnIndex];
        chessboard[capturedEnPassantPawnIndex].Piece = null;
    }

    // Pawn Promotion test
    if (startingPiece.type === 'Pawn' && promotionPiece !== null) {
        const pawnColor = startingPiece.color;
        chessboard[targetIndex].Piece = {Type: promotionPiece, color: pawnColor};
        if (promotionPiece === 'Rook') chessboard[targetIndex].Piece.canCastle = false;
    }

    return capturedPiece;
};

module.exports = {movePiece};