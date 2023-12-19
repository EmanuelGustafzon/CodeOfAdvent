const fs = require('fs');
// PART TWO SUM THE POWER

try {
    const fileContent = fs.readFileSync('input.txt', 'utf-8');
    const data = fileContent.split('\n');
    const result = cubeConundrum(data);
    console.log(result);
} catch (error) {
    console.error('Error reading the file:', error.message);
} 

function cubeConundrum(games) {
    let sumOfPower = 0;
    games.forEach((game) => {
            const power = powerOfSet(game)
            sumOfPower += power
    });
    return sumOfPower;
}

function powerOfSet(str) {
    let totalCubes = {
        red: 0,
        green: 0,
        blue: 0
    };
    const game = str.split(':')[1]
    const wordMatch = /(\w+)/g
    const amountAndColor = game.match(wordMatch)
    for(let i = 1; i < amountAndColor.length; i+=2){
        const amount = parseInt(amountAndColor[i-1])
        const color = amountAndColor[i]
        if(totalCubes[color] < amount){
            totalCubes[color] = amount;
        }
    }
    const power = totalCubes['red'] * totalCubes['green'] * totalCubes['blue']
    return power
}