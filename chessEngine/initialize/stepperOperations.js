const stepperOperations = {
    left: (val) => val - 1,
    right: (val) => val + 1,
    up: (val) => val + 8,
    down: (val) => val - 8,
    'up-left':  (val) => val + 7,
    'down-left': (val) => val - 9,
    'up-right': (val) => val + 9,
    'down-right': (val) => val - 7
};

module.exports = {stepperOperations};