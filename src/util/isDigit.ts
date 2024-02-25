export function isDigit(character: string): boolean {
    return /^(\d|!|\.)$/g.test(character);
}
