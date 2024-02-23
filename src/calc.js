const {sanitizeEvalExpression} = require("./util/sanitizeEvalExpression");
const {parseInputLine} = require("./parseInputLine");

const OPERATORS = ['-', '+', '/', '*']

let register = 0;


function calc(line) {
    const parts = parseInputLine(line)

    if (line.toLowerCase() === 'c') {
        register = 0
        return 0
    }

    if (line === '=') {
        return register
    }

    // evaluate expression and update global register state
    const eq = parts.join('') // sanitized input expression
    const glue = OPERATORS.includes(parts[0]) ? '' : '+' // insert '+' if first part is not an operator. e.g. 2+45 becomes reg = reg+2+45
    const mathExpression = sanitizeEvalExpression(`${register} ${glue} ${eq}`) // e.g. "register + 2 + 45"

    const cmd = `register = ${mathExpression}`

    try {
        eval(cmd);
    } catch (e) {
        return 'NaN'
    }

    if (line.endsWith('=')) {
        return register
    } else {
        return parts[parts.length - 1]
    }
}

module.exports = {calc}
