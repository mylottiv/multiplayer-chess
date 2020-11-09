const {replayLoop} = require('./replayLoop');
const {dummyMoves} = require('./dummyInputs');
const {newGame} = require('./newGame');


function testLoop() {
    
    Object.entries(dummyMoves).forEach(([key, dummyArray]) => {
        
        // Test stores, will eventually be actual database entries once done to scale
        const newChessGame = newGame();
        
        console.log('Now Testing', key);
        
        dummyArray.forEach(replayLoop(newChessGame));
        console.log(newChessGame.boardStateStore[newChessGame.gameState.turnCounter].Black);
        console.log('turn', newChessGame.gameState.turnCounter);
    });
};

testLoop();