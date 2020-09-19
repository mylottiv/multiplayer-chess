function checkMateTest(validatedPlayerMoves) {
    return !validatedPlayerMoves.some(({moveset}) => moveset.length > 0);
};

module.exports = {checkMateTest};