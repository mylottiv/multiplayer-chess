const {newBoard} = require('./initialize/defaultBoardState');
const {validateMoves} = require('./validateMoves');
const {notationValidator} = require('./notationHandling/notationValidator');
const {validateParsedMove} = require('./movement/validateParsedMove');

const dummyInputMoves =  [
    ['e4', 'e5'],
    ['Nf3', 'Nc6'],
    ['Bc4', 'Bc5'],
    ['b4', 'Bxb4'],
    ['c3', 'Bc5'],
    ['O-O', 'd6'],
    ['d4', 'exd4'],
    ['cxd4', 'Bb6'],
    ['Nc3', 'Na5'],
    ['Bd3', 'Ne7'],
    ['e5', 'dxe5'],
    ['dxe5', 'O-O'],
    ['Qc2', 'h6'],
    ['Ba3', 'c5'],
    ['Rad1', 'Bd7'],
    ['e6', 'fxe6'],
    ['Bh7', 'Kh8'],
    ['Ne5', 'Nd5'],
    ['Nxd5', 'exd5'],
    ['Rxd5', 'Bf5'],
    ['Rxd8', 'Bxc2'],
    ['Rxf8', 'Rxf8'],
    ['Bxc2', null]
]

// Test stores, will eventually be actual database entries once done to scale
const chessBoardStateStore = [{StartingBoard: newBoard()}];
const capturedPieces = {White: [], Black: []};

function getValidatedMoves(chessboard) {
    return {
        White: validateMoves(chessboard, 'White'),
        Black: validateMoves(chessboard, 'Black')
    };
}

function mainLoop(startingColorTurn = 'WhiteTurn') {

    let currentBoardState = chessBoardStateStore[0].StartingBoard;

    dummyInputMoves.forEach(([whiteMove, blackMove], turnCounter) => {

        chessBoardStateStore.push({WhiteTurn: [], BlackTurn: []});

        let validatedMoves = getValidatedMoves(currentBoardState);

        const parsedWhiteNotation = notationValidator(whiteMove, 'White');
        console.log('White Move Turn:', turnCounter + 1, whiteMove, parsedWhiteNotation);
        const capturedByWhite = (parsedWhiteNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.White, parsedWhiteNotation);
        if (capturedByWhite) capturedPieces.White.push(capturedByWhite);
        chessBoardStateStore[turnCounter].WhiteTurn = currentBoardState.map(square => {return {...square}});

        validatedMoves = getValidatedMoves(currentBoardState);

        const parsedBlackNotation = notationValidator(blackMove, 'Black'); 
        console.log('Black Move Turn:', turnCounter + 1, blackMove, parsedBlackNotation);
        const capturedByBlack = (parsedBlackNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.Black, parsedBlackNotation);
        if (capturedByBlack) capturedPieces.Black.push(capturedByBlack);
        chessBoardStateStore[turnCounter].BlackTurn = currentBoardState.map(square => {return {...square}});
    });

    console.log(chessBoardStateStore[22].WhiteTurn);
};

mainLoop();