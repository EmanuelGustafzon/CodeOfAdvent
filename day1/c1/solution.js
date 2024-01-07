const input = ["1abc2",
"pqr3stu8vwx",
"a1b2c3d4e5f",
"treb7uchet"]

// i finished day one but did not save so here is it again with the test data

const result = sumCalibrationValues()
console.log(result)

function sumCalibrationValues() {
    let sum = 0;
    for(const str of input) {
        const foundNums = findNumbers(str)
        const numsConcatinated =  concatFirstAndLast(foundNums)
        sum += Number(numsConcatinated);
    }
    return sum
}

function findNumbers(str) {
    const numRegex = /(\d)/g;
    const matches = str.match(numRegex)
    return matches
}

function concatFirstAndLast(foundNums){
    const length = foundNums.length
    return foundNums[0] + foundNums[length - 1]
}