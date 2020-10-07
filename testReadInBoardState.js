const fs = require('fs');

function readInBoardState(path) {

    const rawData = fs.readFileSync(path, 'utf8',);

    const output = JSON.parse(rawData);

    return output;
}

module.exports = {readInBoardState};
