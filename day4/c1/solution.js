const fs = require('fs');

const result = countPoints()
console.log(result)

function countPoints() {
    let total = 0

    try {
        const fileContent = fs.readFileSync('input.txt', 'utf-8');
        const data = fileContent.split('\n');
        data.forEach(card => {
            const cardInfo = getCardInfo(card.trim());
            const [yourNums, winningNums] = cardInfo
            const count = countCardPoints(yourNums,winningNums);
            total += count
        });
    } catch (err) {
        console.log(err);
    }
    return total
}

function getCardInfo (card) {
    const arrs =  card.split(':')[1]
    const yourNums = arrs.split('|')[0].split(' ').filter(e => e !== '')
    const winningNums = new Set(arrs.split('|')[1].trim().split(' ')) // duplicates do not affect results and lookups in sets are constant
    // const count = countCardPoints(yourNums,winningNums)
    return [yourNums, winningNums] 
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