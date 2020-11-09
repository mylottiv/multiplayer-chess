import {readInBoardState} from '../../../testReadInBoardState';
import {newGame} from '../../../chessEngine/newGame';
import {newMove} from '../../../chessEngine/newMove';

const newGameTest = newGame();

const dummyTestState = readInBoardState('./localDummyData/dummyCheckmateOutputs.txt');

const resolvers = {
    Query: {
        // piece: pieceResolver(testState, testTurn, false),
        // pieces() {
        //     return testState[testTurn.count][testTurn.color+'Turn'].filter(({Piece}) => Piece !== null).map(({Piece}) => {
        //         const enPassant = (Piece.enPassant) ? Piece.enPassant : null;
        //         const canCastle = (Piece.canCastle) ? Piece.canCastle : null;
        //         return {type: Piece.type, color: Piece.color, enPassant, canCastle};
        //     });
        // },
        // square(_, {index}) {
        //     return {index};
        // },
        // squares() {
        //     return testState[testTurn.count][testTurn.color+'Turn'].map(({Piece}, index) => {return {index}});
        // },
        // specificBoard(_, {turn}) {
        //     return {currentTurn: turn};
        // },
        // currentBoard() {
        //     return {currentTurn: testTurn}
        // }
        gameState() {
            return newGameTest;
        },        
        currentTurnInfo() {
            return newGameTest.gameState;
        },
        currentBoard() {
            return newGameTest.currentBoardState;
        },
        boardStateStore() {
            return newGameTest.boardStateStore;
        },
        specificBoard(_, {turn}) {
            const startingBoardRef = (turn.count === 0)
            return (startingBoardRef) ? newGameTest.boardStateStore[0].StartingBoard : newGameTest.boardStateStore[turn.count][turn.color];
        }
    },
    GameState: {
        currentTurnInfo({gameState}) {
            return gameState
        },
        currentBoard({currentBoardState}) {
            return currentBoardState
        },
        // boardStateStore({boardStateStore}) {
        //     return boardStateStore
        // }
    },
    CurrentTurnInfo: {
        currentTurn({turnCounter, currentColor}) {
            return {count: turnCounter, color: currentColor}
        },
        // validMoves({validMoves}) {
        //     return validMoves
        // }
    },
    BoardStateStore: {
        startingBoard(parent) {
            return parent[0].StartingBoard
        },
        store(parent) {
            const storedBoards = parent.slice(1);
            return storedBoards.map((index, board) => {return {turnNumber: index, storedBoard: board}})
        }
    },
    AllValidMoves: {
        white({White}) {
            return White
        },
        black({Black}) {
            return Black
        }
    },
    PlayerValidMoves: {
        pieceMovesets(parent) {
            return parent
        }
    },
    Square: {
        // piece: pieceResolver(testState, testTurn, true),
        piece({piece}) {
            const {Piece} = piece;
            if (Piece === null) return Piece
            const enPassant = ('enPassant' in Piece) ? Piece.enPassant : null;
            const canCastle = ('canCastle' in Piece) ? Piece.canCastle : null;
            return {type: Piece.type, color: Piece.color, enPassant, canCastle};
        }
    },
    Board: {
        squares(board) {
            // return testState[currentTurn.count][currentTurn.color+'Turn'].map(({Piece}, index) => {return {currentTurn, index}});
            return board.map((piece, index) => {return {index, piece}})
        }
    },
    Mutation: {
        playerMakesMove(_, {color, move}) {
            console.log('COLOR & MOVE', color, move)
            newMove(newGameTest, move);
            console.log('GameState', newGameTest.gameState)
            return newGameTest;
        }
    }
};

// {
//     currentBoardState: [
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: null },     { Piece: null },     { Piece: null },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }, { Piece: [Object] }, { Piece: [Object] },
//       { Piece: [Object] }
//     ],
//     boardStateStore: [ { StartingBoard: [Array] } ],
//     capturedPieces: { White: [], Black: [] },
//     gameState: { turnCounter: 1, currentColor: 'White', validMoves: {} }
//   }

//  White: [
// {
//     type: 'Rook',
//     coordinates: 'a1',
//     moveset: [Array],
//     canCapture: [Array]
//   },
// Black: [...]

// {
//     gameState {
//       currentTurnInfo {
//         currentTurn {
//           count
//           color
//         }
//         validMoves {
//           white {
//             pieceMovesets {
//               type
//               coordinates
//               moveset
//               canCapture
//             }
//           }
//           black {
//             pieceMovesets {
//               type
//               coordinates
//               moveset
//               canCapture
//             }
//           }
//         }
//       }
//       currentBoard {
//         squares {
//           index
//           piece {
//             type
//             color
//             enPassant
//             canCastle
//           }
//         }
//       }
//       boardStateStore {
//         startingBoard {
//           squares {
//             index
//             piece {
//               type
//               color
//               enPassant
//               canCastle
//             }
//             }
//         }
//         store {
//           turnNumber
//           board {
//             squares {
//               index
//               piece {
//                 type
//                 color
//                 enPassant
//                 canCastle
//               }
//             }
//           }
//         }
//       }
//     }
//   }

module.exports = {resolvers};