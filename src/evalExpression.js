const {OPERATORS} = require("./OPERATORS");


function doMath(register, op, number) {
    switch (op) {
        case OPERATORS.sub:
            return register - number;

        case OPERATORS.add:
            return register + number;

        case OPERATORS.divide:
            return number === 0 ? Number.POSITIVE_INFINITY : register / number;

        case OPERATORS.multiply:
            return register * number;

        default:
            throw new Error(`Unsupported operator: ${op}`)
    }
}

function evalFlatTerms(terms) {
    const orderOfOps = [['*', '/',], ['+', '-']]

    for (const ops of orderOfOps) {
        for (let i = 1; i < terms.length; i += 2) { // hop to matching op(s)
            if (ops.includes(terms[i])) {
                terms[i + 1] = doMath(terms[i - 1], terms[i], terms[i + 1]) // value has to be on the right (i+1) because next op might need it
                terms[i] = null
                terms[i - 1] = null
            }
        }
        terms = terms.filter(t => t !== null)
    }

    return terms[0]
}

function evalExpression(terms) {
    // terms has to start with a number and is followed by operator and possibly more op, number terms

    for (let closingIndex = 0; closingIndex < terms.length; closingIndex++) { // loop to first closing bracket
        if (terms[closingIndex] !== ')') {
            continue
        }

        for (let startIndex = closingIndex; startIndex >= 0; startIndex--) { // loop back to opening bracket
            if (terms[startIndex] !== '(') {
                continue
            }

            const subTerms = terms.slice(startIndex + 1, closingIndex)  // evaluate flat expression between the brackets (no parenthesis inside)

            terms[startIndex] = evalFlatTerms(subTerms.filter(t => t !== null)) // overwrite matched segment with numeric value

            for (let k = startIndex + 1; k <= closingIndex; k++) {  // clear out computed terms
                terms[k] = null
            }

            break
        }
    }

    return evalFlatTerms(terms.filter(t => t !== null))
}

module.exports = {evalExpression}
