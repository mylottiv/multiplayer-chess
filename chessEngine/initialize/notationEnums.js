const startingPieceEnum = {
    K: 'King',
    Q: 'Queen',
    R: 'Rook',
    N: 'Knight',
    B: 'Bishop',
};

const fileCharSet = ['a','b','c','d','e','f','g','h'];

const rankCharSet = ['1','2','3','4','5','6','7','8'];

const rankRangeEnum = {
    1: [0, 7],
    2: [8, 15],
    3: [16, 23],
    4: [24, 31],
    5: [32, 39],
    6: [40, 47],
    7: [48, 55],
    8: [56, 63],
};

const fileRangeEnum = {
    a: [0, 56],
    b: [1, 57],
    c: [2, 58],
    d: [3, 59],
    e: [4, 60],
    f: [5, 61],
    g: [6, 62],
    h: [7, 63]
}

module.exports = {startingPieceEnum, fileCharSet, rankCharSet, fileRangeEnum, rankRangeEnum}