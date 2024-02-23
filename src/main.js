const readline = require('readline');
const {calc} = require('./calc')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loop() {
    rl.question('> ', (line) => {
        if (line.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        const result = calc(line) // modifies global register state
        console.log(result)

        loop()
    });
}

loop()

