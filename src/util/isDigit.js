function isDigit(character) {
    return /^(\d|!|\.)$/g.test(character);
}

module.exports = {isDigit}
