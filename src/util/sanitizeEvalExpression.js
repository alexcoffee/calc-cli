function sanitizeEvalExpression(input) {
    return input.replace(/[^0-9!.+-/*=]/g, '');    // Replace any character that is not a digit, !, ., or = with an empty string
}

module.exports = {sanitizeEvalExpression}
