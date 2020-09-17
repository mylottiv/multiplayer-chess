const {chessboardNotationEnum} = require('./chessboardEnums');

const chessboardEdges = {
    left: [
        (() => chessboardNotationEnum['a1'])(),
        (() => chessboardNotationEnum['a2'])(),
        (() => chessboardNotationEnum['a3'])(),
        (() => chessboardNotationEnum['a4'])(),
        (() => chessboardNotationEnum['a5'])(),
        (() => chessboardNotationEnum['a6'])(),
        (() => chessboardNotationEnum['a7'])(),
        (() => chessboardNotationEnum['a8'])(),
    ],
    right: [
        (() => chessboardNotationEnum['h1'])(),
        (() => chessboardNotationEnum['h2'])(),
        (() => chessboardNotationEnum['h3'])(),
        (() => chessboardNotationEnum['h4'])(),
        (() => chessboardNotationEnum['h5'])(),
        (() => chessboardNotationEnum['h6'])(),
        (() => chessboardNotationEnum['h7'])(),
        (() => chessboardNotationEnum['h8'])(),
    ],
    top: [
        (() => chessboardNotationEnum['a8'])(),
        (() => chessboardNotationEnum['b8'])(),
        (() => chessboardNotationEnum['c8'])(),
        (() => chessboardNotationEnum['d8'])(),
        (() => chessboardNotationEnum['e8'])(),
        (() => chessboardNotationEnum['f8'])(),
        (() => chessboardNotationEnum['g8'])(),
        (() => chessboardNotationEnum['h8'])(),
    ],
    bottom: [
        (() => chessboardNotationEnum['a1'])(),
        (() => chessboardNotationEnum['b1'])(),
        (() => chessboardNotationEnum['c1'])(),
        (() => chessboardNotationEnum['d1'])(),
        (() => chessboardNotationEnum['e1'])(),
        (() => chessboardNotationEnum['f1'])(),
        (() => chessboardNotationEnum['g1'])(),
        (() => chessboardNotationEnum['h1'])(),
    ],
}

module.exports = {chessboardEdges};