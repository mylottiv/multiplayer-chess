import {readInBoardState} from '../../../testReadInBoardState';
import {pieceResolver} from './pieceResolver';

const testState = readInBoardState('./localDummyData/dummyCheckmateOutputs.txt');

const testTurn = {count: 0, color: 'White'};

const resolvers = {
    Query: {
        piece: pieceResolver(testState, testTurn, false),
        pieces() {
            return testState[testTurn.count][testTurn.color+'Turn'].filter(({Piece}) => Piece !== null).map(({Piece}) => {
                const enPassant = (Piece.enPassant) ? Piece.enPassant : null;
                const canCastle = (Piece.canCastle) ? Piece.canCastle : null;
                return {type: Piece.type, color: Piece.color, enPassant, canCastle};
            });
        },
        square(_, {index}) {
            return {index};
        },
        squares() {
            return testState[testTurn.count][testTurn.color+'Turn'].map(({Piece}, index) => {return {index}});
        },
        specificBoard(_, {turn}) {
            return {currentTurn: turn};
        },
        currentBoard() {
            return {currentTurn: testTurn}
        }
    },
    Square: {
        piece: pieceResolver(testState, testTurn, true),
    },
    Board: {
        squares({currentTurn}) {
            return testState[currentTurn.count][currentTurn.color+'Turn'].map(({Piece}, index) => {return {currentTurn, index}});
        }
    }
};

module.exports = {resolvers};