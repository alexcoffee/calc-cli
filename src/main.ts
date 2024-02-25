import * as readline from "readline";

import {calc} from "./calc";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const state = {
    register: 0
}

function loop() {
    rl.question('> ', (line: string) => {
        if (line.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        const result = calc(state, line) // modifies global register state
        console.log(result)

        loop()
    });
}

loop()

