const {newBoard} = require('./newGame/newBoard');
const {replayLoop} = require('./replayLoop');
const {dummyMoves} = require('./dummyInputs');
const {newGame} = require('./newGame');


function testLoop() {
    
    Object.entries(dummyMoves).forEach(([key, dummyArray]) => {
        
        // Test stores, will eventually be actual database entries once done to scale
        const {currentChessBoard, boardStateStore, capturedPieces} = newGame();
        
        console.log('Now Testing', key);
        
        dummyArray.forEach(replayLoop(boardStateStore, capturedPieces, currentChessBoard));
        console.log(boardStateStore[boardStateStore.length - 1].BlackTurn);
    });
};

testLoop();