let register = 0;
const ops = ['-', '+', '/', '*']

function isDigit(character) {
    return /^(\d|!|\.)$/g.test(character);
}

function sanitizeEvalExpression(input) {
    return input.replace(/[^0-9!.+-/*=]/g, '');    // Replace any character that is not a digit, !, ., or = with an empty string
}

function parseInputLine(line) {
    let parts = []
    let startDigitPos = null

    function extractNumber(start, end) {
        return parseFloat(line.substring(start, end).replace('!', '-'))
    }

    for (let i = 0; i < line.length; i++) {
        const char = line[i]

        if (isDigit(char) && (startDigitPos === null)) {
            startDigitPos = i;
        } else if (startDigitPos !== null && ops.includes(char)) { // close digit substring
            parts.push(extractNumber(startDigitPos, i))
            startDigitPos = null;
        }

        if (ops.includes(char)) {
            parts.push(char)
        }
    }

    // close final digit
    if (startDigitPos !== null) {
        parts.push(extractNumber(startDigitPos, line.length))
    }

    return parts
}

function calc(line) {
    const parts = parseInputLine(line)

    if (line.toLowerCase() === 'c') {
        register = 0
        return 0
    }

    if (line === '=') {
        return register
    } else {
        // compute sum and return last number
        const eq = parts.join('')
        const glue = ops.includes(parts[0]) ? '' : '+' // insert '+' if first part is not an operator. e.g. 2+45 becomes reg = reg+2+45
        const arithmetic = sanitizeEvalExpression(`${register} ${glue} ${eq}`) // e.g. "register + 2 + 45"
        const cmd = `register = ${arithmetic}`

        try {
            eval(cmd);
        } catch (e) {
            console.log(e.message)
        }

        if (line.endsWith('=')) {
            return register
        } else {
            return parts[parts.length - 1]
        }
    }
}

module.exports = {calc}
