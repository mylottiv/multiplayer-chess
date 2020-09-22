const chessboardDefaultState = [
    // Rank 1
    {Piece: {type: 'Rook', color: 'White', canCastle: true}},
    {Piece: {type: 'Knight', color: 'White'}},
    {Piece: {type: 'Bishop', color: 'White'}},
    {Piece: {type: 'Queen', color: 'White'}},
    {Piece: {type: 'King', color: 'White', canCastle: true}},
    {Piece: {type: 'Bishop', color: 'White'}},
    {Piece: {type: 'Knight', color: 'White'}},
    {Piece: {type: 'Rook', color: 'White', canCastle: true}},
    // Rank 2
    {Piece: {type: 'Pawn', color: 'White', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'White', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'White', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'White', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'White', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'White', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'White', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'White', enPassant: false}},
    // Rank 3
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    // Rank 4
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    // Rank 5
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    // Rank 6
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    {Piece: null},
    // Rank 7
    {Piece: {type: 'Pawn', color: 'Black', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'Black', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'Black', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'Black', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'Black', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'Black', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'Black', enPassant: false}},
    {Piece: {type: 'Pawn', color: 'Black', enPassant: false}},
    // Rank 8
    {Piece: {type: 'Rook', color: 'Black', canCastle: true}},
    {Piece: {type: 'Knight', color: 'Black'}},
    {Piece: {type: 'Bishop', color: 'Black'}},
    {Piece: {type: 'Queen', color: 'Black'}},
    {Piece: {type: 'King', color: 'Black', canCastle: true}},
    {Piece: {type: 'Bishop', color: 'Black'}},
    {Piece: {type: 'Knight', color: 'Black'}},
    {Piece: {type: 'Rook', color: 'Black', canCastle: true}},
];

function newBoardInitializer(inputState) {
    return () => {
        let outputState, value, key;

    if (Array.isArray(inputState) || inputState === null ) return inputState;

    outputState = [];

    for (key in inputState) {
        value = inputState[key];
        outputState[key] = newBoardInitializer(value);
    }

    return outputState;
    }
}

module.exports = {newBoard: newBoardInitializer(chessboardDefaultState)};