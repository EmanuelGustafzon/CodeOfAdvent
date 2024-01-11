
// works with test data but not with the input data or some reason
// so this one is work in progress

const fs = require('fs');

let SUM = 0;

const spelledNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

try {
    const fileContent = fs.readFileSync('input.txt', 'utf-8');
    const data = fileContent.split('\n');
    data.forEach(line => {
        const result = trebuchet(String(line));
        console.log(result)
    });
} catch (error) {
    console.error('Error reading the file:', error.message);
}

function trebuchet(str) {
    let first = findFirstNumber(str);
    let last = findLastNumber(str);

    if (first.length > 1) first = String(spelledNums.indexOf(first) + 1);
    if (last.length > 1) last = String(spelledNums.indexOf(last) + 1);

    const concatNums = first + last;
    SUM += Number(concatNums);
    return SUM
}

function findFirstNumber(str) {
    const firstAppearingNum = {
        number: '',
        index: Infinity,
    };

    for (let spelledNum of spelledNums) {
        const foundSpelledNumIndex = str.search(spelledNum);
        if (foundSpelledNumIndex !== -1 && foundSpelledNumIndex < firstAppearingNum['index']) {
            firstAppearingNum['number'] = spelledNum;
            firstAppearingNum['index'] = foundSpelledNumIndex;
        }
    }

    const numRegex = /\d/g;
    const firstNumIndex = str.search(numRegex);
    if (firstNumIndex !== -1 && firstNumIndex < firstAppearingNum['index']) {
        firstAppearingNum['number'] = str.slice(firstNumIndex, firstNumIndex + 1);
        firstAppearingNum['index'] = firstNumIndex;
    }

    return firstAppearingNum['number'];
}

function findLastNumber(str) {
    const lastAppearingNum = {
        number: '',
        index: -1,
    };

    for (let spelledNum of spelledNums) {
        const foundSpelledNumIndex = str.search(spelledNum);
        if (foundSpelledNumIndex !== -1 && foundSpelledNumIndex > lastAppearingNum['index']) {
            lastAppearingNum['number'] = spelledNum;
            lastAppearingNum['index'] = foundSpelledNumIndex;
        }
    }

    const numRegex = /\d/g;
    const matches = str.match(numRegex);
    const lastNumIndex = matches ? str.lastIndexOf(matches[matches.length - 1]) : -1;
        if (lastAppearingNum['index'] < lastNumIndex) {
            lastAppearingNum['number'] = str[lastNumIndex];
            lastAppearingNum['index'] = lastNumIndex;
        }

    return lastAppearingNum['number'];
}


