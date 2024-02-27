import {isDigit} from "./util/isDigit";
import {Operator} from "./types/operator";

type Term = number | string;

export function parseInputLine(line: string): Term[] {
    const parts = []
    let startDigitPos = null

    const extractNumber = (start: number, end: number): number => {
        return parseFloat(line.substring(start, end));
    }

    for (let i = 0; i < line.length; i++) {
        const char = line[i]

        if (isDigit(char) && (startDigitPos === null)) {
            // save start of possibly multi-digit number
            startDigitPos = i;
        } else if (startDigitPos !== null && Object.values(Operator).includes(char as Operator)) {
            // close multi-digit substring
            parts.push(extractNumber(startDigitPos, i))
            startDigitPos = null;
        }

        if (Object.values(Operator).includes(char as Operator)) {
            parts.push(char)
        }
    }

    // close final digit if ongoing
    if (startDigitPos !== null) {
        parts.push(extractNumber(startDigitPos, line.length))
    }

    return parts
}
