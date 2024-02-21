const {calc} = require('./src/calc')

const testCases = [
    ['2+45', 45],
    ['=', 47],
    ['*3=', 141],
    ['-8+12=', 145],
    ['c', 0],
]

describe('calc function', () => {
    test.each(testCases)('given %p as input, returns %p', (inputLine, expected) => {
        expect(calc(inputLine)).toBe(expected);
    });
});
