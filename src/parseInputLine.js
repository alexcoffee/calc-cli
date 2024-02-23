const {isDigit} = require("./util/isDigit");

const OPERATORS = ['-', '+', '/', '*']

function parseInputLine(line) {
    const parts = []
    let startDigitPos = null

    const extractNumber = (start, end) => {
        return parseFloat(line.substring(start, end).replace('!', '-'));
    }

    for (let i = 0; i < line.length; i++) {
        const char = line[i]

        if (isDigit(char) && (startDigitPos === null)) {
            // save start of possibly multi-digit number
            startDigitPos = i;
        } else if (startDigitPos !== null && OPERATORS.includes(char)) {
            // close multi-digit substring
            parts.push(extractNumber(startDigitPos, i))
            startDigitPos = null;
        }

        if (OPERATORS.includes(char)) {
            parts.push(char)
        }
    }

    // close final digit if ongoing
    if (startDigitPos !== null) {
        parts.push(extractNumber(startDigitPos, line.length))
    }

    return parts
}

module.exports = {parseInputLine}
