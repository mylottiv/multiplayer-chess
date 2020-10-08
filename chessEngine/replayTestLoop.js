const {newBoard} = require('./newGame/newBoard');
const {replayLoop} = require('./replayLoop');
const {dummyMoves} = require('./dummyInputs');


function testLoop() {
    
    Object.entries(dummyMoves).forEach(([key, dummyArray]) => {
        
        // Test stores, will eventually be actual database entries once done to scale
        const startingBoard = newBoard();
        const chessBoardStateStore = [{StartingBoard: newBoard()}];
        const capturedPieces = {White: [], Black: []};
        
        console.log('Now Testing', key);
        
        dummyArray.forEach(replayLoop(chessBoardStateStore, capturedPieces, startingBoard));
        console.log(chessBoardStateStore[chessBoardStateStore.length - 1].BlackTurn);
    });
};

testLoop();