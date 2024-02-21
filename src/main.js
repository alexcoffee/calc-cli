const readline = require('readline');
const {calc} = require('./calc')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loop() {
    rl.question('> ', (line) => {
        console.log(calc(line))

        if (line.toLowerCase() === 'exit') {
            rl.close();
        }

        loop()
    });
}

loop()

