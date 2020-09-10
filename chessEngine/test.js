const {chessboardNotationEnum} = require('./initialize/chessboardEnums');
const {getValidMoveset} = require('./validate/getValidMoveset');

console.log('e5 black', getValidMoveset('Pawn', chessboardNotationEnum.e5, 'Black'));
console.log('e5 white', getValidMoveset('Pawn', chessboardNotationEnum.e5, 'White'));
console.log('e5 white rook', getValidMoveset('Rook', chessboardNotationEnum.e5, 'White'));
console.log('e5 black rook', getValidMoveset('Rook', chessboardNotationEnum.e5, 'Black'));
console.log('b1 white knight', getValidMoveset('Knight', chessboardNotationEnum.b1, 'White'));
console.log('b1 black knight', getValidMoveset('Knight', chessboardNotationEnum.b1, 'Black'));
console.log('c1 white bishop', getValidMoveset('Bishop', chessboardNotationEnum.c1, 'White'));
console.log('c1 black bishop', getValidMoveset('Bishop', chessboardNotationEnum.c1, 'Black'));
console.log('e5 white bishop', getValidMoveset('Bishop', chessboardNotationEnum.e5, 'White'));
console.log('e5 black bishop', getValidMoveset('Bishop', chessboardNotationEnum.e5, 'Black'));
console.log('d1 white queen', getValidMoveset('Queen', chessboardNotationEnum.d1, 'White'));
console.log('d1 black queen', getValidMoveset('Queen', chessboardNotationEnum.d1, 'Black'));
console.log('e1 white king', getValidMoveset('King', chessboardNotationEnum.e1, 'White'));
console.log('e1 black king', getValidMoveset('King', chessboardNotationEnum.e1, 'Black'));