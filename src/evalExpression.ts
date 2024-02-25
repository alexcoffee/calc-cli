import {Operator} from "./types/operator";

type Term = number | string | null;

export function evalExpression(terms: Term[]): number {
    // terms has to start with a number and is followed by operator and possibly more op, number terms

    // loop to first closing bracket
    for (let closingIndex = 0; closingIndex < terms.length; closingIndex++) {
        if (terms[closingIndex] !== ')') {
            continue
        }

        // loop back to opening bracket
        for (let startIndex = closingIndex; startIndex >= 0; startIndex--) {
            if (terms[startIndex] !== '(') {
                continue
            }

            // evaluate flat expression between the brackets (there will be no parenthesis inside)
            const subTerms = terms.slice(startIndex + 1, closingIndex)

            // overwrite matched segment with numeric value
            terms[startIndex] = evalFlatTerms(subTerms.filter(t => t !== null))

            // clear out computed terms
            for (let k = startIndex + 1; k <= closingIndex; k++) {
                terms[k] = null
            }

            break
        }
    }

    return evalFlatTerms(terms.filter(t => t !== null))
}

function evalFlatTerms(terms: Term[]): number {
    const orderOfOps = [['*', '/',], ['+', '-']]

    for (const ops of orderOfOps) {
        for (let i = 1; i < terms.length; i += 2) { // hop to matching op(s)
            if (ops.includes(String(terms[i]))) {
                terms[i + 1] = doMath(terms[i - 1] as number, terms[i] as Operator, terms[i + 1] as number) // value has to be on the right (i+1) because next op might need it
                terms[i] = null
                terms[i - 1] = null
            }
        }
        terms = terms.filter(t => t !== null)
    }

    return terms[0] as number
}


function doMath(register: number, op: Operator, num: number): number {
    switch (op) {
        case Operator.sub:
            return register - num;

        case Operator.add:
            return register + num;

        case Operator.divide:
            return num === 0 ? Number.POSITIVE_INFINITY : register / num;

        case Operator.multiply:
            return register * num;

        default:
            throw new Error(`Unsupported operator: ${op}`)
    }
}
