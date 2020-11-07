function pieceResolver(testState, testTurn, inputFromParent) {

    console.log('Piece Fired', inputFromParent)

    function functionCore(index, currentTurn = testTurn) {
        const {Piece} = testState[currentTurn.count][currentTurn.color+'Turn'][index];
        if (Piece === null) return Piece
        const enPassant = ('enPassant' in Piece) ? Piece.enPassant : null;
        const canCastle = ('canCastle' in Piece) ? Piece.canCastle : null;
        return {type: Piece.type, color: Piece.color, enPassant, canCastle};
    }

    return (inputFromParent) 
        ? (parent) => functionCore(parent.index, parent.currentTurn)
        : ({index}) => functionCore(index);
};

module.exports = {pieceResolver}