const {parseInputLine} = require("./parseInputLine");
const {evalExpression} = require("./evalExpression");
const {OPERATORS} = require("./OPERATORS");

function calc(state, line) { // evaluate input expression and update global register state
    if (line.toLowerCase() === 'c') {
        state.register = 0
        return 0
    }

    if (line === '=') {
        return state.register
    }

    const terms = parseInputLine(line)

    if (!Object.values(OPERATORS).includes(terms[0])) {
        terms.unshift('+') // insert '+' if first term is not an operator. e.g. 2+45 becomes +2+45
    }

    terms.unshift(state.register)

    state.register = evalExpression(terms);

    if (line.endsWith('=')) {
        return state.register
    } else {
        return terms[terms.length - 1]
    }
}

module.exports = {calc}
