const {newBoard} = require('./constants/defaultBoardState');
const {validateMoves} = require('./validateMoves');
const {notationValidator} = require('./notationHandling/notationValidator');
const {validateParsedMove} = require('./movement/validateParsedMove');
const {dummyMoves} = require('./dummyInputs');
const { chessboardNotationEnum } = require('./constants/chessboardEnums');

function enPassantClear(chessboard, validatedMoves) {
    const playerPawns = validatedMoves.filter(({type}) => type === 'Pawn').map(({coordinates}) => coordinates);
    console.log('player pawn coordinates', playerPawns);
    playerPawns.forEach(coordinates => chessboard[chessboardNotationEnum[coordinates]].Piece.enPassant = false);
}

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
    
    Object.entries(dummyMoves).forEach(([key, dummyArray]) => {
        
        // Test stores, will eventually be actual database entries once done to scale
        const chessBoardStateStore = [{StartingBoard: newBoard()}];
        const capturedPieces = {White: [], Black: []};
        
        const currentBoardState = newBoard();
        
        let validatedMoves, turnCounter;

        console.log('Now Testing', key);
        
        dummyArray.forEach(([whiteMove, blackMove], turnIndex) => {

            turnCounter = turnIndex + 1;

            chessBoardStateStore.push({WhiteTurn: [], BlackTurn: []});

            validatedMoves = getValidatedMoves(currentBoardState);

            if (typeof validatedMoves === 'string') console.log(validatedMoves);

            else if (turnCounter >= 3) enPassantClear(currentBoardState, validatedMoves.White);

            const parsedWhiteNotation = notationValidator(whiteMove, 'White');
            console.log('White Move Turn:', turnCounter, whiteMove, parsedWhiteNotation);
            const capturedByWhite = (parsedWhiteNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.White, parsedWhiteNotation);
            if (capturedByWhite) capturedPieces.White.push(capturedByWhite);
            chessBoardStateStore[turnCounter].WhiteTurn = currentBoardState.map(square => {return {...square}});

            validatedMoves = getValidatedMoves(currentBoardState);

            if (typeof validatedMoves === 'string') console.log(validatedMoves);

            else if (turnCounter >= 3) enPassantClear(currentBoardState, validatedMoves.Black);

            const parsedBlackNotation = notationValidator(blackMove, 'Black'); 
            console.log('Black Move Turn:', turnCounter, blackMove, parsedBlackNotation);
            const capturedByBlack = (parsedBlackNotation !== 'Invalid Notation') && validateParsedMove(currentBoardState, validatedMoves.Black, parsedBlackNotation);
            if (capturedByBlack) capturedPieces.Black.push(capturedByBlack);
            chessBoardStateStore[turnCounter].BlackTurn = currentBoardState.map(square => {return {...square}});
        
        });
        console.log(chessBoardStateStore[turnCounter].BlackTurn);
    });
};

mainLoop();