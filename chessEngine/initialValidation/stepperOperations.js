const stepperOperations = {
    vertical: (val, direction) => (direction === 'up') ? val + 8 : val - 8,
    horizontal: (val, direction) => (direction === 'right') ? val + 1 : val - 1,
    diagLeftRight: (val, direction) => (direction === 'up-right') ? val + 9 : val - 9,
    diagRightLeft: (val, direction) => (direction === 'up-left') ? val + 7 : val - 7
};

module.exports = {stepperOperations};