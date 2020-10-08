function checkMateTest(validatedPlayerMoves) {
    return validatedPlayerMoves.every(({moveset}) => moveset.length === 0);
};

module.exports = {checkMateTest};