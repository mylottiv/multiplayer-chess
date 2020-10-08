const {chessboardArrayEnum} = require('../../../constants/chessboardEnums');
const {possibleMovesetGenerators} = require('./movesetGenerators');

const allPossibleMoves = {
    WhitePawn: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: possibleMovesetGenerators['Pawn'](index, 'White')}}),
    BlackPawn: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: possibleMovesetGenerators['Pawn'](index, 'Black')}}),
    Rook: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: possibleMovesetGenerators['Rook'](index)}}),
    Knight: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: possibleMovesetGenerators['Knight'](index)}}),
    Bishop: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: possibleMovesetGenerators['Bishop'](index)}}),
    Queen: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: possibleMovesetGenerators['Queen'](index)}}),
    King: chessboardArrayEnum.map((entry, index) => {return {numericalIndex: index, possibleMoveset: possibleMovesetGenerators['King'](index)}})
}

module.exports = {allPossibleMoves}