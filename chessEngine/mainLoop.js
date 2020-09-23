const {newBoard} = require('./constants/defaultBoardState');
const {validateMoves} = require('./validateMoves');
const {notationValidator} = require('./notationHandling/notationValidator');
const {validateParsedMove} = require('./movement/validateParsedMove');

const dummyInputMovesOne =  [
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

const dummyInputMovesTwo = [
    ['e4', 'e5'],
    ['Nf3', 'Nc6'],
    ['Bc4', 'Bc5'],
    ['b4', 'Bxb4'],
    ['c3', 'Bc5'],
    ['O-O', 'd6'],
    ['d4', 'exd4'],
    ['cxd4', 'Bb6'],
    ['Bb2', 'Nf6'],
    ['d5', 'Na5'],
    ['Bd3', 'O-O'],
    ['Nc3', 'Bg4'],
    ['Ne2', 'Bxf3'],
    ['gxf3', 'c5'],
    ['Qd2', 'c4'],
    ['Bc2', 'Rc8'],
    ['Bc3', 'Rc5'],
    ['Kh1', 'Ne8'],
    ['Rg1', 'f6'],
    ['Nf4', 'Nc7'],
    ['Nh5', 'Rf7'],
    ['Qh6', 'Qf8'],
    ['Ba4', 'Kh8'],
    ['Bxf6', null]
]

const checkmateDummyMoves = [
    ['e4', 'c5'],
    ['Nf3', 'Nc6'],
    ['Bb5', 'g6'],
    ['Bxc6', 'dxc6'],
    ['d3', 'Bg7'],
    ['h3', 'Nf6'],
    ['Nc3', 'O-O'],
    ['Be3', 'b6'],
    ['Qd2', 'e5'],
    ['Bh6', 'Qd6'],
    ['O-O-O', 'a5'],
    ['g4', 'a4'],
    ['Kb1', 'Be6'],
    ['Ne2', 'b5'],
    ['Ng3', 'Rfd8'],
    ['Bxg7', 'Kxg7'],
    ['Qg5', 'Nd7'],
    ['Nf5', 'Bxf5'],
    ['gxf5', 'a3'],
    ['b3', 'h6'],
    ['Qg3', 'Kh7'],
    ['Rhg1', 'Qf6'],
    ['h4', 'gxf5'],
    ['Qh3', 'f4'],
    ['Rg5', 'Qe6'],
    ['Rf5', 'Rg8'],
    ['Ng5', 'hxg5'],
    ['Rxf7', 'Qxf7'],
    ['hxg5', 'Kg7'],
    [ 'Qh6', null] 
];

const extraDummyMoves = [
    ['e4', 'e6'],
    ['d4', 'd5'],
    ['e5', 'c5'],
    ['c3', 'cxd4'],
    ['cxd4', 'Bb4'],
    ['Nc3', 'Nc6'],
    ['Nf3', 'Nge7'],
    ['Bd3', 'O-O'],
    ['Bxh7', 'Kxh7'],
    ['Ng5', 'Kg6'],
    ['h4', 'Nxd4'],
    ['Qg4', 'f5'],
    ['h5', 'Kh6'],
    ['Nxe6', 'g5'],
    ['hxg6', null]
];

const enPassantDummyMoves = [
    ['e4', 'e6'], 
    ['e5', 'd5'], 
    ['exd6', 'Bxd6'], 
    ['d4', 'Ne7'], 
    ['Bd3', 'Ng6'], 
    ['Nf3', 'Nc6'],
    ['Nc3', 'Nb4'], 
    ['Bc4', 'c6'], 
    ['Ne4', 'Bc7'], 
    ['O-O', 'O-O'], 
    ['Re1', 'Nd5'],
    ['Nc5', 'Nh4'], 
    ['Ne5', 'Nf5'], 
    ['c3', 'Bxe5'], 
    ['Rxe5', 'Nf6'], 
    ['Re1', 'h6'],
    ['Qf3', 'Nd5'], 
    ['Bb3', 'b6'], 
    ['Nd3', 'Ba6'], 
    ['Ne5', 'Rc8'], 
    ['Bc2', 'Nfe7'],
    ['Qg3', 'Kh8'], 
    ['Qh4', 'Kg8'], 
    ['Qg3', 'Kh8'], 
    ['Qh3', 'Ng8'], 
    ['Qh5', 'Rc7'],
    ['Bd2', 'Ndf6'], 
    ['Qh3', 'Nd5'], 
    ['c4', 'Ndf6'], 
    ['Rad1', 'Qe8'], 
    ['Bf4', 'Rc8'],
    ['Qa3', 'Bb7'], 
    ['Qxa7', 'Ba8'], 
    ['Qxb6', 'g5'], 
    ['Bg3', 'Nd7'], 
    ['Qb3', 'f5'],
    ['f3', 'Kg7'], 
    ['c5', 'Ndf6'], 
    ['Nc4', null]
]

// Test stores, will eventually be actual database entries once done to scale
const chessBoardStateStore = [{StartingBoard: newBoard()}];
const capturedPieces = {White: [], Black: []};

function getValidatedMoves(chessboard) {
    const returnedValidatedMvoves = {
        White: validateMoves(chessboard, 'White'),
        Black: validateMoves(chessboard, 'Black')
    }

    return (returnedValidatedMvoves.White === 'Checkmate') 
        ? 'White is in Checkmate!' 
        : (returnedValidatedMvoves.Black === 'Checkmate') 
            ? 'Black is in Checkmate!'
            : returnedValidatedMvoves;
}

function mainLoop(startingColorTurn = 'WhiteTurn') {

    let currentBoardState = chessBoardStateStore[0].StartingBoard;
    
    let validatedMoves, turnCounter;

    enPassantDummyMoves.forEach(([whiteMove, blackMove], turnIndex) => {

        turnCounter = turnIndex + 1;

        chessBoardStateStore.push({WhiteTurn: [], BlackTurn: []});

        validatedMoves = getValidatedMoves(currentBoardState);

        if (typeof validatedMoves === 'string') console.log(validatedMoves);

        const parsedWhiteNotation = notationValidator(whiteMove, 'White');
        console.log('White Move Turn:', turnCounter, whiteMove, parsedWhiteNotation);
        const capturedByWhite = (parsedWhiteNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.White, parsedWhiteNotation);
        if (capturedByWhite) capturedPieces.White.push(capturedByWhite);
        chessBoardStateStore[turnCounter].WhiteTurn = currentBoardState.map(square => {return {...square}});

        validatedMoves = getValidatedMoves(currentBoardState);

        if (typeof validatedMoves === 'string') console.log(validatedMoves);

        const parsedBlackNotation = notationValidator(blackMove, 'Black'); 
        console.log('Black Move Turn:', turnCounter, blackMove, parsedBlackNotation);
        const capturedByBlack = (parsedBlackNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.Black, parsedBlackNotation);
        if (capturedByBlack) capturedPieces.Black.push(capturedByBlack);
        chessBoardStateStore[turnCounter].BlackTurn = currentBoardState.map(square => {return {...square}});
    });

    console.log(chessBoardStateStore[turnCounter].BlackTurn);
};

mainLoop();