function movePiece(chessboard, startingIndex, targetIndex) {
    console.log('movePiece', startingIndex, targetIndex);
    const tempStartingState = chessboard[startingIndex].Piece;
    const tempTargetState = chessboard[targetIndex].Piece;
    chessboard[startingIndex].Piece = null;
    chessboard[targetIndex].Piece = tempStartingState;
    // Castling test
    if ((tempStartingState.type === 'King') && (Math.abs(targetIndex - startingIndex) === 2)) {
        const rookStartIndex = (targetIndex === 58) ? 56 : (targetIndex === 62) ? 63 : (targetIndex === 6) ? 7 : 0;
        const rookTargetIndex = (rookStartIndex === 56) ? 59 : (rookStartIndex === 63) ? 61 : (rookStartIndex === 0) ? 3 : 5
        movePiece(chessboard, rookStartIndex, rookTargetIndex);
    }
    return tempTargetState;
};

module.exports = {movePiece};