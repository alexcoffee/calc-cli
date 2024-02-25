import {calc} from "../calc";

test('2+45', () => {
    const register = 0;
    const actual = calc({register}, `2+45`)
    expect(actual).toBe(45)
})

test('=', () => {
    const register = 47;
    const actual = calc({register}, `=`)
    expect(actual).toBe(47)
})


test('*3=', () => {
    const register = 47;
    const actual = calc({register}, `*3=`)

    expect(actual).toBe(141)
})


test('-8+12=', () => {
    const register = 141;
    const actual = calc({register}, `-8+12=`)

    expect(actual).toBe(145)
})


test('c', () => {
    const register = 47;
    const actual = calc({register}, `c`)

    expect(actual).toBe(0)
})

test('65-(10/2)+(2*(2+3))=', () => {
    const register = 65;
    const actual = calc({register}, `-(10/2)+(2*(2+3))=`)
    expect(actual).toBe(70)
})

test('divide by zero', () => {
    const actual = calc({register: 10}, `/0=`)
    expect(actual).toBe(Number.POSITIVE_INFINITY)
})
