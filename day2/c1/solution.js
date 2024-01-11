const fs = require('fs');

try {
    const fileContent = fs.readFileSync('input.txt', 'utf-8');
    const data = fileContent.split('\n');

    const result = cubeConundrum(data);
    console.log(result); // 3099

} catch (error) {
    console.error('Error reading the file:', error.message);
} 

function cubeConundrum(games) {
    let sumOfIds = 0;
    games.forEach((game, index) => {
        if(isValidGame(game)) {
            const id = index+1
            sumOfIds +=id
        }
    });
    return sumOfIds;
}

function isValidGame(str) {
    const totalCubes = {
        red: 12,
        green: 13,
        blue: 14
    };
    const game = str.split(':')[1]
    // create an array that looks like this 3 ['3', blue, '1', 'green', '6', 'red']
    const wordMatch = /(\w+)/g
    const amountAndColor = game.match(wordMatch)
    // the format is an array with every second element being the color and every second the amount
    for(let i = 1; i < amountAndColor.length; i+=2){
        const amount = parseInt(amountAndColor[i-1])
        const color = amountAndColor[i]
        if(totalCubes[color] < amount) {
            return false
        }
    }
    return true
}

