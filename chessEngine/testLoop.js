const {newBoard} = require('./constants/defaultBoardState');
const {mainLoop} = require('./mainLoop');
const {dummyMoves} = require('./dummyInputs');


function testLoop(startingColorTurn = 'WhiteTurn') {
    
    Object.entries(dummyMoves).forEach(([key, dummyArray]) => {
        
        // Test stores, will eventually be actual database entries once done to scale
        const startingBoard = newBoard();
        const chessBoardStateStore = [{StartingBoard: newBoard()}];
        const capturedPieces = {White: [], Black: []};
        
        console.log('Now Testing', key);
        
        dummyArray.forEach(mainLoop(chessBoardStateStore, capturedPieces, startingBoard));
        console.log(chessBoardStateStore[chessBoardStateStore.length - 1].BlackTurn);
    });
};

testLoop();