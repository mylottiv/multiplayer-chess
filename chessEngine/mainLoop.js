const {newBoard} = require('./constants/defaultBoardState');
const {validateMoves} = require('./validateMoves');
const {notationValidator} = require('./notationHandling/notationValidator');
const {validateParsedMove} = require('./movement/validateParsedMove');
const {dummyMoves} = require('./dummyInputs');

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

            const parsedWhiteNotation = notationValidator(whiteMove, 'White');
            console.log('White Move Turn:', turnCounter, whiteMove, parsedWhiteNotation);
            // if (key === 'dummyInputTwo' && turnCounter === 6) console.log('DEBUG', validatedMoves.White);
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
    });
};

mainLoop();