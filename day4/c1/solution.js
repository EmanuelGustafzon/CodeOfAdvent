const fs = require('fs');

let total = 0

try {
    const fileContent = fs.readFileSync('input.txt', 'utf-8');
    const data = fileContent.split('\n');
    data.forEach(line => {
        const count = getCardInfo(line.trim());
        total += count
    });
} catch (err) {
    console.log(err);
}
console.log(total)
function getCardInfo (card) {
    const arrs =  card.split(':')[1]
    const yourNums = arrs.split('|')[0].split(' ').filter(e => e !== '')
    const winningNums = new Set(arrs.split('|')[1].trim().split(' ')) // duplicates do not affect results and lookups in sets are constant
    const count = countCardPoints(yourNums,winningNums)
    return count
}

function countCardPoints (yourNums, winningNums) {
    let count = 0
    for(const num of yourNums) {
        if(winningNums.has(num)) {
            if(count === 0) {
                count = 1
            } else {
                count *= 2
            }
        }
    }
    return count
}