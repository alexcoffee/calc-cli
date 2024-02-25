const readline = require('readline');
const {calc} = require('./calc')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const state = {
    register: 0
}

function loop() {
    rl.question('> ', (line) => {
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

