function movePiece(chessboard, startingIndex, targetIndex) {
    // console.log('movePiece', startingIndex, targetIndex);
    const tempStartingState = chessboard[startingIndex].Piece;
    let tempTargetState = chessboard[targetIndex].Piece;
    chessboard[startingIndex].Piece = null;
    chessboard[targetIndex].Piece = tempStartingState;

    // Castling flag test
    if (tempStartingState.type === 'King' || tempStartingState.type === 'Rook') {
        chessboard[targetIndex].Piece.canCastle = false;
    }

    // Castling move test
    if ((tempStartingState.type === 'King') && (Math.abs(targetIndex - startingIndex) === 2)) {
        const rookStartIndex = (targetIndex === 58) ? 56 : (targetIndex === 62) ? 63 : (targetIndex === 6) ? 7 : 0;
        const rookTargetIndex = (rookStartIndex === 56) ? 59 : (rookStartIndex === 63) ? 61 : (rookStartIndex === 0) ? 3 : 5
        movePiece(chessboard, rookStartIndex, rookTargetIndex);
    }

    // En Passant flag test
    if ((tempStartingState.type === 'Pawn') && (Math.abs(targetIndex - startingIndex) === 16)) {
        const enPassantRank = (tempStartingState.color === 'White') ? [24, 31] : [32, 39];
        const leftPiece = (targetIndex !== enPassantRank[0]) ? chessboard[targetIndex - 1].Piece : null; 
        const rightPiece = (targetIndex !== enPassantRank[1]) ? chessboard[targetIndex + 1].Piece : null;
        const leftPieceCheck = (leftPiece && leftPiece.type === 'Pawn' && leftPiece.color !== tempStartingState.color);
        const rightPieceCheck = (rightPiece && rightPiece.type === 'Pawn' && rightPiece.color !== tempStartingState.color);
        chessboard[targetIndex].Piece.enPassant = (leftPieceCheck || rightPieceCheck);
    }
    
    // En Passant capture test
    if ((tempStartingState.type === 'Pawn') && ([7, 9].includes(Math.abs(targetIndex - startingIndex))) && (!tempTargetState)) {
        const capturedEnPassantPawnIndex = (tempStartingState.color === 'White') ? targetIndex - 8 : targetIndex + 8;
        tempTargetState = chessboard[capturedEnPassantPawnIndex];
        chessboard[capturedEnPassantPawnIndex].Piece = null;
    }
    return tempTargetState;
};

module.exports = {movePiece};