
const fs = require('fs');

function inputTo2dArray() { // get the input values and return it as a 2d array
    const input2dArray = []

    try {
        const fileContent = fs.readFileSync('input.txt', 'utf-8');
        const data = fileContent.split('\n');
        data.forEach((line) => {
          input2dArray.push(line.split(' ').map(Number))
        });
    } catch (err) {
        console.log(err);
    }
    return input2dArray
}

const inputs = inputTo2dArray()


function extrapolate(arr, sum=0){
    if(arr.every(item => item === 0)){
        return 0
      } 
    const temp = []
    for(let i=1; i<arr.length; i++){
      temp.push((arr[i] - arr[i - 1]));
      }
    sum = arr[arr.length-1] + extrapolate(temp, sum)
    return sum
}

let total = 0

for(const input of inputs){
    const result = extrapolate(input)
    total += result
}
console.log(total)
