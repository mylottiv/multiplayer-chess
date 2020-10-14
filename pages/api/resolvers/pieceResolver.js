function pieceResolver(testState, testTurn, inputFromParent) {

    function functionCore(index) {
        const {Piece} = testState[testTurn.count][testTurn.color+'Turn'][index];
        if (Piece === null) return Piece
        const enPassant = ('enPassant' in Piece) ? Piece.enPassant : null;
        const canCastle = ('canCastle' in Piece) ? Piece.canCastle : null;
        return {type: Piece.type, color: Piece.color, enPassant, canCastle};
    }

    return (inputFromParent) 
        ? ({index}) => functionCore(index)
        : (parent, {index}) => functionCore(index);
};

module.exports = {pieceResolver}