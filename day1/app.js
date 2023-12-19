const { match } = require('assert');
const fs = require('fs');

const filePath = 'input.txt';
const inputArray = []

try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = fileContent.split('\n')
    data.forEach(line => {
        inputArray.push(line);
    });
} catch (error) {
    console.error('Error reading the file:', error.message);
}
const arrayOfNums = ['one','two','three','four','five','six','seven','eight','nine','1','2','3','4','5','6','7','8','9'];

let sum = 0

for(let i = 0;  i < inputArray.length; i++){
    const str = inputArray[i]
    getFirstAndLastNum(str)
}


function getFirstAndLastNum(str) {
    console.log(str)
    const matches = []

    for(const num of arrayOfNums) {
        if(str.includes(num)){
            const index = str.indexOf(num)
            matches.push([num, index])
        }
    }  
    if(matches){
        matches.sort(sortFunction);
        const first = matches[0][0]
        const last = matches[matches.length -1][0]
        convertToNum(first, last)
    }
    return
}

function convertToNum(first, last){
    let convertFirst = parseInt(first, 10);
    let convertSec = parseInt(last, 10);
    if(isNaN(convertFirst)) convertFirst = arrayOfNums.indexOf(first) +1
    if(isNaN(convertSec)) convertSec = arrayOfNums.indexOf(last) +1
    const binaryAddition = String(convertFirst) + String(convertSec)
    let convertToNumber = parseInt(binaryAddition, 10);
    console.log(convertToNumber)
    sum += convertToNumber;
}

function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

console.log(sum)

