function movePiece(chessboard, startingIndex, targetIndex) {
    console.log('movePiece', startingIndex, targetIndex);
    const tempStartingState = chessboard[startingIndex].Piece;
    const tempTargetState = chessboard[targetIndex].Piece;
    chessboard[startingIndex].Piece = null;
    chessboard[targetIndex].Piece = tempStartingState;
    return tempTargetState;
}

module.exports = {movePiece};